## Postgresql is a small library to simplify working with the postgresql database

##### This package was created using the [pg](https://www.npmjs.com/package/pg) package!
****
#### Get start

**Create connection**
```typescript
import {Connection, Table} from "postgresjs";

const config {
    host: "host",
    port: "port",
    user: "user",
    password: "password",
    database: "database"
}

const connection = new Connection(config);
```

**For better work, I advise you to create 1 type with column names and 1 interface with column values.**

```typescript
interface iUser{
    id?: string; // {?} - if the column is autoincrement 
    username: string;
    email: string;
    password: string;
}

type tUser = "id" | "username" | "email" | "password";
```

**Now let's connect to the table**
```typescript
// For each table, create an instance of that table's class
const usersTable = new Table<iUser, tUser>(connection, "users");
const carsTable  = new Table<iCars, tCar>(connection, "cars");
```

**Select all rows or a specific row**
```typescript
// Select all
userTable.selectAll().then(data => console.log(data));
// sort
const sort = {
    by: "id",
    type: "ASC"
}
userTable.selectAll(sort).then(data => console.log(data));

// Select row
userTable.selectRow("id", 5).then(data => console.log(data));
```

**Delete all rows or a specific row**
```typescript
// Delete all
userTable.deleteAll();
// Delete row
userTable.delete("id", 5);
```

**Update row**
```typescript
const columns = ["username", "email"];
const values  = ["alex", "alex@example.com"];
conste updateCol = {
    column: "id",
    value: 5
}
userTable.update(columns, values, updateCol);
userTable.update("username", "alex", updateCol);
```

**Drop table**
##### ATTENTION!!! THIS METHOD DELEtypescript THE TABLE, NOT THE ROWS!!!
```typescript
userTable.drop();
```

**Create table**
```typescript
const tableData = {
     tableName: "new table name",
     owner: "username",
     columns: [
         {
             name: "id",
             type: "bigint",
             isAutoincrement: true,
             isPrimarry: true,
         },
         {
             name: "userData",
             type: "text",
             isNull: true,
             isArray: true
         },
         ...
     ]
 }
     * 
myTable.createTable(tableData);
```

**Custom querry**
```typescript
myTable.custom("SELECT * FROM users");
myTable.custom("INSERT INTO users (username, email) VALUES $1, $2", ["username", "useremail"]);
```
