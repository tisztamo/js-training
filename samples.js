"use strict";

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