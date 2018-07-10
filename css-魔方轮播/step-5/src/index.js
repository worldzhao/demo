;(function(w, $) {
  function CubeSwiper(config) {
    this.config = {
      appendElem: 'body',
      imgArr: ['', '', '', '', '', '']
    }
    if (config && $.isPlainObject(config)) {
      $.extend(this.config, config)
    }
    this.init()
  }

  CubeSwiper.prototype = {
    constructor: CubeSwiper,
    init: function() {
      this.render()
      this.bindEvent()
    },
    render: function() {
      var config = this.config
      var root = config.appendElem
      var imgArr = config.imgArr
      var str = `<div class="cube-container">
      <div class="cube-wrap">
        <div class="cube">
          <div class="cube-face front">
            <img src="../img/1.jpg">
          </div>
          <div class="cube-face back">
            <img src="../img/2.jpg">
          </div>
          <div class="cube-face left">
            <img src="../img/3.jpg">
          </div>
          <div class="cube-face right">
            <img src="../img/4.jpg">
          </div>
          <div class="cube-face top">
            <img src="../img/5.jpg">
          </div>
          <div class="cube-face bottom">
            <img src="../img/6.jpg">
          </div>
        </div>
      </div>
      <div class="arrows">
        <span class="pre-arrow"></span>
        <span class="next-arrow"></span>
      </div>
      <div class="indicators">
        <span class="indicator" data-index="0"></span>
        <span class="indicator" data-index="1"></span>
        <span class="indicator" data-index="2"></span>
        <span class="indicator" data-index="3"></span>
        <span class="indicator" data-index="4"></span>
        <span class="indicator" data-index="5"></span>
      </div>
    </div>`
      var cube = $(str)
      $(root).append(cube)
    },
    bindEvent: function() {
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
    }
  }
  window.CubeSwiper = CubeSwiper
})(window, jQuery)
