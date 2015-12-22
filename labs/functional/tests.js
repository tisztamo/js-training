/*globals templates*/
"use strict";

(function testRender() {
  QUnit.test("templates.render() should return an element with the same tagName as the template", function (assert) {
    var tagName = "UL";
    var template = document.createElement(tagName);
    var rendered = templates.render(template, {});
    assert.ok(rendered.tagName === tagName);
  });

  QUnit.test("templates.render() should return a new element with a different id", function (assert) {
    var tagName = "UL";
    var template = document.createElement(tagName);
    var rendered = templates.render(template, {});
    assert.ok(rendered.id != template.id);
  });

  function createSimpleTemplate() {
    var template = document.createElement("SPAN");
    template.innerHTML = "<span data-view=\"title\"></span><span data-view=\"year\"></span>";
    return template;
  }

  function createSimpleData() {
    return {
      title: "video1",
      year: 1992
    };
  }

  function createListTemplate() {
    var template = document.createElement("SPAN");
    template.innerHTML = "<ul><li data-viewlist=\"videos\"><span data-view=\"title\"></span><span data-view=\"year\"</span></li></ul>";
    return template;
  }

  function createListData() {
    return {
      videos: [
      createSimpleData(),
        {
          title: "videoX",
          year: 1999
        },
      createSimpleData(),
      createSimpleData()
    ]
    };
  }

  QUnit.test("templates.render() should do simple data binding with [data-view] on the children of the template", function (assert) {
    var template = createSimpleTemplate();
    var data = createSimpleData();
    var rendered = templates.render(template, data);
    assert.ok(rendered.querySelector("[data-view=title]").textContent == data.title);
    assert.ok(rendered.querySelector("[data-view=year]").textContent == data.year);
  });

  QUnit.test("templates.render() should iterate on the array inside data if a [data-list] references it in the template", function (assert) {
    var template = createListTemplate();
    var data = createListData();
    var rendered = templates.render(template, data);
    assert.ok(rendered.querySelectorAll("li").length == data.videos.length);
  });

  QUnit.test("templates.render() should bind data to the iterated list elements", function (assert) {
    var template = createListTemplate();
    var data = createListData();
    var rendered = templates.render(template, data);
    data.videos.forEach(function (video, idx) {
      assert.ok(rendered.querySelectorAll("li")[idx].querySelector("[data-view=title]").textContent == video.title);
    });
  });

})();