const getJson = require('get-json');
const fs = require('fs');
const path = require('path');

module.exports = class DownloadJsonPlugin {
  constructor(opts) {
    this.opts = opts;
  }

  apply(compiler) {
    const {path: jsonPath, filename, onBeforeSave = r => r} = this.opts;

    compiler.plugin('run', (compilation, callback) => {
      getJson(jsonPath, (err, res) => {
        if (err) console.err(err);
        const targetPath = path.join(compiler.options.context, filename);
        const json = JSON.stringify(onBeforeSave(res), undefined, '\t');
        fs.writeFile(targetPath, json, () => {
          callback();
        });
      });
    });
  }
};
