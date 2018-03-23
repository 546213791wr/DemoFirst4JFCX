$(document).ready(function () {
    /**form表单格式验证*/
    var validator = $("#module_form").validate({
        rules:{
            moduleName:{
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

    $("#save").click(function(){
        if(validator.form()){
            var moduleName=$("#moduleName").val();
            var childModuleId=$("#save").attr("data-childModuleId");
            var gradeType=$("input[name='gradeType']:checked").val();

            var json={"childModuleId":childModuleId,"moduleName":moduleName,"gradeType":gradeType};

            ajaxRequest(ctxPath+"/admin/module/update-normal-org-childModule",json,function (data) {
                if(data.code==1){
                    showSuccess("修改模块成功", function(){
                        closeAllLayer();
                        var topModuleId = $("#save").attr("data-topModuleId");
                        var topUserTypeId = $("#save").attr("data-topUserTypeId");
                        var topAgeGroupId = $("#save").attr("data-topAgeGroupId");
                        loadPage(ctxPath +"/admin/module/normal-org-module-list?topModuleId="+topModuleId+"&topUserTypeId="+topUserTypeId+"&topAgeGroupId="+topAgeGroupId);
                    });
                }else if("error" == data.msg){
                    showError("修改模块出错.");
                }else if("failure" == data.msg){
                    showError("修改模块失败.");
                }else{
                    showError(data.msg);
                }
            })
        }
    });

    $("#cansel").click(function () {
        var topModuleId = $(this).attr("data-topModuleId");
        var topUserTypeId = $(this).attr("data-topUserTypeId");
        var topAgeGroupId = $(this).attr("data-topAgeGroupId");
        if(topUserTypeId==''&&topAgeGroupId==''){
            topModuleId='';
        }
        loadPage(ctxPath +"/admin/module/normal-org-module-list?topModuleId="+topModuleId+"&topUserTypeId="+topUserTypeId+"&topAgeGroupId="+topAgeGroupId);
    });

    /*$("#classifyAddBtn").click(function () {
        var moduleName = $(this).attr("data-childModuleName");
        var modulesId = $(this).attr("data-modulesId");
        layer.open({
            type: 2,
            title: '新增分类',
            skin : 'layui-layer-rim', // 加上边框
            shade: 0.8,
            area: ['500px', '500px'], // 宽高
            content: ctxPath + "/admin/module/add-pltresClassify?moduleName="+moduleName+"&moduleId="+modulesId
        });
    });*/

    /*$("#classifyAddBtn").click(function () {
        layer.open({
            type: 2,
            title: '新增分类',
            skin : 'layui-layer-rim', // 加上边框
            shade: 0.8,
            area: ['500px', '500px'], // 宽高
            content: ctxPath + "/admin/module/new-classify"
        });
    })*/


});

function addClassify(classifyId,classifyName){
    $("#classifyAddBtn").prev().append("<label style='display: inline'><input type='checkbox' name='classTypeId' checked='checked' value='"+classifyId+"'>"+classifyName+"</label>");
}