/**
 * 
 */
$(document).ready(function(){
	init();
	var validator = $("#resClassifyRes_form").validate({
		rules:{
			
		},
		messages: {  
			
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
	$("#resClassifyRes_form").on("submit", function() {
		ajaxForm(this, function(data) {
            if(data.success){
            	showSuccess("给资源分类分类资源成功", function(){
            		closeAllLayer();
            		loadPage(ctxPath + "/resClassifyRes", '', {'resClassifyId': $("#resClassifyId").val()});
            	});
            }else if("error" == data.msg){
            	showError("给资源分类分类资源出错.");
            }else if("failure" == data.msg){
            	showError("给资源分类分类资源失败.");
            }else{
            	showError(data.msg);
            }
        }, function(){
        	showError("给资源分类分类资源出错.");
        });
        return false; // 阻止表单自动提交事件
    });
	$("#save").click(function(){
		if(validator.form() && validate()){
			$("#resClassifyRes_form").submit();
		}
	});
});
function init(){
	$("#resIdsSelect").select2({
		placeholder: '选择需要关联的资源',
		allowClear: true
	});
}
/**验证表单
 * @returns {Boolean}
 */
function validate(){
	var resIds = $("#resIdsSelect").select2("val");
	if(isEmpty(resIds) || "," == $.trim(resIds)){
		showError("请选择需要关联的资源.");
		return false;
	}
	return true;
}