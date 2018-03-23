/**
 * 
 */
$(document).ready(function(){
	init();
	var validator = $("#domainRecommendRes_form").validate({
		rules:{
			
		},
		messages:{
			
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
	$("#domainRecommendRes_form").on("submit", function() {
		ajaxForm(this, function(data) {
            if(data.success){
            	showSuccess("新增域推荐资源成功", function(){
            		closeAllLayer();
            		loadPage(ctxPath + "/domainRecommendRes", '', {"domainId":$("#domainId").val()});
            	});
            }else if("error" == data.msg){
            	showError("新增域推荐资源出错.");
            }else if("failure" == data.msg){
            	showError("新增域推荐资源失败.");
            }else{
            	showError(data.msg);
            }
        }, function(){
        	showError("新增域推荐资源出错.");
        });
        return false; // 阻止表单自动提交事件
    });
	$("#save").click(function(){
		if(validator.form() && validate()){
			$("#domainRecommendRes_form").submit();
		}
	});
});
/**
 * 初始化
 */
function init(){
	$("#resSelect").select2({
		placeholder: '资源',
		allowClear: true
	});
}
/**验证表单
 * @returns {Boolean}
 */
function validate(){
	var resId = $("#resSelect").select2("val");
	if(isEmpty(resId)){
		showError("请选择一个资源.");
		return false;
	}
	return true;
}