class Lazy {
  constructor(iterable, callback) {
    this.iterable = iterable
    this.callback = callback
  }

  filter(predicate) {
    return new LazyFilter(this, predicate)
  }

  map(mapper) {
    return new LazyMap(this, mapper)
  }

  next() {
    return this.iterable.next()
  }

  takeWhile(predicate) {
    const result = []
    let value = this.next().value
    while (predicate(value)) {
      result.push(value)
      value = this.next().value
    }
    return result
  }
}

class LazyFilter extends Lazy {
  next() {
    while (true) {
      const item = this.iterable.next()

      if (this.callback(item.value)) {
        return item
      }
    }
  }
}

class LazyMap extends Lazy {
  next() {
    const item = this.iterable.next()

    const mappedValue = this.callback(item.value)
    return { value: mappedValue, done: item.done }
  }
}

const numbers = function*() {
  let i = 1
  while (true) {
    yield i++
  }
}

// const getArr = (count, iterator) => {
//   const it = iterator()
//   let i = 0
//   const arr = []
//   while (i < count) {
//     arr.push(it.next().value)
//     i = ++i
//   }
//   return arr
// }

// console.log(getArr(100, numbers))

console.log(
  new Lazy(numbers())
    .map(x => x ** 2)
    .filter(x => x % 2 === 1)
    .takeWhile(x => x < 10)
    .reduce((x, y) => x + y)
)
