// 标准科里化函数
var currying = function(fn) {
  var args = []
  return function() {
    if (arguments.length === 0) {
      return fn.call(this, args)
    } else {
      ;[].push.apply(args, arguments)
      console.log(args)

      return arguments.callee
    }
  }
}

var add3 = currying(function(arr) {
  var sum = 0
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
})

console.log(add3(1)(2)(3)(4)(5)()) //15
