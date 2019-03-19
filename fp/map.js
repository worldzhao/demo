const reduce = (reducer, accumulator, arr) => {
  for (let i = 0; i < arr.length; i++) {
    accumulator = reducer(accumulator, arr[i])
  }
  return accumulator
}

const map = (fn, arr) =>
  reduce((acc, curr) => (acc.push(fn(curr)), acc), [], arr)

console.log(map(x => x * x, [1, 2, 3]))
