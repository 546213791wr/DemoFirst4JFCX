/**
 *
 */
$(document).ready(function(){

    trHover();
    //查询
    $("#searchA").click(function(){
        var url = $("#searchForm").attr("action");
        loadPage(url, null, $("#searchForm").serializeObject());
    });
    /** 修改 */
    $("a[data-name='modify']").click(function(){
        var userId = $(this).attr("data-userId");
        loadPage(ctxPath + "/admin/user-detail/to-edit-user?id=" + userId, ctxPath + "/admin/user-detail/list");
    });

    /** 修改用户密码 */
    $("a[data-name='modifyPwd']").click(function(){
        var userId = $(this).attr("data-userId");

        layer.confirm("确定重置该用户密码?", {
            btn : [ '确定', '取消' ],// 按钮
            icon: 3
        }, function(index) {
            closeLayer(index);
            var params = {"userId": userId};
            ajaxRequest(ctxPath + "/admin/user/toResertPassword", params, function(data){
                if(data.code==1){
                    showSuccess("重置密码成功", function(){
                        loadPage(ctxPath + "/admin/user/list");
                        closeAllLayer();
                    });
                }else if("error" == data.msg){
                    showError("重置密码出错");
                }else if("failure" == data.msg){
                    showError("重置密码出错");
                }else{
                    showError(data.msg);
                }
            }, function(){
                showError("重置密码出错");
            });
        }, function(index) {
            closeLayer(index);
        });

    });
    /** 删除 */
    $("a[data-name='delete']").click(function(){
        userId = $(this).attr("data-userId");
        confirm("确定删除该用户?", function(){
            var params = {"userId": userId};
            ajaxRequest(ctxPath + "/admin/user/deleteUser", params, function(data){
                if(data.code==1){
                    showSuccess("删除用户成功", function(){
                        loadPage(ctxPath + "/admin/user/list");
                        closeAllLayer();
                    });
                }else if("error" == data.msg){
                    showError("删除用户出错");
                }else if("failure" == data.msg){
                    showError("删除用户失败");
                }else{
                    showError(data.msg);
                }
            }, function(){
                showError("删除用户出错");
            });
        }, function(){

        });
    });
    /** 分配角色 */
    $("a[data-name='assign-roles']").click(function(){
        var userId = $(this).attr("data-userId");
        layer.open({
            type: 2,
            title: '用户分配角色',
            shade: 0.8,
            area: ['500px', '500px'],
            content: ctxPath + "/admin/user/toUserRole?userId=" + userId //iframe的url
        });
    });

    //机构
    $('#orgName').bind('input propertychange', function () {
        //进行相关操作
        var json = {'name': $('#orgName').val()};
        $.getJSON("/admin/org/getOrgListByName", json, function (data) {
            if (data.code == 1) {
                var htmls = "";
                if(data.data.list.length>0){
                    $.each(data.data.list,function (index, org) {
                        htmls += '<dd><a href="javascript:;" onclick="chooseOrg(' + org.fid + ',\'' + org.orgName + '\')">' + org.orgName + '</a></dd>';
                    })

                }else {
                    htmls += '<dd><span>无搜索结果</span></dd>';
                }
                $("#query-list-index").css('display','block');
                $("#query-list-index").html(htmls);
            }
        });
    });


    $('#gradeId').change(gradeChg);

});


/**
 * 选择机构
 * @param fid
 * @param orgName
 */
function chooseOrg(fid,orgName){
    $("#fid").val(fid);
    $("#orgName").val(orgName);
    $("#query-list-index").css('display','none');

    $("#gradeId").empty();
    $("#gradeId").append("<option value=''>请选择</option>");
    var json = {'fid': fid};
    $.getJSON("/admin/grade/getGradeListByFid", json, function (data) {
        if (data.code == 1) {
            if(data.data.list.length>0){
                $.each(data.data.list,function (index, e) {
                    $("#gradeId").append("<option value='"+e.id+"'>"+e.name+"</option>");
                });
                //年级设定后设定班级
                gradeChg();
            }
        }
    });
}


function gradeChg(){
    $("#classId").empty();
    $("#classId").append("<option value=''>请选择</option>");

    $('#ageGroupId').val('');
    var gradeId = $('#gradeId').val();
    if(gradeId == ''){
        return;
    }
    var json = {'gradeId': $('#gradeId').val()};
    $.getJSON("/admin/class/getClassListByGradeId", json, function (data) {
        if (data.code == 1) {
            if(data.data.list.length>0){
                $.each(data.data.list,function (index, e) {
                    $("#classId").append("<option value='"+e.id+"'>"+e.name+"</option>");
                })
            }
            $('#ageGroupId').val(data.data.grade.ageGroupId);
        }
    });
}