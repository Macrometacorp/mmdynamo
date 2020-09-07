declare interface MMDynamoConfig {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
  service?: "dynamodb";
  region?: string;
  cache?: Map<string, ArrayBuffer>;
  retries?: number;
  initRetryMs?: number;
  endpoint: string;
}
