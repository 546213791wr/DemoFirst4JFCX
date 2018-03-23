/**
 *
 */
$(document).ready(function(){
    var validator = $("#module_form").validate({
        rules:{
            name:{
                required:true
            },
            moduleId:{
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
            if(data.code==1){
                showSuccess("修改模块成功", function(){
                    var moduleId = $("#moduleId").val();
                    var userTypeId =  $(":radio[name='userTypeId']:checked").val();
                    var ageGroupId =  $(":radio[name='ageGroupId']:checked").val();
                    window.parent.updataTopModule(moduleId,userTypeId,ageGroupId);
                    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                    parent.layer.close(index); //再执行关闭
                });
            }else if("error" == data.msg){
                showError("修改模块出错.");
            }else if("failure" == data.msg){
                showError("修改模块失败.");
            }else{
                showError(data.msg);
            }
        }, function(){

        });
        return false; // 阻止表单自动提交事件
    });
    $("#save").click(function(){
        if(validator.form()){
            $("#module_form").submit();
        }
    });
});