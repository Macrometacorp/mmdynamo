import { Connection } from "./connection";
import { IConnection } from "./util/types/connectionTypes";
export default class Client extends Connection {
    constructor(config: IConnection);
    private _dynamoApiCall;
    createTable(payload: object): Promise<any>;
    putItem(payload: object): Promise<any>;
    listTables(): Promise<any>;
    deleteTable(payload: object): Promise<any>;
    deleteItem(payload: object): Promise<any>;
    updateItem(payload: object): Promise<any>;
    scan(payload: object): Promise<any>;
    getItem(payload: object): Promise<any>;
}
