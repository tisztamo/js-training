/*globals render*/
"use strict";

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