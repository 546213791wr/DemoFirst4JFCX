/**
 * 
 */
var sortObj = null;
$(document).ready(function(){
	trHover();
	//查询
	$("#searchA").click(function(){
		var url = $("#searchForm").attr("action");
		loadPage(url, url, $("#searchForm").serializeObject());
	});
	$("a[data-name='modify']").click(function(){
		var id = $(this).attr("data-id");
		loadPage(ctxPath + "/activity/toModify", "", {"id": id});
	});
	$("a[data-name='delete']").click(function(){
		id = $(this).attr("data-id");
		confirm("确定删除该活动?", function(){
			var params = {"id": id};
			ajaxRequest(ctxPath + "/activity/delete", params, function(data){
                if(data.success){
                	showSuccess("删除机构活动成功", function(){
                		loadPage(ctxPath + "/activity");
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("删除机构活动出错.");
                }else if("failure" == data.msg){
                	showError("删除机构活动失败.");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("删除机构活动出错.");
			});
		}, function(){
			
		});
	});
});
