document.addEventListener("DOMContentLoaded", function() {
  template.loadTemplate("video.html", function(templateElement) {
    loadJSON("video.json", function(video) {
      document.body.appendChild(template.render(templateElement, video))
    })
  })
})