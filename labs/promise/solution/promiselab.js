/*globals Promise*/
"use strict";

var promiselab = (function promiselab() {
  function loadFile(url) {
    return fetch(url).then(function (response) {
      if (response.status != 200) {
        return Promise.reject("File not found: " + url);
      }
      return response.text();
    }).then(function (text) {
      return text;
    });
  }

  function loadFileList(fileList, ignoreErrors) {
    return Promise.all(fileList.map(function (fileName) {
      var load = loadFile(fileName);
      if (ignoreErrors) {
        load = load.catch(function (reason) {
          console.log("Ignoring error: " + reason);
          return Promise.resolve("");
        });
      }
      return load;
    }));
  }

  return {
    loadFile: loadFile,
    loadFileList: loadFileList
  };
})();

promiselab.name = "promiselab";