/**
 * 
 */
$(document).ready(function(){
	init();
	//查询
	$("#searchA").click(function(){
		var url = $("#searchForm").attr("action");
		loadPage(url, url, $("#searchForm").serializeObject());
	});
	/** 显示 */
	$("a[data-name='show']").click(function(){
		id = $(this).attr("data-id");
		confirm("确定显示该域推荐?", function(){
			var params = {"domainRecommendResId": id};
			ajaxRequest(ctxPath + "/domainRecommendRes/showDomainRecommendRes", params, function(data){
                if(data.success){
                	showSuccess("显示域推荐成功", function(){
                		loadPage(ctxPath + "/domainRecommendRes", '', {'domainId': $("#domainId").val()});
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("显示域推荐出错.");
                }else if("failure" == data.msg){
                	showError("显示域推荐失败.");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("显示域推荐出错.");
			});
		}, function(){
			
		});
	});
	/** 隐藏 */
	$("a[data-name='hide']").click(function(){
		id = $(this).attr("data-id");
		confirm("确定隐藏该域推荐?", function(){
			var params = {"domainRecommendResId": id};
			ajaxRequest(ctxPath + "/domainRecommendRes/hideDomainRecommendRes", params, function(data){
                if(data.success){
                	showSuccess("隐藏域推荐成功", function(){
                		loadPage(ctxPath + "/domainRecommendRes", '', {'domainId': $("#domainId").val()});
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("隐藏域推荐出错.");
                }else if("failure" == data.msg){
                	showError("隐藏域推荐失败.");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("隐藏域推荐出错.");
			});
		}, function(){
			
		});
	});
	/** 删除 */
	$("a[data-name='delete']").click(function(){
		id = $(this).attr("data-id");
		confirm("确定删除该推荐资源?", function(){
			var params = {"domainRecommendResId": id};
			ajaxRequest(ctxPath + "/domainRecommendRes/deleteDomainRecommendRes", params, function(data){
                if(data.success){
                	showSuccess("删除推荐资源成功", function(){
                		loadPage(ctxPath + "/domainRecommendRes", '', {'domainId': $("#domainId").val()});
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("删除推荐资源出错");
                }else if("failure" == data.msg){
                	showError("删除推荐资源失败");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("删除推荐资源出错");
			});
		}, function(){
			
		});
	});
	/** 随机排序 */
	$("#randomSort").click(function(){
		confirm("确定随机排序?", function(){
			ajaxRequest(ctxPath + "/domainRecommendRes/randomSort", {}, function(data){
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
	trHover();
	$("#resTypeSelect").select2({
		placeholder: '资源类型',
		allowClear: true
	});
}