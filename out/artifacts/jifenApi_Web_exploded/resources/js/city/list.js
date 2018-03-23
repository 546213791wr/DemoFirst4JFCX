/**
 *
 */
$(document).ready(function(){
    trHover();


    //查询
    $("#searchA").click(function(){
        search();
    });

    /** 删除 */
    $("a[data-name='delete']").click(function(){
        id = $(this).attr("data-id");
        name = $("#name").val();
        confirm("确定删除该机构组?<br><span style='color: red'>(会删除机构组下的机构、年级、班级)</span>", function(){
            var params = {"id": id};
            ajaxRequest(ctxPath + "/admin/org-group/delete", params, function(data){
                if(data.code==1){

                    showSuccess("删除机构组成功", function(){
                        closeAllLayer();
                        loadPage(ctxPath + "/admin/org-group/list?name="+name);

                    });
                }else if("error" == data.msg){

                    showError("删除机构组出错");
                }else if("failure" == data.msg){

                    showError("删除机构组失败");
                }else{

                    showError(data.msg);
                }
            }, function(){

                showError("删除机构组出错");
            });
        }, function(){

        });
    });


    $("a[data-name='modify']").click(function(){
        var id = $(this).attr("data-id");
        loadPage(ctxPath + "/admin/org-group/to-edit?id="+id,ctxPath + "/admin/org-group/list?name="+$("#name").val());
    });

});


/**
 * 进入机构组机构列表页面
 * @param gid
 */
function toOrgList(code){
    loadPage(ctxPath + "/admin/org/listOrg?cityCode="+code);
}

function search(){
    var url = $("#searchForm").attr("action");
    var province=$("select[name='province']").val();
    var city=$("select[name='city']").val();
    var area=$("select[name='area']").val();
    var params={"area":area,"city":city,"province":province};
    loadPage(url, null, params);
}


/** 禁/启用 状态*/
$("a[data-name='city']").on('click',function(){
    var code = $(this).attr("data-code");
    var status=$(this).attr("data-status");
    var operate = status == "1" ? "启用" : "禁用";
    var params={"code":code,"status":status};
    ajaxRequest(ctxPath +"/admin/city/updateCityStatus", params, function(data){
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





