/**
 *
 */
$(document).ready(function(){
    var validator = $("#form").validate({
        rules:{
            orgName:{
                required:true
            },
            ageGroupId:{
                required:true
            },
            gradeId:{
                required:true
            },
            classId:{
                required:true
            },
            loginName:{
                required:true,
                remote:{
                    type:"POST",
                    url:"/admin/user-detail/checkLoginName", //请求地址
                    data:{
                        loginName:function(){ return $("#loginName").val();},
                        fid:function(){ return $("#fid").val();},
                        id: function(){ return $("#id").val(); }
                    }
                }
            },
            realName:{
                required:true
            },
            userTypeId:{
                required:true
            },
            email:{
                email: true,
                remote:{
                    type:"POST",
                    url:"/admin/user-detail/checkEmail", //请求地址
                    data:{
                        email: function(){ return $("#email").val(); },
                        id: function(){ return $("#id").val(); }
                    }
                }
            }
        },
        messages:{
            email:{
                remote:"邮箱已存在"
            },
            loginName:{
                remote:"当前机构已存在此登录名"
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
    $("#form").on("submit", function() {
        ajaxForm(this, function(data) {
            if(data.code == 1){
                showSuccess("修改用户成功", function(){
                    closeAllLayer();
                    backToPrePage();
                });
            }else{
                showError(data.msg);
            }
        }, function(){
            showError("修改用户出错.");
        });
        return false; // 阻止表单自动提交事件
    });

    $("#save").click(function(){
        if(validator.form()){
            $("#form").submit();
        }
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
                $("#query-list-user-add").css('display','block');
                $("#query-list-user-add").html(htmls);
            }
        });
    });

    $('#gradeId').change(gradeChg);

    $('#userTypeId').change(function () {
        var userTypeId = $('#userTypeId').val();
        if (userTypeId == 2) {
            $("#gradeId").rules("remove");
            $("#classId").rules("remove");
        } else {
            $("#gradeId").rules("add", {required: true});
            $("#classId").rules("add", {required: true});
        }
    });
});

function gradeChg(){
    $("#classId").empty();
    $('#ageGroupId').val('');
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

/**
 * 选择机构
 * @param fid
 * @param orgName
 */
function chooseOrg(fid,orgName){
    $("#fid").val(fid);
    $("#orgName").val(orgName);
    $("#query-list-user-add").css('display','none');

    $("#gradeId").empty();
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