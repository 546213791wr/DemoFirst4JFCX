/**
 *
 */
$(document).ready(function(){

    var validator = $("#pltresClassify_form").validate({
        rules:{
            name:{
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
    $("#pltresClassify_form").on("submit", function() {
        ajaxForm(this, function(data) {
            if(data.code==1){
                showSuccess("修改分类成功", function(){
                    var classId = $("#classId").val();
                    var className = $("#name").val();
                    window.parent.updateClassisfy(classId,className);
                    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                    parent.layer.close(index); //再执行关闭
                });
            }else if("error" == data.msg){
                showError("修改分类出错.");
            }else if("failure" == data.msg){
                showError("修改分类失败.");
            }else{
                showError(data.msg);
            }
        }, function(){

        });
        return false; // 阻止表单自动提交事件
    });
    $("#save").click(function(){
        if(validator.form()){
            $("#pltresClassify_form").submit();
        }
    });
});