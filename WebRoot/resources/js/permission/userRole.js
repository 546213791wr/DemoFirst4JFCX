/**
 * 
 */
$(document).ready(function(){
	$("#save").click(function(){
		var roles = "";
		$("input[data-name='role']:checked").each(function(){
			roles += $(this).val() + ",";
		});
		if(!isEmpty(roles)){
			roles = roles.substring(0, roles.length - 1);
		}
		var userId = $("#userId").val();
		var param = {"userId": userId, "roles": roles};
		ajaxRequest(ctxPath + "/permission/userRole", param, function(data){
			if(data.success){
            	showSuccess("用户指定角色成功", function(){
            		window.parent.loadPage(ctxPath + "/user");
            		window.parent.closeAllLayer();
            	});
            }else if("error" == data.msg){
            	showError("用户指定角色出错");
            }else if("failure" == data.msg){
            	showError("用户指定角色失败");
            }else{
            	showError(data.msg);
            }
		}, function(){
			showError("用户指定角色出错");
		});
	});
});