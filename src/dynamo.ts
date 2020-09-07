import { AwsClient } from "aws4fetch";
import dynamoApi from "./apis/dynamoAPI";

export class MMDynamo {
  _client: any;
  _endpoint: any;
  _service: any;

  constructor({ endpoint, ...config }: MMDynamoConfig) {
    this._client = new AwsClient(config);
    this._endpoint = endpoint;
    this.defineMethods();
  }

  util = {
    abort: {},
    each: (object: any, iterFunction: any) => {
      for (var key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          var ret = iterFunction.call(this, key, object[key]);
          if (ret === this.util.abort) break;
        }
      }
    },
    copy: (object: any) => {
      if (object === null || object === undefined) return object;
      var dupe: any = {};
      for (var key in object) {
        dupe[key] = object[key];
      }
      return dupe;
    },
    lowerFirst: (string: string) => {
      return string[0].toLowerCase() + string.substr(1);
    },
  };

  defineMethods() {
    const svc: any = this;
    const operations = dynamoApi.operations;

    this.util.each(operations, (method: string) => {
      let lowerCase = this.util.lowerFirst(method);
      if (svc[lowerCase]) return;
      //@ts-ignore
      var operation = operations[method];
      if (operation.authtype === "none") {
        // Provision to make unauthenticated request
      } else {
        svc[lowerCase] = (params: any) => {
          params = params || {};
          return this._call(method, params);
        };
      }
    });
  }

  _call(target: string, params: any) {
    // @ts-ignore
    const operation = dynamoApi.operations[target];
    let headers: any = {};

    headers["Content-Type"] =
      "application/x-amz-json-" + dynamoApi.metadata.jsonVersion;

    let XAmzTarget;

    if (operation) {
      XAmzTarget = dynamoApi.metadata.targetPrefix + "." + target;
    } else {
      throw new Error(`Target Function: ${target} not found`);
    }

    headers["X-Amz-Target"] = XAmzTarget;

    return this._client.fetch(this._endpoint + operation.http.requestUri, {
      body: JSON.stringify(params),
      headers,
      method: operation.http.method,
    });
  }
}
