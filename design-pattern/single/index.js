let single = function (fn) {
  let ret;
  return function () {
    console.log(ret); // render一次undefined,render二次true,render三次true
    // 所以之后每次都执行ret，就不会再次绑定了
    return ret || (ret = fn.apply(this, arguments));
  };
};

let bindEvent = single(function () {
  // 虽然下面的renders函数执行3次，bindEvent也执行了3次
  // 但是根据单例模式的特点，函数在被第一次调用后，之后就不再调用了
  document.getElementById("box").onclick = function () {
    alert("click");
  };
  return true;
});

let renders = function () {
  console.log("渲染");
  bindEvent();
};

debugger;
renders();
renders();
renders();
