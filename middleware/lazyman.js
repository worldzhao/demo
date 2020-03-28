function _LazyMan(name) {
  this.taskqueue = [];
  console.log(`Hi, This is ${name}`);
  setTimeout(() => {
    this.next();
  }, 0);
}

_LazyMan.prototype.next = function () {
  const fn = this.taskqueue.shift();
  fn && fn();
};

_LazyMan.prototype.sleep = function (time) {
  const fn = () => {
    setTimeout(() => {
      console.log(`Wake up after ${time}`);
      this.next();
    }, time * 1000);
  };
  this.taskqueue.push(fn);
  return this;
};

_LazyMan.prototype.eat = function (name) {
  const fn = () => {
    console.log(`Eat ${name}`);
    this.next();
  };
  this.taskqueue.push(fn);
  return this;
};

_LazyMan.prototype.sleepFirst = function (time) {
  const fn = () => {
    setTimeout(() => {
      console.log(`Wake up after ${time}`);
      this.next();
    }, time * 1000);
  };
  this.taskqueue.unshift(fn);
  return this;
};

function LazyMan(name) {
  return new _LazyMan(name);
}

// 实现一个LazyMan，可以按照以下方式调用:
LazyMan("Hank");
// 输出: Hi! This is Hank!
LazyMan("Hank").sleep(10).eat("dinner");
// Hi! This is Hank!
// ---等待10秒..
// Wake up after 10
// Eat dinner~

LazyMan("Hank").eat("dinner").eat("supper");
// 输出:
// Hi This is Hank!
// Eat dinner~
// Eat supper~
LazyMan("Hank").sleepFirst(5).eat("supper");
// 输出:
// 等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
