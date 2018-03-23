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
});
function init(){
	trHover();
	$("#fanyaUserTypeSelect").select2({
		placeholder: '泛雅用户类型',
		allowClear: true
	});
}