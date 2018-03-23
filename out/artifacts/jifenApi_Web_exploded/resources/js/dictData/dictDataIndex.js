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
		var dictDataId = $(this).attr("data-dictDataId");
		loadPage(ctxPath + "/dictData/toModifyDictData", ctxPath + '/dictData', {"dictDataId": dictDataId});
	});
	/** 删除 */
	$("a[data-name='delete']").click(function(){
		dictDataId = $(this).attr("data-dictDataId");
		confirm("确定删除该字典数据?", function(){
			var params = {"dictDataId": dictDataId};
			ajaxRequest(ctxPath + "/dictData/deleteDictData", params, function(data){
                if(data.success){
                	showSuccess("删除字典数据成功", function(){
                		loadPage(ctxPath + "/dictData");
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("删除字典数据出错.");
                }else if("failure" == data.msg){
                	showError("删除字典数据失败.");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("删除字典数据出错.");
			});
		}, function(){
			
		});
	});
});
function init(){
	trHover();
	$("#dictTypeSelect").select2({
		placeholder: '字典类型',
		allowClear: true
	});
}