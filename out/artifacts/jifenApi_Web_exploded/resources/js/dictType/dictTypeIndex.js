/**
 * 
 */
$(document).ready(function(){
	trHover();
	//查询
	$("#searchA").click(function(){
		var url = $("#searchForm").attr("action");
		loadPage(url, url, $("#searchForm").serializeObject());
	});
	/** 修改 */
	$("a[data-name='modify']").click(function(){
		var dictTypeId = $(this).attr("data-dictTypeId");
		loadPage(ctxPath + "/dictType/toModifyDictType", ctxPath + '/dictType', {"dictTypeId": dictTypeId});
	});
	/** 删除 */
	$("a[data-name='delete']").click(function(){
		dictTypeId = $(this).attr("data-dictTypeId");
		confirm("确定删除该字典类型?", function(){
			var params = {"dictTypeId": dictTypeId};
			ajaxRequest(ctxPath + "/dictType/deleteDictType", params, function(data){
                if(data.success){
                	showSuccess("删除字典类型成功", function(){
                		loadPage(ctxPath + "/dictType");
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("删除字典类型出错.");
                }else if("failure" == data.msg){
                	showError("删除字典类型失败.");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("删除字典类型出错.");
			});
		}, function(){
			
		});
	});
});