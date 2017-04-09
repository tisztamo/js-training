function Planet(pos, v, mass) {
  SpaceObject.call(this, pos, v, mass)
}

Planet.prototype = Object.create(SpaceObject.prototype)
Planet.prototype.constructor = Planet