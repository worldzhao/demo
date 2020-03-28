function fab(n) {
  if (n <= 2) {
    return 1
  }
  return fab(n - 1) + fab(n - 2)
}

const createFab = () => {
  const cache = [0, 1, 1]
  return n => {
    if (typeof cache[n] !== 'undefined') {
      return cache[n]
    }
    for (let i = 3; i <= n; i++) {
      cache[i] = cache[i - 1] + cache[i - 2]
    }
    return cache[n]
  }
}

const fab = n => {
  if (n <= 2) {
    return 1
  }
  let preVal = 1
  let prePreVal = 1
  let i = 3
  while (i <= n) {
    let cur = preVal + prePreVal
    prePreVal = preVal
    preVal = cur
    i++
  }
  return preVal
}

const fabArr = n => {
  const arr = [0, 1, 1]
  for (let i = 3; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2]
  }
  return arr.slice(1)
}
