"use strict";

(function player() {
  const allowedUrls = new Set(["index.md", "language.md", "browser.md", "process.md", "es6.md"]);
  
  function slidesUrl() {
    const url = window.location.search.substr(1);
    if (allowedUrls.has(url)) {
      return url;
    }
    if (url) {
      console.error(`"${url}" is not allowed. Add it to the allowedUrls array.`);
    }
    return "index.md";
  }

  let url = slidesUrl();
  fetch(url).then(response => response.text()).catch(ex => `Cannot fetch ${url}! (${ex.message}) 

fetch is not working on file://`
  ).then(body => {
    const slideshow = remark.create({
      source: body,
      highlightLanguage: "javascript"
    });
    document.title = `${url} - JavaScript training`;
  });
})();