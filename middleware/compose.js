function compose(fns) {
  let name = 1;
  return function (ctx) {
    const next = function () {
      const fn = fns.shift();
      fn && fn(ctx, next);
    };
    const fn = arrs.shift();
    fn && fn(ctx, next);
  };
}

function fun1(ctx, next) {
  ctx.count++;
  console.log(ctx.count);
  next();
}
function fun2(ctx, next) {
  ctx.count++;
  console.log(ctx.count);
  setTimeout(function () {
    next();
  }, 1000);
}
function fun3(ctx, next) {
  ctx.count++;
  console.log(ctx.count);
  next();
}
compose([fun1, fun2, fun3])({ count: 1 }); // 2 3 4
