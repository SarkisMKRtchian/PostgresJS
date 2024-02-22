import { Client, ClientConfig } from "pg";

/**
 * Create connection
 */
class Connection {
    private client: Client;

    /**
     * 
     * @param config Connection config
     */
    public constructor(config: ClientConfig){
        this.client = new Client(config);
        this.client.connect();
    }

    public getClient = () => {
        return this.client;
    }
}

export default Connection;

