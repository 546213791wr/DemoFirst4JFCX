/**
 * 
 */
$(document).ready(function(){
	trHover();


	//查询
	$("#searchA").click(function(){
        var url = $("#searchForm").attr("action");
        loadPage(url, null, $("#searchForm").serializeObject());
    });

    /** 添加 */
    $("#add").click(function(){
        var url = $("#searchForm").attr("action");
        loadPage(url, null, $("#searchForm").serializeObject());
    });

	/** 修改 */
	$("a[data-name='modify']").click(function(){
		var orgId = $(this).attr("data-orgId");
		var orgName=$("#orgName").val();
		var status=$("#status").val();
        var gid=$("#gid").val();
        var cityCode=$("#cityCode").val();
		loadPage(ctxPath + "org/to-update-org?OrgId=" + orgId+"&orgName="+orgName+"&status="+status+"&gid="+gid+"&cityCode="+cityCode);
	});
	/** 预览 */
	$("a[data-name='preview']").click(function(){
		var url =$(this).attr("data-domainUrl");
        window.open("http://"+url+".xueya.chaoxing.com/front/index");

    });
	/** 删除 */
	$("a[data-name='delete']").click(function(){
		
		orgId = $(this).attr("data-orgId");
        gid=$("#gid").val();
		confirm("确定删除该机构?", function(){
			var params = {"orgId": orgId};
             orgName=$("#orgName").val();
             status=$("#status").val();
			ajaxRequest(ctxPath + "/admin/org/delete-org", params, function(data){
				 if(data.code==1){
                	
                	showSuccess("删除机构成功", function(){
                		loadPage(ctxPath + "/admin/org/list?orgName="+orgName+"&status="+status+"&gid="+gid);
                		closeAllLayer();
                		
                	});
                }else if("error" == data.msg){
                	
                	showError("删除机构出错");
                }else if("failure" == data.msg){
                	
                	showError("删除机构失败");
                }else{
                	
                	showError(data.msg);
                }
			}, function(){
				
				showError("删除机构出错");
			});
		}, function(){
			
		});
	});

	/**修改状态*/
    $("a[data-name='Status']").click(function(){

        var orgId = $(this).attr("data-orgId");
        var params = {"acaId": orgId};

        ajaxRequest(ctxPath + "aca/toUpdateStatus", params, function(data){
            if(data.code==1){
                showSuccess("成功", function(){
                    loadPage(ctxPath + "aca/to-check-aca",null,{"fid":$("#fid").val()});
                    closeAllLayer();
                });
            }else if("error" == data.msg){

                showError("出错");
            }else if("failure" == data.msg){

                showError("失败");
            }else{

                showError(data.msg);
            }
        }, function(){

            showError("出错");
        });

	})


    /** 移除机构组 */
    $("a[data-name='remove']").click(function(){

        var gid = $(this).attr("data-gid");
        var orgId = $(this).attr("data-orgId");
        var params = {"orgId": orgId, "gid": gid};
        ajaxRequest(ctxPath + "org-group/removeOrg", params, function(data){
            if(data.code==1){
                showSuccess("移除成功",function(){
                    loadPage(ctxPath + "org/list",null,{"orgName":$("#orgName").val(),"status":$("#status").val(),"gid":$("#gid").val()});
                    closeAllLayer();
				});
            }else{
                showError(data.message);
            }
        }, function(){
            showError("移除出错");
        });
    });
});


function toSelect(cityCode) {
    layer.open({
        type: 2,
        title: '选择机构',
        shade: 0.8,
        area: ['700px', '325px'],
        content: ctxPath + "/admin/city/selectOrgByCode?cityCode=" + cityCode
    });
}

function toGradeList(aid){
    loadPage(ctxPath + "/admin/grade/listGra?aid="+aid);
}