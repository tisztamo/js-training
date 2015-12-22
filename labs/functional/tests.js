/*globals render*/
"use strict";

(function testRender() {
  QUnit.test("render() should return an element with the same tagName as the template", function (assert) {
    var tagName = "UL";
    var template = document.createElement(tagName);
    var rendered = render(template, {});
    assert.ok(rendered.tagName === tagName);
  });

  QUnit.test("render() should return a new element with a different id", function (assert) {
    var tagName = "UL";
    var template = document.createElement(tagName);
    var rendered = render(template, {});
    assert.ok(rendered.id != template.id);
  });

  function createSimpleTemplate() {
    var template = document.createElement("SPAN");
    template.innerHTML = "<span data-view=\"title\"></span>";
    return template;
  }
  
  function createSimpleData() {
    return {
      title: "video1"
    };
  }

  QUnit.test("render() should do simple data binding with [data-view] on the children of the template", function (assert) {
    var template = createSimpleTemplate();
    var data = createSimpleData();
    var rendered = render(template, data);
    assert.ok(rendered.querySelector("[data-view=title]").textContent == data.title);
  });

})();