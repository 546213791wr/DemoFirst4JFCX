/**
 * 
 */
$(document).ready(function(){
	var validator = $("#user_form").validate({
		rules:{
			loginName:{
				required:true
			},
			realName:{
				required:true
			}
		},
		errorClass: "help-inline",
		errorElement: "span",
		highlight:function(element, errorClass, validClass) {
			$(element).parents('.control-group').removeClass('success');
			$(element).parents('.control-group').addClass('error');
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).parents('.control-group').removeClass('error');
			$(element).parents('.control-group').addClass('success');
		}
	});
    
	
	$("#user_form").on("submit", function() {
		ajaxForm(this, function(data) {
            if(data.code == 1){
            	showSuccess("修改用户成功", function(){
            		closeAllLayer();
            		loadPage(ctxPath + "/admin/user/list");
            	});
            }else if("error" == data.msg){
            	showError("修改用户出错.");
            }else if("failure" == data.msg){
            	showError("修改用户失败.");
            }else{
            	showError(data.msg);
            }
        }, function(){
        	
        });
        return false; // 阻止表单自动提交事件
    });
	$("#save").click(function(){
		if(validator.form()){
			$("#user_form").submit();
		}
	});
});