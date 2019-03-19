/**
 * 一个获取数据的类
 */
class Model1 {
  getData() {
    // 忽略获取数据的逻辑
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

console.log(new Model1().getData())

console.log(Model1.prototype.getData())
