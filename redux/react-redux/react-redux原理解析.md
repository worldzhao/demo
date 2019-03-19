# react-redux原理解析

## 前置知识
* react高阶组件 | ES6：修饰器 | 设计模式：装饰者模式 

[助你完全理解React高阶组件（Higher-Order Components）](http://react-china.org/t/react-higher-order-components/14949)

[ECMAScript 6入门：修饰器](http://es6.ruanyifeng.com/#docs/decorator)
* react context

[React文档：context](https://doc.react-china.org/docs/context.html)

* redux 原理 | 设计模式：发布订阅模式

## react-redux
具备了上述的前置知识之后，我们现在便有能力来初探react-redux的原理一二了。

react-redux是如何使用的？
1. 使用 `Provider` 组件将我们的App包裹起来 - context
2. 用 `connect` 方法去连接需要进行状态管理的组件 -HOC

react-redux为我们做了哪些事情？
我们可以在任意组件中
1. get state
2. dispatch action
同时自动更新视图 - 发布订阅模式
### Provider

### connect

#### mapStateToProps

#### mapDispatchToProps