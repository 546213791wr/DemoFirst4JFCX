/**
 * 
 */
$(document).ready(function(){
	init();
	$.validator.addMethod("required", function(value, element){
		return !isEmpty(value);
	}, '');
	var validator = $("#domain_form").validate({
		message:{
			name:"域名称不能为空.",
			showName:"显示名称不能为空.",
			icoClass:"图标样式不能为空.",
			jumpContent:"跳转内容不能为空."
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
	$("#domain_form").on("submit", function() {
		ajaxForm(this, function(data) {
            if(data.success){
            	showSuccess("新增域成功", function(){
            		closeAllLayer();
            		loadPage(ctxPath + "/domain");
            	});
            }else if("error" == data.msg){
            	showError("新增域出错.");
            }else if("failure" == data.msg){
            	showError("新增域失败.");
            }else{
            	showError(data.msg);
            }
        }, function(){
        	showError("新增域出错.");
        });
        return false; // 阻止表单自动提交事件
    });
	$("#save").click(function(){
		if(validator.form() && validate()){
			$("#domain_form").submit();
		}
	});
});
/**
 * 初始化
 */
function init(){
	$("#ageGroupSelect").select2({
		placeholder: '年龄段',
		allowClear: true
	});
	$("#resTypeSelect").select2({
		placeholder: '资源类型',
		allowClear: true
	});
	$("#domainLinkTypeSelect").select2({
		placeholder: '链接类型',
		allowClear: true
	});
	$("input[name='domainResType']").change(function(){
		var domainResType = $(this).val();
		if("0" == domainResType){//不可变,图书、链接、js脚本等
			initLinkType();
			$("#linkTypeDiv").css("display", "");
			$("#resTypeDiv").css("display", "none");
			$("input[name='jumpContent']").addClass("required");
		}else{//专题、课程资源等
			initResType();
			$("#resTypeDiv").css("display", "");
			$("#linkTypeDiv").css("display", "none");
			$("input[name='jumpContent']").removeClass("required");
		}
	});
}
function initLinkType(){
	$("#domainLinkTypeSelect").val("1").trigger("change");
	$("input[name='jumpContent']").val("");
}
function initResType(){
	$("#resTypeSelect").val("1").trigger("change");
}
/**验证表单
 * @returns {Boolean}
 */
function validate(){
	var domainResType = $("input[name='domainResType']:checked").val();
	if("0" == domainResType){//不可变
		var domainLinkType = $("#domainLinkTypeSelect").select2("val");
		if(isEmpty(domainLinkType)){
			showError("请选择一个域链接类型.");
			return false;
		}
	}else{
		var resType = $("#resTypeSelect").select2("val");
		if(isEmpty(resType)){
			showError("请选择一个资源类型.");
			return false;
		}
	}
	return true;
}