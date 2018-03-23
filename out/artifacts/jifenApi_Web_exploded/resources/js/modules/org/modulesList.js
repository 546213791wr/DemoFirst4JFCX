/**
 * 
 */
$(document).ready(function(){
	
	trHover();
	//查询
	$("#searchA").click(function(){
		var url = $("#searchForm").attr("action");
		console.log($("#searchForm").serializeObject());
        loadPage(url, null, $("#searchForm").serializeObject());
	});

	/** 删除 */
	$("a[data-name='delete']").click(function(){
        pmoId = $(this).attr("data-pmoId");
        confirm("确定删除该模块?", function(){
			var params = {"pmoId": pmoId};
            ajaxRequest(ctxPath +"/admin/module/deleteModule", params, function(data){
                 if(data.code==1){
                     showSuccess("删除模块成功", function(){
                         $("#searchA").click();
                         closeAllLayer();
                    });
                }else if("error" == data.msg){

                    showError("删除模块出错");
                }else if("failure" == data.msg){

                    showError("删除模块失败");
                }else{

                    showError(data.msg);
                }
            }, function(){

                showError("删除模块出错");
            });
		}, function(){
			
		});
	});
	/** 查看二级模块 */
	$("a[data-name='check-modules']").click(function(){

        var id = $(this).attr("data-id");
        var userTypeId = $(this).attr("data-userTypeId");
        var ageGroupId= $(this).attr("data-ageGroupId");
        var orgName=$(this).attr("data-orgName");
        var moduleName=$(this).attr("data-moduleName");
        var fid=$(this).attr("data-fid");
        var topModuleId=$(this).attr("data-id");
        var obj= {"id":id,"userTypeId":userTypeId,"ageGroupId":ageGroupId,"orgName":orgName,"moduleName":moduleName,"fid":fid,"topModuleId":topModuleId};

        loadPage(ctxPath + "/admin/module/getChildByPid", null,obj);
	});


    /** 修改模块 */
    $("a[data-name='modify']").click(function(){
        var moduleId=$(this).attr("data-moduleId");
        var orgName=$(this).attr("data-orgName");

        var sOrgName = $("#orgName").val();
        var userTypeId = $("#userTypeId").val();
        var ageGroupId = $("#ageGroupId").val();
        var topModuleId = $("#topModuleId").val();
        var fid = $("#fid").val();

        loadPage(ctxPath + "/admin/org/toUpdateModule?moduleId=" + moduleId + "&orgName=" + orgName,
            ctxPath + "/admin/org/getModules?fid=" + fid + "&orgName=" + sOrgName + "&userTypeId=" + userTypeId + "&ageGroupId=" + ageGroupId + "&topModuleId=" + topModuleId);
    });

    /** 新增模块 */
    /*$("a[data-name='addModule']").click(function(){
        var orgName = $("#orgName").val();
        var userTypeId = $("#userTypeId").val();
        var ageGroupId = $("#ageGroupId").val();
        var topModuleId = $("#topModuleId").val();
        var fid = $("#fid").val();
        loadPage(ctxPath +"/admin/org/to-add-org-module",
                 ctxPath + "/admin/org/getModules?fid=" + fid + "&orgName=" + orgName + "&userTypeId=" + userTypeId + "&ageGroupId=" + ageGroupId + "&topModuleId=" + topModuleId
            ,$("#searchForm").serializeObject());
    });*/

/** 关联模块*/
    $("a[data-name='relevanceModule']").click(function(){
        var fid=$("#fid").val();
        var orgName=$("#orgName").val();
        var userTypeId=$("#userTypeId").val();
        var ageGroupId=$("#ageGroupId").val();
        layer.open({
            type: 2,
            title: '关联标准模块',
            shade: 0.8,
            area: ['600px', '500px'],
            content: ctxPath + "/admin/org/to-relevance-module?fid="+fid+"&orgName="+orgName+"&userTypeId="+userTypeId+"&ageGroupId="+ageGroupId
        });
});
});

function reload(){
    $("#searchA").click();
}

function updataTopModule(moduleId,userTypeId,ageGroupId){
    var userType;
    var ageGroup;

    if(userTypeId == 1){
        userType = "学生";
    }else if(userTypeId == 2){
        userType = "教师"
    }

    if(ageGroupId == 1){
        ageGroup = "小学";
    }else if(ageGroupId == 2){
        ageGroup = "初中"
    }else if(ageGroupId == 3){
        ageGroup = "高中"
    }

    $("#tr"+moduleId).children("td").eq(2).html(userType);
    $("#tr"+moduleId).children("td").eq(3).html(ageGroup);
}


/*查询机构*/
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
