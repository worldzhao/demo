// 笨方法 无扩展性
function add(a) {
  return function temp(b) {
    return function temp1(c) {
      return a + b + c
    }
  }
}

console.log(add(1)(2)(3)) // 6

// 惰性求值但不符合要求
function add(num) {
  var sum = 0
  sum += num
  return function tempFun(numB) {
    if (arguments.length === 0) {
      return sum
    } else {
      sum += numB
      return tempFun
    }
  }
}

console.log(add(1)(2)(3)()) // 6

// 符合要求 但很奇葩
function add1(x) {
  var sum = x
  var tmp = function(y) {
    sum = sum + y
    return tmp
  }
  tmp.toString = function() {
    return sum
  }
  return tmp
}
console.log(add1(1)(2)(3)) //6

// 无扩展性
function curry(fn) {
  var slice = [].slice
  var len = fn.length

  return function curried() {
    var args = slice.call(arguments)
    if (args.length >= len) {
      return fn.apply(null, args)
    }

    return function() {
      return curried.apply(null, args.concat(slice.call(arguments)))
    }
  }
}

var add2 = curry(function(a, b, c, d) {
  return a + b + c + d
})

console.log(add2(1)(2)(3)(4)) // 10
console.log(add2(1, 2, 3)(4)) // 10
console.log(add2(1)(2, 3)(4)) // 10
