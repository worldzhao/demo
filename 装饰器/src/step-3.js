/**
 * 创建一个新的工具函数，用来包装需要设置统计耗时的函数
 */

class Model1 {
  getData() {
    // 此处省略获取数据的逻辑
    return [
      {
        id: 1,
        name: 'Niko'
      },
      {
        id: 2,
        name: 'Bellic'
      }
    ]
  }
}

function wrap(Model, key) {
  // 获取Class对应的原型
  let target = Model.prototype

  // 获取函数对应的描述符
  // getOwnPropertyDescriptor
  // MDN: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
  let descriptor = Object.getOwnPropertyDescriptor(target, key)
  // 生成新的函数，添加耗时统计逻辑
  let log = function(...arg) {
    let start = new Date().valueOf()
    try {
      return descriptor.value.apply(this, arg) // 调用之前的函数
    } finally {
      let end = new Date().valueOf()
      console.log(`start: ${start} end: ${end} consume: ${end - start}`)
    }
  }

  // 将修改后的函数重新定义到原型链上
  Object.defineProperty(target, key, {
    ...descriptor,
    value: log // 覆盖描述符重的value
  })
}

wrap(Model1, 'getData')

// start: XXX end: XXX consume: XXX
console.log(new Model1().getData()) // [ { id: 1, name: 'Niko'}, { id: 2, name: 'Bellic' } ]
// start: XXX end: XXX consume: XXX
console.log(Model1.prototype.getData()) // [ { id: 1, name: 'Niko'}, { id: 2, name: 'Bellic' } ]
