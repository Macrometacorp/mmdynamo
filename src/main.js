import { AwsClient } from "aws4fetch";
import dynamoApi from "./apis/dynamodb-2012-08-10.normal.json";

export class DynamoDB {
  /**
   * @param {{
   *   accessKeyId: string
   *   secretAccessKey: string
   *   sessionToken?: string
   *   service?: string
   *   region?: string
   *   cache?: Map<string,ArrayBuffer>
   *   retries?: number
   *   initRetryMs?: number
   *   endpoint: string
   * }} options
   */

  constructor({ endpoint, ...config }) {
    this._client = new AwsClient(config);
    this._endpoint = endpoint;
    this.util = {
      abort: {},
      each: (object, iterFunction) => {
        for (var key in object) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            var ret = iterFunction.call(this, key, object[key]);
            if (ret === this.util.abort) break;
          }
        }
      },
      copy: (object) => {
        if (object === null || object === undefined) return object;
        var dupe = {};
        for (var key in object) {
          dupe[key] = object[key];
        }
        return dupe;
      },
      lowerFirst: (string) => {
        return string[0].toLowerCase() + string.substr(1);
      },
    };
    this.defineMethods();
  }

  defineMethods() {
    const svc = this;
    const operations = dynamoApi.operations;

    this.util.each(operations, (method) => {
      let lowerCase = this.util.lowerFirst(method);
      if (svc[lowerCase]) return;
      var operation = operations[method];
      if (operation.authtype === "none") {
        // Provision to make unauthenticated request
      } else {
        svc[lowerCase] = (params, cb) => {
          params = params || {};
          if (!cb) {
            throw new Error("Callback not provided");
          }
          return this._call(method, params, cb);
        };
      }
    });
  }

  _call(target, params, cb) {
    const operation = dynamoApi.operations[target];
    let headers = {};

    headers["Content-Type"] =
      "application/x-amz-json-" + dynamoApi.metadata.jsonVersion;

    let XAmzTarget;

    if (operation) {
      XAmzTarget = dynamoApi.metadata.targetPrefix + "." + target;
    } else {
      throw new Error(`Target Function: ${target} not found`);
    }

    headers["X-Amz-Target"] = XAmzTarget;

    const handleResponse = (text) => {
      try {
        return JSON.parse(text);
      } catch (err) {
        return text;
      }
    };

    return this._client
      .fetch(this._endpoint + operation.http.requestUri, {
        body: JSON.stringify(params),
        headers,
        method: operation.http.method,
      })
      .then((response) => {
        return new Promise((resolve, reject) => {
          response.text().then((text) => {
            if (response.ok) {
              resolve(handleResponse(text));
            } else {
              reject(handleResponse(text));
            }
          });
        });
      })
      .then((data) => {
        cb(null, data);
      })
      .catch((err) => cb(err, null));
  }
}
