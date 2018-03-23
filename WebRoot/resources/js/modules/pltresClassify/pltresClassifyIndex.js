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
		var pltresClassifyId = $(this).attr("data-orgId");
		

		loadPage(ctxPath +"/modules/pltresClassify/toUpdatePltresClassify?pltresClassifyId=" + pltresClassifyId, ctxPath + "list");

	});
	/** 删除 */
	$("a[data-name='delete']").click(function(){
		
		moduleId = $(this).attr("data-orgId");
	
		confirm("确定删除该分类?", function(){
			var params = {"moduleId": moduleId};
			
			ajaxRequest(ctxPath +"/modules/pltresClassify/deletePltresClassify", params, function(data){
				 if(data.code==1){
                	
                	showSuccess("删除分类成功", function(){
                		loadPage(ctxPath + "list");
                		closeAllLayer();
                		
                	});
                }else if("error" == data.msg){
                	
                	showError("删除分类出错");
                }else if("failure" == data.msg){
                	
                	showError("删除分类失败");
                }else{
                	
                	showError(data.msg);
                }
			}, function(){
				
				showError("删除分类出错");
			});
		}, function(){
			
		});
	});
	/** 查看分类 */
	$("a[data-name='assign-roles']").click(function(){
		var orgId = $(this).attr("data-orgId");
		layer.open({
		  type: 2,
		  title: '查看分类',
		  shade: 0.8,
		  area: ['300px', '200px'],
		  content: ctxPath + "/fmodule/firstModuleList?orgId=" + orgId //iframe的url
		});
	});
});
