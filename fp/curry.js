// 傻方法
function add(a) {
  return function temp(b) {
    return function temp1(c) {
      return a + b + c
    }
  }
}

console.log(add(1)(2)(3)) // 6

// 奇葩方法
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

// 合理方法
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

// 正确方法
const curry = (f, arr = []) => (...args) =>
  (a => (a.length === f.length ? f(...a) : curry(f, a)))([...arr, ...args])

const curry = (f, arr = []) => {
  return (...args) => {
    const a = [...arr, ...args]
    if (a.length === f.length) {
      return f(...a)
    }
    return curry(f, a)
  }
}

var add2 = curry(function(a, b, c, d) {
  return a + b + c + d
})

console.log(add2(1)(2)(3)(4)) // 10
console.log(add2(1, 2, 3)(4)) // 10
console.log(add2(1)(2, 3)(4)) // 10
