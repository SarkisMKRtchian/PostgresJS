import { Client, ClientConfig } from "pg";
/**
 * Create connection
 */
declare class Connection {
    private client;
    /**
     *
     * @param config Connection config
     */
    constructor(config: ClientConfig);
    getClient: () => Client;
}
export default Connection;
