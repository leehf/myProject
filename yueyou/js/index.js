/**
 * Created by Administrator on 2017/9/22 0022.
 */
var bannerHtml, popularGameHtml, num = 0, bannerListNum = 0, adListNum = 0;
var $firstModel = $(".firstModel"),
    $banner = $(".banner");
$.ajax({
    //url: "index.json",//本地测试数据
    url: "http://op.yueeyou.com/portal/api/homeData",
    type: "get",
    dataType: "json"
}).done(function (res) {
    if (res.statusCode === 200) {
        bannerListNum = res.data.homeBanner.list.length;
        adListNum = res.data.homeAd.list.length;
        var data = res;
        bannerHtml = tppl(document.getElementById('banner').innerHTML, data);
        popularGameHtml = tppl(document.getElementById('popularGame').innerHTML, data);
        $firstModel.append(bannerHtml);
        $(".popularGame").append(popularGameHtml);
    }
}).done(function () {
    if (bannerListNum > 1) {//判断banner图片轮播个数，如果小于等于1张图片时，则无需轮播
        var bannerSwiper = new Swiper('.banner-swiper', {
            autoplay: 3000,//可选选项，自动滑动
            loop: true,//可选选项，开启循环
            onSwiperCreated: function (swiper) {
                $firstModel.find(".bannerNav li").eq(swiper.activeIndex - 1).addClass("curr");
            },
            onSlideChangeStart: function (swiper) {
                num = swiper.activeIndex;
                swiper.activeIndex == $(".num").length - 1 && (num = 1);
                $firstModel.find(".bannerNav li").eq(num - 1).addClass("curr").siblings().removeClass("curr");
            }
        });
        $firstModel.on("click", "span", function () {
            var $this = $(this);
            $this.hasClass("prev") && bannerSwiper.swipePrev();
            $this.hasClass("next") && bannerSwiper.swipeNext();
        });
        $firstModel.on("click", ".bannerNav li", function () {
            swipe_nav($(this), bannerSwiper);
        })
    }

    function swipe_nav(obj, name) {
        var $obj = obj,
            index = $obj.index();
        $obj.addClass("curr").siblings().removeClass("curr");
        name.swipeTo(index);
    }

    if (adListNum > 1) {
        var swiperCon = new Swiper('.swiper_con', {
            autoplay: 3000,//可选选项，自动滑动
            loop: true,//可选选项，开启循环
            onSwiperCreated: function (swiper) {
                $firstModel.find(".contentNav li").eq(swiper.activeIndex - 1).addClass("curr");
            },
            onSlideChangeStart: function (swiper) {
                //debugger
                num = swiper.activeIndex;
                swiper.activeIndex == $(".ad_num").length - 1 && (num = 1);
                $firstModel.find(".contentNav li").eq(num - 1).addClass("curr").siblings().removeClass("curr");
            }
        });
        $firstModel.on("click", ".contentNav li", function () {
            swipe_nav($(this), swiperCon);
        })
    }
});