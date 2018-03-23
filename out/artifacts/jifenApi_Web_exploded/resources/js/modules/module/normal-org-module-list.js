/**
 *
 */
$(document).ready(function () {

    /** 确认-筛选查询 */
    $("#searchA").click(function () {
        var url = $("#searchForm").attr("action");
        loadPage(url, null, $("#searchForm").serializeObject());
    });

    /** 修改 */
    $("a[data-name='modify']").click(function () {
        var topModuleId=$(this).attr("data-topModuleId");
        var topModuleName=$(this).attr("data-topModuleName");
        var topUserTypeId=$(this).attr("data-topUserTypeId");
        var topAgeGroupId=$(this).attr("data-topAgeGroupId");
        var childModuleId=$(this).attr("data-childModuleId");
        var childModuleName=$(this).attr("data-childModuleName");
        var childUserTypeId=$(this).attr("data-childUserTypeId");
        var childAgeGroupId=$(this).attr("data-childAgeGroupId");
        loadPage(ctxPath + "/admin/module/update-normal-org-module?topModuleId="+topModuleId+"&topModuleName="+topModuleName+"&topUserTypeId="+topUserTypeId+"&topAgeGroupId="+topAgeGroupId+"&childModuleId="+childModuleId+"&childModuleName="+childModuleName+"&childUserTypeId="+childUserTypeId+"&childAgeGroupId="+childAgeGroupId);
    });

    /** 删除 */
    $("a[data-name='delete']").click(function () {
        moduleId = $(this).attr("data-childModuleId");
        confirm("确定删除该模块?", function () {
            var params = {"moduleId": moduleId};
            ajaxRequest(ctxPath + "/admin/module/deleteChildModule", params, function (data) {
                if (data.code == 1) {
                    showSuccess("删除模块成功", function () {
                        $("#searchA").click();
                        closeAllLayer();
                    });
                } else {
                    showError("删除模块出错");
                }
            }, function () {
                showError("删除模块出错");
            });
        }, function () {
        });
    });

    /**修改排序*/
    $("a[data-name='updateSequnce']").click(function (){
        var currentSequnce=parseInt($(this).attr("data-currentSequnce"));
        var id=parseInt($(this).attr("data-id"));
        var chooseSequnce=$("#chooseSequnce"+id).val();
        var r = /^[0-9]*[1-9][0-9]*$/;　　//正整数
        var flag=r.test(chooseSequnce);
        if(!flag){
            alert("请输入正确的序号！");
            $("#chooseSequnce"+currentSequnce).val(currentSequnce);
            return;
        }
        if(chooseSequnce==currentSequnce){
            showSuccess("修改排序成功", function(){
                closeAllLayer();
            });
        }

        if(chooseSequnce>=0&&chooseSequnce!=currentSequnce){
            var params = {"id": id,"chooseSequnce": chooseSequnce};
            ajaxRequest(ctxPath +"/admin/module/update-module-sequnce", params, function(data){
                if(data.code==1){
                    showSuccess("修改排序成功", function(){
                        closeAllLayer();
                        $("#searchA").click();
                    });
                }else if("error" == data.msg){

                    showError("修改排序出错");
                }else if("failure" == data.msg){

                    showError("修改排序失败");
                }else{

                    showError(data.msg);
                }
            }, function(){

                showError("修改排序出错");
            });}
    });

    /**修改状态*/
    $("a[data-name='Status']").click(function(){
        var id = $(this).attr("data-id");
        var params = {"id": id};
        ajaxRequest(ctxPath + "module/to-update-status", params, function(data){
            if(data.code==1){
                showSuccess("成功", function(){
                    closeAllLayer();
                    $("#searchA").click();
                });
            }else if("error" == data.msg){
                showError("出错");
            }else if("failure" == data.msg){
                showError("失败");
            }else{
                showError(data.msg);
            }
        }, function(){
            showError("出错");
        });

    });

    /**新增模块*/
    $("#addModule").click(function () {
        var topModuleId = $(this).attr("data-topModuleId");
        var searchTopUserTypeId = $(this).attr("data-searchTopUserTypeId");
        var searchTopAgeGroupId = $(this).attr("data-searchTopAgeGroupId");
        loadPage(ctxPath+'/admin/module/add-normal-org-module?topModuleId='+topModuleId+"&searchTopUserTypeId="+searchTopUserTypeId+"&searchTopAgeGroupId="+searchTopAgeGroupId);
    })
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
                var htmls='<option value="">全部</option>';
                if(data.data.list.length>0){
                    $.each(data.data.list, function (index, modules) {
                        htmls += "<option value='"+modules.id+"'>"+modules.showName+"</option>";
                    });
                }
                $("#topModuleId").html(htmls);
            }
        });
    }else{
        $("#topModuleId").html("<option value=''>全部</option>");
    }
}