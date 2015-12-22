/*globals render*/
"use strict";

QUnit.test("render() should return an element", function (assert) {
  var tagName = "UL";
  var template = document.createElement(tagName);
  var rendered = render(template, {});
  assert.ok(rendered.tagName === tagName);
});