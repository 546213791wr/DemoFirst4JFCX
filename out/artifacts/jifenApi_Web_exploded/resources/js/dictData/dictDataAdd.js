/**
 * 
 */
$(document).ready(function(){
	init();
	var validator = $("#dictData_form").validate({
		rules:{
			name:{
				required:true
			},
			value:{
				required:true
			}
		},
		messages:{
			name:"字典数据名称不能为空.",
			value:"字典数据值不能为空."
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
	$("#dictData_form").on("submit", function() {
		ajaxForm(this, function(data) {
            if(data.success){
            	showSuccess("新增字典数据成功", function(){
            		closeAllLayer();
            		loadPage(ctxPath + "/dictData");
            	});
            }else if("error" == data.msg){
            	showError("新增字典数据出错.");
            }else if("failure" == data.msg){
            	showError("新增字典数据失败.");
            }else{
            	showError(data.msg);
            }
        }, function(){
        	showError("新增字典数据出错.");
        });
        return false; // 阻止表单自动提交事件
    });
	$("#save").click(function(){
		if(validateForm() && validator.form()){
			$("#dictData_form").submit();
		}
	});
});
function init(){
	$("#dictTypeSelect").select2({
		placeholder: '选择一个字典类型',
		allowClear: true
	});
}
function validateForm(){
	var typeId = $("#dictTypeSelect").select2("val");
	if(isEmpty(typeId)){
		showError("请选择一个字典类型.");
		return false;
	}
	return true;
}