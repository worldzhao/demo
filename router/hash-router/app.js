function Router() {
  this.task = {};
}

Router.prototype.on = function (path, callback) {
  if (!this.task[path]) {
    this.task[path] = [];
  }
  this.task[path].push(callback);
};

Router.prototype.emit = function (path) {
  if (this.task[path]) {
    this.task[path].forEach((cb) => cb());
  }
};

Router.prototype.init = function () {
  var self = this;
  window.addEventListener("load", function () {
    var hash = location.href.split("#")[1];
    self.emit(hash);
  });
  window.addEventListener("hashchange", function () {
    var hash = location.href.split("#")[1];
    self.emit(hash);
  });
};

function changeBgcCol(col) {
  document.body.style.backgroundColor = col;
}

var router = new Router();
router.init();
router.on("/red", function () {
  changeBgcCol("red");
});
router.on("/blue", function () {
  changeBgcCol("blue");
});
router.on("/green", function () {
  changeBgcCol("green");
});
