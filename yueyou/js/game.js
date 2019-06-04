/**
 * Created by Administrator on 2017/9/26 0026.
 */
var gameHtml, hotGameHtml;
var pageNum = 1;
$.ajax({//游戏类型和年份数据请求
//            url: "type.json",
    url: "http://op.yueeyou.com/portal/api/gameCategorys",
    type: "get",
    dataType: "json"
}).done(function (res) {
    if (res.statusCode == 200) {
        var res = res.data;
        gameHtml = tppl(document.getElementById('gameType').innerHTML, res);
        $(".typeChoose").append(gameHtml);
    }
}).done(function () {
    $(".typeChoose").on("click", 'li', function () {
        pageNum = 1;
        var $this = $(this);
        $this.addClass("curr").siblings().removeClass("curr");
        typeChoose();
    });
});
$.ajax({//热门游戏数据请求
    url: "http://op.yueeyou.com/portal/api/ad",
    type: "get",
    dataType: "json",
    data: {
        type: "GAME_HOT_GAME"
    }
}).done(function (res) {
    if (res.statusCode == 200) {
        var res = res.data;
        hotGameHtml = tppl(document.getElementById('hot_game').innerHTML, res);
        $(".rmyx").append(hotGameHtml);
    }
})
typeChoose();
function typeChoose(flag) {
    flag = flag || false;
    var url = "http://op.yueeyou.com/portal/api/games";
    var category, createDate;
    $.trim($(".typeChoose").find(".time .curr").text()) !== "全部" ? createDate = $(".typeChoose").find(".time .curr").text() : createDate = '';
    $.trim($(".typeChoose").find(".type .curr").text()) !== "全部" ? category = $(".typeChoose").find(".type .curr").data("id") : category = '';
    $.ajax({
        url: url,
        type: "get",
        dataType: "json",
        data: {
            category: category,
            createDate: createDate,
            pageNum: pageNum
        }
    }).done(function (res) {
        if (res.statusCode === 200) {
            var res = res.data;
            pageNum++;
            var gameListHtml = tppl(document.getElementById('gameList').innerHTML, res);
            flag ? $(".gameList").append(gameListHtml) : $(".gameList").html(gameListHtml);
            res.games.list.length < 10 ? $(".loadMore").hide() : $(".loadMore").show();
        }
    }).done(function () {
        $(".download ").each(function (i, v) {
            if ($(v).find("a").length > 0) {
                $(v).css({
                    "margin-top": -($(v).height() / 2)
                })
            }
        })
        /* && $(".download").find("a").parent().css({
         "margin-top": -($(".download").height() / 2)
         })*/
    });
    window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
            heightAdd = $('.rmyx').offset().top + $('.rmyx').find('.Rgame').height(),
            heightLi = $("footer").offset().top - 40;
        if (scrollTop - heightAdd > 0) {// && scrollTop - heightLi <= -$('.rmyx').find('.Rgame').height() - 50
            $('.rmyx').find('.Rgame').addClass("fid");
        }
        else {
            $('.rmyx').find('.Rgame').removeClass("fid");
        }
    };
}
$(".loadMore").on("click", function () {
    typeChoose(true);
});