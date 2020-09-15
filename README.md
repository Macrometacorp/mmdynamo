# mmDynamo

Macrometa DynamoDB client for CloudFlare & Edge Workers.

## Installation

With [npm](http://npmjs.org/) do:

```
npm install mmdynamo
```

Or you can also reference different formats straight from unpkg.com:

[ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import):

https://unpkg.com/mmdynamo@0.2.0/dist/mmdynamo.esm.js

[UMD](https://github.com/umdjs/umd):

https://unpkg.com/mmdynamo@0.2.0/dist/mmdynamo.umd.js

[CommonJS](https://requirejs.org/docs/commonjs.html):

https://unpkg.com/mmdynamo@0.2.0/dist/mmdynamo.cjs.js

## Initializing dynamodb

```js
import { DynamoDB } from "mmdynamo";

const client = new DynamoDB({
  region: "us-east-2",
  accessKeyId: "",
  secretAccessKey: "",
  service: "dynamodb",
  endpoint: "http://dynamodb.us-east-2.amazonaws.com",
});
```

### Initializing macrometa dynamodb

```js
import { DynamoDB } from "mmdynamo";

const dcName = "test.macrometa.io";
const host = "https://api-" + dcName;
const apiKey = "xxxxxxxxxxxxxxxxxxxxxx";
/*
   If you have a JWT token
   
   const JWT = "xxxxxxxxxxxxxxxxxxxxxx";
   */

const service = "dynamodb";
const region = "us-east-1";
const endpoint = host + "/_api/dynamo";
// secretAccessKey is a required parameter for aws-sdk we recommend you to pass "c8"
const secretAccessKey = "c8";
const accessKeyId = "apikey " + apiKey;
/*
   If you are using JWT token use the below instead
   
   const accessKeyId = "bearer " + JWT;
   */

const client = new DynamoDB({
  region,
  endpoint,
  accessKeyId,
  secretAccessKey,
});
```

### Create Table

```js
client
  .createTable({...},(err,data)=>{
    console.log(err,data)
  })
```

### Describe Table

```js
client
  .describeTable({...},(err,data)=>{
    console.log(err,data)
  })
```

### Describe TimeToLive

```js
client
  .describeTimeToLive({...},(err,data)=>{
    console.log(err,data)
  })
```

### List Tables

```js
client.listTables().then((res) => {
  return res.json();
});
```

### Put Item

```js
client
  .putItem({...},(err,data)=>{
    console.log(err,data)
  })
```

### Get Item

```js
client
  .getItem({...},(err,data)=>{
    console.log(err,data)
  })
```

### Delete Item

```js
client
  .deleteItem({...},(err,data)=>{
    console.log(err,data)
  })
```

### Delete Table

```js
client
  .deleteTable({...},(err,data)=>{
    console.log(err,data)
  })
```

### Create Global Table

```js
client
  .createGlobalTable({...},(err,data)=>{
    console.log(err,data)
  })
```

### Describe Global Table

```js
client
  .createGlobalTable({...},(err,data)=>{
    console.log(err,data)
  })
```

### List Global Tables -

```js
client.listGlobalTables({}, (err, data) => {
  console.log(err, data);
});
```

mmDynamo uses DynamoDB low level APIs For more reference read [API Reference.](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Operations_Amazon_DynamoDB.html)
