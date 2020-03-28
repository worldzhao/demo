Function.prototype.uncurrying = function () {
  var self = this;
  return function () {
    var obj = Array.prototype.shift.call(arguments);
    return self.apply(obj, arguments);
  };
};

// Function.prototype.uncurrying = function() {
//   var self = this
//   return function() {
//     return Function.prototype.call.apply(self, arguments)
//   }
// }

var push = Array.prototype.push.uncurrying();

var obj = { 0: 0, 1: 1, length: 2 };
push(obj, 2, 3);
console.log(obj);
