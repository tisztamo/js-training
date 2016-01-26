"use strict";

/*jshint -W098*/

//import * as space from "./lib/space";

function ackermann(m, n) {
  if (m === 0) {
    return n + 1;
  } else if (m > 0 && n === 0) {
    return ackermann(m - 1, 1);
  } else {
    return ackermann(m - 1, ackermann(m, n - 1));
  }
}

var ackermann3 = function (n) {
  return ackermann(3, n);
};

function ackermannX(m) {
  return function (n) {
    return ackermann(m, n);
  };
}

function sum() {
  var length = arguments.length;
  var retval = 0;
  for (var i = 0; i < length; ++i) {
    retval += arguments[i];
  }
  return retval;
}


function hoister() {
  console.log("x is " + x);
  x = -1;
  console.log("x is " + x);
  for (var i = 0; i < 3; ++i) {
    var x = i;
    console.log("x is now " + x);
  }
  console.log("window.x is " + window.x);
}

function createFormatter(template) {
  return function formatter() {
    var i = arguments.length;
    var formatted = template;
    while (i >= 0) {
      formatted = formatted.replace("%" + (i + 1), arguments[i]);
      i--;
    }
    return formatted;
  };
}

function createLogger(template, targetElement) {
  var formatter = createFormatter(template);
  return function logger() {
    var logEntry = document.createElement("div");
    logEntry.textContent = formatter.apply(this, arguments);
    targetElement.appendChild(logEntry);
  };
}

var videos = [{
    id: 1,
    title: "Armageddon",
    year: "1998"
  },
  {
    id: 56,
    title: "Kopaszkutya",
    year: "1981"
  },
  {
    id: 281,
    title: "A mindenség elmélete",
    year: "2014"
  }];

var ids = videos.map(function (video) {
  return video.id;
});

var projected = videos.map(function (video) {
  return {
    id: video.id,
    title: video.title
  };
});

function Video() {}

var typedVideos = videos.map(function (video) {
  return new Video(video);
});

var twentiestCenturyVideos = videos.filter(function (video) {
  return Number(video.year) <= 2000;
});

function createFormatter2(template) {
  return function formatter() {
    var formatted = template;
    Array.from(arguments).forEach(function (arg, idx) {
      formatted = formatted.replace("%" + (idx + 1), arg);
    });
    return formatted;
  };
}

var ratings = [2, 3, 1, 4, 5];

function createFormatter3(template) {
  return function formatter() {
    return Array.from(arguments).reduce(function (formatted, arg, idx) {
      return formatted.replace("%" + (idx + 1), arg);
    }, template);
  };
}


var logger = ["debug", "log", "warn", "error"].reduce(
  function (logger, level) {
    logger[level] = createLogger(level + ": %1", document.body, level);
    return logger;
  }, {});

var set = new Set();
set.add(5);
set.add("5");
set.add(5); // duplicate, ignored


var ONE_HP_IN_KW = 0.745699872;
var aCar = {
  name: "Trabant 601",
  maxSpeed: 100,
  fuelConsumption: 7,
  tank: 24,
  power: 26,
  weight: 600,
  getMaxRange: function () {
    return this.tank / this.fuelConsumption * 100;
  },
  get horsePower() {
    return this.power / ONE_HP_IN_KW;
  },
  set horsePower(hp) {
    this.power = hp * ONE_HP_IN_KW;
  }
};

var porsche = Object.create(aCar);
porsche.name = "Porsche 911 GT3";
porsche.power = 368;
porsche.weight = 1360;
porsche.fuelConsumption = 28;
porsche.tank = 120;

function Car(name, maxSpeed, tank, fuelConsumption) {
  this.name = name;
  this.maxSpeed = maxSpeed;
  this.tank = tank;
  this.fuelConsumption = fuelConsumption;
}

var subaru = new Car("Subaru WRX STI", 255);

Car.prototype.getMaxRange = function () {
  return this.tank / this.fuelConsumption * 100;
};

var lancer = new Car("Mitsubishi Lancer Evolution X", 260, 55, 14);

function Ambulance() {
  Car.call(this, "Ambulance Car", 100, 70, 12);
}

Ambulance.prototype = Object.create(Car.prototype);
Ambulance.prototype.constructor = Ambulance;

var ambulance = new Ambulance();

function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.createFromPolar = function (angle, length) {
  return new Vector(length * Math.cos(angle), length * Math.sin(angle));
};

Vector.prototype.add = function (another) {
  this.x += another.x;
  this.y += another.y;
  return this;
};

Vector.prototype.multiply = function (scalar) {
  this.x *= scalar;
  this.y *= scalar;
  return this;
};

Vector.prototype.distanceFrom = function (another) {
  var xDiff = another.x - this.x,
    yDiff = another.y - this.y;
  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
};

Vector.prototype.length = function () {
  return this.distanceFrom(Vector.zero);
};

Vector.prototype.substractToNew = function (another) {
  return new Vector(this.x - another.x, this.y - another.y);
};

Vector.prototype.toUnitVector = function () {
  return this.multiply(1 / this.length());
};

Vector.prototype.toString = function () {
  return "(" + this.x + ", " + this.y + ")";
};

Vector.prototype.clone = function () {
  return new Vector(this.x, this.y);
};

Vector.zero = new Vector(0, 0);

function SpaceObject(pos, v, mass) {
  this.pos = pos;
  this.v = v;
  this.mass = mass || 1;
  this.stepForce = new Vector(0, 0);
  this.id = SpaceObject.getNextId();
}

SpaceObject.G = 50;

SpaceObject.prototype.permeable = false;

SpaceObject.nextId = 1;

SpaceObject.getNextId = function () {
  return "SO" + (SpaceObject.nextId++);
};

SpaceObject.prototype.oneStep = function () {
  this.v.add(this.stepForce.multiply(1 / this.mass));
  this.pos.add(this.v);
  this.heading += this.angularSpeed;
  this.stepForce = new Vector(0, 0);
};

function Detonation(pos, v) {
  SpaceObject.call(this, pos, v, -0.15);
  this.permeable = true;
  this.lifeSteps = 100;
}

Detonation.prototype = Object.create(SpaceObject.prototype);
Detonation.prototype.constructor = Detonation;

Detonation.prototype.oneStep = function () {
  this.stepForce = Vector.zero.clone();
  SpaceObject.prototype.oneStep.call(this);
  if (--this.lifeSteps <= 0) {
    this.die();
  }
};

function ThisTest(id) {
  console.log("ThisTest: " + JSON.stringify(this));
  this.id = id;
}

ThisTest.prototype.test = function (arg1, arg2) {
  console.log("test: " + JSON.stringify(this) + " arg1: " + arg1 + ", arg2: " + arg2);
};

function listOwnProperties(obj) {
  var retval = [];
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      retval.push(prop);
    }
  }
  return retval;
}


var car = function (name, maxSpeed, tank, fuelConsumption) {
  var power = 0;
  var self = {
    name: name,
    maxSpeed: maxSpeed,
    tank: tank,
    fuelConsumption: fuelConsumption,
    getMaxRange: function () {
      return self.tank / self.fuelConsumption * 100;
    },
    get horsePower() {
      return power / ONE_HP_IN_KW;
    },
    set horsePower(hp) {
      power = hp * ONE_HP_IN_KW;
    }
  };
  return self;
};

var registered = function (self, registrationNumber) {
  self.registrationNumber = registrationNumber;
  return {
    checkValidity: function () {
      console.log(self.registrationNumber + " is valid. Name: " + self.name);
    }
  };
};

var ambulance = function ambulance(registrationNumber) {
  var self = car("Ambulance car", 120, 50, 16);
  Object.assign(self,
    registered(self, registrationNumber), {
      nino: function () {
        console.log("Nino: " + self.name);
      }
    });
  return self;
};

function CustomError(message, somethingElse) {
  var error = Error.call(this, message);

  this.name = this.constructor.name;
  this.message = error.message;
  this.stack = error.stack;
  this.customProperty = somethingElse;
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

var file = (function file() {
  //private
  function normalize(url) {
    console.log("In normalize, url: " + url);
  }

  function loadFile(url, cb) {
    console.log("In loadFile");
    var normalizedUrl = normalize(url);
  }

  //exports
  return {
    loadFile: loadFile
  };
})();

var ES6 = {};

ES6.Car = class Car {
  constructor(name, maxSpeed, power, tank, fuelConsumption) {
    this.name = name;
    this.maxSpeed = maxSpeed;
    this.power = power;
    this.tank = tank;
    this.fuelConsumption = fuelConsumption;
  }

  getMaxRange() {
    return this.tank / this.fuelConsumption * 100;
  }

  get horsePower() {
    return this.power / ONE_HP_IN_KW;
  }

  set horsePower(hp) {
    this.power = hp * ONE_HP_IN_KW;
  }
};

ES6.Ambulance = class Ambulance extends ES6.Car {
  constructor() {
    super("Ambulance Car", 100, 60, 70, 12);
    this.rangeFactor = 0.8;
  }

  getMaxRange() {
    return super.getMaxRange() * this.rangeFactor;
  }

  static staticFn() {
    console.log("Do Ambulance cars really need static members?");
  }
};

class ECar extends Car {
  constructor() {
    super("ECar");
  }
}

function calcGForce() {
  const G = 6.674e-11;
  const sun = {
    m: 1.98855e33
  };

  sun.m += 5e28;

  /*  sun = { //throws error
      m: 1e34
    };*/
}

var funcs = [];

/*jshint -W083*/
for (let i = 0; i < 10; i++) {
  funcs.push(function () {
    console.log(i);
  });
}
/*jshint +W083*/


function printFuncs() {
  funcs.forEach(function (func) {
    func();
  });
}

function upper(strings, ...keys) {
  return (function (...values) {
    var result = [strings[0]];
    keys.forEach(function (key, i) {
      result.push(String(values[key]).toUpperCase(), strings[i + 1]);
    });
    return result.join('');
  });
}

var hello = upper `Hello ${0}!`;

function makeRequest(url, timeout = 2000, callback = undefined) {
  console.log("url: " + url);
  console.log("timeout: " + timeout);
  console.log("callback: " + callback);
}

function createLogEntry(message, ...objects) {
  const printedObjects = objects.map(function (object) {
    return JSON.stringify(object);
  }).join(",\n");
  return `${message}\nAttached objects: ${printedObjects}`;
}


function createLogEntryA(message, ...objects) {
  const printedObjects = objects.map(object => JSON.stringify(object)).join(",\n");
  return `${message}\nAttached objects: ${printedObjects}`;
}

const sumA = (num1, num2) => {
  return num1 + num2;
};
const doNothing = () => {};
const getTempItem = id => ({
  id: id,
  name: "Temp"
});


function sumOneTo(n) {
  if (n === 1) {
    return 1;
  }
  return n + sumOneTo(n - 1);
}

function tailedSumOneTo(n, sum = 0) {
  if (n === 1) {
    return sum + 1;
  }
  return tailedSumOneTo(n - 1, sum + n);
}

const generateId = (() => {
  let id = 0;
  return function generateId() {
    return id++;
  };
})();

function createPerson(firstName, lastName, idField = "id") {
  return {
    firstName,
    lastName,
    get fullName() {
        return `${firstName} ${lastName}`;
      },
      toString() {
        return `[Person] ${this.fullName}`;
      }, [idField]: generateId()
  };
}

/*let {
  firstName, lastName
} = createPerson("S", "K");
const {
  firstName: fn,
  lastName: ln
} = createPerson("Sch", "K");
({
  firstName, lastName
} = createPerson("A", "B"));*/

let names = ["firstName", "lastName", "C"];

let [firstN, secondN] = names;

let [, , thirdN] = names;

[firstN, secondN] = [secondN, firstN];


function setCookie(name, value, {
  secure, path, domain, expires
} = {
  path: "/"
}) {
  console.log("path: " + path);
}


const person = {
  name: "SK",
  privateNumber: "XXXXXXX"
};

const privateNumber = Symbol("privateNumber");
person[privateNumber] = "+362065268556";


const sharedPrivateNumber = Symbol.for("privateNumber");
person[sharedPrivateNumber] = "+363000000000";

const spn = Symbol.for("privateNumber");

let onetwo = [1, 2];
let iterator = onetwo[Symbol.iterator]();

function* everySecond(items) {
  for (let i = 0; i < items.length; i += 2) {
    yield items[i];
  }
}

const stepper = (() => {
  const items = Symbol("items");
  return function stepper(initItems = [], step = 1, skip = 0) {
    return {
      [items]: initItems,
      push(item) {
          this[items].push(item);
        },
        step,
        skip, * [Symbol.iterator]() {
          for (let i = this.skip; i < this[items].length; i += this.step) {
            yield this[items][i];
          }
        }
    };
  };
})();

function returnObj() {
  return {
    status: true
  };
}