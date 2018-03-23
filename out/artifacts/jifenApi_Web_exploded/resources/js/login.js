$(document).ready(function(){
	var validator = $("#loginform").validate({
		rules:{
			username:{
				required:true
			},
			password:{
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
	$("#loginform").on("submit", function() {
		
		/**
		$("#errorMsgArea").html("");
		ajaxForm(this, function(data) {
            if(data.success){
            	window.location.replace(ctxPath + "/index");
            }else if("error" == data.msg){
            	$("#errorMsgArea").html("登录出错.");
            }else if("failure" == data.msg){
            	$("#errorMsgArea").html("登录失败.");
            }else{
            	$("#errorMsgArea").html(data.msg);
            }
        }, function(){});
        
        return false; */
        // 阻止表单自动提交事件
        
    });
	$("#submit").click(function(){
		if(validator.form()){
			$("#loginform").submit();
		}
	});
});
document.onkeydown = function(evt) {
	var evt = window.event ? window.event : evt;
	if (evt.keyCode == 13) {
		$("#loginform").submit();
	}
}