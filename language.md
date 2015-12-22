class: center, middle

# JavaScript: The Language

---

# Agenda

1. Functions
2. Collections
3. Objects & OOP
4. Operators
5. Error handling
6. Promises
7. Modules
8. Strict mode
9. The state of ECMAScript 6
10. The bad parts

---
class: center, middle

# 1. Functions

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

---
class: center, middle

# 2. Collections

---

# Array.map() I.

```
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
```

![roots output](img/map1.png "roots output")
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

```
```
---

```
```
---

```
```
