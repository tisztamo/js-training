var simulation = new Simulation(20)

var star = new Star(new Vector(100,100), new Vector(0,0), 100)
var planet = new Planet(new Vector(200, 100), new Vector(0, 2), 1)
var planet2 = new Planet(new Vector(400, 100), new Vector(-1, 2), 1)
var ship = new SpaceShip(simulation, new Vector(300,500), new Vector(1, 1), 1)

var display = new SimulationDisplay(simulation)
simulation.addSpaceObjects([star, planet, planet2, ship])
simulation.start()
