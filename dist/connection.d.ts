import { IConnection, IOptions } from "./util/types/connectionTypes";
export declare class Connection {
    private _agent;
    private _federationURL;
    private _apiKey;
    private _absolutePath?;
    constructor(config: IConnection);
    private get _getApiKey();
    private _getHttpClient;
    private get _getUrl();
    private _getOptions;
    getHttpClient(): any;
    get getUrl(): string;
    getOptions(target: string, payload: object, method?: string): IOptions;
}
