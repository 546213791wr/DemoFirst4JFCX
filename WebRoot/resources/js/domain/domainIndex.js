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
	/** 域推荐资源 */
	$("a[data-name='recommend-res']").click(function(){
		var domainId = $(this).attr("data-domainId");
		loadPage(ctxPath + "/domainRecommendRes", ctxPath + "/domain", {"domainId": domainId});
	});
	/** 修改 */
	$("a[data-name='modify']").click(function(){
		var domainId = $(this).attr("data-domainId");
		loadPage(ctxPath + "/domain/toModifyDomain", ctxPath + "/domain", {"domainId": domainId});
	});
	/** 删除 */
	$("a[data-name='delete']").click(function(){
		domainId = $(this).attr("data-domainId");
		confirm("确定删除该域?", function(){
			var params = {"domainId": domainId};
			ajaxRequest(ctxPath + "/domain/deleteDomain", params, function(data){
                if(data.success){
                	showSuccess("删除域成功", function(){
                		loadPage(ctxPath + "/domain");
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("删除域出错");
                }else if("failure" == data.msg){
                	showError("删除域失败");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("删除域出错");
			});
		}, function(){
			
		});
	});
});
function init(){
	trHover();
	$("#ageGroupSelect").select2({
		placeholder: '年龄段',
		allowClear: true
	});
}