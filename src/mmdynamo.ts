import { MMDynamo } from "./dynamo";

export default function MMDynamodb(config: MMDynamoConfig) {
  return new MMDynamo(config);
}

export { MMDynamo };
