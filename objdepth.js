const isObject = x => Object.prototype.toString.call(x) === '[object Object]'

const getDepthOf = obj => {
  if (!isObject(obj)) return 0
  let depth = 0
  const queue = []
  queue.push(obj)
  while (queue.length) {
    depth++
    const curQueSize = queue.length
    let counter = 0
    while (counter < curQueSize) {
      const el = queue.shift()
      if (isObject(el)) {
        Object.keys(el).forEach(k => queue.push(el[k]))
      }
      counter++
    }
  }
  return depth
}
