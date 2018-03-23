/**
 * 
 */
$(document).ready(function(){
	trHover();

	//查询
	$("#searchA").click(function(){
        var url = $("#searchForm").attr("action");


        loadPage(url, null, $("#searchForm").serializeObject());

    });
	/** 修改 */
	$("a[data-name='modify']").click(function(){
		var orgId = $(this).attr("data-orgId");
		loadPage(ctxPath + "toUpdateOrg?OrgId=" + orgId, ctxPath + "list");
	});
	/** 根据机构Fid查询模块 */
	$("a[data-name='check-modules']").click(function(){
		alert("1111");
		var fid = $(this).attr("data-orgFid");
		var orgName=$(this).attr("data-orgName");
		loadPage(ctxPath + "/modules/module/getByFid?fid=" + fid+"&orgName="+orgName);
		
	});
	/** 删除 */
	$("a[data-name='delete']").click(function(){
		
		orgId = $(this).attr("data-orgId");
		console.log(orgId);
		confirm("确定删除该机构?", function(){
			var params = {"orgId": orgId};
			
			ajaxRequest(ctxPath + "deleteOrg", params, function(data){
				 if(data.code==1){
                	
                	showSuccess("删除机构成功", function(){
                		loadPage(ctxPath + "list");
                		closeAllLayer();
                		
                	});
                }else if("error" == data.msg){
                	
                	showError("删除机构出错");
                }else if("failure" == data.msg){
                	
                	showError("删除机构失败");
                }else{
                	
                	showError(data.msg);
                }
			}, function(){
				
				showError("删除机构出错");
			});
		}, function(){
			
		});
	});

});
