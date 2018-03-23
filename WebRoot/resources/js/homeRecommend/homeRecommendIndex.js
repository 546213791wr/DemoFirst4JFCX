/**
 * 
 */
$(document).ready(function(){
	trHover();
	init();
	//查询
	$("#searchA").click(function(){
		var url = $("#searchForm").attr("action");
		loadPage(url, url, $("#searchForm").serializeObject());
	});
	/** 修改 */
	$("a[data-name='modify']").click(function(){
		var homeRecommendId = $(this).attr("data-homeRecommendId");
		loadPage(ctxPath + "/homeRecommend/toModifyHomeRecommend?homeRecommendId=" + homeRecommendId, ctxPath + "/homeRecommend");
	});
	/** 显示 */
	$("a[data-name='show']").click(function(){
		homeRecommendId = $(this).attr("data-homeRecommendId");
		confirm("确定显示该首页推荐?", function(){
			var params = {"homeRecommendId": homeRecommendId};
			ajaxRequest(ctxPath + "/homeRecommend/show", params, function(data){
                if(data.success){
                	showSuccess("显示首页推荐成功", function(){
                		$("#searchA").click();
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("显示首页推荐出错.");
                }else if("failure" == data.msg){
                	showError("显示首页推荐失败.");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("显示首页推荐出错.");
			});
		}, function(){
			
		});
	});
	/** 隐藏 */
	$("a[data-name='hide']").click(function(){
		homeRecommendId = $(this).attr("data-homeRecommendId");
		confirm("确定隐藏该首页推荐?", function(){
			var params = {"homeRecommendId": homeRecommendId};
			ajaxRequest(ctxPath + "/homeRecommend/hide", params, function(data){
                if(data.success){
                	showSuccess("隐藏首页推荐成功", function(){
                		$("#searchA").click();
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("隐藏首页推荐出错.");
                }else if("failure" == data.msg){
                	showError("隐藏首页推荐失败.");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("隐藏首页推荐出错.");
			});
		}, function(){
			
		});
	});
	/** 删除 */
	$("a[data-name='delete']").click(function(){
		homeRecommendId = $(this).attr("data-homeRecommendId");
		confirm("确定删除该首页推荐?", function(){
			var params = {"homeRecommendId": homeRecommendId};
			ajaxRequest(ctxPath + "/homeRecommend/deleteHomeRecommend", params, function(data){
                if(data.success){
                	showSuccess("删除首页推荐成功", function(){
                		$("#searchA").click();
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("删除首页推荐出错.");
                }else if("failure" == data.msg){
                	showError("删除首页推荐失败.");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("删除首页推荐出错.");
			});
		}, function(){
			
		});
	});
	/** 随机排序 */
	$("#randomSort").click(function(){
		confirm("确定随机排序?", function(){
			ajaxRequest(ctxPath + "/homeRecommend/randomSort", {}, function(data){
                if(data.success){
                	showSuccess("随机排序成功", function(){
                		$("#searchA").click();
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("随机排序出错.");
                }else if("failure" == data.msg){
                	showError("随机排序失败.");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("随机排序出错.");
			});
		}, function(){
			
		});
	});
});
function init(){
	$("#ageGroupSelect").select2({
		placeholder: '年龄段',
		allowClear: true
	});
	$("#userTypeSelect").select2({
		placeholder: '用户类型',
		allowClear: true
	});
}