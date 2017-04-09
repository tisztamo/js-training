function Simulation(fps) {
  this.fps = fps || 20
  this.spaceObjects = []
  this.display = null
}

Simulation.prototype.start = function() {
  setInterval(this.oneStep.bind(this), 1000 / this.fps)
}

Simulation.prototype.addSpaceObjects = function(spaceObjects) {
  spaceObjects.forEach(this.addSpaceObject.bind(this))
}

Simulation.prototype.addSpaceObject = function(spaceObject) {
  this.spaceObjects.push(spaceObject)
  if (this.display) {
    this.display.createView(spaceObject)
  } else {
    console.warn("SpaceObject added before display set")
  }
}

Simulation.prototype.removeSpaceObject = function(spaceObject) {
  var index = this.spaceObjects.indexOf(spaceObject)
  if (index === -1) {
    return
  }
  this.spaceObjects.splice(index, 1)
  if (this.display) {
    this.display.removeView(spaceObject)
  }
}

Simulation.prototype.oneStep = function() {
  for (var i = 0; i < this.spaceObjects.length; i++) {
    for (var j = i + 1; j < this.spaceObjects.length; j++) {
      SpaceObject.actGravityForce(this.spaceObjects[i], this.spaceObjects[j])
    }
    var spaceObject = this.spaceObjects[i]
    spaceObject.oneStep()
    if (this.display) {
      this.display.updateSpaceObject(spaceObject)
    }
  }
}