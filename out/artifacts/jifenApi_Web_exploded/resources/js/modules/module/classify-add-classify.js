$(document).ready(function () {
    /**form表单格式验证*/
    var validator = $("#addClassify_form").validate({
        rules:{
            topModuleId:{
                required:true
            },
            topAgeGroupId:{
                required:true
            },
            childModuleId:{
                required:true
            },
            topUserTypeId:{
                required:true
            },
            childModuleId:{
                required:true
            },
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

    /**表单提交*/
    $("#addClassify_form").on("submit", function() {
        ajaxForm(this, function(data) {
            if(data.code==1){
                showSuccess("新增分类成功", function(){
                    closeAllLayer();
                    var topModuleId = $("#topModuleId").val();
                    var topUserTypeId = $("#topUserTypeId").val();
                    var topAgeGroupId = $("#topAgeGroupId").val();
                    var childModuleId = $("#childModuleId").val();
                    loadPage(ctxPath +"/admin/module/normal-org-classify-list?topModuleId="+topModuleId+"&topUserTypeId="+topUserTypeId+"&topAgeGroupId="+topAgeGroupId+"&childModuleId="+childModuleId);

                });
            }else {
                showError("新增分类出错.");
            }
        }, function(){

        });
        return false; // 阻止表单自动提交事件
    });

    $("#save").click(function(){
        if(validator.form()){
            $("#addClassify_form").submit();
        }
    });

    $("#cansel").click(function () {
        var topModuleId = $(this).attr("data-topModuleId");
        var topUserTypeId = $(this).attr("data-topUserTypeId");
        var topAgeGroupId = $(this).attr("data-topAgeGroupId");
        var childModuleId = $(this).attr("data-childModuleId");
        loadPage(ctxPath +"/admin/module/normal-org-classify-list?topModuleId="+topModuleId+"&topUserTypeId="+topUserTypeId+"&topAgeGroupId="+topAgeGroupId+"&childModuleId="+childModuleId);
    });

    $("#topModuleName").change(function () {
        var topUserTypeId = $("#topUserTypeId").val();
        var topAgeGroupId = $("#topAgeGroupId").val();
        var topModuleName = $("#topModuleName").val();
        if(topUserTypeId != "" && topAgeGroupId != "" && topModuleName != ""){
            $.getJSON(ctxPath +"/admin/module/normal-org-child-module-list", {"topUserTypeId": topUserTypeId,"topAgeGroupId":topAgeGroupId,"topModuleName":topModuleName}, function (data) {
                var htmls = "";
                if(data.code == "1"){
                    $.each(data.data.childModuleList, function (index, childModuleMap) {
                        htmls += "<option value='"+childModuleMap.childModuleId+"'>"+childModuleMap.childModuleName+"</option>";
                    });
                }
                $("#moduleId").append(htmls);
            });
        }
    });
});

function getFirstModule() {

    var userTypeId=$("#topUserTypeId").val();
    var ageGroupId=$("#topAgeGroupId").val();
    if(userTypeId!='' && userTypeId!=null && ageGroupId!='' && ageGroupId!=null){
        var transfer={"fid":10988,"ageGroupId":ageGroupId,"userTypeId":userTypeId};
        $.ajax({
            url : ctx + "/admin/module/getByFidAndAgeGroupIdAndUserTypeId",
            type : "POST",
            dataType:'json',
            data : transfer,
            async : false,
            success : function(data) {
                var htmls='<option value="">选择一级模块</option>';
                if(data.data.list.length>0){
                    $.each(data.data.list, function (index, modules) {
                        htmls += "<option value='"+modules.id+"'>"+modules.showName+"</option>";
                    });
                }
                $("#topModuleId").html(htmls);
            }
        });
    }else{
        $("#topModuleId").html("<option value=''>选择一级模块</option>");
    }
}
function getChildModule() {

    var pid = $("#topModuleId").val();
    var userTypeId=$("#topUserTypeId").val();
    var ageGroupId=$("#topAgeGroupId").val();
    if (pid != '' && pid != null) {
        var transfer={"pid": pid, "ageGroupId": ageGroupId, "userTypeId": userTypeId};
        $.ajax({
            url: ctx + "/admin/module/getByPidAndAgeGroupIdAndUserTypeId",
            type: "POST",
            dataType: 'json',
            data: transfer,
            async:false,
            success: function (data) {
                var htmls = "<option value=''>选择二级模块</option>";
                if (data.data.list.length > 0) {
                    $.each(data.data.list, function (index, modules) {
                        htmls += "<option value='" + modules.id + "'>" + modules.name + "</option>";
                    });
                }
                $("#childModuleId").html(htmls);
            }
        });
    }else{
        $("#childModuleId").html("<option value=''>选择二级模块</option>");
    }
}
