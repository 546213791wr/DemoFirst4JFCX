/**
 * 
 */
$(document).ready(function(){
	var validator = $("#resClassify_form").validate({
		rules:{
            typeName:{
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

	$("#resClassify_form").on("submit", function() {
		ajaxForm(this, function(data) {
            if(data.code == 1){
            	showSuccess("修改资源分类成功", function(){
            		window.parent.initResClassifyData();
            		window.parent.closeAllLayer();
            	});
            }else{
            	showError(data.msg);
            }
        }, function(){
        	
        });
        return false; // 阻止表单自动提交事件
    });
	$("#save").click(function(){
		if(validator.form()){
			$("#resClassify_form").submit();
		}
	});
});
