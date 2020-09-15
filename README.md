# mmDynamo

Macrometa DynamoDB client for CloudFlare & Edge Workers.

## Installation

With [npm](http://npmjs.org/) do:

```
npm install mmdynamo
```

Or you can also reference different formats straight from unpkg.com:

[ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import):

https://unpkg.com/mmdynamo@0.1.0/dist/mmdynamo.esm.js

[UMD](https://github.com/umdjs/umd):

https://unpkg.com/mmdynamo@0.1.0/dist/mmdynamo.umd.js

[CommonJS](https://requirejs.org/docs/commonjs.html):

https://unpkg.com/mmdynamo@0.1.0/dist/mmdynamo.cjs.js

## Initializing dynamodb

```js
import { MMDynamo } from "mmdynamo";

const client = new MMDynamo({
  region: "us-east-2",
  accessKeyId: "",
  secretAccessKey: "",
  service: "dynamodb",
  endpoint: "http://dynamodb.us-east-2.amazonaws.com",
});
```

### Create Table

```js
client
  .createTable({...})
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)
  })
```

### Describe Table

```js
client
  .describeTable({...})
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)
  })
```

### Describe TimeToLive

```js
client
  .describeTimeToLive({...})
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)
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
  .putItem({...})
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)
  })
```

### Get Item

```js
client
  .getItem({...})
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)
  })
```

### Delete Item

```js
client
  .deleteItem({...})
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)
  })
```

### Delete Table

```js
client
  .deleteTable({...})
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)
  })
```

### Create Global Table

```js
client
  .createGlobalTable({...})
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)
  })
```

### Describe Global Table

```js
client
  .createGlobalTable({...})
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)
  })
```

### List Global Tables -

```js
client
  .listGlobalTables()
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
```
