import Connection from "./Connection";
import { iCreateTable } from "./types";
/**
 * Create a connection to your database and connect to your table.
 * ```ts
 * const connection = new Connection(config);
 * // Columns - Create an interface for columns.
 * // Column names - Create a type with column names.
 * const myTable = new Table<columns, coulmnsNames>(connection, "myTable");
 * ```
 */
declare class Table<columns extends object, coulmnsNames> {
    private connection;
    private table;
    private client;
    /**
     *
     * @param {Connection} connection
     * @param {string} table table name
     */
    constructor(connection: Connection, table: string);
    /**
     * Select all rows in table
     * ```
     * myTable.selectAll().then(rows => console.log(rows));
     * // or
     * const sort = {
     *      by: "id",
     *      type: "ASC"
     * }
     * myTable.selectAll(sort).then(rows => console.log(rows));
     * ```
     * @param sort Sort rows
     * @returns
     */
    selectAll: (sort?: {
        by: coulmnsNames;
        type: "ASC" | "DESC";
    }) => Promise<columns[]>;
    /**
     * Select specific rows
     * ```
     * // SELECT * FROM table_name WHERE id = 5
     * myTable.selectRow("id", 5).then(row => console.log(row));
     * ```
     * @param column column name
     * @param value row value
     * @returns
     */
    selectRow: (column: coulmnsNames, value: any) => Promise<columns>;
    /**
     * Add new rows
     * ```
     * const data = {
     *      id: "5" // or leave this blank if row is autoincrement
     *      userName: "username",
     *      password: "********",
     *      ...
     * }
     *
     * myTable.add(data);
     * ```
     * @param data
     */
    add: (data: columns) => Promise<void>;
    /**
     * Delete a row from a table
     * ```
     * myTable.delete("id", 5);
     * ```
     * @param column column name
     * @param value  row value
     */
    delete: (column: coulmnsNames, value: any) => Promise<void>;
    /**
     * Remove all rows from a table
     * ```
     * myTable.deleteAll();
     * ```
     */
    deleteAll: () => Promise<void>;
    /**
     * Update a row in a table
     * ```
     * myTable.update("username", "Alex123", {column: "id", value: 5});
     * myTable.update(["username", "email"], ["Alex123", "alex@example.com"], {column: "id", value: 5});
     * ```
     * @param column row name or row names - if you want to update more data
     * @param value  row value or row values - if you want to update more data
     * @param by Unique id to update the row
     * @returns
     */
    update: (column: coulmnsNames | coulmnsNames[], value: any | any[], by: {
        column: coulmnsNames;
        value: any;
    }) => Promise<void>;
    /**
     * Custom query
     * ```
     * myTable.custom("SELECT * FROM myTable");
     * myTable.custom("INSERT INTO myTable (username, email) VALUES $1, $2", ["username", "useremail"]);
     * ```
     * @param sql sql querry
     * @param values
     * @returns
     */
    custom: (sql: string, values?: any[]) => Promise<any>;
    /**
     * Drop table
     * #### ATTENTION!!! THIS METHOD DELETS THE TABLE, NOT THE ROWS!!!
     * ```
     * myTable.drop();
     * ```
     * @returns
     */
    drop: () => Promise<void>;
    /**
     * Create a new table
     * ```
     * const tableData = {
     *      tableName: "new table name",
     *      owner: "username",
     *      columns: [
     *          {
     *              name: "id",
     *              type: "bigint",
     *              isAutoincrement: true,
     *              isPrimarry: true,
     *          },
     *          {
     *              name: "userData",
     *              type: "text",
     *              isNull: true,
     *              isArray: true
     *          },
     *          ...
     *      ]
     *  }
     *
     * myTable.createTable(tableData);
     * ```
     * @param table
     * @returns
     */
    createTable: (table: iCreateTable) => Promise<void>;
    private query;
}
export default Table;
