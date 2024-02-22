"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
/**
 * Create connection
 */
class Connection {
    /**
     *
     * @param config Connection config
     */
    constructor(config) {
        this.getClient = () => {
            return this.client;
        };
        this.client = new pg_1.Client(config);
        this.client.connect();
    }
}
exports.default = Connection;
