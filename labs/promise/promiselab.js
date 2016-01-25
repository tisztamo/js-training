"use strict";

var promiselab = (function promiselab() {
  function loadFile(url) {
    return fetch(url).then(function (response) {
      if (response.status != 200) {
        return Promise.reject("File not found: " + url);
      }
      return response.text();
    });
  }

  function loadFileList(fileList, ignoreErrors) {
  }

  return {
    loadFile: loadFile,
    loadFileList: loadFileList
  };
})();

promiselab.name = "promiselab";