/*globals promiselab*/
"use strict";

var testDir = "testdata/";

QUnit.test("promiselab.loadFile(url) should return a promise which is fulfilled with the content of the file", function (assert) {
  var done = assert.async();
  promiselab.loadFile(testDir + "1.txt").then(function (result) {
    assert.ok(result === "1");
    done();
  });
});

QUnit.test("promiselab.loadFile(url) should be rejected when the file doesn't exist", function (assert) {
  var done = assert.async();
  promiselab.loadFile("testdata/1X.txt").then(function () {
    assert.ok(false);
    done();
  }, function () {
    assert.ok(true);
    done();
  });
});

function testFileList(assert, files) {
  var done = assert.async();
  promiselab.loadFileList(files).then(function (result) {
    assert.ok(result.length === files.length);
    result.forEach(function (fileContent, idx) {
      assert.ok(fileContent == idx + 1);
    });
    done();
  });
}

QUnit.test("promiselab.loadFileList(list) should return a promise containing the content of the files as array of strings (1 element)", function (assert) {
  var files = ["1.txt"].map(function (file) {
    return testDir + file;
  });
  testFileList(assert, files);
});

QUnit.test("promiselab.loadFileList(list) should return a promise containing the content of the files as array of strings (multiple elements)", function (assert) {
  var files = ["1.txt", "2.txt", "3.txt"].map(function (file) {
    return testDir + file;
  });
  testFileList(assert, files);
});

QUnit.test("promiselab.loadFileList(list) should be rejected if one of the files doesn't exist", function (assert) {
  var files = ["1.txt", "2X.txt", "3.txt"].map(function (file) {
    return testDir + file;
  });
  var done = assert.async();
  promiselab.loadFileList(files).then(function () {
    assert.ok(false);
    done();
  }, function (error) {
    console.log(error);
    assert.ok(true);
    done();
  });
});

QUnit.test("promiselab.loadFileList(list, true) should succeed and provide empty string for missing files", function (assert) {
  var files = ["1.txt", "2X.txt", "3.txt"].map(function (file) {
    return testDir + file;
  });
  var done = assert.async();
  promiselab.loadFileList(files, true).then(function (result) {
    assert.ok(result.join("") === "13");
    done();
  }).catch(function() {
    assert.ok(false);
    done();
  });
});