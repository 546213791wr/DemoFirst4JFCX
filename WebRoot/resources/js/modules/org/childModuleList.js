/**
 * 
 */
$(document).ready(function(){
	
	trHover();

	/** 删除 */
	$("a[data-name='delete']").click(function(){
		
        moduleId = $(this).attr("data-moduleId");

		confirm("确定删除该模块?", function(){
			var params = {"moduleId": moduleId};
			
			ajaxRequest(ctxPath +"/admin/module/deleteChildModule", params, function(data){
				 if(data.code==1){
                	showSuccess("删除模块成功", function(){
                        $("#tr"+moduleId).remove();
                        closeAllLayer();
                	});
                }else if("error" == data.msg){
                	
                	showError("删除模块出错");
                }else if("failure" == data.msg){
                	
                	showError("删除模块失败");
                }else{
                	
                	showError(data.msg);
                }
			}, function(){
				
				showError("删除模块出错");
			});
		}, function(){
			
		});
	});

    /** 自定义 */
    $("a[data-name='self-define']").click(function(){
        fidData = $(this).attr("data-fid");
        ageGroupId=$(this).attr("data-ageGroupId");
        userTypeId=$(this).attr("data-userTypeId");
        confirm("确定自定义该模块?（注:以后模块的维护须自行负责）", function(){
            var params = {"fid": fidData,"ageGroupId":ageGroupId,"userTypeId":userTypeId};
            ajaxRequest(ctxPath +"/admin/module/self-defineModule", params, function(data){
                modules=data.data.modules;
                if(data.code==1){
                    showSuccess("自定义模块成功", function(){
                        var jsonDate={'topModuleId':modules.id,'fid':$("#fid").val(),'id':modules.id,'userTypeId':modules.userTypeId,
                            'ageGroupId':modules.ageGroupId,'orgName':$("#orgName").val(),'moduleName':$("#moduleName").val()};
                        closeAllLayer();
                        loadPage(ctxPath+'/admin/module/getChildByPid',null,jsonDate);
                    });
                }else if("error" == data.msg){
                    showError("自定义模块出错");
                }else if("failure" == data.msg){
                    showError("自定义模块失败");
                }else{
                    showError(data.msg);
                }
            }, function(){
                showError("自定义模块出错");
            });
        }, function(){

        });
    });




	/** 分类*/
    $("a[data-name='normal']").click(function (){
        var moduleId = $(this).attr("data-moduleId");
        var orgName=$(this).attr("data-orgName");
        var moduleName=$(this).attr("data-moduleName");
        var userTypeId=$(this).attr("data-userTypeId");
        var ageGroupId=$(this).attr("data-ageGroupId");
        var childModuleId=$(this).attr("data-id");
        var fid=$(this).attr("data-fid");

        var params={"fid":fid,"topModuleId":moduleId,"childModuleId":childModuleId,"moduleName":moduleName,"ageGroupId":ageGroupId,"orgName":orgName,"moduleId":moduleId,"userTypeId":userTypeId};
        loadPage(ctxPath +"/admin/pltresClassify/getByModuleId",null,params);
	});

    /** 修改 */
    $("a[data-name='modify']").click(function(){
        var moduleId = $(this).attr("data-moduleId");
        var orgName=$(this).attr("data-orgName");
        var moduleName=$(this).attr("data-moduleName");
        var userTypeId=$(this).attr("data-userTypeId");
        var ageGroupId=$(this).attr("data-ageGroupId");
        var id=$(this).attr("data-id");
        var fid=$(this).attr("data-fid");
        var gradeType=$(this).attr("data-gradeType");
        layer.open({
            type: 2,
            title: '修改模块',
            shade: 0.8,
            area: ['600px', '700px'],
            content: ctxPath + "/admin/org/toUpdateChildModule?id="+id+"&moduleId="+moduleId+"&orgName="+orgName+"&moduleName="+moduleName+"&userTypeId="+userTypeId+"&ageGroupId="+ageGroupId+"&fid="+fid+"&gradeType="+gradeType //iframe的url

        });



    });

    /**修改状态*/
    $("a[data-name='Status']").click(function(){
        id = $(this).attr("data-id");
        var params = {"id": id};
         topModuleId=$(this).attr("data-topModuleId");
         fid=$(this).attr("data-fid");
         userTypeId=$(this).attr("data-userTypeId");
         ageGroupId=$(this).attr("data-ageGroupId");
         orgName=$(this).attr("data-orgName");
         moduleName=$(this).attr("data-moduleName");
        ajaxRequest(ctxPath + "module/to-update-status", params, function(data){
            if(data.code==1){
                showSuccess("成功", function(){
                    loadPage(ctxPath +"/admin/module/getChildByPid",null,
                        {'topModuleId':topModuleId,'fid':fid,'id':topModuleId,'userTypeId':userTypeId,
                            'ageGroupId':ageGroupId,'orgName':orgName,'moduleName':moduleName});
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

    });

    $("#addChildModule").click(function () {
        var moduleId = $(this).attr("data-moduleId");
        var orgName=$(this).attr("data-orgName");
        var moduleName=$(this).attr("data-moduleName");
        var userTypeId=$(this).attr("data-userTypeId");
        var ageGroupId=$(this).attr("data-ageGroupId");
        var fid=$(this).attr("data-fid");
        var topModuleId=$(this).attr("data-topModuleId");


        layer.open({
            type: 2,
            title: '新增二级模块',
            shade: 0.8,
            area: ['600px', '700px'],
            content: ctxPath + "/admin/org/to-add-module?moduleId="+moduleId+"&userTypeId="+userTypeId+"&ageGroupId="+ageGroupId+"&orgName="+orgName+"&moduleName="+moduleName+"&topModuleId="+topModuleId+"&fid="+fid
        });
    })

    // /** 新增 */
    // $("a[data-name='addChildModule']").click(function(){
    //     var moduleId = $(this).attr("data-moduleId");
    //     var orgName=$(this).attr("data-orgName");
    //     var moduleName=$(this).attr("data-moduleName");
    //     var userTypeId=$(this).attr("data-userTypeId");
    //     var ageGroupId=$(this).attr("data-ageGroupId");
    //     var fid=$(this).attr("data-fid");
    //     var topModuleId=$(this).attr("data-topModuleId");
    //
    //
    //     layer.open({
    //         type: 2,
    //         title: '新增二级模块',
    //         shade: 0.8,
    //         area: ['600px', '700px'],
    //         content: ctxPath + "/admin/org/to-add-module?moduleId="+moduleId+"&userTypeId="+userTypeId+"&ageGroupId="+ageGroupId+"&orgName="+orgName+"&moduleName="+moduleName+"&topModuleId="+topModuleId+"&fid="+fid
    //     });
    // });

    /**修改排序*/
    $("a[data-name='updateSequnce']").click(function (){
        var id = parseInt($(this).attr("data-id"));
        var currentSequnce=parseInt($(this).attr("data-currentSequnce"));
        var chooseSequnce=$("#chooseSequnce"+id).val();
        var r = /^[0-9]*[1-9][0-9]*$/;　　//正整数
        var flag=r.test(chooseSequnce);
        if(!flag){
            alert("请输入正确的序号！");
            $("#chooseSequnce"+currentSequnce).val(currentSequnce);
            return;
        }
        if(chooseSequnce==currentSequnce){
            showSuccess("修改排序成功", function(){
                closeAllLayer();
            });
        }

        if(chooseSequnce>=0&&chooseSequnce!=currentSequnce){
            var params = {"id": id,"chooseSequnce": chooseSequnce};
            ajaxRequest(ctxPath +"/admin/module/update-module-sequnce", params, function(data){
                if(data.code==1){
                    showSuccess("修改排序成功", function(){
                        closeAllLayer();
                        $("#childList").click();
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

function updateChildModuleDate(moduleId,moduleName) {
    $("#tr"+moduleId).children("td").eq(0).html(moduleName);
}
