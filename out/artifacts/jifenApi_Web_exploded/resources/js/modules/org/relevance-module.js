/**
 *
 */
$(document).ready(function(){
    var validator = $("#module_form").validate({
        rules:{
            name:{
                required:true
            },
            resType:{
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


    $("#module_form").on("submit", function() {
		ajaxForm(this, function(data) {
            fid=data.data.fid;
            orgName=data.data.orgName;
            userTypeId=data.data.userTypeId;
            ageGroupId=data.data.ageGroupId;
            if(data.code==1){
            	showSuccess("关联模块成功", function(){
                    parent.loadPage(ctxPath + "/admin/org/getModules",null,{"fid":fid,"orgName":orgName,"userTypeId":userTypeId,"ageGroupId":ageGroupId});
                    parent.closeAllLayer();
            	});
            }else{
            	showError(data.message);
            }
        }, function(){
        	showError("关联模块出错");
        });
        return false; // 阻止表单自动提交事件
    });

    $("#save").click(function(){
        if(validator.form()){
            $("#module_form").submit();
        }
    });
});


function query() {
    var name = $("#orgName").val();
    var htmls = "";
    $.getJSON("/front/org/query", {query: name}, function (data) {
        if(data.data.list.length>0){
            $.each(data.data.list, function (index, org) {
                htmls += '<dd><a href="javascript:;" onclick="chooseOrg(' + org.fid + ',\'' + org.orgName + '\')">' + org.orgName + '</a></dd>';
            });
        }else{
            htmls += '<dd><span>无搜索结果</span></dd>';
        }
        $("#query-list").html(htmls);
        $("#query-list").css("display","block");
    });
}

function chooseOrg(fid, name) {
    $("#fid").val(fid);
    $("#orgName").val(name);
    $("#query-list").css("display","none");
}