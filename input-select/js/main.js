;(function ($) {
  function InputSelect(inputConfig) {
    this.inputConfig = {
      data: [{
        name: "test1",
        id: "1"
      }, {
        name: "test2",
        id: "2"
      }, {
        name: "test3",
        id: '3'
      }],
      defaultSelected:null,
      onChangeHandle:function(){
        console.log('暂未绑定change事件');
      },
      onAddHandle:function(){
        console.log('暂未绑定新增事件');
      }
    };
    if (inputConfig && $.isPlainObject(inputConfig)) {
      // this.inputConfig = {...this.inputConfig, ...inputConfig};
      $.extend(this.inputConfig, inputConfig);
    }
    this.initSelect(this.inputConfig);
  }

  InputSelect.prototype = {
    constructor: InputSelect,
    initSelect: function (inputConfig) {
      this.renderTemplate('#select-template', inputConfig, inputConfig.root);
      // 获取.my-select-box记得用root限制命名空间 避免影响其他组件
      var $box = $(inputConfig.root + ' .my-select-box');
      // my-select-header
      var $header = $box.find("div.my-select-header");
      // label
      var $label = $header.find("p.label");
      // ul 装扮成下拉框
      var $list = $header.next();
      // 计算header的高度和宽度，方便定位ul和设置ul及包裹元素的宽度
      var headerHeight = $header.outerHeight();
      $list.css({"top": (headerHeight)});
      // togglelist
      $header.on('click',function(){
        if(($list).is(":hidden")){
          if ($list.children().length > 0) {
            $(this).next().show();
          }
        }else {
          $(this).next().hide();
        }
      });
      // 如果有默认值
      if(inputConfig.defaultSelected){
        $label.text(inputConfig.defaultSelected.name);
        $label.attr('data-id',inputConfig.defaultSelected.id);
      }
      // 选中的li的内容填充p，同时value -> id
      // 事件委托，动态添加的li也可以产生点击效果
      $list.off('click', 'li').on('click', 'li:not(.add-container)', function () {
        var $this = $(this);
        var value = $this.attr("data-value") || '';
        $label.text($this.text()).attr("data-id", value);
        $this.addClass("choosed").siblings().removeClass("choosed");
        $this.parent().hide();
        // 选择完成后出发配置对象内的处理函数
          inputConfig.onChangeHandle();
      });
      // 添加按钮事件
      var $addBtn = $(inputConfig.root + ' .add-btn');
      $addBtn.on('click',function(){
          inputConfig.onAddHandle();
      });
      // 点击.my-select-box范围外时隐藏ul下拉框
      $(document).click(function (e) {
        var target = e.target;
        var $target = $(target);
        var $parent = $target.closest('.my-select-box');
        // 说明不是.my-select-box范围内点击，将ul隐藏
        if ($parent.length < 1) {
          $(".my-select-list").hide();
          // 如果存在多个my-select-box的情况，将其余的非这项以外的都隐藏
        } else if ($parent.length == 1) {
          var $ul = $parent.find(".my-select-list");
          var flag = $ul.is(":hidden");
          $(".my-select-list").hide();
          if (!flag) $ul.show();
        }
      });
    },
    renderTemplate: function (tempSelector, context, containerSelector) {
      var t = $(tempSelector).html();
      var f = Handlebars.compile(t);
      var h = f(context);
      $(containerSelector).html(h);
    },
    destorySelect: function () {
      $(this.inputConfig.root).html('');
    },
    getSelectVal: function () {
      var text = $(this.inputConfig.root).find('.label').text();
      var id = $(this.inputConfig.root).find('.label').attr("data-id");
      return {
        text: text,
        value: id,
      };
    },
    getInputVal:function(){
      var text = $(this.inputConfig.root).find('input.add-input').val();
      return text;
    }
  };
  $.InputSelect = function (inputConfig) {
    return new InputSelect(inputConfig);
  };
})(jQuery);



// $.InputSelect = function (inputConfig) {
//   return new InputSelect(inputConfig);
// };
