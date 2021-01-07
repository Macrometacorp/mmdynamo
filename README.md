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
import  Client  from "mmdynamo";

const client = new Client({
  agent: "fetch",
  apiKey: "xxxx",
  federationUrl: "http://xxx.xxx.macrometa.io",
  // this is an optional parameter to be passed when you want to use the endpoint as it is
  absoluetPath:true
});
```

### Initializing macrometa dynamodb

```js
import  Client  from "mmdynamo";

const agent = "fetch";
const federationUrl = "http://xxx.xxx.macrometa.io";
const apiKey = "xxxxxxxxxxxxxxxxxxxxxx";
// this is an optional parameter to be passed when you want to use the endpoint as it is
const absolutePath=true


const client = new Client({
  agent,
  federationUrl,
  apiKey,
  absolutePath,
});
```

### Create Table

```js
      const response = await client.createTable()
      console.log(response)
```





### List Tables

```js
      const response = await client.listTables()
      console.log(response)
```

### Put Item

```js
      const response = await client.putItem({...})
      console.log(response)
```

### Get Item

```js
    const response = await client.getItem({...})
      console.log(response)
```

### Delete Item

```js
    const response = await client.deleteItem({...})
      console.log(response)
```

### Delete Table

```js
    const response = await client.deleteTable({...})
      console.log(response)
```





mmDynamo uses DynamoDB low level APIs For more reference read [API Reference.](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Operations_Amazon_DynamoDB.html)
