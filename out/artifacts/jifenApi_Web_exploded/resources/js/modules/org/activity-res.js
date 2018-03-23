
$(document).ready(function(){
    $("#searchB").click(function(){
        var url = $("#searchForm").attr("action");
        var name = $(".orgName").val();
        if(name == ""){
            $(".orgFid").val("");
        }
        loadPage(url,null,$("#searchForm").serializeObject());
    });

    /** 删除 活动*/
    $("a[data-name='deleteActivity']").click(function(){
        id = $(this).attr("data-id");
        confirm("确定删除该活动?", function(){
            var params = {"id": id};
            ajaxRequest(ctxPath +"/admin/pltresClassify/deleteActivity", params, function(data){
                if(data.code==1){
                    showSuccess("删除活动成功", function(){
                        $("#searchB").click();
                        closeAllLayer();
                    });
                }else {
                    showError("删除活动出错");
                }
            }, function(){
                showError("删除活动出错");
            });
        }, function(){
        });
    });

    /** 修改活动 */
    $("a[data-name='modifyActivity']").on('click',function(){
        var id=$(this).attr("data-id");
        var orgName=$(this).attr("data-orgName");
        var orgFid=$(this).attr("data-orgFid");
        var isNormalOrg=$(this).attr("data-isNormalOrg");
        loadPage(ctxPath + "/admin/pltresClassify/toUpdateActivity?id=" + id+"&orgName="+orgName+"&orgFid="+orgFid+"&isNormalOrg="+isNormalOrg);
    });

    $("#addActivity").click(function () {
        var orgFid=$("#orgFid").val();
        var orgName=$("#orgName").val();
        var isNormalOrg=$(this).attr("data-isNormalOrg");
        var jsonData={"orgFid":orgFid,"orgName":orgName,"isNormalOrg":isNormalOrg};
        loadPage(ctxPath+"/admin/pltresClassify/to-add-activity",null,jsonData);
    })

});

/*查询机构*/
function query() {
    var name = $(".orgName").val();
    var htmls = "";
    $(".query-list").css('display','block');
    $.getJSON("/front/org/query", {query: name}, function (data) {
        if(data.data.list.length>0){
            $.each(data.data.list, function (index, org) {
                htmls += '<dd><a href="javascript:;" onclick="chooseOrg(' + org.fid + ',\'' + org.orgName + '\')">' + org.orgName + '</a></dd>';
            });
        }else{
            htmls += '<dd><span>无搜索结果</span></dd>';
        }
        $(".query-list").html(htmls);
        $(".query-list").css("display","block");
    });
}
function doQuery(value) {
    if(value!=''){
        query();
    }
}

function chooseOrg(fid, name) {
    $(".orgFid").val(fid);
    $(".orgName").val(name);
    $(".query-list").css("display","none");
}











