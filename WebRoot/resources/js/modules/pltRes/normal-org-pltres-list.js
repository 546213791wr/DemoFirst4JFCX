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
        var id = $(this).attr("data-id");
        var resType = $(this).attr("data-resType");
        var resName = $(this).attr("data-resName");
        loadPage(ctxPath +"/admin/pltRes/update-normal-org-pltres-list?resType="+resType+"&resName="+resName+"&pltresId="+id);
    });

    /** 新增 */
    $("#addPltres").click(function () {
        var resType = $(this).attr("data-resType");
        var resName = $(this).attr("data-resName");
        loadPage(ctxPath +"/admin/pltRes/add-normal-org-pltres-list?resType="+resType+"&resName="+resName);
    });

    /** 删除 */
    $("a[data-name='delete']").click(function () {
        var resId = $(this).attr("data-id");
        var classifyId = $(this).attr("data-classifyId");
        $.getJSON(ctxPath +"/admin/pltRes/delete-classify-pltres", {"resId":resId,"classifyId": classifyId}, function (data) {
            if(data.code == "1"){
                $("#tr"+resId).remove();
            }
        });
    });

    /**禁/启用*/
    $("a[data-name='operateBtn']").click(function () {
        var id = $(this).attr("data-id");
        var status = $(this).attr("data-status");
        var operateStatus = status == 1 ? 0 : 1;
        $.getJSON(ctxPath +"/admin/pltRes/update-pltres-status", {"id":id,"status": operateStatus}, function (data) {
            if(data.code == "1"){
                var operateAfterName = data.data.pltreStatus == "1" ? "禁用" : "启用";
                $("#operateBtn"+id).html(operateAfterName);
                $("#operateBtn"+id).attr("data-status",data.data.pltreStatus);
            }
        });
    });

});