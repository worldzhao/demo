var R0 = {
  x: -3,
  y: -4
}

var e1, e2, a, o, y, err

// 主方法
function main(beforePoint) {
  // 获取探测移动返回的基点
  var nextPoint = exploreMove(beforePoint)
  // 将该基点带入误差函数求值  与 上一个基点带入误差函数求值进行判断比较
  // 小于 判断成功
  if (f(nextPoint.x, nextPoint.y) < f(beforePoint.x, beforePoint.y)) {
    var MPoint = patternMove(beforePoint, nextPoint)
    // 误差检测
    if (f(nextPoint.x, nextPoint.y) > err) {
      // 检测失败 将起始点置为MPoint 重复流程
      return main(MPoint)
    } else {
      // 检测成功 返回该点
      return nextPoint
    }
  } else {
    // 大于或等于 步长有问题 修改步长重新进行流程
    a = y * (a - 1) + 1
    return main(beforePoint)
  }
}

// 探测移动
function exploreMove(prePoint) {
  var tempPoint = exploreX(prePoint)
  var nextPoint = exploreY(tempPoint)
  return nextPoint
}
// x方向探测移动
function exploreX(prePoint) {
  var x = prePoint.x
  var y = prePoint.y
  var x1 = x * (a * e1)
  if (f(x1, y) < f(x, y)) {
    return {
      x: x1,
      y: y
    }
  } else {
    x1 = x / (a * e1)
    if (f(x1, y) < f(x, y)) {
      return {
        x: x1,
        y: y
      }
    } else {
      return {
        x: x,
        y: y
      }
    }
  }
}

// y方向探测移动
function exploreY(tempPoint) {
  var x = tempPoint.x
  var y = tempPoint.y
  var y1 = y * (a * e1)
  if (f(x, y1) < f(x, y)) {
    return {
      x: x,
      y: y1
    }
  } else {
    y1 = y / (a * e1)
    if (f(x, y1) < f(x, y)) {
      return {
        x: x,
        y: y1
      }
    } else {
      return {
        x: x,
        y: y
      }
    }
  }
}

// 模式移动
function patternMove(prePoint, nextPoint) {
  var prePointX = prePoint.x
  var prePointY = prePoint.y
  var nextPointX = nextPoint.x
  var nextPointY = nextPoint.y
  var mx = nextPointX * o * (nextPointX / prePointX)
  var my = nextPointY * o * (nextPointY / prePointY)
  return {
    x: mx,
    y: my
  }
}

// 调用主方法
main(R0)
