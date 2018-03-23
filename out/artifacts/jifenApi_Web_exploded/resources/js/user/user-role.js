/**
 * 
 */
function save(){
	var roleIdArray = new Array();
    var roleId=$('input[name="roleId"]');
	var userId=$("#userId").val();
    var tem=roleId.val();
    console.log(tem);
	for(var i = 0; i < roleId.length; i++){
        if(roleId[i].checked){
        	roleIdArray.push(roleId[i].value);
        }
    }
    if (roleIdArray.length == 0) {
        layer.alert("请选择角色！");
        return;
    }
    var roleIds = roleIdArray.join(",");
    $.ajax({
    	url: ctxPath +"/admin/user/save-userRole",
    	method:'post',
    	data:{
    		'userId':userId,
    		'roleIds':roleIds
    	},
    	 success : function(data) {
    		 if(JSON.parse(data).code==1){
                 showSuccess("分配角色成功！", function(){
                     window.parent.closeAllLayer();
                     window.parent.loadPage(ctxPath + "/admin/user/list");
				 })
    		}else{
    			 alert("分配用户角色出错！");
    		 }
    	 }
    })
};
