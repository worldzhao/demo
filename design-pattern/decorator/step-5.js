function wrap(decorator) {
  return function (Model, key) {
    let target = Model.prototype;
    let dscriptor = Object.getOwnPropertyDescriptor(target, key);

    decorator(target, key, descriptor);
  };
}

let log = function (target, key, descriptor) {
  // 将修改后的函数重新定义到原型链上
  Object.defineProperty(target, key, {
    ...descriptor,
    value: function (...arg) {
      let start = new Date().valueOf();
      try {
        return descriptor.value.apply(this, arg); // 调用之前的函数
      } finally {
        let end = new Date().valueOf();
        console.log(`start: ${start} end: ${end} consume: ${end - start}`);
      }
    },
  });
};

let seal = function (target, key, descriptor) {
  Object.defineProperty(target, key, {
    ...descriptor,
    writable: false,
  });
};

// 参数的转换处理
log = wrap(log);
seal = warp(seal);

// 添加耗时统计
log(Model1, "getData");

// 设置属性不可被修改
seal(Model1, "getData");

/**
 * 到了这一步以后，我们就可以称log和seal为装饰器了，可以很方便的让我们对一些函数添加行为。
 * 而拆分出来的这些功能可以用于未来可能会有需要的地方，而不用重新开发一遍相同的逻辑。
 */
