"use strict";

/*jshint -W098*/

//import * as space from "./lib/space";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["Hello ", "!"], ["Hello ", "!"]);

var _marked = [everySecond].map(regeneratorRuntime.mark);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ackermann(m, n) {
  if (m === 0) {
    return n + 1;
  } else if (m > 0 && n === 0) {
    return ackermann(m - 1, 1);
  } else {
    return ackermann(m - 1, ackermann(m, n - 1));
  }
}

var ackermann3 = function ackermann3(n) {
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
}, {
  id: 56,
  title: "Kopaszkutya",
  year: "1981"
}, {
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

var logger = ["debug", "log", "warn", "error"].reduce(function (logger, level) {
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
  getMaxRange: function getMaxRange() {
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
  return "SO" + SpaceObject.nextId++;
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

var car = function car(name, maxSpeed, tank, fuelConsumption) {
  var power = 0;
  var self = {
    name: name,
    maxSpeed: maxSpeed,
    tank: tank,
    fuelConsumption: fuelConsumption,
    getMaxRange: function getMaxRange() {
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

var registered = function registered(self, registrationNumber) {
  self.registrationNumber = registrationNumber;
  return {
    checkValidity: function checkValidity() {
      console.log(self.registrationNumber + " is valid. Name: " + self.name);
    }
  };
};

var ambulance = function ambulance(registrationNumber) {
  var self = car("Ambulance car", 120, 50, 16);
  Object.assign(self, registered(self, registrationNumber), {
    nino: function nino() {
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

var file = function file() {
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
}();

var ES6 = {};

ES6.Car = function () {
  function Car(name, maxSpeed, power, tank, fuelConsumption) {
    _classCallCheck(this, Car);

    this.name = name;
    this.maxSpeed = maxSpeed;
    this.power = power;
    this.tank = tank;
    this.fuelConsumption = fuelConsumption;
  }

  _createClass(Car, [{
    key: "getMaxRange",
    value: function getMaxRange() {
      return this.tank / this.fuelConsumption * 100;
    }
  }, {
    key: "horsePower",
    get: function get() {
      return this.power / ONE_HP_IN_KW;
    },
    set: function set(hp) {
      this.power = hp * ONE_HP_IN_KW;
    }
  }]);

  return Car;
}();

ES6.Ambulance = function (_ES6$Car) {
  _inherits(Ambulance, _ES6$Car);

  function Ambulance() {
    _classCallCheck(this, Ambulance);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Ambulance).call(this, "Ambulance Car", 100, 60, 70, 12));

    _this.rangeFactor = 0.8;
    return _this;
  }

  _createClass(Ambulance, [{
    key: "getMaxRange",
    value: function getMaxRange() {
      return _get(Object.getPrototypeOf(Ambulance.prototype), "getMaxRange", this).call(this) * this.rangeFactor;
    }
  }], [{
    key: "staticFn",
    value: function staticFn() {
      console.log("Do Ambulance cars really need static members?");
    }
  }]);

  return Ambulance;
}(ES6.Car);

var ECar = function (_Car) {
  _inherits(ECar, _Car);

  function ECar() {
    _classCallCheck(this, ECar);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ECar).call(this, "ECar"));
  }

  return ECar;
}(Car);

function calcGForce() {
  var G = 6.674e-11;
  var sun = {
    m: 1.98855e33
  };

  sun.m += 5e28;

  /*  sun = { //throws error
      m: 1e34
    };*/
}

var funcs = [];

/*jshint -W083*/

var _loop = function _loop(i) {
  funcs.push(function () {
    console.log(i);
  });
};

for (var i = 0; i < 10; i++) {
  _loop(i);
}
/*jshint +W083*/

function printFuncs() {
  funcs.forEach(function (func) {
    func();
  });
}

function upper(strings) {
  for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      values[_key2] = arguments[_key2];
    }

    var result = [strings[0]];
    keys.forEach(function (key, i) {
      result.push(String(values[key]).toUpperCase(), strings[i + 1]);
    });
    return result.join('');
  };
}

var hello = upper(_templateObject, 0);

function makeRequest(url) {
  var timeout = arguments.length <= 1 || arguments[1] === undefined ? 2000 : arguments[1];
  var callback = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

  console.log("url: " + url);
  console.log("timeout: " + timeout);
  console.log("callback: " + callback);
}

function createLogEntry(message) {
  for (var _len3 = arguments.length, objects = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    objects[_key3 - 1] = arguments[_key3];
  }

  var printedObjects = objects.map(function (object) {
    return JSON.stringify(object);
  }).join(",\n");
  return message + "\nAttached objects: " + printedObjects;
}

function createLogEntryA(message) {
  for (var _len4 = arguments.length, objects = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    objects[_key4 - 1] = arguments[_key4];
  }

  var printedObjects = objects.map(function (object) {
    return JSON.stringify(object);
  }).join(",\n");
  return message + "\nAttached objects: " + printedObjects;
}

var sumA = function sumA(num1, num2) {
  return num1 + num2;
};
var doNothing = function doNothing() {};
var getTempItem = function getTempItem(id) {
  return {
    id: id,
    name: "Temp"
  };
};

function sumOneTo(n) {
  if (n === 1) {
    return 1;
  }
  return n + sumOneTo(n - 1);
}

function tailedSumOneTo(n) {
  var sum = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  if (n === 1) {
    return sum + 1;
  }
  return tailedSumOneTo(n - 1, sum + n);
}

var generateId = function () {
  var id = 0;
  return function generateId() {
    return id++;
  };
}();

function createPerson(firstName, lastName) {
  var idField = arguments.length <= 2 || arguments[2] === undefined ? "id" : arguments[2];

  return _defineProperty({
    firstName: firstName,
    lastName: lastName,
    get fullName() {
      return firstName + " " + lastName;
    },
    toString: function toString() {
      return "[Person] " + this.fullName;
    }
  }, idField, generateId());
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

var names = ["firstName", "lastName", "C"];

var firstN = names[0];
var secondN = names[1];
var thirdN = names[2];
var _ref2 = [secondN, firstN];
firstN = _ref2[0];
secondN = _ref2[1];

function setCookie(name, value) {
  var _ref3 = arguments.length <= 2 || arguments[2] === undefined ? {
    path: "/"
  } : arguments[2];

  var secure = _ref3.secure;
  var path = _ref3.path;
  var domain = _ref3.domain;
  var expires = _ref3.expires;

  console.log("path: " + path);
}

var person = {
  name: "SK",
  privateNumber: "XXXXXXX"
};

var privateNumber = Symbol("privateNumber");
person[privateNumber] = "+362065268556";

var sharedPrivateNumber = Symbol.for("privateNumber");
person[sharedPrivateNumber] = "+363000000000";

var spn = Symbol.for("privateNumber");

var onetwo = [1, 2];
var iterator = onetwo[Symbol.iterator]();

function everySecond(items) {
  var i;
  return regeneratorRuntime.wrap(function everySecond$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < items.length)) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return items[i];

        case 4:
          i += 2;
          _context.next = 1;
          break;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

var stepper = function () {
  var items = Symbol("items");
  return function stepper() {
    var initItems = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    var _ref4;

    var step = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
    var skip = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    return _ref4 = {}, _defineProperty(_ref4, items, initItems), _defineProperty(_ref4, "push", function push(item) {
      this[items].push(item);
    }), _defineProperty(_ref4, "step", step), _defineProperty(_ref4, "skip", skip), _defineProperty(_ref4, Symbol.iterator, regeneratorRuntime.mark(function _callee() {
      var _i;

      return regeneratorRuntime.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _i = this.skip;

            case 1:
              if (!(_i < this[items].length)) {
                _context2.next = 7;
                break;
              }

              _context2.next = 4;
              return this[items][_i];

            case 4:
              _i += this.step;
              _context2.next = 1;
              break;

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee, this);
    })), _ref4;
  };
}();

function returnObj() {
  return {
    status: true
  };
}
//# sourceMappingURL=samples.js.map