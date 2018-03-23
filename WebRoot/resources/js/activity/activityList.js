$(document).ready(function () {
    $("#searchC").click(function () {
        var url = $("#searchForm").attr("action");
        var name = $("#orgName").val();
        if (name == "") {
            $("#orgId").val("");
        }
        loadPage(url, null, $("#searchForm").serializeObject());
    });

    $("#addActivity").click(function () {
        /*var title=$("#title").val();
        var orgName=$("#orgName").val();
        var jsonData={"orgName":orgName,"title":title};*/
        loadPage(ctxPath + "/admin/activity/to-addOrUpdate-activity",
            ctxPath + "/admin/activity/to-addOrUpdate-activity", null);
    })


    /** 修改活动 */
    $("a[data-name='modifyActivity']").on('click', function () {
        var id = $(this).attr("data-id");
        var orgId = $(this).attr("data-orgId");
        var orgName = $(this).attr("data-orgName");
        var title = $(this).attr("data-title");
        var status = $(this).attr("data-status");
        var startTime = $(this).attr("data-startTime");
        var endTime = $(this).attr("data-endTime");
        var linkType = $(this).attr("data-linkType");
        var detailUrl = $(this).attr("data-detailUrl");
        var murl = $(this).attr("data-murl");
        var logoUrl = $(this).attr("data-logoUrl");
        var area = $(this).attr("data-area");

        var json = {
            "id": id,
            "orgId": orgId,
            "orgName": orgName,
            "title": title,
            "status": status,
            "startTimeStr": startTime,
            "endTimeStr": endTime,
            "logoUrl": logoUrl,
            "linkType": linkType,
            "detailUrl": detailUrl,
            "murl": murl,
            "area": area
        };
        loadPage(ctxPath + "/admin/activity/to-addOrUpdate-activity",
            ctxPath + "/admin/activity/to-addOrUpdate-activity", json);
    });

    /** 删除活动*/
    $("a[data-name='deleteActivity']").click(function () {
        id = $(this).attr("data-actId");
        confirm("确定删除该活动?", function () {
            var json = {"id": id};
            ajaxRequest(ctxPath + "/admin/activity/deleteActivity", json, function (data) {
                if (data.code == 1) {
                    showSuccess("删除活动成功", function () {
                        $("#searchC").click();
                        closeAllLayer();
                    });
                } else {
                    showError("删除活动出错");
                }
            }, function () {
                showError("删除活动出错");
            });
        }, function () {
        });
    });


});

/*查询机构*/
function query() {
    var orgName = $("#orgName").val();
    if (orgName != null && orgName != "") {
        var htmls = "";
        $.ajax({
            type: 'POST',
            url: "/admin/activity/getActivityByOrgName",
            data: {'orgName': orgName},
            success: function (data) {
                if (data.length > 0) {
                    $.each(data, function (index, org) {
                        htmls += '<dd><a href="javascript:;" onclick="chooseOrg(' + org.gid + ',\'' + org.orgName + '\')">' + org.orgName + '</a></dd>';
                    });
                } else {
                    htmls += '<dd><span onclick="closeIt()">无搜索结果</span></dd>';
                }
                $("#query").html(htmls);
                $("#query").css("display", "block");
            },
            dataType: 'json'
        });
    }

}
function closeIt() {
    $("#query").css("display", "none");
}
function closeIt2() {
    $("#queryActivity").css("display", "none");
}

function chooseOrg(fid, name) {
    $("#orgId").val(fid);
    $("#orgName").val(name);
    $("#query").css("display", "none");
}

/*查询活动*/
function queryActivity() {
    var htmls2 = "";
    var title = $("#title").val();
    if (title != null && title != "") {
        $.getJSON("/admin/activity/getActivityByTitle", {'title': title}, function (data) {
            if (data != null && data.length > 0) {
                $.each(data, function (index, activity) {
                    htmls2 += '<dd><a href="javascript:;" onclick="chooseAct(\'' + activity.title + '\')">' + activity.title + '</a></dd>';
                });
            } else {
                htmls2 += '<dd><span onclick="closeIt2()">无搜索结果</span></dd>';
            }
            $("#queryActivity").html(htmls2);
            $("#queryActivity").css("display", "block");
        });
    }

}

function chooseAct(title) {
    $("#title").val(title);
    $("#queryActivity").css("display", "none");
}

function doQuery(value) {
    if (value != '') {
        query();
    }
}

function doQueryTitle(value) {
    if (value != '') {
        queryActivity();
    }
}











