
$(document).ready(function(){
    $("#searchA").click(function(){
        var url = $("#searchForm").attr("action");
        loadPage(url,null,$("#searchForm").serializeObject());
    });

    /**删除*/
    $("a[data-name='deleteRes']").click(function(){
        classifyResId = $(this).attr("data-classifyResId");
        confirm("确定删除该资源?", function(){
            var params = {"classifyResId": classifyResId};
            ajaxRequest(ctxPath +"/admin/pltresClassify/deletePltresClassifyRes", params, function(data){
                if(data.code==1){
                    showSuccess("删除资源成功", function(){
                        $("#searchA").click();
                        closeAllLayer();
                    });
                }else{
                    showError("删除资源出错");
                }
            }, function(){
                showError("删除资源出错");
            });
        }, function(){
        });
    });

    /** 禁/启用 状态*/
    $("a[data-name='disRes']").on('click',function(){
        var classifyResId = $(this).attr("data-crId");
        var classifyResStatus=$(this).attr("data-crStatus");
        var operate = classifyResStatus == "1" ? "启用" : "禁用";
        var params={"classifyResId":classifyResId,"classifyResStatus":classifyResStatus};
        ajaxRequest(ctxPath +"/admin/pltresClassify/updatePltresClassifyRes", params, function(data){
            if(data.code==1){
                showSuccess(operate+"成功", function(){
                    $("#searchA").click();
                    closeAllLayer();
                });
            }else{
                showError(operate+"失败");
            }
        }, function(){
            showError(operate+"出错");
        });
    });

    $("#addRes").click(function () {
        var fid=$("#fid").val();
        var orgName=$("#orgName").val();
        var userTypeId=$("#userTypeId").val();
        var ageGroupId=$("#ageGroupId").val();
        var topModuleId=$("#topModuleId").val();
        var childModuleId=$("#childModuleId").val();
        var classifyId=$("#classifyId").val();
        var grade=$("#gradeId").val();
        var isNormalOrg = $(this).attr("data-isNormalOrg");
        var jsonData={"grade":grade,"fid":fid,"orgName":orgName,"userTypeId":userTypeId,"ageGroupId":ageGroupId,"topModuleId":topModuleId,"childModuleId":childModuleId,"classifyId":classifyId,"isNormalOrg":isNormalOrg};
        loadPage(ctxPath+'/admin/pltRes/to-add-pltRes',null,jsonData);
    });

    /*导入资源,批量导入 start*/
    $("#inputRes").click(function () {
        var childModuleId=$("#childModuleId").val();

        if(childModuleId!=""&&childModuleId!=null){
            layer.open({
                type: 2,
                title: '导入资源',
                shade: 0.8,
                area: ['500px', '300px'],
                content: ctxPath + "/admin/org/bulk-import?childModuleId="+childModuleId
            });
        }

    });

    /*导入资源,批量导入 end*/


    /**修改排序*/
    $("a[data-name='updateSequnce']").click(function (){
        var currentSequnce=parseInt($(this).attr("data-currentSequnce"));
        var resClassifyResId=$(this).attr("data-resClassifyResId");
        var chooseSequnce=$("#chooseSequnce"+resClassifyResId).val();
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
            var params = {"chooseSequnce": chooseSequnce,"resClassifyResId": resClassifyResId};
            ajaxRequest(ctxPath +"/admin/pltRes/update-pltres-sequnce", params, function(data){
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

function getFidEmpty() {
    $("#fid").val("");
}

/*查询机构*/
function query() {
    var name = $("#orgName").val();
    var htmls = "";
    $(".query-list").css('display','block');
    $.getJSON("/front/org/query", {query: name}, function (data) {
        if(data.data.list.length>0){
            $.each(data.data.list, function (index, org) {
                htmls += '<dd><a href="javascript:;" onclick="chooseOrg(' + org.fid + ',\'' + org.orgName + '\')">' + org.orgName + '</a></dd>';
            });
        }else{
            htmls += '<dd><span>无搜索结果</span></dd>';
        }
        $(".query-list").html(htmls);
        $(".query-list").css("display","block");
    });
}

function chooseOrg(fid, name) {
    $("#fid").val(fid);
    $("#orgName").val(name);
    $(".query-list").css("display","none");
    clear();
}

function clear(){
    $("#userTypeId").val("");
    $("#ageGroupId").val("");
    $("#topModuleId").val("");
    $("#childModuleId").val("");
    $("#classifyId").val("");
    $("#resName").val("");
    $("#topModuleId").attr("disabled","disabled");
    $("#childModuleId").attr("disabled","disabled");
    $("#classifyId").attr("disabled","disabled");
}

/*查询一级模块*/
function getFirstModule(topModuleId) {
    var orgFid=$("#fid").val();
    var userTypeId=$("#userTypeId").val();
    var ageGroupId=$("#ageGroupId").val();

    if(orgFid!='' && orgFid!=null && userTypeId!='' && userTypeId!=null && ageGroupId!='' && ageGroupId!=null){
        $("#topModuleId").removeAttr("disabled");
        var transfer={"fid":orgFid,"ageGroupId":ageGroupId,"userTypeId":userTypeId};
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

/*查询二级模块*/
function getChildModule(topModuleId,childModuleId) {
    if(topModuleId != "" && topModuleId != undefined){
        var pid = topModuleId;
    }else{
        var pid = $("#topModuleId").val();
    }
    var userTypeId = $("#userTypeId").val();
    var ageGroupId = $("#ageGroupId").val();
    if (pid != '' && pid != null) {
        $("#childModuleId").removeAttr("disabled");
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
                        htmls += "<option value='"+modules.id+","+modules.resType+"'>" + modules.name + "</option>";
                    });
                }
                $("#childModuleId").html(htmls);
                $("#childModuleId").val(childModuleId);
                $("#classifyId").html("<option value=''>全部</option>");
            }
        });
    }else{
        $("#childModuleId").html("<option value=''>全部</option>");
    }
}

function getGrade() {
    if($("#ageGroupId").val()!=''&&$("#ageGroupId").val()!=null){
        var htmls="<option value=\'\'>全部</option>";
        if($("#ageGroupId").val()==1){
            htmls+="<option value=1>1年级</option>";
            htmls+="<option value=2>2年级</option>";
            htmls+="<option value=3>3年级</option>";
            htmls+="<option value=4>4年级</option>";
            htmls+="<option value=5>5年级</option>";
            htmls+="<option value=6>6年级</option>";


        }
        if($("#ageGroupId").val()==2){

            htmls+="<option value=7>7年级</option>";
            htmls+="<option value=8>8年级</option>";
            htmls+="<option value=9>9年级</option>";

        }
        if($("#ageGroupId").val()==3){
            htmls+="<option value=10>10年级</option>";
            htmls+="<option value=11>11年级</option>";
            htmls+="<option value=12>12年级</option>";

        }
        $("#gradeId").html(htmls);
    }
}

/*查询分类*/
function getClassify(childModuleId,classifyId) {
    if(childModuleId != "" && childModuleId != undefined){
        var moduleId = childModuleId.split(',')[0];
    }else{
        var moduleId = $("#childModuleId").val().split(',')[0];
    }

    if (moduleId != '' && moduleId != null) {
        $("#fileUpModuleId").val(moduleId);//向文件传输模块中一级模块ID中赋值
        $("#inputRes").removeAttr("disabled");
        $("#classifyId").removeAttr("disabled");
        $.ajax({
            url: ctx + "/admin/pltresClassify/getByModuleId2",
            type: "POST",
            dataType: 'json',
            data: {"moduleId": moduleId},
            async:false,
            success: function (data) {
                var htmls = "<option value=''>全部</option>";
                if (data.data.list.length > 0) {
                    $.each(data.data.list, function (index, classify) {
                        htmls += "<option value='" + classify.id + "'>" + classify.name + "</option>";
                    });
                }
                $("#classifyId").html(htmls);
                $("#classifyId").val(classifyId);
                judge(moduleId);
            }
        });
    }else {
        $("#classifyId").html("<option value=''>全部</option>");
        judge(moduleId);
    }
}

function judge(moduleId) {
    if(moduleId!=null&&moduleId!='') {
        if (moduleId >= 7000 || $("#isNormalOrg").val() == 'true') {
            $("#inputRes").removeAttr("disabled");
        }
    }
     else {
        $("#inputRes").attr("disabled","disabled");
    }
}







