//抽奖

(function($) {

	$.fn.style = function() {
		var style = '*{margin:0;padding:0;outline:none;box-sizing:border-box}html,body{position:relative;max-width:640px;margin:0 auto;font:14px "Microsoft YaHei", "΢���ź�", "STHeiti", "WenQuanYi Micro Hei", SimSun, sans-serif}.cj{position:fixed;top:0;height:100%;width:100%;left:50%;transform:translate(-50%);max-width:640px;background:rgba(0, 0, 0, .8)}.cj a{width:65px;height:65px}.cj a.floatimg{position:absolute;z-index:15;background:url("img/xj.png") no-repeat;background-position:-15px -15px;background-size:1200px 100px;cursor:pointer;-webkit-tap-highlight-color:transparent}.cj a.floatimg.animate{z-index:16}.cj a.floatimg.animate.z-index{z-index:14}.animate{will-change:background-position, background-image;position:relative;-webkit-tap-highlight-color:transparent;background-position:-2400px 0 !important;transition:background .5s steps(12);width:100px !important;height:100px !important}.Z-index{z-index:3 !important}.pc_floatimg{position:absolute !important}.cjbanner{position:fixed;top:0;left:0;max-width:640px;width:100%;height:100%;background:rgba(0, 0, 0, .8);z-index:4}.pc_cjbanner{left:50%;margin-left:-320px}'
		$(this).append("<style>" + style + "</style>")
	}
	$("head").style();
	$.fn.picrad = function(option) {
		var $this = $(this);
		var config = {
			w: $this.width(),
			h: $this.height()
		};
		$.extend(option || {}, config);
		$this.html("");
		var xj_length = Math.floor(Math.random() * option.xj_max + option.xj_min);
		for(var l = 0; l < xj_length; l++) {
			var randomWidth = Math.round(Math.random() * option.w);
			var randomHeight = Math.round(Math.random() * option.h);
			var left = randomWidth >= (option.w - 65) ? option.w - 65 : randomWidth
			var top = randomHeight >= (option.h - 65) ? option.h - 65 : randomHeight;
			$this.append('<a class="floatimg" id="floatimg' + l + '" style="left:' + left + 'px;top:' + top + 'px;"></a>');
		}
	}
	$.fn.cj = function(option) {
		var $this = $(this);
		var oDate = new Date(); //实例一个时间对象；
		var config = {
			initT: 0,
			timer: null,
			year: oDate.getFullYear(), //获取系统的年；
			month: oDate.getMonth() + 1, //获取系统月份，由于月份是从0开始计算，所以要加1
			date: oDate.getDate(), // 获取系统日，
			hour: oDate.getHours(), //获取系统时，
			minute: oDate.getMinutes(), //分
			seconds: oDate.getSeconds() //秒
		};
		$.extend(option || {}, config);
		/*if(option.timeArr) {
			//规定的时间内显示，进行抽奖活动
			
		}*/
		init()

		function init() {
			$this.picrad({
				xj_max: option.xj_max,
				xj_min: option.xj_min
			})
			option.timer = setTimeout(init, 2000);
			option.initT += 2000;
			if(option.initT >= option.endT) {
				clearTimeout(option.timer);
				$this.fadeOut(300).html("");
			}
		}
		$this.on('touchstart click', ".floatimg", function() {
			var $that = $(this);
			var index = $that.index();
			if(option.flag) {
				if(index === 0) {
					$.ajax({
						url: "text.json",
						type: "get",
						dataType: "json"
					}).done(function(data) {
						//中奖处理
						$that.fadeOut(300).siblings().addClass('animate');
						clearTimeout(timer);
						typeof(option.callback) === "function" && option.callback(data, $that, option); //中奖回调函数
					});
				} else {
					$that.addClass('animate');
					setTimeout(function() {
						$that.addClass("z-index")
					}, 200)
				}
			} else {
				$that.addClass('animate');
				setTimeout(function() {
					$that.addClass("z-index")
				}, 200)
			}
		});
	}

})(jQuery);

$('.cj').cj({
	xj_max: 4,
	xj_min: 4,
	endT: 600000, //抽奖次数
	flag: true,
	callback: function(res, $obj, option) {
		/*此为中奖后的回调*/
	}
})