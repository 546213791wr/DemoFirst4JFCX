/**
 * 
 */
$(document).ready(function(){
	var validator = $("#pltresClassify_form").validate({
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
	$("#pltresClassify_form").on("submit", function() {
		ajaxForm(this, function(data) {
            if(data.code == 1){
            	showSuccess("新增分类成功", function(){
            		closeAllLayer();
            		loadPage(ctxPath + "/modules/pltresClassify/list");
            	});
            }else{
            	showError(data.msg);
            }
        }, function(){
        	showError("新增分类出错.");
        });
        return false; // 阻止表单自动提交事件
    });
	$("#save").click(function(){
		if(validator.form()){
			$("#pltresClassify_form").submit();
		}
	});
});