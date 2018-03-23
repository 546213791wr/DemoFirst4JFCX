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
	/** 修改 */
	$("a[data-name='modify']").click(function(){
		var id = $(this).attr("data-id");
		loadPage(ctxPath + "/res/toModifyRes", ctxPath + "/res", {"id": id});
	});
	/** 删除 */
	$("a[data-name='delete']").click(function(){
		id = $(this).attr("data-id");
		confirm("确定删除该资源?", function(){
			var params = {"id": id};
			ajaxRequest(ctxPath + "/res/deleteRes", params, function(data){
                if(data.success){
                	showSuccess("删除资源成功", function(){
                		loadPage(ctxPath + "/res");
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("删除资源出错");
                }else if("failure" == data.msg){
                	showError("删除资源失败");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("删除资源出错");
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