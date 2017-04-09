function SpaceShip(simulation, pos, v, mass) {
  SpaceObject.call(this, pos, v, mass)
  this.simulation = simulation
  this.angularSpeed = 0.0
  this.engineRunning = false
  document.addEventListener("keydown", this.keydownHandler.bind(this))
  document.addEventListener("keyup", this.keyupHandler.bind(this))
}

SpaceShip.prototype = Object.create(SpaceObject.prototype)
SpaceShip.prototype.constructor = SpaceShip

SpaceShip.prototype.keydownHandler = function(event) {
  if (event.code === "ArrowLeft") {
    this.angularSpeed = -0.1
  } else if (event.code === "ArrowRight") {
    this.angularSpeed = 0.1
  } else if (event.code === "ArrowUp") {
    this.engineRunning = true
  } else if (event.code === "Space") {
    this.launchMissile()
  }
}

SpaceShip.prototype.keyupHandler = function(event) {
  if (event.code === "ArrowLeft") {
    this.angularSpeed = 0
  } else if (event.code === "ArrowRight") {
    this.angularSpeed = 0
  }
  if (event.code === "ArrowUp") {
    this.engineRunning = false
  }
}

SpaceShip.prototype.oneStep = function() {
  if (this.engineRunning) {
    this.stepForce.add(Vector.createFromPolar(this.heading, 0.15))
  }
  SpaceObject.prototype.oneStep.call(this)
}

SpaceShip.prototype.launchMissile = function() {
  var velocity = Vector.createFromPolar(this.heading, 3)
  var missile = new Missile(this.simulation, this.pos.clone(), velocity, 0.01)
  this.simulation.addSpaceObject(missile)
}