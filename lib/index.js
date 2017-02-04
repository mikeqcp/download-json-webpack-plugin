'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getJson = require('get-json');
var fs = require('fs');
var path = require('path');

module.exports = function () {
  function DownloadJsonPlugin(opts) {
    _classCallCheck(this, DownloadJsonPlugin);

    this.opts = opts;
  }

  _createClass(DownloadJsonPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _opts = this.opts,
          jsonPath = _opts.path,
          filename = _opts.filename,
          _opts$onBeforeSave = _opts.onBeforeSave,
          onBeforeSave = _opts$onBeforeSave === undefined ? function (r) {
        return r;
      } : _opts$onBeforeSave;


      compiler.plugin('run', function (compilation, callback) {
        getJson(jsonPath, function (err, res) {
          if (err) console.err(err);
          var targetPath = path.join(compiler.options.context, filename);
          var json = JSON.stringify(onBeforeSave(res), undefined, '\t');
          fs.writeFile(targetPath, json, function () {
            callback();
          });
        });
      });
    }
  }]);

  return DownloadJsonPlugin;
}();
