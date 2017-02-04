##How it works

Loads JSON from given URL and saves it locally.

##Usage

```js
const DownloadJsonPlugin = require('download-json-webpack-plugin');
module.exports = {
  plugins: [
    new DownloadJsonPlugin({
      path: '<JSON URL>',
      filename: 'local.json',
      onBeforeSave: (json) => parseJson
    })
  ]
}
```

##Options

* **path** remote URL of the JSON to download
* **filename** filename where loaded JSON will be saved
* **onBeforeSave** optional function that can modify loaded data. It should return object that will be saved.
