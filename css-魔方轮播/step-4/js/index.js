$(function() {
  var checkActive = function() {
    var indexStr = Number(
      $('.cube')
        .attr('class')
        .slice(-1)
    )
    $('.indicator').each(function(i, e) {
      var $e = $(e)
      $e.removeClass('active')
      i + 1 === indexStr && $e.addClass('active')
    })
  }

  var rotateMap = [
    'rotate1',
    'rotate2',
    'rotate3',
    'rotate4',
    'rotate5',
    'rotate6'
  ]

  var mapIndex = 0
  $('.cube').addClass(rotateMap[mapIndex])
  checkActive()

  $('.arrows .pre-arrow').click(function() {
    $('.cube').removeClass(rotateMap[mapIndex])
    if (mapIndex === 0) {
      mapIndex = rotateMap.length - 1
      $('.cube').addClass(rotateMap[mapIndex])
    } else {
      mapIndex -= 1
      $('.cube').addClass(rotateMap[mapIndex])
    }
    checkActive()
  })

  $('.arrows .next-arrow').click(function() {
    $('.cube').removeClass(rotateMap[mapIndex])
    if (mapIndex === rotateMap.length - 1) {
      mapIndex = 0
      $('.cube').addClass(rotateMap[mapIndex])
    } else {
      mapIndex += 1
      $('.cube').addClass(rotateMap[mapIndex])
    }
    checkActive()
  })

  $('.indicators .indicator').click(function() {
    var $this = $(this)
    $('.cube').removeClass(rotateMap[mapIndex])
    mapIndex = $this.data('index')
    $('.cube').addClass(rotateMap[mapIndex])
    checkActive()
  })
})
