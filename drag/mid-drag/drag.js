var dropManager = (function () {
  var diffX = 0, // 鼠标点击处距离盒子左侧距离
    diffY = 0, // 鼠标点击处距离盒子顶部距离
    dragging = null;

  function handle(event) {
    var target = event.target,
      className = target.className,
      type = event.type;
    switch (type) {
      case "mousedown":
        if (className.indexOf("draggable") !== -1) {
          dragging = target;
          diffX = event.clientX - dragging.offsetLeft;
          diffY = event.clientY - dragging.offsetTop;
        }
        break;
      case "mousemove":
        if (dragging !== null) {
          dragging.style.top = event.clientY - diffY + "px";
          dragging.style.left = event.clientX - diffX + "px";
        }
        break;
      case "mouseup":
        dragging = null;
        break;
      default:
        return;
    }
  }
  return {
    dragEnable: function () {
      document.addEventListener("mousedown", handle);
      document.addEventListener("mousemove", handle);
      document.addEventListener("mouseup", handle);
    },
    dragDisable: function () {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("mousemove", handle);
      document.removeEventListener("mouseup", handle);
    },
  };
})();
