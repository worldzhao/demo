;(function ($) {
    var instance;
    var Dialog = function (config) {
        // 默认配置参数
        this.config = {
            // 对话框的类型
            type: 'ok',
            // 按钮配置
            buttons: [],
            // 延迟多久关闭
            delay: null,
            // 延迟关闭后的回调函数
            delayFun: null,
            // 提示信息
            message: '保存成功',
            // 对话框宽高
            with: 'auto',
            height: 'auto',
            // 对话框遮罩层透明度
            maskOpacity: 0.8,
            // 点击遮罩层是否可以关闭dialog
            maskClickable: false,
            // 是否启动动画
            bomb: false
        };
        // 默认参数扩展（合并传进来的config）
        if (config && $.isPlainObject(config)) {
            // this.config = {...this.config, ...config};
            $.extend(this.config, config);
            // console.log(this.config);
        } else {
            this.hasConfig = false;
        }
        // 创建基本dom结构
        this.body = $('body');
        // 创建遮罩层
        this.mask = $('<div class="web组件开发-dialog-container">');
        this.dialog = $('<div class="web组件开发-dialog-window">');
        this.dialogHeader = $('<div class="web组件开发-dialog-header">');
        this.dialogContent = $('<div class="web组件开发-dialog-content">');
        this.dialogFooter = $('<div class="web组件开发-dialog-footer">');
        // 渲染dom 设计模式：单例模式
        if (instance) {
            this.removeDialog();
        }
        this.createDialog();
    };

    Dialog.prototype = {
        createDialog: function () {
            // 保存变量 减少查询
            var config = this.config,
                body = this.body,
                mask = this.mask,
                dialog = this.dialog,
                dialogHeader = this.dialogHeader,
                dialogContent = this.dialogContent,
                dialogFooter = this.dialogFooter;
            // 根据参数配置dialog

            // 设置header默认图标
            dialogHeader.addClass(config.type);
            dialog.append(dialogHeader);

            // 信息
            dialogContent.html(config.message);
            dialog.append(dialogContent);

            // 创建按钮列表
            if (config.buttons.length) {
                this.createBtns(config.buttons);
                dialog.append(dialogFooter);
            }

            // 宽度
            dialog.width(config.width);

            // 高度
            dialog.height(config.height);

            // 遮罩层透明度
            mask.css('backgroundColor', 'rgba(0,0,0,' + config.maskOpacity + ')');

            // 设置dialog持续时间,如果没有设置delay参数就不消失
            if (config.delay) {
                setTimeout(this.removeDialog.bind(this), config.delay);
            }

            mask.append(dialog);

            // 如果不绑定this，指向tap的dom对象mask，而非我们的dialog对象
            if (config.maskClickable) {
                mask.tap(this.removeDialog.bind(this));
            }

            body.append(mask);

            // 动画效果
            if (config.bomb) {
                this.animate();
            }

            instance = this;
        },
        removeDialog: function () {
            if (this.config.delayFun) {
                this.config.delayFun();
            }
            // 此处移除了dom  创建的对象自动回收，记得销毁引用，思考：单例模式
            instance = null;
            $('.web组件开发-dialog-container').remove();
        },
        createBtns: function (btns) {
            var _this = this;

            // zepto each方法内部的this瞎搞
            $(btns).each(function (index, btn) {

                var type = btn.type ? btn.type : 'default',
                    text = btn.text ? btn.text : '按钮' + index,
                    cb = btn.callback ? btn.callback : null;

                var button = $('<button>' + text + '</button>');

                button.addClass(type);

                if (cb) {
                    button.tap(function (event) {
                        // 避免冒泡至遮罩层
                        event.stopPropagation();
                        var bClosed = cb();
                        if (bClosed) {
                            _this.removeDialog();
                        }
                    })
                } else {
                    button.tap(function () {
                        event.stopPropagation();
                        _this.removeDialog();
                    });
                }

                _this.dialogFooter.append(button);

            })
        },
        animate: function () {
            var _this = this;
            this.dialog.css('transform', 'scale(0,0)');
            setTimeout(function () {
                _this.dialog.css('transform', 'scale(1,1)');
            }, 100);
        }
    };

    $.dialog = function (config) {
        return new Dialog(config);
    };
    window.Dialog = Dialog;
})(Zepto);
