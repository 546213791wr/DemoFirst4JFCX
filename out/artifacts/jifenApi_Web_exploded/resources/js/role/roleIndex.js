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
	/*$("a[data-name='edit']").click(function(){
		var roleId = $(this).attr("data-roleId");
		loadPage(ctxPath + "/role/toModifyRole?roleId=" + roleId, ctxPath + "/role");
	});*/
	/** 权限 */
	/*$("a[data-name='permission']").click(function(){
		var roleId = $(this).attr("data-roleId");
		loadPage(ctxPath + "/admin/rolePermission/to-edit",null,{"roleId":roleId});
	});*/
});
