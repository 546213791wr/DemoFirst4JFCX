

$(document).ready(function () {

    var validator = $("#resForm").validate({
        rules:{
            moduleName:{
                required:true
            },
            orgName:{
                required:true
            },
            userTypeId:{
                required:true
            },
            ageGroupId:{
                required:true
            },
            moduleId:{
                required:true
            },
            typeId:{
                required:true
            },
            resId:{
                required:true
            },
            resName:{
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

    $("#userTypeId").click(function () {
        var userTypeId=$("#userTypeId").val();
        var ageGroupId=$("#ageGroupId").val();
        if(userTypeId!=''&&ageGroupId!=''){
            getModuleName(userTypeId,ageGroupId);
        }
    })
    $("#ageGroupId").click(function () {
        var ageGroupId=$("#ageGroupId").val();
        var userTypeId=$("#userTypeId").val();
        if(ageGroupId!=''&&userTypeId!=''){
            getModuleName(userTypeId,ageGroupId);
        }
    })

    $("#moduleId").click(function () {
        var moduleIdAndType=$("#moduleId").val();
        if(moduleIdAndType!=''){
            getTypeId(moduleIdAndType);
        }
    })

    $("#save").click(function () {
        if(validator.form()){
            var id=$("#id").val();
            if(id!=''){
                updatePltRes(id);
            }else {
                addPltRes();
            }
        }
    })

    $("#findResName").click(function () {
        findResName();
    })
})

/** 动态生成下拉框 */
function chooseOrg(fid,name){
    $("#fid").val(fid);
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
                htmls += '<dd><a href="javascript:;" onclick="chooseOrg(' + org.fid + ',\'' + org.orgName + '\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + org.orgName + '</a></dd>';
            });
        }else{
            htmls += '<dd><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;无搜索结果</span></dd>';
        }
        $("#query-list").html(htmls);

        $("#query-list").addClass("is-show");
    });
}



function getResNameById(resId,type) {
    $.ajax({
        url : "/admin/pltRes/find-resName",
        data : {"resId":resId,"resType":type},
        type : "post",
        dataType:'json',
        async : false,
        success : function(data) {
            if(data.code==1){
                $("#resName").val(data.data.resName);
            } else{
               $("#resName").val("无查询结果");
           }

        }
    })
}


function updatePltRes(id) {
    var s=$("#resName").val();
    var topicId=$("#resId").val();
    if(isNaN(topicId)||topicId==""){
        alert("请输入正确资源ID");
        return;
    }
    if(s=="无查询结果"||s==''){
        alert("请输入正确资源ID");
        return;
    }else {
        var json={"id":id,"resId":topicId};
        ajaxRequest(ctxPath + "/admin/main/update-pltres", json, function (data) {
            if (data.code == 1) {
                var info=data.data.isUsed;
                if(info==""||info==null){
                    info="新增资源成功";
                    showSuccess(info, function () {
                        getBack();

                    });
                }else {
                    showError(info);
                }
            }
        })
    }
}


function addPltRes() {
    if($("#resName").val()=="无查询结果"){
        alert("请输入正确资源ID");
        return;
    }else {
        var str=$("#moduleId").val().split(",");
        var typeId = $("#typeId").val();
        var moduleId=str[0];
        if(str[1]==0){
            typeId=moduleId;
        }

        var dataId = $("#resId").val();

        var params = {"typeId": typeId, "dataId": dataId,"moduleId":moduleId};
        ajaxRequest(ctxPath + "/admin/main/save", params, function (data) {
            if (data.code == 1) {
                var info=data.data.isUsed;
                if(info==""||info==null){
                    info="新增资源成功";
                    showSuccess(info, function () {
                        getBack();

                    });
                }else {
                    showError(info);
                }

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
    }
}

    function findResName() {
         var resId=$("#resId").val();
         var moduleAndType=$("#moduleId").val().split(",");
         var type=moduleAndType[1];
         if(type==2){
             var info='';
             if(isNaN(resId)){
                 info+="请输入数字\n"
             }
             if(resId.length!=12){
                 info+="请输入12位数字"
             }
             if(info!=''){
                 alert(info);
                 return;
             }else {
                 getResNameById(resId,type);
             }
         }else{
             var info='';
             if(isNaN(resId)){
                 info+="请输入数字\n"
             }
             if(resId.length<8){
                 info+="请输入大于8位的数字"
             }
             if(info!=''){
                 alert(info);
                 return;
             }else {
                 getResNameById(resId,type);
             }
         }


}

function getModuleName(userTypeId,ageGroupId){
    var fid=$("#fid").val();
    var htmls = "";
    $.ajax({
        url : '/admin/main/findModules',
        method : 'post',
        data:{"userTypeId":userTypeId,"fid":fid,"ageGroupId":ageGroupId},
        async : false,
        success : function(data) {
            if(data.data.list.length>0){
                $.each(data.data.list, function (index, recommandType) {
                    htmls+='<option value='+recommandType.id+','+recommandType.type+'>'+recommandType.recommandName+'</option>'
                });
            }else{
                htmls += '<span>无搜索结果</span>';
            }
            $("#moduleId").html(htmls);
        }})
}

function getTypeId(moduleIdAndType){

    var htmls = "";

    $.ajax({
        url : '/admin/main/getTypeId',
        method : 'post',
        data:{"moduleIdAndType":moduleIdAndType},

        async : false,
        success : function(data) {
            if(data.data.list.length>0){
                $.each(data.data.list, function (index, recommandType) {
                    htmls+='<option value='+recommandType.id+'>'+recommandType.recommandName+'</option>'
                });
            }else{
                htmls += '<span>无搜索结果</span>';
            }
            $("#typeId").html(htmls);
        }})

}

/**
 * 取消
 */
function cancel(){
    getBack();
}

function  getBack() {
    loadPage(ctxPath + "/admin/main/res", null, null);
    closeAllLayer();
}


