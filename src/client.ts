import { Connection } from "./connection";
import { dynamoOperations } from "./util/constants/dynamoOperations";
import { stringConstants } from "./util/constants/stringConstants";
import { IConnection } from "./util/types/connectionTypes";

export default class Client extends Connection {
  constructor(config: IConnection) {
    super(config);
  }

  private async _dynamoApiCall(dynamoOperationTarget: string, payload: object) {
    const response = await this.getHttpClient()(
      this.getUrl,
      this.getOptions(dynamoOperationTarget, payload)
    );
    const dynamoResponse = await response.json();
    const { status } = response;
    const { ERROR_MESSAGE } = stringConstants;

    if (status && status === 200) {
      return dynamoResponse;
    }
    if (status && status !== 200 && status >= 400) {
      dynamoResponse.statusCode = status;
      throw new Error(JSON.stringify(dynamoResponse));
    }
    throw new Error(
      JSON.stringify({ statusCode: 500, message: ERROR_MESSAGE })
    );
  }

  async createTable(payload: object) {
    const { CREATE_TABLE } = dynamoOperations;
    try {
      return await this._dynamoApiCall(CREATE_TABLE, payload);
    } catch (error) {
      throw error;
    }
  }

  async putItem(payload: object) {
    const { PUT_ITEM } = dynamoOperations;
    try {
      return await this._dynamoApiCall(PUT_ITEM, payload);
    } catch (error) {
      throw error;
    }
  }

  async listTables() {
    const { LIST_TABLES } = dynamoOperations;
    try {
      return await this._dynamoApiCall(LIST_TABLES, {});
    } catch (error) {
      throw error;
    }
  }

  async deleteTable(payload: object) {
    const { DELETE_TABLE } = dynamoOperations;
    try {
      return await this._dynamoApiCall(DELETE_TABLE, payload);
    } catch (error) {
      throw error;
    }
  }

  async deleteItem(payload: object) {
    const { DELETE_ITEM } = dynamoOperations;
    try {
      return await this._dynamoApiCall(DELETE_ITEM, payload);
    } catch (error) {
      throw error;
    }
  }

  async updateItem(payload: object) {
    const { UPDATE_ITEM } = dynamoOperations;
    try {
      return await this._dynamoApiCall(UPDATE_ITEM, payload);
    } catch (error) {
      throw error;
    }
  }

  async scan(payload: object) {
    const { SCAN } = dynamoOperations;
    try {
      return await this._dynamoApiCall(SCAN, payload);
    } catch (error) {
      throw error;
    }
  }

  async getItem(payload: object) {
    const { GET_ITEM } = dynamoOperations;
    try {
      return await this._dynamoApiCall(GET_ITEM, payload);
    } catch (error) {
      throw error;
    }
  }
}
