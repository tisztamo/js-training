function loadRaw(url, cb) {
  fetch(url).then(function(response) {
    return response.text()
  }).then(cb)
}

function loadRawP(url) {
  return fetch(url).then(function(response) {
    return response.text()
  })
}

function loadWithTransform(url, cb, transformation) {
  transformation = transformation || function id(input) {
    return input
  }
  loadRawP(url).then(transformation).then(cb)
}

function loadJSON(url, cb) {
  loadWithTransform(url, cb, JSON.parse)
}