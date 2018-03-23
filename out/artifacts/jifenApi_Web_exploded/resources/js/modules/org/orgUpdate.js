/**
 * 
 */
$(document).ready(function(){
        var validator = $("#org_form").validate({
		rules:{
			orgName:{
				required:true
			},
			fid:{
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
	$("#org_form").on("submit", function() {
        params={"orgName":parent.$("#orgName1").val(),"status":parent.$("#status1").val(),"gid":parent.$("#gid").val()};
            ajaxForm(this, function (data) {
                if (data.code == 1) {
                    showSuccess("修改机构成功", function () {

                    	console.log(params);
                        parent.loadPage(ctxPath + "/admin/org/list",null,params);
                        parent.closeAllLayer();

                    });
                } else if ("error" == data.msg) {
                    showError("修改机构出错.");
                } else if ("failure" == data.msg) {
                    showError("修改机构失败.");
                } else {
                    showError(data.msg);
                }
            }, function () {
            });
            return false; // 阻止表单自动提交事件

	});

	$("#save").click(function(){
		if(validator.form() && $("#checkTLD").text() == "√"){
			$("#org_form").submit();
		}
	});

}
);