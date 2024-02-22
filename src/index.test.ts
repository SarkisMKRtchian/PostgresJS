import {Connection, Table} from "./index"

const connection = new Connection({database: "test", user: "postgres", host: "127.0.0.1", port: 5432, password: ""})

test("Select all", () => {
    const test = new Table(connection, "test");
    return test.selectAll().then(data => {
        expect(data).toEqual([
            {
                id: "4",
                username: "user2",
                email: "email2",
                password: "pass2"
            },
            {
                id: "6",
                username: "user1",
                email: "email1",
                password: "pass1"
            }
        ]);
    })
    
})

test("Select row", () => {
    const test = new Table(connection, "test");
    return test.selectRow("id", 4).then(data => {
        expect(data).toEqual(
            {
                id: "4",
                username: "user2",
                email: "email2",
                password: "pass2"
            }
        );
    })
})

test("Delete row", () => {
    const test = new Table(connection, "test");
    return test.delete("id", 4).then(data => {
        expect(data).toBe(void 0);
    })
})

test("Add row", () => {
    const test = new Table(connection, "test");
    const data = {
        username: "user3",
        email: "email3",
        password: "pass4"
    }
    return test.add(data).then(data => {
        expect(data).toBe(void 0);
    })
})

test("Update row", () => {
    const test = new Table(connection, "test");
    return test.update("username", "email2", {column: "id", value: "6"}).then(data => {
        expect(data).toBe(void 0);
    })
})