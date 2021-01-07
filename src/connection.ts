import { endpoints } from "./util/constants/endpoints";
import { IConnection, IOptions } from "./util/types/connectionTypes";

export class Connection {
  private _agent: Function | string;
  private _federationURL: string;
  private _apiKey: string;
  private _absolutePath?: boolean;

  constructor(config: IConnection) {
    const { agent, federationURL, apiKey, absolutePath } = config;
    this._agent = agent;
    this._federationURL = federationURL;
    this._apiKey = apiKey;
    this._absolutePath = absolutePath;
  }

  private get _getApiKey() {
    if (this._apiKey.split(" ")[0] === "apikey") {
      return this._apiKey;
    }
    return "apikey " + this._apiKey;
  }

  private _getHttpClient() {
    if (typeof this._agent === "function") {
      return this._agent;
    }
    if (!globalThis || typeof globalThis !== "object") {
      throw new Error("globalThis needs to be present in the runtime");
    }
    return (globalThis as { [key: string]: any })[this._agent];
  }

  private get _getUrl() {
    const { DYNAMO_ENDPOINT, DYNAMO_URL_PREFIX } = endpoints;

    if (!this._absolutePath) {
      const apiUrl = `${DYNAMO_URL_PREFIX}${
        this._federationURL.split("https://")[1]
      }${DYNAMO_ENDPOINT}`;

      return apiUrl;
    }
    return this._federationURL;
  }

  private _getOptions(
    target: string,
    payload: object,
    method: string
  ): IOptions {
    const { DYNAMO_TARGET_PREFIX } = endpoints;
    let options: IOptions = {
      method,
      headers: {
        Authorization: this._getApiKey,
        "x-amz-target": `${DYNAMO_TARGET_PREFIX}.${target}`,
      },
      body: JSON.stringify(payload),
    };
    return options;
  }

  getHttpClient() {
    return this._getHttpClient();
  }

  get getUrl(): string {
    return this._getUrl;
  }

  getOptions(
    target: string,
    payload: object,
    method: string = endpoints.DYNAMO_METHOD
  ): IOptions {
    return this._getOptions(target, payload, method);
  }
}
