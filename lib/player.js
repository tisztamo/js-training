"use strict";

(function player() {
  var titleBase = document.title;
  var allowedUrls = new Set(["index.md", "language.md", "browser.md", "process.md", "es6.md"]);

  function slidesUrl() {
    var url = window.location.search.substr(1);
    if (allowedUrls.has(url)) {
      return url;
    }
    if (url) {
      console.error("\"" + url + "\" is not allowed. Add it to the allowedUrls array.");
    }
    return "index.md";
  }

  var url = slidesUrl();
  fetch(url).then(function (response) {
    return response.text();
  }).catch(function (ex) {
    return "Cannot fetch " + url + "! (" + ex.message + ") \n\nfetch is not working on file://";
  }).then(function (body) {
    var slideshow = remark.create({
      source: body,
      highlightLanguage: "javascript"
    });
    document.title = url + " - " + titleBase;
  });
})();
//# sourceMappingURL=player.js.map