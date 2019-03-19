/**
 * 给上一步的方法增加耗时检测
 */

class Model1 {
  getData() {
    let start = new Date().valueOf()
    try {
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
    } finally {
      let end = new Date().valueOf()
      console.log(`start: ${start} end: ${end} consume: ${end - start}`)
    }
  }
}

// start: XXX end: XXX consume: XXX
console.log(new Model1().getData()) // [ { id: 1, name: 'Niko'}, { id: 2, name: 'Bellic' } ]
// start: XXX end: XXX consume: XXX
console.log(Model1.prototype.getData()) // [ { id: 1, name: 'Niko'}, { id: 2, name: 'Bellic' } ]

/**
 * 产生的问题
 * 1. 统计耗时的相关代码与函数本身逻辑并无一点关系，影响到了对原函数本身的理解，对函数结构造成了破坏性的修改
 * 2. 如果后期还有更多类似的函数需要添加统计耗时的代码，在每个函数中都添加这样的代码显然是低效的，维护成本太高
 * 所以，为了让统计耗时的逻辑变得更加灵活，我们将创建一个新的工具函数，用来包装需要设置统计耗时的函数。
 */