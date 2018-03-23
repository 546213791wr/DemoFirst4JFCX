/**
 * 
 */
$(document).ready(function(){
	var validator = $("#dictType_form").validate({
		rules:{
			name:{
				required:true
			},
			value:{
				required:true
			}
		},
		messages:{
			name:"字典类型类型名称不能为空.",
			value:"字典类型类型值不能为空."
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
	$("#dictType_form").on("submit", function() {
		ajaxForm(this, function(data) {
            if(data.success){
            	showSuccess("修改字典类型成功", function(){
            		closeAllLayer();
            		loadPage(ctxPath + "/dictType");
            	});
            }else if("error" == data.msg){
            	showError("修改字典类型出错.");
            }else if("failure" == data.msg){
            	showError("修改字典类型失败.");
            }else{
            	showError(data.msg);
            }
        }, function(){
        	showError("修改字典类型出错.");
        });
        return false; // 阻止表单自动提交事件
    });
	$("#save").click(function(){
		if(validator.form()){
			$("#dictType_form").submit();
		}
	});
});