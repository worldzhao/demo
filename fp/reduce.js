const reduce = (reducer, accumulator, arr) => {
  for (let i = 0; i < arr.length; i++) {
    accumulator = reducer(accumulator, arr[i])
  }
  return accumulator
}

const sum = arr => reduce((acc, curr) => acc + curr, 0, arr)

console.log(sum([1, 2, 3]))
