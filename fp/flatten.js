const flatten = arr => {
  return arr.reduce((previous, val) => {
    if (Array.isArray(val)) {
      previous.push(...flatten(val))
      return previous
    }
    previous.push(val)
    return previous
  }, [])
}

const flatten = arr =>
  arr.reduce(
    (previous, val) =>
      Array.isArray(val)
        ? (previous.push(...flatten(val)), previous)
        : (previous.push(val), previous),
    []
  )

const flatten = arr => {
  while (arr.some(val => Array.isArray(val))) {
    arr = [].concat(...arr)
  }
  return arr
}
