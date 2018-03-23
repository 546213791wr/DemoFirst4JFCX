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
	/** 排序 */
	$("#sequence").click(function(){
		var tbody = document.getElementById('homeRecommends');
		sortObj = new Sortable(tbody);
		$("#sequence").css("display", "none");
		$("#sequence-save").css("display", "");
	});
	/** 排序保存 */
	$("#sequence-save").click(function(){
		//保存
		var sequenceStr = "";
		$("#homeRecommends td[data-name='homeRecommend']").each(function(i){
			sequenceStr += $(this).attr("data-id") + ":" + (i+1) + ",";
		});
		if(!isEmpty(sequenceStr)){
			sequenceStr = sequenceStr.substring(0, sequenceStr.length - 1);
		}
		var params = {"sortStr": sequenceStr};
		ajaxRequest(ctxPath + "/homeRecommend/sort", params, function(data){
			if(data.success){
            	showSuccess("首页推荐排序成功", function(params){
            		loadPage(ctxPath + '/homeRecommend', '');
            		closeAllLayer();
            	});
            	if(sortObj != null){
    				sortObj.destroy();
    			}
            }else if("error" == data.msg){
            	showError("首页推荐排序出错.");
            }else if("failure" == data.msg){
            	showError("首页推荐排序失败.");
            }else{
            	showError(data.msg);
            }
		}, function(){
			showError("首页推荐排序出错.");
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