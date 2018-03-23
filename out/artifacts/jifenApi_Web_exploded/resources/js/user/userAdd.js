/**
 * 
 */
$(document).ready(function(){
	var validator = $("#user_form").validate({
		rules:{
			username:{
				required:true
			},
			password:{
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
            	showSuccess("新增用户成功", function(){
            		closeAllLayer();
            		loadPage(ctxPath + "/admin/user/list");
            	});
            }else{
            	showError(data.msg);
            }
        }, function(){
        	showError("新增用户出错.");
        });
        return false; // 阻止表单自动提交事件
    });
	$("#save").click(function(){
		if(validator.form()){
			$("#user_form").submit();
		}
	});
});