(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.mmdynamo = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.
    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    const endpoints = {
        DYNAMO_ENDPOINT: "/_api/dynamo",
        DYNAMO_URL_PREFIX: "https://api-",
        DYNAMO_METHOD: "POST",
        DYNAMO_TARGET_PREFIX: "Dynamo",
    };

    class Connection {
        constructor(config) {
            const { agent, federationURL, apiKey, absolutePath } = config;
            this._agent = agent;
            this._federationURL = federationURL;
            this._apiKey = apiKey;
            this._absolutePath = absolutePath;
        }
        get _getApiKey() {
            if (this._apiKey.split(" ")[0] === "apikey") {
                return this._apiKey;
            }
            return "apikey " + this._apiKey;
        }
        _getHttpClient() {
            if (typeof this._agent === "function") {
                return this._agent;
            }
            if (!globalThis || typeof globalThis !== "object") {
                throw new Error("globalThis needs to be present in the runtime");
            }
            return globalThis[this._agent];
        }
        get _getUrl() {
            const { DYNAMO_ENDPOINT, DYNAMO_URL_PREFIX } = endpoints;
            if (!this._absolutePath) {
                const apiUrl = `${DYNAMO_URL_PREFIX}${this._federationURL.split("https://")[1]}${DYNAMO_ENDPOINT}`;
                return apiUrl;
            }
            return this._federationURL;
        }
        _getOptions(target, payload, method) {
            const { DYNAMO_TARGET_PREFIX } = endpoints;
            let options = {
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
        get getUrl() {
            return this._getUrl;
        }
        getOptions(target, payload, method = endpoints.DYNAMO_METHOD) {
            return this._getOptions(target, payload, method);
        }
    }

    const dynamoOperations = {
        CREATE_TABLE: "CreateTable",
        PUT_ITEM: "PutItem",
        LIST_TABLES: "ListTables",
        DELETE_ITEM: "DeleteItem",
        DELETE_TABLE: "DeleteTable",
        UPDATE_ITEM: "UpdateItem",
        SCAN: "Scan",
        GET_ITEM: "GetItem",
    };

    const stringConstants = {
        ERROR_MESSAGE: "Internal Server Error",
    };

    class Client extends Connection {
        constructor(config) {
            super(config);
        }
        _dynamoApiCall(dynamoOperationTarget, payload) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield this.getHttpClient()(this.getUrl, this.getOptions(dynamoOperationTarget, payload));
                const dynamoResponse = yield response.json();
                const { status } = response;
                const { ERROR_MESSAGE } = stringConstants;
                if (status && status === 200) {
                    return dynamoResponse;
                }
                if (status && status !== 200 && status >= 400) {
                    dynamoResponse.statusCode = status;
                    throw new Error(JSON.stringify(dynamoResponse));
                }
                throw new Error(JSON.stringify({ statusCode: 500, message: ERROR_MESSAGE }));
            });
        }
        createTable(payload) {
            return __awaiter(this, void 0, void 0, function* () {
                const { CREATE_TABLE } = dynamoOperations;
                try {
                    return yield this._dynamoApiCall(CREATE_TABLE, payload);
                }
                catch (error) {
                    throw error;
                }
            });
        }
        putItem(payload) {
            return __awaiter(this, void 0, void 0, function* () {
                const { PUT_ITEM } = dynamoOperations;
                try {
                    return yield this._dynamoApiCall(PUT_ITEM, payload);
                }
                catch (error) {
                    throw error;
                }
            });
        }
        listTables() {
            return __awaiter(this, void 0, void 0, function* () {
                const { LIST_TABLES } = dynamoOperations;
                try {
                    return yield this._dynamoApiCall(LIST_TABLES, {});
                }
                catch (error) {
                    throw error;
                }
            });
        }
        deleteTable(payload) {
            return __awaiter(this, void 0, void 0, function* () {
                const { DELETE_TABLE } = dynamoOperations;
                try {
                    return yield this._dynamoApiCall(DELETE_TABLE, payload);
                }
                catch (error) {
                    throw error;
                }
            });
        }
        deleteItem(payload) {
            return __awaiter(this, void 0, void 0, function* () {
                const { DELETE_ITEM } = dynamoOperations;
                try {
                    return yield this._dynamoApiCall(DELETE_ITEM, payload);
                }
                catch (error) {
                    throw error;
                }
            });
        }
        updateItem(payload) {
            return __awaiter(this, void 0, void 0, function* () {
                const { UPDATE_ITEM } = dynamoOperations;
                try {
                    return yield this._dynamoApiCall(UPDATE_ITEM, payload);
                }
                catch (error) {
                    throw error;
                }
            });
        }
        scan(payload) {
            return __awaiter(this, void 0, void 0, function* () {
                const { SCAN } = dynamoOperations;
                try {
                    return yield this._dynamoApiCall(SCAN, payload);
                }
                catch (error) {
                    throw error;
                }
            });
        }
        getItem(payload) {
            return __awaiter(this, void 0, void 0, function* () {
                const { GET_ITEM } = dynamoOperations;
                try {
                    return yield this._dynamoApiCall(GET_ITEM, payload);
                }
                catch (error) {
                    throw error;
                }
            });
        }
    }

    return Client;

})));
