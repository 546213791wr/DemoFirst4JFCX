/**
 * 
 */
$(document).ready(function(){
	
	trHover();
	//查询
	$("#searchA").click(function(){ 
		var url = $("#searchForm").attr("action");
		console.log($("#searchForm").serializeObject());
		
		loadPage(url, null, $("#searchForm").serializeObject());
		
	});
	/** 修改 */
	$("a[data-name='modify']").click(function(){
		var moduleId = $(this).attr("data-orgId");

		loadPage(ctxPath +"/modules/pltRes/toUpdatePltRes?pltresId=" + pltresId, ctxPath + "list");

	});
	/** 删除 */
	$("a[data-name='delete']").click(function(){
		
		moduleId = $(this).attr("data-orgId");
	
		confirm("确定删除该资源?", function(){
			var params = {"pltresId": pltresId};
			
			ajaxRequest(ctxPath +"/modules/pltRes/deletePltRes", params, function(data){
				 if(data.code==1){
                	
                	showSuccess("删除资源成功", function(){
                		loadPage(ctxPath + "list");
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
