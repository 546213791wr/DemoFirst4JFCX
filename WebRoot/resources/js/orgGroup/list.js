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
function toGroupOrgList(gid){
    loadPage(ctxPath + "/admin/org/list?gid="+gid);
}

function search(){
    var url = $("#searchForm").attr("action");
    loadPage(url, null, $("#searchForm").serializeObject());
}