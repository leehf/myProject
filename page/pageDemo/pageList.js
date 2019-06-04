/*翻页内容组件
 * pageCurr:当前页码
 * pageCount:总页码
 * */
function pageBox(option) {
	// debugger;
	var option = option || {},
		$html, htmlArr = [],
		page;
	htmlArr.push('<div class="dataTables_wrapper cl "><div class="dataTables_paginate ">');
	if(option.pageCount === 0) {
		return;
	}
	if(option.pageCount === 1) {
		htmlArr.push(' <span> ' +
			'<a class="paginate_button  paginate_show" aria-controls="DataTables_Table_0"  data-dt-idx="1" tabindex="1">1</a> ' +
			'</span>');
	} else {
		if(option.pageCurr !== 1) {
			htmlArr.push('<a class="paginate_button previous disabled tPage" aria-controls="DataTables_Table_0"  data-dt-idx="1" tabindex="1" onclick="" >首页</a> ' +
				'<a class="paginate_button previous disabled tPage" style="margin-right:5px; " aria-controls="DataTables_Table_0"  data-dt-idx="' + (option.pageCurr - 1) + '" tabindex="' + (option.pageCurr - 1) + '" onclick="" >上一页</a>');
		}
		if(option.pageCount === 2) {
			page = 1;
		} else if(option.pageCount >= 3) {
			page = 2;
		}
		if((option.pageCount == option.pageCurr || option.pageCount == option.pageCurr + 1 || option.pageCount == option.pageCurr + 2) && option.pageCount > 3) {
			htmlArr.push('...');
			htmlArr.push(' <span> ' +
				'<a class="paginate_button paginate_show tPage" aria-controls="DataTables_Table_0"  data-dt-idx="' + (option.pageCount - 2) + '" tabindex="' + (option.pageCount - 2) + '">' + (option.pageCount - 2) + '</a> ' +
				'</span>');
			htmlArr.push(' <span> ' +
				'<a class="paginate_button paginate_show tPage" aria-controls="DataTables_Table_0"  data-dt-idx="' + (option.pageCount - 1) + '" tabindex="' + (option.pageCount - 1) + '">' + (option.pageCount - 1) + '</a> ' +
				'</span>');
			htmlArr.push(' <span> ' +
				'<a class="paginate_button paginate_show tPage" aria-controls="DataTables_Table_0"  data-dt-idx="' + (option.pageCount) + '" tabindex="' + (option.pageCount) + '">' + option.pageCount + '</a> ' +
				'</span>');
		} else {
			for(var i = 0; i <= page; i++) {
				if(option.pageCount === 2 || option.pageCount === 3) {
					htmlArr.push(' <span> ' +
						'<a class="paginate_button  paginate_show tPage" aria-controls="DataTables_Table_0"  data-dt-idx="' + (i + 1) + '" tabindex="' + (i + 1) + '">' + (i + 1) + '</a> ' +
						'</span>');
				} else {
					htmlArr.push(' <span> ' +
						'<a class="paginate_button  paginate_show tPage" aria-controls="DataTables_Table_0"  data-dt-idx="' + (i + option.pageCurr) + '" tabindex="' + (i + 1) + '">' + (i + option.pageCurr) + '</a> ' +
						'</span>');
				}

			}
			(option.pageCount > 3) ? htmlArr.push('...'): "";

		}
		if(option.pageCount !== option.pageCurr && option.pageCount !== 0) {
			htmlArr.push('<a class="paginate_button next disabled tPage" aria-controls="DataTables_Table_0" class="tPage" data-dt-idx="' + (option.pageCurr + 1) + '" tabindex="' + (option.pageCurr + 1) + '" >下一页</a> ' +
				'<a class="paginate_button next disabled tPage" aria-controls="DataTables_Table_0"  data-dt-idx="' + option.pageCount + '" tabindex="' + option.pageCount + '">尾页</a> ')
		}
		htmlArr.push('<label class="pl-5"><a href="javascript:"class="tPage">跳转</a><input style="width: 40px;"  class="pl-5 input-text size-MINI jP "  onkeyup="limitInput(this,' + option.pageCount + ')" type="number" /></label>');
	}

	htmlArr.push('</div></div>');
	$html = htmlArr.join('');
	return $html;
}
/*页码改变逻辑
 * 
 * pageStr：翻页内容的父级选择器；
 * pageCurr:当前页码；
 * pageCount:总页码；
 * url：请求的地址（非必须）；
 * pageCallBack：存在url的页码请求成功回调函数，其中存在3个参数：{
 *  op：翻页的操作对象；
 * res:请求得到的数据；
 * obj:点击该元素的this对象
 * }
 * callBackNoUrl：不存在url的回调函数，其中存在3个参数：{
 * op：翻页的操作对象；
 * res:请求得到的数据；
 * pageNum:点击后的下个页面的当前页码
 * }
 * */
function addPageList(option) {
	// debugger;
	var option = option || {};
	$(option.pageStr).html(
		pageBox({
			pageCount: option.pageCount,
			pageCurr: option.pageCurr
		})
	);
	$('.paginate_show').each(function(i, v) {
		($(v).text() == option.pageCurr) ? $('.paginate_show').eq(i).addClass("current"): "";
	});
	tPage({
		tPageStr: ".tPage", //类名
		url: option.url, //url可添加参数
		callBack: function(op, res, obj) {
			debugger;
			//请求URL存在时 ，点击翻页数据请求成功后的回调函数
			typeof(option.pageCallBack) === "function" && option.pageCallBack(op, res, obj);
		},
		callBackNoUrl: function(op, obj, pageNum) {
			typeof(option.callBackNoUrl) === "function" && option.callBackNoUrl(op, obj, pageNum);
		}
	})
	$('.jP').on('keypress', function(e) {
		if(event.keyCode === 13) {
			tPage({
				tPageStr: ".jP", //类名
				url: option.url, //url可添加参数
				callBack: function(op, res, obj) {
					/*debugger;*/
					//请求URL存在时 ，点击翻页数据请求成功后的回调函数
					typeof(option.pageCallBack) === "function" && option.pageCallBack(op, res, obj);
				},
				callBackNoUrl: function(op, obj, pageNum) {
					typeof(option.callBackNoUrl) === "function" && option.callBackNoUrl(op, obj, pageNum);
				}
			})
		}
	})
	$('.jP').on('input', function(e) {
		limitInput(this, option.pageCount)
	})
}

function limitInput(o, endPage) {
	var value = o.value;
	var min = 1;
	if(parseInt(value) < min || parseInt(value) > endPage) {
		alert('输入错误');
		o.value = '';
	}
}
// list页面翻页
function tPage(option) {
	var option = option || {},
		url, urlParam;
	if(option.tPageStr == '.jP') {
		urlParam = $(".jP").val();
		if(option.url) {
			url = option.url + '&page=' + urlParam;
			ajaxInfo($(".jP"));
		} else {
			typeof(option.callBackNoUrl) === "function" && option.callBackNoUrl(option, $(".jP"), urlParam);
		}
		//window.location.href = url; 
	} else {
		$(document).on("click", option.tPageStr, function() {
			var $this = $(this);
			//			if($.trim($this.text()==""))
			if($.trim($this.text()) === '跳转') {
				urlParam = $(".jP").val();
			} else {
				urlParam = $this.data("dt-idx");
			}
			if(option.url) {
				if($this.hasClass("current")) {
					return false;
				} else {
					url = option.url + '?page=' + urlParam;
					//url = option.url;//方便自己测试
					ajaxInfo($this);
				}
			} else {
				typeof(option.callBackNoUrl) === "function" && option.callBackNoUrl(option, $this, urlParam);
			}
		})
	}

	function ajaxInfo(obj) {
		$.ajax({
			url: url,
			dataType: "json",
			method: "GET"
		}).done(function(res) {
			if(res.statusCode == "200") {
				typeof(option.callBack) === "function" && option.callBack(option, res, obj);
			} else {
				typeof(option.callFailBack) === "function" && option.callFailBack(option);
			}
		})
	}
}