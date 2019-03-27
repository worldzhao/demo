const throttle = (fn, interval) => {
  let timer = null
  return (...args) => {
    if (timer) return false
    timer = setTimeout(() => {
      fn.apply(this, args)
      clearTimeout(timer)
      timer = null
    }, interval)
  }
}
