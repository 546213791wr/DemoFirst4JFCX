/**
 * 
 */
$(document).ready(function(){
	trHover();



    $("#searchA").click(function(){
        var url = $("#searchForm").attr("action");
        console.log($("#searchForm").serializeObject());

        loadPage(url, null, $("#searchForm").serializeObject());

    });

    $("#add").click(function () {
        console.log($("#searchForm").serializeObject());
        loadPage(ctxPath+'/admin/main/to-add-res',null,$("#searchForm").serializeObject());
    })


    $("#userTypeId").click(function () {
        var userTypeId=$("#userTypeId").val();
        var ageGroupId=$("#ageGroupId").val();
        if(userTypeId!=''&&ageGroupId!=''&&userTypeId!=null&&ageGroupId!=null){
            getModuleName(userTypeId,ageGroupId);
        }else{
            $("#moduleId").html("<option value=\"\">全部</option>");
        }
        $("#typeId").html("<option value=\"\">全部</option>");
    });

    $("#ageGroupId").click(function () {
        var userTypeId=$("#userTypeId").val();
        var ageGroupId=$("#ageGroupId").val();
        if(userTypeId!=''&&ageGroupId!=''&&userTypeId!=null&&ageGroupId!=null){
            getModuleName(userTypeId,ageGroupId);
        }else{
            $("#moduleId").html("<option value=\"\">全部</option>");

        }
        $("#typeId").html("<option value=\"\">全部</option>");
    });

    $("#moduleId").click(function () {
        var moduleIdAndType=$("#moduleId").val();
        if(moduleIdAndType!=''){
            getTypeId(moduleIdAndType);
        }else{
            $("#typeId").html('<option value=\"\">全部</option>');
        }
    })

    /** 修改*/
    $("a[data-name='modify']").click(function () {
        var orgName=$(this).attr("data-orgName");
        var moduleName=$(this).attr("data-moduleName");
        var userTypeId=$(this).attr("data-userTypeId");
        var recommandName=$(this).attr("data-recommandName");
        var resName=$(this).attr("data-resName");
        var resType=$(this).attr("data-resType");
        var ageGroupId=$(this).attr("data-ageGroupId");
        var id=$(this).attr("data-id");
        var resId=$(this).attr("data-resId");
        var type=$(this).attr("data-type");
        var moduleId=$(this).attr("data-moduleId");
        var moduleIdAndType=moduleId+","+type;
        var isUpdate=1;
        var json={"orgName":orgName,"moduleName":moduleName,
            "userTypeId":userTypeId,"recommandName":recommandName,
            "resName":resName,"resType":resType,"ageGroupId":ageGroupId,"id":id,"resId":resId,"isUpdate":isUpdate,"moduleIdAndType":moduleIdAndType};
        loadPage(ctxPath+'/admin/main/to-add-res',null,json);
    });

	/** 删除 */
	$("a[data-name='delete']").click(function(){
		
        id = $(this).attr("data-id");

		confirm("确定删除该资源?", function(){
			var params = {"id": id};
			
			ajaxRequest(ctxPath +"/admin/main/delete-res", params, function(data){
				 if(data.code==1){
                	showSuccess("删除资源成功", function(){
                        $("#tr"+id).remove();
                        closeAllLayer();
                	});
                }else if("error" == data.msg){
                	
                	showError("删除资源出错");
                }else if("failure" == data.msg){
                	
                	showError("删除资源失败");
                }else{
                	
                	showError(data.msg);
                }
			}, function(){
				
				showError("删除资源出错");
			});
		}, function(){
			
		});
	});

    /**修改排序*/
    $("a[data-name='updateSequence']").click(function () {
        var currentSequence=parseInt($(this).attr("data-currentSequence"));
        var id=parseInt($(this).attr("data-id"));
        var chooseSequence=$("#chooseSequence"+id).val();
        var r = /^[0-9]*[1-9][0-9]*$/;　　//正整数 +0
        var flag=r.test(chooseSequence);
        if(!flag){
            alert("请输入正确的序号！");
            $("#chooseSequnce"+currentSequence).val(currentSequence);
            return;
        }
        if(chooseSequence==currentSequence){
            showSuccess("修改排序成功", function(){
                closeAllLayer();
            });
        }

        if(chooseSequence>=1&&chooseSequence!=currentSequence){

            var params = {"id": id,"chooseSequence": chooseSequence};
            ajaxRequest(ctxPath +"/admin/main/update-res-sequence", params, function(data){
                if(data.code==1){
                    showSuccess("修改排序成功", function(){
                        closeAllLayer();
                        $("#searchA").click();
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


function getModuleName(userTypeId,ageGroupId){
    var fid=$("#fid").val();
    var htmls = "";
    $.ajax({
        url : '/admin/main/findModules',
        method : 'post',
        data:{"userTypeId":userTypeId,"fid":fid,"ageGroupId":ageGroupId},
        async : false,
        success : function(data) {
            if(data.data.list.length>0){
                    htmls+='<option value="">全部</option>'
                $.each(data.data.list, function (index, recommandType) {
                    htmls+='<option value='+recommandType.id+','+recommandType.type+'>'+recommandType.recommandName+'</option>'
                });
            }else{
                htmls +='<option value="">全部</option>';
            }
            $("#moduleId").html(htmls);
        }})
}


function getTypeId(moduleIdAndType){

    var htmls = "";

    $.ajax({
        url : '/admin/main/getTypeId',
        method : 'post',
        data:{"moduleIdAndType":moduleIdAndType},

        async : false,
        success : function(data) {
            if(data.data.list.length>0){
                htmls+='<option value="">全部</option>'
                $.each(data.data.list, function (index, recommandType) {
                    htmls+='<option value='+recommandType.id+'>'+recommandType.recommandName+'</option>'
                });
            }else{
                htmls += '<option value="">全部</option>';
            }
            $("#typeId").html(htmls);
        }})

}

function chooseOrg(fid,name){
    $("#fid").val(fid);
    $("#orgName").val(name);
    $("#query-list").css('display','none');
}


function query() {
    var name = $("#orgName").val();
    $.getJSON("/front/org/query", {query: name}, function (data) {
        var htmls = "";
        if(data.data.list.length>0){
            $.each(data.data.list, function (index, org) {
                htmls += '<dd><a href="javascript:;" onclick="chooseOrg(' + org.fid + ',\'' + org.orgName + '\')">' + org.orgName + '</a></dd>';
            });
        }else{
            htmls += '<dd><span>无搜索结果</span></dd>';
        }
        $("#query-list").html(htmls);
        $("#query-list").css('display','block');

    });

}
