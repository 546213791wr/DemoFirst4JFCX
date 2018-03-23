/**
 *
 */
$(document).ready(function () {
    $("#searchA").click(function () {
        var url = $("#searchForm").attr("action");
        loadPage(url, url, $("#searchForm").serializeObject());
    });
    $("#addRes").click(function () {
        loadPage(ctxPath + "/admin/reRes/to-add-reRes",null,$("#searchForm").serializeObject());
    });
    $("#bulk-import").click(function () {
            layer.open({
                type: 2,
                title: '导入资源',
                shade: 0.8,
                area: ['500px', '300px'],
                content: ctxPath + "/admin/reRes/bulk-import"
            });
        loadPage(ctxPath + "/admin/reRes/list",null,$("#searchForm").serializeObject());
    });
    $("a[data-name='modify']").click(function () {
        var id=$(this).attr("data-reResId");
        loadPage(ctxPath + "/admin/reRes/to-edit-reRes",null,{"id":id});
    });
    $("a[data-name='status']").click(function () {
        var id=$(this).attr("data-reResId");
        var classifyId=$("#classifyId").val();
        var level=$("#level").val();
        ajaxRequest(ctxPath + "/admin/reRes/change-status",{"id":id,"classifyId":classifyId,"level":level},function (data) {
            if(data.code==1){
                var level=data.data.level;
                var classifyId=data.data.classifyId;
                jsondata1={"level":level,"classifyId":classifyId}
                showSuccess("成功",function () {
                    loadPage(ctxPath + "/admin/reRes/list",null,jsondata1);
                    closeAllLayer();
                })
            }
        })
    });
    $("a[data-name='editQuestion']").click(function () {

        loadPage(ctxPath + "/admin/reRes/list",null,$("#searchForm").serializeObject());
    });
    
})