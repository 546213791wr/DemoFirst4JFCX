/**
 * 
 */
$(document).ready(function(){
	
	trHover();
	//查询

	/** 删除 */
	$("a[data-name='delete']").click(function(){
		
		pltresClassifyId = $(this).attr("data-classifyId");
	    moduleId=$(this).attr("data-moduleId");
	    /*String moduleName,Integer ageGroupId*/
        moduleName=$(this).attr("data-moduleName");
        ageGroupId=$(this).attr("data-ageGroupId");
		confirm("确定删除该分类?", function(){
			var params = {"pltresClassifyId": pltresClassifyId};
			
			ajaxRequest( ctxPath +"/admin/pltresClassify/deletePltresClassify", params, function(data){
				 if(data.code==1){
                	showSuccess("删除分类成功", function(){
                	    $("#tr"+pltresClassifyId).remove();
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	
                	showError("删除分类出错");
                }else if("failure" == data.msg){
                	
                	showError("删除分类失败");
                }else{
                	
                	showError(data.msg);
                }
			}, function(){
				
				showError("删除分类出错");
			});
		}, function(){
			
		});
	});
    
    /** 修改分类*/
    $("a[data-name='modify']").click(function(){
        var moduleId=$(this).attr("data-moduleId");
        var id=$(this).attr("data-classifyId");
        var moduleName=$(this).attr("data-moduleName");
        var childModule=$(this).attr("data-childModule");
        var fid=$(this).attr("data-fid");
        var topModuleId=$(this).attr("data-topModuleId");
        layer.open({
            type: 2,
            title: '修改分类',
            shade: 0.8,
            area: ['500px', '500px'],
            content: ctxPath + "/admin/pltresClassify/toUpdatePltresClassify?id="+ id+"&moduleId="+moduleId+"&moduleName="
            +moduleName+"&childModule="+childModule+"&fid="+fid+"&topModuleId="+topModuleId //iframe的url
        });
    });

    /** 新增分类 */
    $("a[data-name='addClassify']").click(function(){
        var moduleId=$(this).attr("data-moduleId");
        var moduleName=$(this).attr("data-moduleName");
        var childModule=$(this).attr("data-childModule");
        var orgName=$(this).attr("data-orgName");
        var childModuleId=$(this).attr("data-childModuleId");
        var ageGroupId=$(this).attr("data-ageGroupId");
        var userTypeId=$(this).attr("data-userTypeId");
        var fid=$(this).attr("data-fid");
        var topModuleId=$(this).attr("data-topModuleId");
        layer.open({
            type: 2,
            title: '新增分类',
            shade: 0.8,
            area: ['500px', '500px'],
            content: ctxPath + "/admin/pltresClassify/to-add-pltresClassify?moduleId="+moduleId+"&moduleName="
            +moduleName+"&childModule="+childModule +"&orgName="+orgName+"&childModuleId="+childModuleId+"&ageGroupId="+ageGroupId+"&userTypeId="+userTypeId
            +"&fid="+fid+"&topModuleId="+topModuleId

        });
    });


    /**修改排序*/
    $("a[data-name='updateSequnce']").click(function (){
        var currentSequnce=parseInt($(this).attr("data-currentSequnce"));
        var id=$(this).attr("data-id");
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
            var childModuleId=parseInt($("#childModuleId").val());
            var params = {"id": id,"chooseSequnce": chooseSequnce};
            ajaxRequest(ctxPath +"/admin/pltresClassify/update-classify-sequnce", params, function(data){
                if(data.code==1){
                    showSuccess("修改排序成功", function(){
                        closeAllLayer();
                        $("#classifyList").click();
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

function updateClassisfy(classId,className) {
    $("#tr"+classId).children("td").eq(2).html(className);
}
