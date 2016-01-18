"use strict";

(function main() {
  fetch('language.md').then(function(response) {
    return response.text();
  }).then(function (body) {
    var slideshow = remark.create({
      source: body,
      highlightLanguage: "javascript"
    });
  });
})();
