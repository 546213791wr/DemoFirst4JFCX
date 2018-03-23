/**
 * 
 */
$(document).ready(function(){
	init();
	/** 排序保存 */
	$("#sequence-save").click(function(){
		//保存
		var sequenceStr = "";
		$("#resClassifies td[data-name='resClassify']").each(function(i){
			sequenceStr += $(this).attr("data-id") + ":" + (i+1) + ",";
		});
		if(!isEmpty(sequenceStr)){
			sequenceStr = sequenceStr.substring(0, sequenceStr.length - 1);
		}
		var params = {"sortStr": sequenceStr};
		ajaxRequest(ctxPath + "/resClassify/sortResClassifies", params, function(data){
			if(data.success){
            	showSuccess("子资源分类排序成功", function(params){
            		window.parent.loadPage(ctxPath + '/resClassify', '', {'orgId': $("#orgId").val()});
            		window.parent.closeAllLayer();
            	});
            	if(sortObj != null){
    				sortObj.destroy();
    			}
            }else if("error" == data.msg){
            	showError("子资源分类排序出错.");
            }else if("failure" == data.msg){
            	showError("子资源分类排序失败.");
            }else{
            	showError(data.msg);
            }
		}, function(){
			showError("子资源分类排序出错.");
		});
	});
});
function init(){
	var tbody = document.getElementById('resClassifies');
	sortObj = new Sortable(tbody);
	$("#sequence").css("display", "none");
	$("#sequence-save").css("display", "");
}