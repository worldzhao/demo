window.onload = function() {
	var box = document.getElementsByClassName('box')[0];
	box.onmousedown = function(e) {
		var boxLeft = box.offsetLeft, // 移动盒子距离左部距离
			boxTop = box.offsetTop, // 移动盒子距离顶部距离
			pageX = e.clientX, // 鼠标点击横坐标
			pageY = e.clientY; // 鼠标点击处纵坐标
		var diffX = pageX - boxLeft, // 鼠标点击处距离盒子左侧距离
			diffY = pageY - boxTop; // 鼠标点击处距离盒子顶部距离

		document.onmousemove = function(e) {
			var pageX = e.clientX,
				pageY = e.clientY;
			box.style.top = pageY - diffY + 'px';
			box.style.left = pageX - diffX + 'px';
		}

		document.onmouseup = function(e) {
			document.onmousemove = null;
			document.onmouseup = null;
		};
	}
}