;(function(modules) {
  // 缓存模块对象
  var installedModules = {}
  // 模拟 commonjs 实现的 require
  function __webpack_require__(moduleId) {
    // require 模块时先判断是否已经缓存, 已经缓存的模块直接返回
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports
    }
    // (模拟)创建一个模块, 并把新模块的引用保存到缓存中
    var module = (installedModules[moduleId] = {
      // 模块 id
      i: moduleId,
      // 模块是否已加载
      l: false,
      // 模块主体内容, 会被重写
      exports: {}
    })
    // 执行以下模块的包装函数, 并把模块内部的 this 志向模块主体
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    )
    // 将模块标记为已加载
    module.l = true
    // 返回模块主体内容
    return module.exports
  }
  // 向外暴露所有的模块
  __webpack_require__.m = modules
  // 向外暴露已缓存的模块
  __webpack_require__.c = installedModules

  // 下边两个方法暂时还没有用到
  // define getter function for harmony exports
  __webpack_require__.d = function(exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {
        configurable: false,
        enumerable: true,
        get: getter
      })
    }
  }
  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function(module) {
    var getter =
      module && module.__esModule
        ? function getDefault() {
            return module['default']
          }
        : function getModuleExports() {
            return module
          }
    __webpack_require__.d(getter, 'a', getter)
    return getter
  }

  // Object.prototype.hasOwnProperty.call 这个就没啥好解释的啦
  // js 权威指南上有说
  __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  }

  // __webpack_public_path__
  // 这个暂时还没有用到
  __webpack_require__.p = ''
  // Load entry module and return exports
  // 准备工作做完了, require 一下入口模块, 让项目跑起来
  return __webpack_require__((__webpack_require__.s = 0))
})(
  /********  华丽的分割线 上边时 webpack 初始化代码, 下边是我们写的模块代码 ***************/
  [
    /* 模块 0 对应 index.js */
    /***/ function(module, exports, __webpack_require__) {
      const foo = __webpack_require__(1)

      console.log(foo)
      console.log('我是高级前端工程师~')

      /***/
    },
    /* 模块 1 对应 foo.js */
    /***/ function(module, exports) {
      module.exports = {
        name: 'quanquan',
        job: 'fe'
      }

      /***/
    }
  ]
)
