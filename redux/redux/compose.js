/**
 * 看起来逼格很高，实际运用其实是这样子的：
 * compose(f, g, h)(...arg) => f(g(h(...args)))
 *
 *
 * @param  {多个函数，用逗号隔开}
 * @return {函数}
 */

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

function addOne(x) {
  return x + 1
}

function plusTwo(x) {
  return x * 2
}

function square(x) {
  return x * x
}

console.log(
  compose(
    addOne,
    plusTwo,
    square
  )(2)
)
