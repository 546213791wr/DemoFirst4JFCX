var resTypeIsNull = true;

$(document).ready(function () {
    /**form表单格式验证*/
    var validator = $("#module_form").validate({
        rules:{
            moduleName:{
                required:true
            },
            topModuleId:{
                required:true
            },
            userTypeId:{
                required:true
            },
            resType:{
                required:true
            },
            ageGroupId:{
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

    /**表单提交*/
    $("#module_form").on("submit", function() {
        ajaxForm(this, function(data) {
            if(data.code==1){
                showSuccess("新增模块成功", function(){
                    closeAllLayer();
                    var topModuleId = $("#save").attr("data-topModuleId");
                    var topUserTypeId = $("#save").attr("data-topUserTypeId");
                    var topAgeGroupId = $("#save").attr("data-topAgeGroupId");
                    loadPage(ctxPath +"/admin/module/normal-org-module-list?topModuleId="+topModuleId+"&topUserTypeId="+topUserTypeId+"&topAgeGroupId="+topAgeGroupId);
                });
            }else if("error" == data.msg){
                showError("新增模块出错.");
            }else if("failure" == data.msg){
                showError("新增模块失败.");
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

    $("#cansel").click(function () {
        var topModuleId = $(this).attr("data-topModuleId");
        var topUserTypeId = $(this).attr("data-topUserTypeId");
        var topAgeGroupId = $(this).attr("data-topAgeGroupId");
        loadPage(ctxPath +"/admin/module/normal-org-module-list?topModuleId="+topModuleId+"&topUserTypeId="+topUserTypeId+"&topAgeGroupId="+topAgeGroupId);
    });
    
    $("#classifyAddBtn").click(function () {
        layer.open({
            type: 2,
            title: '新增分类',
            skin : 'layui-layer-rim', // 加上边框
            shade: 0.8,
            area: ['500px', '500px'], // 宽高
            content: ctxPath + "/admin/module/new-classify"
        });
    })

});

function addClass( className){
    $("#classifyAddBtn").before("<label style='display: inline'><input type='checkbox' name='classifyName' checked='checked' value='"+className+"'>"+className+"</label>");
    resTypeIsNull = false;
    $("#resTypeErr").css("display", "none");
}

/*查询一级模块*/
function getFirstModule(topModuleId) {
    var fid='10988';
    var userTypeId=$("#userTypeId").val();
    var ageGroupId=$("#ageGroupId").val();

    if( userTypeId!='' && userTypeId!=null && ageGroupId!='' && ageGroupId!=null){
        var transfer={"fid":fid,"ageGroupId":ageGroupId,"userTypeId":userTypeId};
        $.ajax({
            url : ctx + "/admin/module/getByFidAndAgeGroupIdAndUserTypeId",
            type : "POST",
            dataType:'json',
            data : transfer,
            async:false,
            success : function(data) {
                var htmls = "<option value=''>全部</option>";
                if(data.data.list.length>0){
                    $.each(data.data.list, function (index, modules) {
                        htmls += "<option value='"+modules.id+"'>"+modules.showName+"</option>";
                    });
                }
                $("#topModuleId").html(htmls);
                $("#topModuleId").val(topModuleId);
            }
        });
    }
}