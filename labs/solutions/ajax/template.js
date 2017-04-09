var template = (function () {
  function loadTemplate(url, cb) {
    loadWithTransform(url, cb, function transform(data) {
      var template = document.createElement("span")
      template.innerHTML = data
      return template
    })
  }

  function render(template, data) {
    var fields = template.querySelectorAll("[data-view]")
    for (var i = 0; i < fields.length; ++i) {
      fields[i].textContent = data[fields[i].dataset.view]
    }
    return template
  }

  return {
    render: render,
    loadTemplate: loadTemplate
  }
})()