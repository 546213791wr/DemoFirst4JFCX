

$(document).ready(function () {
    $("#topModuleId").click(function () {
        var topModuleId=$("#topModuleId").val();
        getChildModule(topModuleId);
    })
    $("#childModuleId").click(function () {
        var childModuleId=$("#childModuleId").val();
        getClassify(childModuleId);
    })
})

/** 动态生成下拉框 */
function chooseOrg(fid,name){
    $("#orgFid").val(fid);
    $("#orgName").val(name);
    $("#query-list").css('display','none');
}


function query() {
    var name = $("#orgName").val();
    $("#query-list").css('display','block');
    $.getJSON("/front/org/query", {query: name}, function (data) {
        var htmls = "";
        if(data.data.list.length>0){
            $.each(data.data.list, function (index, org) {
                htmls += '<dd style="margin-top: -8px;margin-left: -3px;width: 206px;height: 30px;background-color: white;"><a href="javascript:;" onclick="chooseOrg(' + org.fid + ',\'' + org.orgName + '\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + org.orgName + '</a></dd>';
            });
        }else{
            htmls += '<dd style="margin-top: -8px;margin-left: -3px;width: 206px;height: 30px;background-color: white;"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;无搜索结果</span></dd>';
        }
        $("#query-list").html(htmls);

        $("#query-list").addClass("is-show");
    });
}




function getFirstModule() {
    var orgFid=$("#orgFid").val();
    var userTypeId=$("#userTypeId").val();
    if (userTypeId=="全部"){
        userTypeId="";
    }
    var ageGroupId=$("#ageGroupId").val();
    if (ageGroupId=="全部"){
        ageGroupId="";
    }
    if(orgFid!=''&&orgFid!=null&&userTypeId!=''&&userTypeId!=null&&ageGroupId!=''&&ageGroupId!=null){
        var transfer={"fid":orgFid,"ageGroupId":ageGroupId,"userTypeId":userTypeId};
        $.ajax({
            url : ctx + "/admin/module/getByFidAndAgeGroupIdAndUserTypeId",
            type : "POST",
            dataType:'json',
            data : transfer,
            async:false,
            success : function(data) {
                var htmls = "";
                if(data.data.list.length>0){
                    htmls += "<option value=\"\">全部</option>";
                    $.each(data.data.list, function (index, modules) {
                        htmls += "<option data- value='"+modules.id+"'>"+modules.name+"</option>";
                    });
                }else{
                    htmls += "<option value=''>无一级模块</option>";
                    $("#childModuleId").html("<option value=''>无二级模块</option>")
                    $("#classifyId").html('无分类');
                }
                $("#topModuleId").html(htmls);
            },
            error : function() {
                alert("失败");
            }
        });
    }
}

function getChildModule() {
    var pid=$("#topModuleId").val();
    var userTypeId=$("#userTypeId").val();
    var ageGroupId=$("#ageGroupId").val();
    if(pid!=''&&pid!=null){
        $("#childModuleId").removeAttr("disabled");
        $.ajax({
            url : ctx + "/admin/module/getByPidAndAgeGroupIdAndUserTypeId",
            type : "POST",
            dataType:'json',
            data : {"pid":pid,"ageGroupId":ageGroupId,"userTypeId":userTypeId},
            async:false,
            success : function(data) {
                var htmls = "";
                if(data.data.list.length>0){
                    htmls += "<option value=\"\">全部</option>";
                    $.each(data.data.list, function (index, modules) {
                        htmls += "<option value='"+modules.id+","+modules.resType+"'>"+modules.name+"</option>";
                    });
                }else{
                    htmls += "<option value=''>无二级模块</option>";
                    $("#classifyId").html('无分类');
                }
                $("#childModuleId").html(htmls);
            },
            error : function() {
                alert("失败");
            }
        });


    }
}

function getClassify() {
    var childModuleId=$("#childModuleId").val();
    if(childModuleId!=''&&childModuleId!=null){
        var tem=childModuleId.split(",")[0];
        $.ajax({
            url : ctx + "/admin/pltresClassify/getByModuleId2",
            type : "POST",
            dataType:'json',
            data : {"moduleId":tem},
            async:false,
            success : function(data) {
                var htmls = "";
                if(data.data.list.length>0){
                    $.each(data.data.list, function (index, classify) {
                        htmls += "<input type=\"checkbox\" name=\"classify\" value='"+classify.id+"'/>"+classify.name;
                    });
                }else{
                    htmls += "<input value=''/>无分类";
                }
                $("#classifyId").html(htmls);
            },
            error : function() {
                alert("失败");
            }
        });
    }
}

function getGrade() {
    if($("#ageGroupId").val()!=''&&$("#ageGroupId").val()!=null){
        var htmls='';
        if($("#ageGroupId").val()==1){
            htmls+="<input type=\"checkbox\" name=\"grade\" value='"+1+"'/>"+"1年级";
            htmls+="<input type=\"checkbox\" name=\"grade\" value='"+2+"'/>"+"2年级";
            htmls+="<input type=\"checkbox\" name=\"grade\" value='"+3+"'/>"+"3年级";
            htmls+="<input type=\"checkbox\" name=\"grade\" value='"+4+"'/>"+"4年级";
            htmls+="<input type=\"checkbox\" name=\"grade\" value='"+5+"'/>"+"5年级";
            htmls+="<input type=\"checkbox\" name=\"grade\" value='"+6+"'/>"+"6年级";


        }
        if($("#ageGroupId").val()==2){

            htmls+="<input type=\"checkbox\" name=\"grade\" value='"+7+"'/>"+"7年级";
            htmls+="<input type=\"checkbox\" name=\"grade\" value='"+8+"'/>"+"8年级";
            htmls+="<input type=\"checkbox\" name=\"grade\" value='"+9+"'/>"+"9年级";

        }
        if($("#ageGroupId").val()==3){
            htmls+="<input type=\"checkbox\" name=\"grade\" value='"+10+"'/>"+"10年级";
            htmls+="<input type=\"checkbox\" name=\"grade\" value='"+11+"'/>"+"11年级";
            htmls+="<input type=\"checkbox\" name=\"grade\" value='"+12+"'/>"+"12年级";

        }
        $("#grade").html(htmls);
    }
}

function getResNameById() {
    var resId=$("#resId").val();
    var tem=$("#childModuleId").val();
    var resType=tem.split(',')[1];
    $.ajax({
        url : "/admin/pltRes/find-resName",
        data : {"resId":resId,"resType":resType},
        type : "post",
        dataType:'json',
        async:false,
        success : function(data) {
            if(data.code!=0){
                $("#id").val(data.description);
                $("#resName").val(data.data.resName);
            }else {
                $("#resId").html('');
                $("#resName").val("查无资源");
            }
        },
        error : function(){
            $("#resName").val("查无资源");
        }
    })
}

function savePltRes() {
    var resId = $("#resId").val();
    var pltresId = $("#resId").val();
    var grade = $("input[name='grade']");
    var s = '';
    for (var i = 0; i < grade.length; i++) {
        if (grade[i].checked) {
            s += grade[i].value + ',';
        }
    }
    var g = '';
    var classify = $("input[name='classify']");
    for (var j = 0; j < classify.length; j++) {
        if (classify[j].checked) {
            g += classify[j].value + ',';
        }
    }
    if($("#resName").val()==='查无资源'){
        alert("无资源信息");
        return;
    }
    if (resId != '' && g != '' && s != '') {
    var params = {"resClassifyId": g, "resId": resId, "grade": s, "pltresId": pltresId};
    ajaxRequest(ctxPath + "/admin/pltRes/save", params, function (data) {
        if (data.code == 1) {
            var isUsedClassify=data.data.isUsedClassify;
            var info="";
            if(isUsedClassify!=""){
                isUsedClassify+="分类已存在该资源";
                info+=isUsedClassify+"\n";
            }
            if(info==""){
                info="新增资源成功";
            }
            showSuccess(info, function () {
                var isNormalOrg = $("#save").attr("data-isNormalOrg");
                var fid = $("#orgFid").val();
                var orgName = $("#orgName").val();
                var userTypeId = $("#userTypeId").val();
                var ageGroupId = $("#ageGroupId").val();
                var topModuleId = $("#topModuleId").val();
                var childModuleId = $("#childModuleId").val();

                var jsonParams = {
                    "isNormalOrg": isNormalOrg,
                    "fid": fid,
                    "orgName": orgName,
                    "userTypeId": userTypeId,
                    "ageGroupId": ageGroupId,
                    "topModuleId": topModuleId,
                    "childModuleId": childModuleId
                };
                loadPage(ctxPath + "/admin/pltresClassify/org-read-res", null, jsonParams);
                closeAllLayer();
            });
        } else if ("error" == data.msg) {
            showError("新增资源出错");
        } else if ("failure" == data.msg) {
            showError("新增资源失败");
        } else {
            showError(data.msg);
        }
    }, function () {
        showError("新增资源出错");
    });
}else {
        showError("请输入全部新增的内容!");
    }
}

function findResName() {
    var resId = $("#resId").val();
    var info = '';
    if (isNaN(resId)) {
        info += "请输入数字\n"
    }
    if (resId.length < 8) {
        info += "请输入大于8位数字"
    }
    if (info != '') {
        alert(info);
        return;
    } else {
        getResNameById();
    }
}

function chooseAllClassify() {
    var classify=$("input[name='classify']");
    var flag=$("#chooseAllClassifyFlag").val();
    if(flag=='0'){
        for(var i=0; i<classify.length; i++){
            classify[i].checked=true;
        }
        $("#chooseAllClassifyFlag").val("1")
    }else {
        for(var j=0; j<classify.length; j++){
            classify[j].checked=false;
        }
        $("#chooseAllClassifyFlag").val("0")
    }
}

function chooseAllGrade() {
    var grade=$("input[name='grade']");

    var flag=$("#chooseAllGradeFlag").val();
    if(flag=='0'){
        for(var i=0; i<grade.length; i++){
            grade[i].checked=true;
        }
        $("#chooseAllGradeFlag").val("1")
    }else {
        for(var j=0; j<grade.length; j++){
            grade[j].checked=false;
        }
        $("#chooseAllGradeFlag").val("0")
    }
}

function getClean() {
        $("#topModuleId").html("<option value=''>全部</option>");
        $("#childModuleId").html("<option value=''>全部</option>");
        $("#classifyId").html("");

}