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

## Initializing macrometa dynamodb

```js
import Client from "mmdynamo";

const client = new Client({
  agent : "fetch",
  apiKey : "xxxx",
  federationUrl : "http://xxx.xxx.macrometa.io",
  absoluetPath : true // this is an optional parameter to be passed when you want to use the endpoint as it is
});
```

### Create Table

```js
const response = await client.createTable();
console.log(response);
```





### List Tables

```js
const response = await client.listTables();
console.log(response);
```

### Put Item

```js
const response = await client.putItem({...});
console.log(response);
```

### Get Item

```js
const response = await client.getItem({...});
console.log(response);
```

### Delete Item

```js
const response = await client.deleteItem({...});
console.log(response);
```

### Delete Table

```js
const response = await client.deleteTable({...});
console.log(response);
```



For payload reference read [API Reference.](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Operations_Amazon_DynamoDB.html)
