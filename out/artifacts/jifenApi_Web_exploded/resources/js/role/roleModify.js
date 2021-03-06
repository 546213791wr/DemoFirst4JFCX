/**
 * 
 */
$(document).ready(function(){
	var validator = $("#role_form").validate({
		rules:{
			name:{
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
	$("#role_form").on("submit", function() {
		ajaxForm(this, function(data) {
            if(data.success){
            	showSuccess("修改角色成功", function(){
            		closeAllLayer();
            		loadPage(ctxPath + "/role");
            	});
            }else if("error" == data.msg){
            	showError("修改角色出错");
            }else if("failure" == data.msg){
            	showError("修改角色失败");
            }else{
            	showError(data.msg);
            }
        }, function(){
        	
        });
        return false; // 阻止表单自动提交事件
    });
	$("#save").click(function(){
		if(validator.form()){
			$("#role_form").submit();
		}
	});
});