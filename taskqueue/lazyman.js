function _LazyMan(name) {
  const self = this;
  this.taskqueue = [];
  console.log(`Hi, This is ${name}`);
  setTimeout(() => {
    self.next();
  }, 0);
}

_LazyMan.prototype.next = function() {
  const fn = this.taskqueue.shift();
  fn && fn();
};

_LazyMan.prototype.sleep = function(time) {
  const self = this;
  const fn = function() {
    setTimeout(() => {
      console.log(`Wake up after ${time}`);
      self.next();
    }, time * 1000);
  };
  this.taskqueue.push(fn);
  return this;
};

_LazyMan.prototype.eat = function(name) {
  const self = this;
  const fn = function() {
    console.log(`Eat ${name}`);
    self.next();
  };
  this.taskqueue.push(fn);
  return this;
};

_LazyMan.prototype.sleepFirst = function(time) {
  const self = this;
  const fn = function() {
    setTimeout(() => {
      console.log(`Wake up after ${time}`);
      self.next();
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
