class: center, middle

# JavaScript: The Language

---

# Why, My God, Why?

```
/*
	Usage: set the javaScript variables endDate,
  countDownId, countDownTimeFormat,
  function timeIsUpFunction() and include this js
*/

function displayTimeLeft() {
	now = new Date();    
    var mSecs = endDate - now;
	if (mSecs >= 0) {    
.
.
.
    setTimeout("displayTimeLeft()", 990);
	} else {        
		timeIsUpFunction();
		return true;
	}
}

displayTimeLeft();
```

.attribution[https://direktnet.raiffeisen.hu/direktnet/js/countDown.js]

---
name: agenda
class: hiddenlinks

# Agenda

0. [Some History](#history)
1. [Functions](#functions)
1. [Collections](#collections)
1. [Modules](#modules)
1. [Objects & OOP](#oop)
1. [A few operators](#operators)
1. [Error handling](#errorhandling)
1. [Promises](#promises)
1. [Strict mode](#strictmode)
1. [The bad parts](#badparts)

---
name: history
class: center, middle

# The Brief History of JavaScript

---
class: center, middle

JavaScript was created in 10 days in May 1995 by Brendan Eich (Netscape)

---
name: functions
class: center, middle

# Functions

---

# Function declaration

```
function ackermann(m, n) {
  if (m === 0) {
    return n + 1;
  } else if (m > 0 && n === 0) {
    return ackermann(m - 1, 1);
  } else {
    return ackermann(m - 1, ackermann(m, n - 1));
  }
}
```

![ackermann output](img/ackermann.png "ackermann output")

---

# Arguments

```
function sum() {
  var length = arguments.length;
  var retval = 0;
  for (var i = 0; i < length; ++i) {
    retval += arguments[i];
  }
  return retval;
}
```

![arguments](img/arguments.png "sum output")

.note[Note: arguments is an array-like object, not a real array. You should not call slice() on it. [more info](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)]

---
# No block scope: variable hoisting

```
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
```

Will it run?

What's the output?
---

# Anonymous function stored in a variable

```
var ackermann3 = function (n) {
  return ackermann(3, n);
};
```
![ackermann3 output](img/ackermann3.png "ackermann3 output")

---

# Returning a function / closures I.

```
function ackermannX(m) {
  return function (n) {
    return ackermann(m, n);
  };
}
```
![ackermannx output](img/ackermannx.png "ackermannx output")

---

# Closures II.

```
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
```

.smallab[Create a warn logger which logs to .remark-help-content with orange color!]

---

# Closures in loops - this will not work
```
function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help);
    }
  }
}
```
The variable *i* is shared between the event handlers. [jsfiddle](https://jsfiddle.net/v7gjv/light/)

To fix, separate the binding into a function to have a new closure. [fixed](https://jsfiddle.net/v7gjv/1/light/)

.attribution[Sample from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)]

---
# Callbacks

Closures can be used to store state during asynchronous operations.

```
function loadSlides(url, cb) {
  $.get(url, function(data) {
    var slides = parseSlides(data);
    slides.sourceUrl = url;
    cb(slides);
  });
}
```

.note[To preserve consistent running order, do not mix synchronous and asynchronous calls to `cb`. Use `setImmediate` if needed.]

---
name: collections
class: center, middle

# Collections

---
# every(), some(), forEach()

```
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough);   // false
[12, 54, 18, 130, 44].every(isBigEnough); // true

[12, 5, 8, 130, 44].some(isBigEnough); // true
```

```
function log(val) {
  console.log(val)
}
[12, 5, 8, 130, 44].forEach(log);
```

There is no way to break `forEach`, you can use `every` or `some` instead.

---

# Array.map() I.

```
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
```

![roots output](img/map1.png "roots output")

.smallab[Create an array of loggers for the levels "debug", "log", "warn" and "error", without writing more than 3 parentheses! Example: ]

```
log[0]("Now we understand closures.");

log[3]("Critical error");
```


---
# Array.map() II.

```
var videos = [{id: 1, title: "Armageddon", year: "1998"},
              {id: 56, title: "Kopaszkutya", year: "1981"},
              {id: 281, title: "A mindenség elmélete", year: "2014"}];
              
var ids = videos.map(function (video) {
  return video.id;
});

var projected = videos.map(function (video) {
  return {
    id: video.id,
    title: video.title
  };
});

var typedVideos = videos.map(function (video) {
  return new Video(video);
});
```

.right[[workshop at reactivex.io](http://reactivex.io/learnrx/)]
---

# Array.filter()

```
var twentiestCenturyVideos = videos.filter(function (video) {
  return Number(video.year) <= 2000;
});
```
![roots output](img/filter.png "roots output")

---

# Array.from()

`arguments` is not a real Array.

```
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

function createFormatter2(template) {
  return function formatter() {
    var formatted = template;
    Array.from(arguments).forEach(function (arg, idx) {
      formatted = formatted.replace("%" + (idx + 1), arg);
    });
    return formatted;
  };
}
```
---

# Array.reduce()

`arr.reduce(callback[, initialValue])`

Parameters

`callback`: Accumulator function to execute on each value in the array:

- `previousValue`:
      The value previously returned in the last invocation of the callback, or initialValue, if supplied.
- `currentValue`:
    The current element being processed.
- `currentIndex`:
    The index of the current element being processed.
- `array`:
    The array reduce was called upon.


```
	var ratings = [2,3,1,4,5];
	return ratings.reduce(Math.max);
```

```
function createFormatter3(template) {
  return function formatter() {
    return Array.from(arguments).reduce(function (formatted, arg, idx) {
      return formatted.replace("%" + (idx + 1), arg);
    }, template);
  };
}
```

---
# Small Lab

```
var logger = ["debug", "log", "warn", "error"]...
```

![logger](img/logger.png "logger")
![loggeroutput](img/loggeroutput.png "loggeroutput")

---

# Typed arrays I.: architecture

![typed arrays](img/typed_arrays.png "Typed Arrays")


---

# Typed arrays II.: example

```
MandelWorker.prototype.calculate = function () {
  var buf = new ArrayBuffer(4 * this.width * this.height);
  var pix = new Uint8ClampedArray(buf);
  for (var ix = 0; ix < this.width; ++ix)
    for (var iy = 0; iy < this.height; ++iy) {
      var ppos = 4 * (this.width * iy + ix);
      ...
      pix[ppos] = 255;
      pix[ppos + 1] = 255 * (c - 1);
      pix[ppos + 2] = 0;
      ...
    };
  return pix;
};
```

---

# Set

```
var set = new Set();
set.add(5);
set.add("5");
set.add(5); // duplicate, ignored

set.size; // 2

console.log(set.has(5));    // true
console.log(set.has(6));    // false

set.delete(5);
set.size; // 1

var setFromArray = new Set([1, 5, 1, 6, 5, 9]);
setFromArray.size; // 4
```

ES6, but polyfills available
---

# Map

```
var map = new Map([["title", "Understanding ECMAScript 6"],
                 ["url", "https://leanpub.com/understandinges6/read"]]);

map.has("title"); // true
map.get("title"); // "Understanding ECMAScript 6"

map.forEach(function (value, key, ownerMap) {
  console.log(key + ": " + value);
});

map.delete("title");
map.size; // 1
```

- Key can be anything

---

# WeakSet, WeakMap

- Store object references only.
- Allows garbage collection.
- Entry will be deleted automatically if no strong reference remains to key.
- No `forEach()`, `size`, `clear()`.
- Associating data with DOM objects, caching, storing private data, etc.

ES6!

---
name: modules
class: center, middle

# Modules in ECMAScript 5

---
# The 'jQuery' Module pattern

```
var file = (function file() {
  //private
  function normalize(url) {
  ...
  }

  function loadFile(url, cb) {
    var normalizedUrl = normalize(url);
    ...
  }

  //exports
  return { 
    loadFile: loadFile
  };
})();
```

.note[State and private functions are hiddenly stored in a closure.]

---
# Module pattern variant: locally scoped object

```
var file = (function file() {
  var exports = {};
  
  //private
  function normalize(url) {
  ...
  }

  exports.loadFile = function loadFile (url, cb) {
    var normalizedUrl = normalize(url);
    ...
  }

  return exports;
})();
```

---
# AMD - Asynchronous Module Definition

```
define("file", 
  ["storage", "stream"], 
  function (storage, stream) {
    function normalize(url) {
      ...
    }

    var file = {
      loadFile: function() {
        var normalizedUrl = normalize(url);
        ...
      }
    }

    return file;
});
```

```
require(["file", "stream"], function (file, stream) {
  file.loadFile(...);
});
```

.attribution[https://addyosmani.com/writing-modular-js/]

---
# CommonJS

```
var storage = require("packages/storage");
var stream = require("packages/stream");

function normalize(url) {
  ...
}

function loadFile(){
  var normalizedUrl = normalize(url);
  ...
}

exports.loadFile = loadFile;
```

```
var file = require("./file");
```

.note[Cleaner approach, but needs some (server-side) transformation to be usable in the browser.]

---
name: functionallab
class: center, middle

# Lab: Functional programming

---
name: oop
class: center, middle

# Objects & OOP

---

# Object Initialization

```
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
```

---
# for..in loop basics

```
for (var prop in aCar) {
  console.log("aCar." + prop + " = " + aCar[prop]);
}
```

![forin](img/forin.png "forin")

- Do not depend on the order, arbitrary and may change after `delete`!
- Do not use it on Arrays!

---
# Prototypes, Object.create()

```
var porsche = Object.create(aCar);
porsche.name = "Porsche 911 GT3";
porsche.power = 368;
porsche.weight = 1360;
porsche.fuelConsumption = 28;
porsche.tank = 120;
```
![porsche](img/porsche.png "Porsche")

---
# for..in loop II.

![forin2](img/forin2.png "forin2")

- Iterates over enumerable properties
- `maxSpeed` is coming from the prototype chain
- Built-in properties of `Object` are not enumerable
- You can assign non-enumerable properties with `Object.defineProperty()`

---
# Object.keys()

![objectkeys](img/objectkeys.png "objectkeys")

- Lists own enumerable properties, excluding the ones in the prototype chain

Since JavaScript 1.8.5. A naive shim:

```
function listOwnProperties (obj) {
  var retval = [];
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      retval.push(prop);
    }
  }
  return retval;
}
```

In library code (still) recommended to use `hasOwnProperty` inside `for..in` loops. 
---
# delete and the prototype chain

![delete](img/delete.png "delete")

---
# Contructor function, new operator

```
function Car(name, maxSpeed, tank, fuelConsumption) {
  this.name = name;
  this.maxSpeed = maxSpeed;
  this.tank = tank;
  this.fuelConsumption = fuelConsumption;
}

var subaru = new Car("Subaru WRX STI", 255);
```

![subaru](img/subaru.png "subaru")

.note[If the constructor returns an object, that one will be the created object instead of `this`]

---

# Constructor with prototype

```
Car.prototype.getMaxRange = function () {
  return this.tank / this.fuelConsumption * 100;
}

var lancer = new Car("Mitsubishi Lancer Evolution X", 260, 55, 14);
```

![lancer](img/lancer.png "lancer")

---

# Inheritance using a constructor

```
function Ambulance() {
  Car.call(this, "Ambulance Car", 100, 70, 12);
}

Ambulance.prototype = Object.create(Car.prototype);// pre ES5: new Car();
Ambulance.prototype.constructor = Ambulance;

var ambulance = new Ambulance();
```

![ambulance](img/ambulance.png "ambulance")

---

# A full example I/II.

```
function SpaceObject(pos, v, mass) {
  this.pos = pos;
  this.v = v;
  this.mass = mass || 1;
  this.stepForce = new Vector(0, 0);
  this.id = SpaceObject.getNextId();
}

/** Gravitational constant */
SpaceObject.G = 50;

/** Permeable objects are not involved in collision-like events */
SpaceObject.prototype.permeable = false;

/* @private */
SpaceObject.nextId = 1;

/* @private */
SpaceObject.getNextId = function () {
  return "SO" + (SpaceObject.nextId++);
};
```

---

# A full example II/II.

```
SpaceObject.prototype.oneStep = function () {
  this.v.add(this.stepForce.multiply(1 / this.mass));
  this.pos.add(this.v);
  this.heading += this.angularSpeed;
  this.stepForce = new Vector(0, 0);
};
```
```
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
```
---
# this I.

```
function ThisTest(id) {
  console.log("ThisTest: " + JSON.stringify(this));
  this.id = id;
}

ThisTest.prototype.test = function(arg1, arg2) {
  console.log("test: " + JSON.stringify(this) + " arg1: " +
                         arg1 + ", arg2: " + arg2);  
};
```

---
# this II.

![this](img/this.png "this")

---

# call, bind, apply

![bind](img/bind.png "bind")

---

# Using bind

![bind2](img/bind2.png "bind2")

---

# OOP principles and JavaScript

- Encapsulation
  - In the "bundling data and operations" meaning with classes
  - Hiding possible with closures
- Abstraction
  - Possible using base classes
- Inheritance
  - Using the prototype chain
- Polymorphism
  - Flexible

# +

- Composition, mixins
  - *.extend(), Object.assign, etc.
  
"Favor 'object composition' over 'class inheritance'." (GoF)

---
# Factory functions I.

Reasons:

- `new` creates tight coupling
- `this` doesn not work correctly in JavaScript
- Hard to have private data and object composition with classes

---

# Factory functions II.

```
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
```

---

# Compositional Inheritance & Mixins

```
var registered = function (self, registrationNumber) {
  self.registrationNumber = registrationNumber;
  return {
    checkValidity: function () {
      console.log(self.registrationNumber +
                                  " is valid. Name: " + self.name);
    }
  };
};
```

```
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
```

---
class: center, middle

# Lab: OOP

---
name: operators
class: center, middle

# A few operators

---
# typeof operator

![typeof](img/typeof.png "typeof")

Usable only for "primary" data types and for `undefined` checking

---
# instanceof operator

![instanceof](img/instanceof.png "instanceof")

![instanceof2](img/instanceof2.png "instanceof2")

- Does not work across iframes!

---
# in operator

- Returns `true` if and only if the property name is enumerated in `for..in` loops
- Includes the prototype

![in](img/in.png "in")

---
name: errorhandling
class: center, middle

# Error Handling

---
# try, catch, throw, finally basics

![try2](img/try2.png "try2")

![try](img/try.png "try")

---
# Custom Errors

Possible to subclass Error and check it with `instanceof` in `catch`. 

```
try {
  throw new CustomError("custom");
} catch (e) {
  if (e instanceof CustomError) {
    console.warn("CustomError", e);
  } else {
    console.warn("Unknown Error", e);
  }
}
```

---
# Custom Error implementation

To have correct stack trace in every browser, you need some trickery:

```
function CustomError(message, somethingElse) {
  var error = Error.call(this, message);

  this.name = this.constructor.name;
  this.message = error.message;
  this.stack = error.stack;
  
  this.customProperty = somethingElse;
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;
```

More on this: http://stackoverflow.com/questions/783818/how-do-i-create-a-custom-error-in-javascript

---
# Error handling in asynchronous code

Async code runs on its own stack, it is not possible to catch exceptions from the initiator code

```
try {
  $.get("index.html", function (data) {
    throw new Error("problem);
  });
} catch (e) {
  // will not catch the Error
}
```

---
# Ways to handle async errors I.

- Error callback
  - Separated error handler, like jQuery

```
    $.ajax({
      success: function (data, status, xhr) {...},
      error: function (xhr, status, error) {...}
    });
```
  - Using error object as first parameter of the callback, like Node.js

```
    db.fetch(query, function(err, result) {
      if (err) {
        ...
      }
    })
```

---
# Problems with callbacks and error handling

```
function getTotalFileLengths(path, callback) {
  fs.readdir(path, function (err, fileNames) {
    var total = 0;
    var finishedSoFar = 0;
    function finished() {
      if (++finishedSoFar === fileNames.length) {
        callback(total);
      }
    }
    fileNames.forEach(function (fileName) {
      fs.readFile(fileName, function (err, file) {
        total += file.length;
        finished();
      });
    });
  });
}
```

---
# Ways to handle async errors II.

- Higher level error handlers
  - global: `window.addEventListener("error", function (event) {...})`
  - domain: naive example: `$.ajaxError()`
- Promises

---
name: promises
class: center, middle

# Promises

---

# Promise example: fetch API usage

```
fetch('./api/some.json').then(function (response) {
      if (response.status != 200) {
        return Promise.reject("File not found: " + response.url);
      }
      return response.text();
    }).then(function(text) {
      return text.split("\n");
    }).then(console.log.bind(console))
    .catch(function(err) {  
      console.error('Fetch Error: ', err);  
    });
```

---
# A Promise

- Represents the result of an asynchronous operation.

- 3 states:
  - **pending**: The initial state, the operation hasn't completed yet, but is expected in the future.
  - **fulfilled**: The state representing a successful operation.
  - **rejected**: The state representing a failed operation.

---
# Using Promises gives you

- More readable code
  - `.then()` style looks similar to synchronous code
  - A way out of callback hell
- Error propagation similar to throw-catch-finally
- Easy parallel and sequential join
- Guarantees of no race conditions and immutability of the future value represented by the Promise (unlike callbacks and events)

---
# The secrets of Promise composition

```
getUserByName('nolan').then(function (user) {
  if (user.isLoggedOut()) {
    throw new Error('user logged out!'); // throwing a synchronous error
  }
  if (inMemoryCache[user.id]) {
    return inMemoryCache[user.id];       // returning a synchronous value
  }
  return getUserAccountById(user.id);    // returning a promise
}).then(function (userAccount) {
  // I got a user account
}).catch(function (err) {
  // I got an error
});
```

.attribution[http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html]

---
# Parallel join: Promise.all()

Goal: Wait for multiple async operations, continue only when all of them completed.

```
db.allDocs({include_docs: true}).then(function (result) {
  return Promise.all(result.rows.map(function (row) {
    return db.remove(row.doc);
  }));
}).then(function (arrayOfResults) {
  // All docs have really been removed now
});
```

.attribution[http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html]

Why not just use forEach?

```
db.allDocs({include_docs: true}).then(function (result) {
  return result.rows.forEach(function (row) {
    db.remove(row.doc);
  });
}).then(function () {
  // Possibly none of the rows are removed at this time
});
```

---
# Promise.reject(), Promise.resolve()

An unrealistic example of error propegation and handling

```
fetch('./api/some.json').then(function (response) {
      if (response.status != 200) {
        return Promise.reject("File not found: " + response.url);
      }
      return response.text();
    }).then(function (text) {
      console.log("Raw text: " + text);
      return text;
    }).catch(function(err) {  
      console.error('Fetch Error: ', err);  
      return Promise.resolve("Default value after error");
    }).then(function(text) {
      return text.split("\n");
    }).then(console.log.bind(console));
```

---
# Creating a Promise

If you are using `Promise` based APIs, you won't need this

```
function currentUserName() {
  return new Promise(function(resolve, reject) {
    function successHandler(user) {
      resolve(user.name);
    }
    
    $.ajax('current_user.json', {
      success: successHandler,
      error: reject,
      dataType: "JSON"
    })
  });
}
```

```
//Usage
currentUserName().then(loadSettings).then(...).catch(...);
```

---
# Promise drawbacks / nogoals

- Unhandled rejections are silently ignored. You will see _nothing_. => Always call `.catch()` at the end of the chain.
- Uncancellable.
- Will "fire" only once - not for events.
- Not possible to determine its state.

---
# Promise quiz

What happens here?

```
doSomething().then(function () {
  return doSomethingElse();
});
```

```
doSomething().then(function () {
  doSomethingElse();
});
```

```
doSomething().then(doSomethingElse());
```

```
doSomething().then(doSomethingElse);
```

.attribution[http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html]

---
# Promise Puzzle solutions I.

```
doSomething().then(function () {
  return doSomethingElse();
}).then(finalHandler);
```

```
doSomething
|-----------------|
                  doSomethingElse(undefined)
                  |-----------------|
                                   finalHandler(resultOfDoSomethingElse)
                                   |------------------|
```

.attribution[http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html]

---
# Promise Puzzle solutions II.

```
doSomething().then(function () {
  doSomethingElse();
}).then(finalHandler);
```

```
doSomething
|-----------------|
                  doSomethingElse(undefined)
                  |------------------|
                  finalHandler(undefined)
                  |------------------|
```

.attribution[http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html]

---
# Promise Puzzle solutions III.

```
doSomething().then(doSomethingElse())
  .then(finalHandler);
```

```
doSomethingElse(undefined)
|---------------------------------|
doSomething
|-----------------|
                  finalHandler(resultOfDoSomething)
                  |------------------|
```

.attribution[http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html]

---
# Promise Puzzle solutions IV.

```
doSomething().then(doSomethingElse)
  .then(finalHandler);
```

```
doSomething
|-----------------|
                  doSomethingElse(resultOfDoSomething)
                  |------------------|
                                     finalHandler(resultOfDoSomethingElse)
                                     |------------------|
```

.attribution[http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html]

---
name: promiselab
class: center, middle

# Lab: Promises

---
name: strictmode
class: center, middle

# Strict mode

---
# "use strict"

```
function strict(){
  "use strict";
  function nested() {
    return "And so am I!";
  }
  return "Hi!  I'm a strict mode function!  " + nested();
}

function notStrict() {
  return "I'm not strict.";
}
```

```
"use strict";

// entire script in strict mode
```

.note[Prefer the function scope, or you may have problems with non-strict dependencies after script concatenation.]

---
# Strict mode

### Doesn't really affect the life of a good programmer. Turn it on!

- Makes it impossible to accidentally create global variables.
- Converts some silent fails to throw
  - assignment to a non-writable property
  - assignment to a getter-only property
  - assignment to a new property on a non-extensible object
  - deleting undeletable property
- Requires that all properties named in an object literal be unique.
- Requires that function parameter names be unique.
- Forbids octal syntax: `var x = 015; // this will throw in strict mode` 
- Prohibits `with`
- Eval of strict mode code does not introduce new variables into the surrounding scope.
- New reserved keywords.
- Some security related changes. (e.g. `this` won't be `window` if unspecified)

---
name: badparts
class: center, middle

# The Bad Parts

---

# Global variables

- Scripts share a common execution context.
- Accidental declaration of global variables is possible
  - not in strict mode
- Name conflict is a real problem
  - Use namespace objects or modules
 
---

# Semicolon insertion

```
function returnObj() {
  return
  {
    status: true
  };
}
```

![returnobj](img/returnobj.png "returnobj")

---

# type coercion, ==

![coercion](img/coercion.png "coercion")

Not transitive, avoid it. Use `===` and `!==`

---

# typeof, instanceof

Unreliable, as discussed earlier

---

# parseInt, parseFloat

![parseint](img/parseint.png "parseint")

![number](img/number.png "number")

Never use parseInt. Avoid parseFloat too. Use `Number()` instead.

---

# NaN

![nan](img/nan.png "nan")

```
function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
}
```

.attribution[Douglas Crockford: "JavaScript: The Good Parts"]

---

# Truthy & Falsy values

![falsy](img/falsy.png "falsy")

Be aware of it in condition evaluation!

---

# with statement

Just do not use it.

---

# eval

You never really need it. Turn it off using content security policy!

---

# void operator

Evaluates its operand but returns `undefined`. You don't really need it.

![void](img/void.png "void")

An old example:


```html
<a href="javascript:void(document.body.style.backgroundColor='green');">
  Click here for green background
</a>
```

.note[WARNING: Antipattern, never mix JavaScript and HTML]
