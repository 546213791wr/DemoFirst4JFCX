
$(document).ready(function(){
    $("#searchA").click(function(){
        var url = $("#searchForm").attr("action");
        loadPage(url,null,$("#searchForm").serializeObject());
    });

    /** 禁/启用 状态*/
    $("a[data-name='status']").on('click',function(){
        var id = $(this).attr("data-id");
        var params={"id":id};
        var status=$(this).attr("data-status");
        var operate = status == "1" ? "启用" : "禁用";
        ajaxRequest(ctxPath +"/admin/option/updateStatus", params, function(data){
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
    /** 修改*/
    $("a[data-name='update']").on('click',function(){
        var reResName=$("#reResName").val();
        var questionId = $(this).attr("data-id");
        var resId=$("#id").val();
        var params={"questionId":questionId,"reResName":reResName,"resId":resId};
        loadPage(ctxPath +"/admin/option/to-update-question",null, params);
    });

    /** 新增*/
    $("#add").click(function () {
        var reResName=$("#reResName").val();
        var resId = $("#id").val();
        var params={"resId":resId,"reResName":reResName};
        loadPage(ctxPath +"/admin/option/to-add-question",null, params);
    });


    /** 批量新增*/
    $("#bulk-import").click(function () {
            layer.open({
                type: 2,
                title: '导入题库',
                shade: 0.8,
                area: ['500px', '300px'],
                content: ctxPath + "/admin/option/bulk-import"
            });

    });

    /*导入资源,批量导入 end*/

});

/*查询机构*/
function query() {
    var name = $("#reResName").val();
    var htmls = "";
    $("#query-list").css('display','block');
    $.getJSON("/admin/option/query-list", {query: name}, function (data) {
        if(data.data.list.length>0){
            $.each(data.data.list, function (index, res) {
                htmls += '<dd><a href="javascript:;" onclick="chooseOrg(' + res.id + ',\'' + res.resName + '\')">' + res.resName + '</a></dd>';
            });
        }else{
            htmls += '<dd><span>无搜索结果</span></dd>';
        }
        $("#query-list").html(htmls);
        $("#query-list").css("display","block");
    });
}

function chooseOrg(id, resName) {
    $("#id").val(id);
    $("#reResName").val(resName);
    $("#query-list").css("display","none");
    $("#add").removeAttr('disabled');
}








