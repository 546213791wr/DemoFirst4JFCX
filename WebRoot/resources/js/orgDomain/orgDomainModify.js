/**
 * 
 */
$(document).ready(function(){
	init();
	var validator = $("#orgDomain_form").validate({
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
	$("#orgDomain_form").on("submit", function() {
		ajaxForm(this, function(data) {
            if(data.success){
            	showSuccess("修改机构关联域成功", function(){
            		closeAllLayer();
            		loadPage(ctxPath + "/orgDomain", '', {'orgId': $("#orgId").val()});
            	});
            }else if("error" == data.msg){
            	showError("修改机构关联域出错.");
            }else if("failure" == data.msg){
            	showError("修改机构关联域失败.");
            }else{
            	showError(data.msg);
            }
        }, function(){
        	showError("修改机构关联域出错.");
        });
        return false; // 阻止表单自动提交事件
    });
	$("#save").click(function(){
		if(validator.form() && validate()){
			$("#orgDomain_form").submit();
		}
	});
});
function init(){
	$("#domainSelect").select2({
		placeholder: '选择需要关联的域',
		allowClear: true
	});
}
/**验证表单
 * @returns {Boolean}
 */
function validate(){
	var domainId = $("#domainSelect").select2("val");
	if(isEmpty(domainId)){
		showError("请选择需要被关联的域.");
		return false;
	}
	return true;
}