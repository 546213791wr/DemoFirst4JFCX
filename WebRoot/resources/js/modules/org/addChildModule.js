/**
 *
 */
$(document).ready(function(){
    var validator = $("#module_form").validate({
        rules:{
            name:{
                required:true
            },
            resType:{
                required:true
            },
            gradeType:{
                required:true
            },
            icoClass:{
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


    $("#module_form").on("submit", function() {
		ajaxForm(this, function(data) {
            if(data.code=1){
                module=data.data.module;
            	showSuccess("新增模块成功", function(){
                    var moduleId = module.pid;
                    var userTypeId = module.userTypeId;
                    var ageGroupId=module.ageGroupId;
                    var topModuleId=module.pid;
                    var orgName=$("#transferData").attr("data-orgName");
                    var moduleName=$("#transferData").attr("data-moduleName");
                    var fid=$("#transferData").attr("data-fid");
                    var obj= { "topModuleId":topModuleId,"id":moduleId,"userTypeId":userTypeId,"ageGroupId":ageGroupId,"orgName":orgName,"moduleName":moduleName,"fid":fid};
                    parent.loadPage(ctxPath + "/admin/module/getChildByPid", null, obj);
            		parent.closeAllLayer();

            	});
            }else if("error" == data.msg){
            	showError("新增模块出错.");
            }else if("failure" == data.msg){
            	showError("新增模块失败.");
            }else{
            	showError(data.msg);
            }
        }, function(){
        	showError("新增模块出错.");
        });
        return false; // 阻止表单自动提交事件
    });

    $("#save").click(function(){
        if(validator.form()){
            $("#module_form").submit();
        }
    });
});