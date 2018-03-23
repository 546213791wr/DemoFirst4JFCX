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
        var moduleId=$("#transferData").attr("data-moduleId");
        var name=$("#name").val();

        var url=ctxPath +"/admin/pltresClassify/save?moduleId="+moduleId+"&name="+name;
        ajaxForm(url, function(data) {
            if(data.code==1){
                showSuccess("新增分类成功", function(){
                    closeAllLayer();
                    var moduleId = $("#transferData").attr("data-moduleId");
                    var moduleName=$("#transferData").attr("data-moduleName");
                    var obj= { "moduleId":moduleId,"moduleName":moduleName};
                    loadPage(ctxPath + "/admin/pltresClassify/getByModuleId", null, obj);
                });
            }else if("error" == data.msg){
                showError("新增分类出错.");
            }else if("failure" == data.msg){
                showError("新增分类失败.");
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