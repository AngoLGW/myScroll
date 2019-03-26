// JavaScript Document
(function ($) {
	var methods = {
		init: function (options) {
			//默认配置
			var defaults = {
				speed: 20,  //滚动速度为0-100之间
				direction: 'vertical'  //方向：vertical向上滚动,horizantal向左滚动
			};
			var this_ = this;
			var opts = $.extend({}, defaults, options);

			function upMove(obj, step) {
				obj.find("ul").animate({
					marginTop: '-=1'
				}, 0, function () {
					var s = Math.abs(parseInt($(this).css("margin-top")));
					if (s >= step) {
						$(this).find("li").slice(0, 1).appendTo($(this));
						$(this).css("margin-top", 0);
					}
				});
			}

			function leftMove(obj, step) {
				obj.find("ul").animate({
					marginLeft: '-=1'
				}, 0, function () {
					var s = Math.abs(parseInt($(this).css("margin-left")));
					if (s >= step) {
						$(this).find("li").slice(0, 1).appendTo($(this));
						$(this).css("margin-left", 0);
					}
				});
			}

			return this.each(function (i) {
				var speed = 0 < 100 - opts["speed"] && 100 - opts["speed"] <= 100 ? 100 - opts["speed"] : 20;
				var direction = opts["direction"] == 'vertical' || opts["direction"] == 'horizantal' ? opts["direction"] : 'vertical';
				var _this = $(this);
				var ul = _this.find("ul");
				var sh, isMove, ishori, move;
				if (direction == 'horizantal') {
					isMove = _this.width() < ul.width();
					ishori = true;
					move = leftMove;
				} else {
					isMove = _this.height() < ul.height();
					ishori = false;
					move = upMove;
				}
				if (isMove) {
					this_.timers[i] = setInterval(function () {
						sh = ishori ? ul.find("li:first").outerWidth(true) : ul.find("li:first").outerHeight(true);
						move(_this, sh);
					}, speed);
					_this.hover(function () {
						clearInterval(this_.timers[i]);
					}, function () {
						this_.timers[i] = setInterval(function () {
							sh = ishori ? ul.find("li:first").outerWidth(true) : ul.find("li:first").outerHeight(true);
							move(_this, sh);
						}, speed);
					});
				}
			});
		},
		destroy: function () {
			var this_ = this;
			return this.each(function (i) {
				clearInterval(this_.timers[i]);
				_this = $(this);
				_this.find('ul').css({ 'margin-top': 0 });
				_this.find('ul').css({ 'margin-left': 0 });
				_this.unbind("mouseenter").unbind("mouseleave");
			});
		}
	}
	$.fn.myScroll = function (options) {
		var method = arguments[0];
		this.timers = this.timers ? this.timers : [];
		if (methods[method]) {
			method = methods[method];
		} else if (typeof method == 'object' || !method) {
			method = methods.init;
		} else {
			$.error('error');
			return this;
		}
		return method.apply(this, arguments);
	}
})(jQuery);