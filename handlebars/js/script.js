(function ($) {
    var GETCLASS = 'http://imoocnote.calfnote.com/inter/getClasses.php';
    // ajax错误处理
    $.ajaxSetup({
        error: function () {
            alert('调用失败');
            return false;
        }
    });

    // 渲染视图 v
    function renderTemplate(tempSelector, context, containerSelector) {
        var t = $(tempSelector).html();
        var f = Handlebars.compile(t);
        var h = f(context);
        $(containerSelector).html(h);
    }

    // 获取数据 m
    function refreshClass(curPage) {
        $.getJSON(GETCLASS, {curPage: curPage}, function (data) {
            renderTemplate('#class-template', data, '#classes');
            renderTemplate('#pag-template', formatPage(data), '#pag');
        });
    }

    // 页面交互 事件委托 绑定页码事件
    function bindPagEvent() {
        $('#pag').on('click', 'li.clickable', function () {
            $this = $(this);
            // console.log($this.data('id'));
            refreshClass($this.data('id'))
        })
    }

    // 初次获取数据 -> 渲染视图
    refreshClass(29);
    bindPagEvent();

    // 是否显示笔记
    function showNote(bShow) {
        if (bShow) {
            $('.overlap').css('display', 'block');
            $('.notedetail').css('display', 'block');
        } else {
            $('.overlap').css('display', 'none');
            $('.notedetail').css('display', 'none');
        }
    }

    // 点击classes显示笔记
    function bindClassEvent() {
        $('#classes').on('click', 'div.innerbox', function () {
            showNote(true);
        });
    }

    bindClassEvent();

    // 点击overlap隐藏笔记
    $('.overlap').on('click', function () {
        showNote(false);
    });

    // helpers有两种
    // 一种类似于工具函数，最后return内容替代模板
    // 一种是判断是否加载helper包裹的内容 用做判断
    Handlebars.registerHelper('equal', function (v1, v2, options) {
        if (v1 === v2) {
            return options.fn(this);
        } else {
            return options.inverse(this)
        }
    });

    Handlebars.registerHelper('long', function (v, options) {
        if (v.indexOf('小时') !== -1) {
            return options.fn(this);
        } else {
            return options.inverse(this)
        }
    });

    function formatPage(pageData) {
        var arr = [];
        var total = parseInt(pageData.totalCount);
        var cur = parseInt(pageData.curPage);
        // 处理到首页的逻辑
        var toLeft = {};
        toLeft.index = 1;
        toLeft.text = '&laquo;';
        // 如果当前页面不是第一页，可以直接返回首页
        if (cur !== 1) {
            toLeft.clickable = true;
        }
        arr.push(toLeft);
        // 处理到上一页的逻辑
        var pre = {};
        pre.index = cur - 1;
        pre.text = '&lsaquo;';
        if (cur !== 1) {
            pre.clickable = true;
        }
        arr.push(pre);
        // 处理到cur页前的显示
        // 如果当前页在第五页（包含第五页）之前，那么前面所有页面导航需要显示
        // 《 < 1 2 3 4 5
        if (cur <= 5) {
            for (var i = 1; i < cur; i++) {
                var prepag = {};
                prepag.index = i;
                prepag.text = i;
                prepag.clickable = true;
                arr.push(prepag);
            }
        } else {
            // 如果当前页在第五页之后，显示第一页，当前页，以及当前页的前两页，则第一页到当前页前两页之间的页 导航 显示 ...
            // 假设当前页为第六页 《 < 1 ... 4 5 6
            var firstpag = {};
            firstpag.index = 1;
            firstpag.text = 1;
            firstpag.clickable = true;
            arr.push(firstpag);
            var premidpag = {};
            premidpag.text = '...';
            arr.push(premidpag);
            for (var i = cur - 2; i < cur; i++) {
                var pag = {};
                pag.index = i;
                pag.text = i;
                pag.clickable = true;
                arr.push(pag);
            }
        }
        // 显示当前页
        var curpag = {};
        curpag.index = cur;
        curpag.text = cur;
        curpag.cur = true; // 当前页的标识 样式判断
        arr.push(curpag);
        // 当前页之后的逻辑处理
        // 如果当前页倒数五页之内，后面页数全部显示
        // 假如一共有100页 现在在96页 1 ... 94 95 96 97 98 99 100
        if (cur >= total - 4) {
            for (var i = cur + 1; i <= total; i++) {
                var nextpag = {};
                nextpag.index = i;
                nextpag.text = i;
                nextpag.clickable = true;
                arr.push(nextpag);
            }
        } else {
            // 如果不在后五页 则显示最后一页 以及 后面两页
            // 假如一共有100页 当前页为90页 1 ... 88 89 90 91 92 ... 100
            for (var i = cur + 1; i < cur + 3; i++) {
                var pag = {};
                pag.index = i;
                pag.text = i;
                pag.clickable = true;
                arr.push(pag);
            }
            var nextmidpag = {};
            nextmidpag.text = '...';
            arr.push(nextmidpag);
            var lastpag = {};
            lastpag.index = total;
            lastpag.text = total;
            lastpag.clickable = true;
            arr.push(lastpag);
        }
        // 处理到下一页的逻辑
        var next = {};
        next.index = cur + 1;
        next.text = '&rsaquo;';
        if (cur !== total) {
            next.clickable = true;
        }
        arr.push(next);
        // 处理到尾页的逻辑
        var toRight = {};
        toRight.index = total;
        toRight.text = '&raquo;';
        // 如果当前页面不是最后一页，可以直接返回尾页
        if (cur !== total) {
            toRight.clickable = true;
        }
        arr.push(toRight);
        return arr;
    }

})(jQuery);