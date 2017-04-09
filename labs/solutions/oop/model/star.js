function Star(pos, v, mass) {
  SpaceObject.call(this, pos, v, mass)
}

Star.prototype = Object.create(SpaceObject.prototype)
Star.prototype.constructor = Star

Star.prototype.oneStep = function() {
}
