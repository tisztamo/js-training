"use strict";


function render(templateElement) {
  var rendered = templateElement.cloneNode(true);
  rendered.id = generateID();
  return rendered;
}

function generateID() {
  return "id" + Math.floor(Math.random() * 100000);
}