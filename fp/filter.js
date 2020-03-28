const reduce = (reducer, accumulator, arr) => {
  for (let i = 0; i < arr.length; i++) {
    accumulator = reducer(accumulator, arr[i])
  }
  return accumulator
}

const filter = (predictor, arr) => {
  return reduce(
    (acc, curr) => (predictor(curr) ? (acc.push(curr), acc) : acc),
    [],
    arr
  )
}

console.log(filter(x => x > 3, [1, 2, 3, 4, 5]))
