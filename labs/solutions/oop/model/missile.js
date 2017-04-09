function Missile(simulation, pos, v, mass) {
  SpaceObject.call(this, pos, v, mass)
  this.simulation = simulation
  this.lifeSteps = 60
}

Missile.prototype = Object.create(SpaceObject.prototype)
Missile.prototype.constructor = Missile

Missile.prototype.oneStep = function() {
  SpaceObject.prototype.oneStep.call(this)
  if (--this.lifeSteps <= 0) {
    this.detonate()
  }
}

Missile.prototype.detonate = function() {
  this.simulation.removeSpaceObject(this)
}