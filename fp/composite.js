function add(a, b) {
  return a + b
}
function square(a) {
  return a * a
}
function plusOne(c) {
  return c + 1
}

var addSquareAndPlusOne = composite(add, square, plusOne)

console.log(addSquareAndPlusOne(1, 2)) // 10

function composite(...fns) {
  return function addSquareAndPlusOne(...args) {
    return fns.reduce((acc, cur) => {
      return typeof acc === 'function' ? acc(...args) : cur(acc)
    }, fns[0])
  }
}

function composite(...fns) {
  return function addSquareAndPlusOne(...args) {
    return fns.reduce((acc, cur) => {
      return Array.isArray(acc) ? cur(...acc) : cur(acc)
    }, args)
  }
}

const composite = (...fns) => (...args) =>
  fns.reduce((acc, cur) =>
    typeof acc === 'function' ? cur(acc(...args)) : cur(acc)
  )
