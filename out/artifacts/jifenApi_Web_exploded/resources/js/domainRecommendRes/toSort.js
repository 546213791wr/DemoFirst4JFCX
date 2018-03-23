/**
 * 
 */
$(document).ready(function(){
	/** 排序 */
	$("#sequence").click(function(){
		var tbody = document.getElementById('domainRecommendReses');
		sortObj = new Sortable(tbody);
		$("#sequence").css("display", "none");
		$("#sequence-save").css("display", "");
	});
	/** 排序保存 */
	$("#sequence-save").click(function(){
		//保存
		var sequenceStr = "";
		$("#domainRecommendReses td[data-name='domainRecommendRes']").each(function(i){
			sequenceStr += $(this).attr("data-id") + ":" + (i+1) + ",";
		});
		if(!isEmpty(sequenceStr)){
			sequenceStr = sequenceStr.substring(0, sequenceStr.length - 1);
		}
		var params = {"sortStr": sequenceStr};
		ajaxRequest(ctxPath + "/domainRecommendRes/sort", params, function(data){
			if(data.success){
            	showSuccess("域推荐排序成功", function(params){
            		loadPage(ctxPath + "/domainRecommendRes", '', {"domainId":$("#domainId").val()});
            		closeAllLayer();
            	});
            	if(sortObj != null){
    				sortObj.destroy();
    			}
            }else if("error" == data.msg){
            	showError("域推荐排序出错.");
            }else if("failure" == data.msg){
            	showError("域推荐排序失败.");
            }else{
            	showError(data.msg);
            }
		}, function(){
			showError("域推荐排序出错.");
		});
	});
});
