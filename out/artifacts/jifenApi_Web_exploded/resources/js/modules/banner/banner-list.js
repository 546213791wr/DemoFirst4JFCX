
$(document).ready(function(){
    $("#searchC").click(function(){
        var url = $("#searchForm").attr("action");
        var name = $(".orgName").val();
        if(name == ""){
            $(".orgFid").val("");
        }
        loadPage(url,null,$("#searchForm").serializeObject());
    });

    $("#addPicture").click(function () {
        var orgFid=$("#orgFid").val();
        var userTypeId=$("#userTypeId").val();
        var ageGroupId=$("#ageGroupId").val();
        var type=$("#type").val();
        var orgName=$("#orgName").val();
        var isNormal=$("#isNormal").val();
        var jsonData={"orgFid":orgFid,"orgName":orgName,
            "userTypeId":userTypeId,"ageGroupId":ageGroupId,"type":type,"isNormal":isNormal};
        loadPage(ctxPath + "/admin/banner/to-add-banner",
                ctxPath + "/admin/banner/banner-list?orgFid=" + orgFid + "&orgName=" + orgName + "&userTypeId=" + userTypeId+"&ageGroupId="+ageGroupId+"&type="+type+"&isNormal="+isNormal,
               jsonData);
    })

    /** 轮播图禁用*/
    $("a[data-name='status']").click(function(){
        var id = $(this).attr("data-id");
        var status=$(this).attr("data-status");
        var operate = status == "1" ? "启用" : "禁用";
        var params = {"id": id,"status":status};
        ajaxRequest(ctxPath + "pltresClassify/update-carousel-status", params, function(data){
            if(data.code==1){
                showSuccess(operate+"成功", function(){
                    $("#searchC").click();
                    closeAllLayer();
                });
            }else{
                showError(operate+"出错");
            }
        }, function(){
            showError(operate+"出错");
        });
    });

    /** 修改图片 */
    $("a[data-name='modifyCarousel']").on('click',function(){
        var id=$(this).attr("data-id");
        var orgName=$(this).attr("data-orgName");
        var fid=$(this).attr("data-fid");
        var userTypeId=$(this).attr("data-userTypeId");
        var ageGroupId=$(this).attr("data-ageGroupId");
        var type=$(this).attr("data-type");
        var carouselUrl=$(this).attr("data-carouselUrl");
        var isNormal=$("#isNormal").val();
        loadPage(ctxPath + "/admin/banner/to-update-banner?id=" + id +"&isNormal="+isNormal+ "&orgName=" + orgName + "&fid=" + fid + "&userTypeId=" + userTypeId + "&ageGroupId=" + ageGroupId + "&type=" + type + "&carouselUrl=" + carouselUrl,
            ctxPath + "/admin/banner/banner-list?&orgFid=" + fid +"&isNormal="+isNormal+ "&orgName=" + orgName + "&userTypeId=" + userTypeId + "&ageGroupId=" + ageGroupId + "&type=" + type);
    });

    /** 删除 图片*/
    $("a[data-name='deleteCarousel']").click(function(){
        id = $(this).attr("data-id");
        confirm("确定删除该图片?", function(){
            var params = {"id": id};
            ajaxRequest(ctxPath +"/admin/pltresClassify/delete-carousel", params, function(data){
                if(data.code==1){
                    showSuccess("删除图片成功", function(){
                        $("#searchC").click();
                        closeAllLayer();
                    });
                }else {
                    showError("删除图片出错");
                }
            }, function(){
                showError("删除图片出错");
            });
        }, function(){
        });
    });

    /**
     *修改排序
     */
    $("a[data-name='updateSequnce']").click(function (){
        var currentSequnce=parseInt($(this).attr("data-currentSequnce"));
        var id=parseInt($(this).attr("data-id"));
        var chooseSequnce=$("#chooseSequnce"+id).val();

        var r = /^[0-9]*[1-9][0-9]*$/;　　//正整数
        var flag=r.test(chooseSequnce);
        if(!flag){
            alert("请输入正确的序号！");
            $("#chooseSequnce"+currentSequnce).val(currentSequnce);
            return;
        }
        if(chooseSequnce==currentSequnce){
            showError("请输入与原排序不同的数字");
        }
        if(chooseSequnce>=0&&chooseSequnce!=currentSequnce){
            var params = {"id": id,"chooseSequnce": chooseSequnce};
            ajaxRequest(ctxPath +"/admin/pltresClassify/update-carousel-sequnce", params, function(data){
                if(data.code==1){
                    showSuccess("修改排序成功", function(){
                        closeAllLayer();
                        $("#searchC").click();
                    });
                }else if("error" == data.msg){
                    showError("修改排序出错");
                }else if("failure" == data.msg){
                    showError("修改排序失败");
                }else{
                    showError(data.msg);
                }
            }, function(){
                showError("修改排序出错");
            });}
    });

});

/*查询机构*/
function query() {
    var name = $(".orgName").val();
    var htmls = "";
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

function chooseOrg(fid, name) {
    $(".orgFid").val(fid);
    $(".orgName").val(name);
    $(".query-list").css("display","none");
}
function doQuery(value) {
    if(value!=''){
        query();
    }
}











