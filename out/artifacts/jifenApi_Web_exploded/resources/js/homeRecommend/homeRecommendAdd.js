/**
 * 
 */
$(document).ready(function(){
	init();
	var validator = $("#homeRecommend_form").validate({
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
	$("#homeRecommend_form").on("submit", function() {
		ajaxForm(this, function(data) {
            if(data.success){
            	showSuccess("新增首页推荐成功", function(){
            		closeAllLayer();
            		loadPage(ctxPath + "/homeRecommend");
            	});
            }else if("error" == data.msg){
            	showError("新增首页推荐出错.");
            }else if("failure" == data.msg){
            	showError("新增首页推荐失败.");
            }else{
            	showError(data.msg);
            }
        }, function(){
        	showError("新增首页推荐出错.");
        });
        return false; // 阻止表单自动提交事件
    });
	$("#save").click(function(){
		if(validate() && validator.form()){
			$("#homeRecommend_form").submit();
		}
	});
});
function init(){
	$("#ageGroupSelect").select2({
		placeholder: '选择一个年龄段',
		allowClear: true
	});
	$("#resTypeSelect").select2({
		placeholder: '选择资源类型',
		allowClear: true
	});
	$("#bookSelect").select2({
		placeholder: '选择图书',
		allowClear: true
	});
	$("#specialTopicSelect").select2({
		placeholder: '选择专题',
		allowClear: true
	});
	$("#courseSelect").select2({
		placeholder: '选择课程',
		allowClear: true
	});
	$("#resTypeSelect").change(function(){
		$("#resIds").val("");
		var resType = $(this).select2('val');
		switch(resType){
			case "book" : 
				$("#book-c").css("display", "");
				$("#specialTopic-c").css("display", "none");
				$("#course-c").css("display", "none");
				break;
			case "special_topic" : 
				$("#specialTopic-c").css("display", "");
				$("#book-c").css("display", "none");
				$("#course-c").css("display", "none");
				break;
			case "course" :
				$("#course-c").css("display", "");
				$("#specialTopic-c").css("display", "none");
				$("#book-c").css("display", "none");
				break;
			default : showError("未知的资源类型");
				break;
		}
	});
	$("#bookSelect").change(function(){
		$("#resIds").val($(this).select2('val'));
	});
	$("#specialTopicSelect").change(function(){
		$("#resIds").val($(this).select2('val'));
	});
	$("#courseSelect").change(function(){
		$("#resIds").val($(this).select2('val'));
	});
}
function validate(){
	var ageGroupId = $("#ageGroupSelect").select2("val");
	var resType = $("#resTypeSelect").select2("val");
	var resIds = $("#resIds").val();
	if(isEmpty(ageGroupId)){
		showError("请选择年龄段.");
		return false;
	}
	if(isEmpty(resType)){
		showError("请选择资源类型.");
		return false;
	}
	if(isEmpty(resIds) || "," == $.trim(resIds)){
		showError("请选择资源.");
		return false;
	}
	return true;
}