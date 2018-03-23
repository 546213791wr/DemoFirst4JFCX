/**
 * 
 */
$(document).ready(function(){
	var validator = $("#user_form").validate({
		rules:{
			pwd:{
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
            if(data.success){
            	showSuccess("修改用户密码成功", function(){
            		closeAllLayer();
            		loadPage(ctxPath + "/user");
            	});
            }else if("error" == data.msg){
            	showError("修改用户密码.");
            }else if("failure" == data.msg){
            	showError("修改用户密码.");
            }else{
            	showError(data.msg);
            }
        }, function(){
        	showError("修改用户密码出错.");
        });
        return false; // 阻止表单自动提交事件
    });
	$("#save").click(function(){
		if(validator.form()){
			$("#user_form").submit();
		}
	});
});