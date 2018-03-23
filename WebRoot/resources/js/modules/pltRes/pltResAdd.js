/**
 * 
 */
$(document).ready(function(){
	var validator = $("#pltRes_form").validate({
		rules:{
			resName:{
				required:true
			},
			resType:{
				required:true
			},
			resId:{
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
	$("#pltRes_form").on("submit", function() {
		ajaxForm(this, function(data) {
            if(data.code == 1){
            	showSuccess("新增资源成功", function(){
            		closeAllLayer();
            		loadPage(ctxPath + "/modules/pltRes/list");
            	});
            }else{
            	showError(data.msg);
            }
        }, function(){
        	showError("新增资源出错.");
        });
        return false; // 阻止表单自动提交事件
    });
	$("#save").click(function(){
		if(validator.form()){
			$("#pltRes_form").submit();
		}
	});
});