/**
 *
 */
$(document).ready(function(){

    //查询
    $("#searchB").click(function(){
        var url = $("#form").attr("action");
        var layerIndex = loading("加载中...");
        $("#orgList").load(url, $("#form").serializeObject(), function(response, status, xhr){
            closeLayer(layerIndex);
            if("error" == status){
                //加载出错时显示错误页面的信息
                $("#content").html(response);
            }else if("success" == status){
                urlHistory.referer = url;
            }
        });
    });

    /** 添加机构 */
    $("#select").click(function () {
        confirm("确定把选中机构添加到该机构组?", function () {
            var orgId = [];
            var gid = $("#gid").val();
            $("#selectForm").find('input[name="orgId"]:checked').each(function(){
                orgId.push($(this).val());
            });
            var param = {"gid":gid,"orgId":orgId.toString()};
            ajaxRequest(ctxPath + "/admin/org-group/select-org", param, function (data) {
                if (data.code == 1) {
                    showSuccess("添加机构成功", function (data) {
                        window.parent.search();
                        window.parent.closeAllLayer();
                    });
                } else {
                    showError("添加机构失败，" + data.message);
                }
            }, function () {
                showError("添加机构失败");
            });
        }, function () {

        });
    });


});
