"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create a connection to your database and connect to your table.
 * ```ts
 * const connection = new Connection(config);
 * // Columns - Create an interface for columns.
 * // Column names - Create a type with column names.
 * const myTable = new Table<columns, coulmnsNames>(connection, "myTable");
 * ```
 */
class Table {
    /**
     *
     * @param {Connection} connection
     * @param {string} table table name
     */
    constructor(connection, table) {
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
        this.selectAll = async (sort) => {
            const sql = "SELECT * FROM " + this.table + (sort ? " ORDER BY " + sort.by + " " + sort.type : "");
            console.log(sql);
            return await this.query(sql);
        };
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
        this.selectRow = async (column, value) => {
            const sql = `SELECT * FROM ${this.table} WHERE ${column} = $1`;
            const data = await this.query(sql, [value]);
            return await data[0];
        };
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
        this.add = async (data) => {
            let sql = `INSERT INTO ${this.table} `;
            const keys = Object.keys(data);
            const values = [];
            sql += "(" + keys.map(key => {
                values.push(data[key]);
                return key;
            }).join(", ").trim() + ")" + " VALUES (" + keys.map((value, i) => {
                return `$${i + 1}`;
            }).join(", ").trim() + ")";
            try {
                await this.query(sql, values);
            }
            catch (ex) {
                throw ex;
            }
        };
        /**
         * Delete a row from a table
         * ```
         * myTable.delete("id", 5);
         * ```
         * @param column column name
         * @param value  row value
         */
        this.delete = async (column, value) => {
            const sql = `DELETE FROM ${this.table} WHERE ${column} = $1`;
            try {
                await this.query(sql, [value]);
            }
            catch (ex) {
                throw ex;
            }
        };
        /**
         * Remove all rows from a table
         * ```
         * myTable.deleteAll();
         * ```
         */
        this.deleteAll = async () => {
            const sql = `DELETE FROM ${this.table}`;
            try {
                await this.query(sql);
            }
            catch (ex) {
                throw ex;
            }
        };
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
        this.update = async (column, value, by) => {
            let sql = `UPDATE ${this.table} SET `;
            if ((Array.isArray(column) && !Array.isArray(value)) || (!Array.isArray(column) && Array.isArray(value))) {
                const type = Array.isArray(column) ? "value" : "column";
                throw new TypeError(type + " is not array");
            }
            else if ((Array.isArray(column) && Array.isArray(value)) && (column.length !== value.length)) {
                throw new Error(`columns and values must be equal!\nColumns length: ${column.length},\nValue length: ${value.length}`);
            }
            else if (Array.isArray(column) && Array.isArray(value)) {
                for (let i = 0; i < column.length; i++) {
                    sql += `${column[i]} = $${i + 1}` + (i + 1 === column.length ? "" : ", ");
                }
            }
            else {
                sql += `${column} = $1`;
            }
            sql += " WHERE " + by.column + " = " + by.value;
            try {
                return await this.query(sql, Array.isArray(value) ? value : [value]);
            }
            catch (ex) {
                throw ex;
            }
        };
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
        this.custom = async (sql, values) => {
            try {
                return await this.query(sql, values);
            }
            catch (ex) {
                throw ex;
            }
        };
        /**
         * Drop table
         * #### ATTENTION!!! THIS METHOD DELETS THE TABLE, NOT THE ROWS!!!
         * ```
         * myTable.drop();
         * ```
         * @returns
         */
        this.drop = async () => {
            const sql = "DROP TABLE " + this.table;
            try {
                return await this.query(sql);
            }
            catch (ex) {
                throw ex;
            }
        };
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
        this.createTable = async (table) => {
            let sql = `CREATE TABLE ${table.tableName} (` + table.columns.map(value => {
                return `${value.name} ${value.type}${value.isArray ? "[]" : ""} ${value.isNull ? "" : "NOT NULL"} ${value.isAutoincrement ? "GENERATED ALWAYS AS IDENTITY" : ""}`;
            }).join(",").trim();
            const primarry = table.columns.filter(value => value.isPrimarry);
            sql += primarry.length > 0 ? ", PRIMARY KEY (" + primarry.map(value => {
                return value.name;
            }).join(",").trim() + "));" : ");";
            sql += ` ALTER TABLE IF EXISTS ${table.tableName} OWNER to ${table.owner};`;
            console.log(sql);
            try {
                return await this.query(sql);
            }
            catch (ex) {
                throw ex;
            }
        };
        this.query = async (sql, value) => {
            const data = await this.client.query(sql, value);
            return data.rows;
        };
        this.connection = connection;
        this.table = table;
        this.client = this.connection.getClient();
    }
    ;
}
exports.default = Table;
