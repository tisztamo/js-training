"use strict";

QUnit.test("Module 'increment' should expose the function 'increment()'", function (assert) {
  var inc = require('./increment').increment;
  assert.ok(typeof inc === "function");
});

QUnit.test("'increment() should increment its parameter using the 'math' module", function (assert) {
  var inc = require('./increment').increment;
  var math = require('./math');
  var r = Math.round(Math.random() * 100000);
  assert.ok(inc(r) === r + 1);
  assert.ok(math.getLastResult() === r + 1);
});