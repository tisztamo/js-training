"use strict";

var templates = (function templates() {
  function render(templateElement, data) {
    var rendered = renderObject(templateElement, data);
    var renderedLists = renderLists(rendered, data);
    replaceListTemplatesWithRenderedLists(rendered, renderedLists);
    return rendered;
  }

  function renderLists(templateElement, data) {
    var viewLists = Array.from(templateElement.querySelectorAll("[data-viewlist]"));
    var renderedLists = viewLists.filter(function (viewList) {
      return isDirectViewListChild(templateElement, viewList);
    }).map(function (template) {
      var renderedList = renderList(template, data[template.dataset.viewlist]);
      renderedList.template = template;
      return renderedList;
    });
    return renderedLists;
  }

  function replaceListTemplatesWithRenderedLists(template, renderedLists) {
    renderedLists.forEach(function (renderedList) {
      var template = renderedList.template;
      var parent = template.parentNode;
      renderedList.forEach(function (renderedObject) {
        parent.insertBefore(renderedObject, template);
      });
      parent.removeChild(template);
    });
  }

  function isDirectViewListChild(parent, child) {
    while (child.parentNode && child.parentNode !== parent) {
      child = child.parentNode;
      if (child.dataset.viewlist) {
        return false;
      }
    }
    return true;
  }

  function renderList(templateElement, dataList) {
    return dataList.map(function (dataElement) {
      return render(templateElement, dataElement);
    });
  }

  function renderObject(templateElement, data) {
    var rendered = templateElement.cloneNode(true);
    rendered.id = generateID();
    rendered = bindData(rendered, data);
    return rendered;
  }

  function generateID() {
    return "id" + Math.floor(Math.random() * 100000);
  }

  function bindData(element, data) {
    var viewFields = Array.from(element.querySelectorAll("[data-view]"));
    viewFields.forEach(function (viewField) {
      var fieldName = viewField.dataset.view;
      viewField.innerText = data[fieldName];
    });
    return element;
  }
  return {
    render: render
  };
})();

templates.name = "templates";