/**
 * 
 */
$(document).ready(function(){
	init();
	var validator = $("#res_form").validate({
		rules:{
			resId:{
				required:true
			}
		},
		messages:{
			resId:"资源id不能为空."
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
	$("#res_form").on("submit", function() {
		ajaxForm(this, function(data) {
            if(data.success){
            	showSuccess("修改资源成功", function(){
            		closeAllLayer();
            		loadPage(ctxPath + "/res");
            	});
            }else if("error" == data.msg){
            	showError("修改资源出错.");
            }else if("failure" == data.msg){
            	showError("修改资源失败.");
            }else{
            	showError(data.msg);
            }
        }, function(){
        	showError("修改资源出错.");
        });
        return false; // 阻止表单自动提交事件
    });
	$("#getFanyaResInfo").click(function(){
		var resId = $("#resId").val();
		if(isEmpty(resId)){
			return false;
		}
		var url = ctxPath + "/res/getFanyaResInfo";
		var params = {"resId": resId};
		loading("加载中...")
		ajaxRequest(url, params, function(data){
			closeAllLayer();
			if(data.success){
            	var map = data.map;
            	var specialTopicBean = map.o;
            	$("#resName").val(specialTopicBean.name);
            	$("#resAuthor").val(specialTopicBean.teacherfactor);
            	$("#resInstructions").val(specialTopicBean.schools);
            }else if("error" == data.msg){
            	showError("获取泛雅资源信息出错.");
            }else if("failure" == data.msg){
            	showError("获取泛雅资源信息失败.");
            }else{
            	showError(data.msg);
            }
		}, function(){
			closeAllLayer();
			showError("获取泛雅资源信息出错.");
		});
	});
	$("#save").click(function(){
		if(validator.form() && validate()){
			$("#res_form").submit();
		}
	});
});
/**
 * 初始化
 */
function init(){
	$("#resTypeSelect").select2({
		placeholder: '资源类型'
	});
}
/**验证表单
 * @returns {Boolean}
 */
function validate(){
	var resType = $("#resTypeSelect").select2("val");
	if(isEmpty(resType)){
		showError("请选择一个资源类型.");
		return false;
	}
	return true;
}