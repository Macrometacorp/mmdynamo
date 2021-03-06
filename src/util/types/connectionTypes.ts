export interface IConnection {
  federationURL: string;
  apiKey: string;
  agent: Function | string;
  absolutePath?: boolean;
};

export interface IOptions {
  method: string;
  headers: headersType;
  body: string;
};

export type headersType = {
  Authorization: string;
  "x-amz-target": string;
};

export type endpointsType = {
  DYNAMO_ENDPOINT: string;
  DYNAMO_METHOD: string;
  DYNAMO_TARGET_PREFIX: string;
  DYNAMO_URL_PREFIX: string;
};
