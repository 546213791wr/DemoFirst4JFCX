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
		var userId = $(this).attr("data-userId");
		loadPage(ctxPath + "/admin/user/toModifyUser?userId=" + userId, ctxPath + "/user");
	});
	/** 修改用户密码 */
	$("a[data-name='modifyPwd']").click(function(){
		var userId = $(this).attr("data-userId");

        layer.confirm("确定重置该用户密码?", {
            btn : [ '确定', '取消' ],// 按钮
            icon: 3
        }, function(index) {
            closeLayer(index);
            var params = {"userId": userId};
            ajaxRequest(ctxPath + "/admin/user/toResertPassword", params, function(data){
                if(data.code==1){
                    showSuccess("重置密码成功", function(){
                        loadPage(ctxPath + "/admin/user/list");
                        closeAllLayer();
                    });
                }else if("error" == data.msg){
                    showError("重置密码出错");
                }else if("failure" == data.msg){
                    showError("重置密码出错");
                }else{
                    showError(data.msg);
                }
            }, function(){
                showError("重置密码出错");
            });
        }, function(index) {
            closeLayer(index);
        });

	});
	/** 删除 */
	$("a[data-name='delete']").click(function(){
		userId = $(this).attr("data-userId");
		confirm("确定删除该用户?", function(){
			var params = {"userId": userId};
			ajaxRequest(ctxPath + "/admin/user/deleteUser", params, function(data){
                if(data.code==1){
                	showSuccess("删除用户成功", function(){
                		loadPage(ctxPath + "/admin/user/list");
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("删除用户出错");
                }else if("failure" == data.msg){
                	showError("删除用户失败");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("删除用户出错");
			});
		}, function(){
			
		});
	});
	/** 分配角色 */
	$("a[data-name='assign-roles']").click(function(){
		var userId = $(this).attr("data-userId");
		layer.open({
		  type: 2,
		  title: '用户分配角色',
		  shade: 0.8,
		  area: ['500px', '500px'],
		  content: ctxPath + "/admin/user/toUserRole?userId=" + userId //iframe的url
		});
	});
});
