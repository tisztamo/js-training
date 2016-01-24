var lastResult = NaN;

exports.add = function () {
  var sum = 0,
    i = 0,
    args = arguments,
    l = args.length;
  while (i < l) {
    sum += args[i++];
  }
  lastResult = sum;
  return sum;
};

exports.getLastResult = function () {;
  return lastResult;
}