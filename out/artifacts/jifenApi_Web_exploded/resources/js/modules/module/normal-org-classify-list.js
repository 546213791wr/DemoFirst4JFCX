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
        var topModuleName= $(this).attr("data-topModuleName");
        var childModuleName= $(this).attr("data-childModuleName");
        var classifyName= $(this).attr("data-classifyName");
        var classifyId= $(this).attr("data-classifyId");
        layer.open({
            type: 2,
            title: '修改分类',
            skin : 'layui-layer-rim', // 加上边框
            shade: 0.8,
            area: ['500px', '500px'], // 宽高
            content: ctxPath + "/admin/module/update-normal-org-classify?topModuleName="+topModuleName+"&childModuleName="+childModuleName+"&classifyName="+classifyName+"&classifyId="+classifyId
        });
    });

    /** 删除 */
    $("a[data-name='delete']").click(function () {
        classifyId = $(this).attr("data-classifyId");
        console.log(classifyId);
        confirm("确定删除该分类?", function () {
            var params = {"pltresClassifyId": classifyId};
            ajaxRequest(ctxPath + "/admin/pltresClassify/deletePltresClassify", params, function (data) {
                if (data.code == 1) {
                    showSuccess("删除分类成功", function () {
                        $("#searchA").click();
                        closeAllLayer();
                    });
                } else {
                    showError("删除分类出错");
                }
            }, function () {
                showError("删除分类出错");
            });
        }, function () {
        });
    });

    /**新增分类*/
    $("#addClassify").click(function () {
        var params=$("#searchForm").serializeArray();
        loadPage(ctxPath+'/admin/module/add-normal-org-classify',null,params);
    });

    /**修改状态*/
    $("a[data-name='Status']").click(function(){
        var classifyId = $(this).attr("data-classifyId");
        var params = {"classifyId": classifyId};
        ajaxRequest(ctxPath + "pltresClassify/to-update-status", params, function(data){
            if(data.code==1){
                showSuccess("成功", function(){
                    loadPage(ctxPath + "module/normal-org-classify-list",null,{"topModuleId":$("#topModuleId").val(),"childModuleId":$("#childModuleId").val(),"topUserTypeId":$("#topUserTypeId").val(),"topAgeGroupId":$("#topAgeGroupId").val()});
                    closeAllLayer();
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

    })

    /**修改排序*/
    $("a[data-name='updateSequnce']").click(function (){
        var classifyId = parseInt($(this).attr("data-classifyId"));
        var currentSequnce=parseInt($(this).attr("data-currentSequnce"));
        var chooseSequnce=$("#chooseSequnce"+classifyId).val();
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
            var params = {"id": classifyId,"chooseSequnce": chooseSequnce};
            ajaxRequest(ctxPath +"/admin/pltresClassify/update-classify-sequnce", params, function(data){
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

/*查询二级模块*/
function getChildModule() {

    var pid = $("#topModuleId").val();

    var userTypeId=$("#topUserTypeId").val();
    var ageGroupId=$("#topAgeGroupId").val();
    if (pid != '' && pid != null) {
        $.ajax({
            url: ctx + "/admin/module/getByPidAndAgeGroupIdAndUserTypeId",
            type: "POST",
            dataType: 'json',
            data: {"pid": pid, "ageGroupId": ageGroupId, "userTypeId": userTypeId},
            async:false,
            success: function (data) {
                var htmls = "<option value=''>全部</option>";
                if (data.data.list.length > 0) {
                    $.each(data.data.list, function (index, modules) {
                        htmls += "<option value='" + modules.id + "'>" + modules.name + "</option>";
                    });
                }
                $("#childModuleId").html(htmls);
            }
        });
    }else {
        $("#childModuleId").html("<option value=''>全部</option>");
    }
}