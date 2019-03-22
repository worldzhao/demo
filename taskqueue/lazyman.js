class _LazyMan {
  constructor(name) {
    this.name = name
    this.queue = []
    this.start()
  }

  start() {
    this.greet()
    setTimeout(() => {
      this.next()
    }, 0)
  }

  next() {
    const fn = this.queue.shift()
    fn && fn()
  }

  greet() {
    const fn = () => {
      console.log(`Hi, This is ${this.name}`)
      this.next()
    }
    this.queue.push(fn)
    return this
  }

  eat(name) {
    const fn = () => {
      console.log(`Eat ${name}~`)
      this.next()
    }
    this.queue.push(fn)
    return this
  }

  sleep(s) {
    const fn = () => {
      setTimeout(() => {
        console.log(`Wake up after ${s}`)
        this.next()
      }, s * 1000)
    }
    this.queue.push(fn)
    return this
  }

  sleepFirst(s) {
    const fn = () => {
      setTimeout(() => {
        console.log(`Wake up after ${s}`)
        this.next()
      }, s * 1000)
    }
    this.queue.unshift(fn)
    return this
  }
}

function LazyMan(name) {
  return new _LazyMan(name)
}

// 实现一个LazyMan，可以按照以下方式调用:
LazyMan('Hank')
// 输出: Hi! This is Hank!
LazyMan('Hank')
  .sleep(10)
  .eat('dinner')
// Hi! This is Hank!
// ---等待10秒..
// Wake up after 10
// Eat dinner~

LazyMan('Hank')
  .eat('dinner')
  .eat('supper')
// 输出:
// Hi This is Hank!
// Eat dinner~
// Eat supper~
LazyMan('Hank')
  .sleepFirst(5)
  .eat('supper')
// 输出:
// 等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
