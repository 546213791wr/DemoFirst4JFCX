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
		var fanyaUserTypeId = $(this).attr("data-fanyausertypeid");
		loadPage(ctxPath + "/fanyaUserType/toModifyFanyaUserType", ctxPath + '/fanyaUserType', {"fanyaUserTypeId": fanyaUserTypeId});
	});
	/** 删除 */
	$("a[data-name='delete']").click(function(){
		fanyaUserTypeId = $(this).attr("data-fanyaUserTypeId");
		confirm("确定删除该用户?", function(){
			var params = {"fanyaUserTypeId": fanyaUserTypeId};
			ajaxRequest(ctxPath + "/fanyaUserType/deleteFanyaUserType", params, function(data){
                if(data.success){
                	showSuccess("删除泛雅用户类型成功", function(){
                		loadPage(ctxPath + "/fanyaUserType");
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("删除泛雅用户类型出错.");
                }else if("failure" == data.msg){
                	showError("删除泛雅用户类型失败.");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("删除泛雅用户类型出错.");
			});
		}, function(){
			
		});
	});
});