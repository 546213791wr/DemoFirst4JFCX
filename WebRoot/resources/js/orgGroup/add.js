/**
 *
 */
$(document).ready(function(){
    var validator = $("#form").validate({
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


    $('#name').bind('input propertychange', function() {
        //进行相关操作
        var json={'name':$('#name').val(),'id':$('#id').val()};
        $.getJSON("/admin/org-group/checkName",json,function(data){
            if(data.code==1){
                $("#checkTLD").html("√")
                $('#save').attr("disabled",'');
            }else {
                $("#checkTLD").html("×");
                $('#save').attr("disabled",'disabled');
            }});
    });

    $("#form").on("submit", function() {
        ajaxForm(this, function(data) {
            if(data.code == 1){
                showSuccess("保存机构组成功", function(){
                    closeAllLayer();
                    // loadPage(ctxPath + "/admin/org-group/list");
                    backToPrePage();
                });
            }else{
                showError(data.msg);
            }
        }, function(){
            showError("保存机构组出错.");
        });
        return false; // 阻止表单自动提交事件
    });

    $("#save").click(function(){
        if(validator.form() && $("#checkTLD").text() == "√"){
            $("#form").submit();
        }
    });
});