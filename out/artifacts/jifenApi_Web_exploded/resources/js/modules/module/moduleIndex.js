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
		loadPage(ctxPath +"/modules/module/toUpdateModule?moduleId=" + moduleId, ctxPath + "list");

	});
	/** 删除 */
	$("a[data-name='delete']").click(function(){
		
		moduleId = $(this).attr("data-orgId");
	
		confirm("确定删除该模块?", function(){
			var params = {"moduleId": moduleId};
			
			ajaxRequest(ctxPath +"/modules/module/deleteModule", params, function(data){
				 if(data.code==1){
                	
                	showSuccess("删除模块成功", function(){
                		loadPage(ctxPath + "list");
                		closeAllLayer();
                		
                	});
                }else if("error" == data.msg){
                	
                	showError("删除模块出错");
                }else if("failure" == data.msg){
                	
                	showError("删除模块失败");
                }else{
                	
                	showError(data.msg);
                }
			}, function(){
				
				showError("删除模块出错");
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
