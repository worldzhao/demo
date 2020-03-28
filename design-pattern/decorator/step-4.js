/**
 * 此时，我们又有一个新需求，要求getData不会改变
 */

class Model1 {
  getData() {
    return [
      {
        id: 1,
        name: "Niko",
      },
      {
        id: 2,
        name: "Bellic",
      },
    ];
  }
}

function wrap(Model, key) {
  let target = Model.prototype;
  let descriptor = Object.getOwnPropertyDescriptor(target, key);
  let log = function (...arg) {
    let start = new Date().valueOf();
    try {
      return descriptor.value.apply(this, arg);
    } finally {
      let end = new Date().valueOf();
      console.log(`start: ${start} end: ${end} consume: ${end - start}`);
    }
  };

  Object.defineProperty(target, key, {
    ...descriptor,
    value: log,
  });
}

function wrap1(Model, key) {
  let target = Model.prototype;
  let descriptor = Object.getOwnPropertyDescriptor(target, key);
  Object.defineProperty(target, key, {
    ...descriptor,
    writable: false,
  });
}

wrap(Model1, "getData");
wrap1(Model1, "getData");
Model1.prototype.getData = 1; // 无效

// start: XXX end: XXX consume: XXX
console.log(Model1.prototype.getData()); // [ { id: 1, name: 'Niko'}, { id: 2, name: 'Bellic' } ]

// start: XXX end: XXX consume: XXX
console.log(new Model1().getData()); // [ { id: 1, name: 'Niko'}, { id: 2, name: 'Bellic' } ]

/**
 * 可以看出，两个wrap函数中有不少重复的地方，而修改程序行为的逻辑，实际上依赖的是Object.defineProperty中传递的三个参数。
 * 所以，我们针对wrap在进行一次修改，将其变为一个通用类
 */
