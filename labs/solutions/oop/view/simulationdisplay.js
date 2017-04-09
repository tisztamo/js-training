function SimulationDisplay(simulation) {
  this.simulation = simulation
  this.gameArea = document.getElementById("area")
  this.templates = document.getElementsByClassName("templates")[0]
  simulation.display = this
}

SimulationDisplay.prototype.updateSpaceObject = function (spaceObject) {
  var element = document.getElementById(spaceObject.id)
  if (element) {
    element.style.left = spaceObject.pos.x + "px"
    element.style.top = spaceObject.pos.y + "px"
    element.style.transform = "rotate(" + (spaceObject.heading + Math.PI / 2) + "rad)"
  }
}

SimulationDisplay.prototype.createView = function(spaceObject) {
  var templateName = spaceObject.toString().toLowerCase()
  var template = this.templates.getElementsByClassName(templateName)[0]
  if (!template) {
    console.warn("No template found with class " + templateName)
  }
  var element = template.cloneNode(true)
  element.id = spaceObject.id
  this.gameArea.appendChild(element)
}

SimulationDisplay.prototype.removeView = function(spaceObject) {
  var element = document.getElementById(spaceObject.id)
  this.gameArea.removeChild(element)
}
