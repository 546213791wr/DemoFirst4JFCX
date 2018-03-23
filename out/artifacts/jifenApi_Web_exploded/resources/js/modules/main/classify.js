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



    $("#userTypeId").change(function () {
        if($("#userTypeId").val()!=''&&$("#ageGroupId").val()!=''){
            getModuleName();
        }
    });

    $("#ageGroupId").change(function () {
        if($("#userTypeId").val()!=''&&$("#ageGroupId").val()!=''){
            getModuleName();
        }
    });



	/** 删除 */
	$("a[data-name='delete']").click(function(){
		
        id = $(this).attr("data-id");

		confirm("确定删除该分类?", function(){
			var params = {"id": id};
			
			ajaxRequest(ctxPath +"/admin/main/delete-classify", params, function(data){
				 if(data.code==1){
                	showSuccess("删除分类成功", function(){
                        $("#tr"+id).remove();
                        var tem=parseInt($("#totalNum2").val());
                        $("#totalNum").html("共计"+(tem-1)+"条结果");
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

	/**新增*/
	$("#addC").click(function () {
        var fid=$("#fid").val();
        var orgName=$("#orgName").val();
        var userTypeId=$("#userTypeId").val();
        var ageGroupId=$("#ageGroupId").val();
        var pid=$("#pid").val();

        $("#fid-add").val(fid);
        $("#orgName-add").val(orgName);
        $("#userTypeId-add").val(userTypeId);
        $("#ageGroupId-add").val(ageGroupId);
        if(pid!=null&&pid!=''){
            getModuleName2(pid);
        }else{
            if(fid!=''&&userTypeId!=''&&ageGroupId!=''){
                getModuleName2();
            }
        }



    })

    /** 修改 */

    $("a[data-name='modify']").click(function () {
        var id=$(this).attr("data-id");
        var moduleName=$(this).attr("data-moduleName");
        var userTypeId=$(this).attr("data-userTypeId");
        var recommandName=$(this).attr("data-recommandName");
        var ageGroupId=$(this).attr("data-ageGroupId");
        var pid=$(this).attr("data-pid");
        var fid=$(this).attr("data-fid");
        var orgName=$(this).attr("data-orgName");
        $("#id").val(id);
        $("#moduleName-update").val(moduleName);
        var userType='';
        if(userTypeId==1){
            userType+="学生"
        }
        if(userTypeId==2){
            userType+="教师"
        }

        var ageGroup='';
        if(ageGroupId==1){
            ageGroup+="小学"
        }
        if(ageGroupId==2){
            ageGroup+="初中"
        }
        if(ageGroupId==3){
            ageGroup+="高中"
        }

        $("#fid-update").val(fid);
        $("#pid-update").val(pid);
        $("#orgName-update").val(orgName);
        $("#userTypeId-update-id").val(userTypeId);
        $("#userTypeId-update").val(userType);
        $("#recommandName-update").val(recommandName);
        $("#ageGroupId-update").val(ageGroup);
        $("#ageGroupId-update-id").val(ageGroupId);

    })


       var validator1 = $("#classify_form-add").validate({
        rules:{
            fid:{
                required:true
            },
            orgName:{
                required:true
            },
            recommandName:{
                required:true
            },
            userTypeId:{
                required:true
            },pid:{
                required:true
            }
        },
        errorClass: "help-inline",
        errorElement: "span",
        highlight:function(element, errorClass, validClass) {
            $(element).parents('.control-group').removeClass('success');
            $(element).parents('.control-group').addClass('error');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents('.control-group').removeClass('error');
            $(element).parents('.control-group').addClass('success');
        }
    });

    /** 新增 */
    $("#classify_form-add").on("submit", function() {
        ajaxForm(this, function(data) {
            if(data.code==1){
                showSuccess("新增分类成功", function(){
                    closeAllLayer();
                    $("#searchA").click();
                })
            }else if("error" == data.msg){
                showError("新增分类出错.");
            }else if("failure" == data.msg){
                showError("新增资分类失败.");
            }else{
                showError(data.msg);
            }
        }, function(){
            showError("新增分类出错.");
        });
        return false; // 阻止表单自动提交事件
    });

    $("#save1").click(function(){
        if(validator1.form()){
            $('#addClassify').modal('hide');
            $("#classify_form-add").submit();
        }
    });


    var validator2 = $("#classify_form-update").validate({
        rules:{
            recommandName:{
                required:true
            },id:{
                required:true
            }
        },
        errorClass: "help-inline",
        errorElement: "span",
        highlight:function(element, errorClass, validClass) {
            $(element).parents('.control-group').removeClass('success');
            $(element).parents('.control-group').addClass('error');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents('.control-group').removeClass('error');
            $(element).parents('.control-group').addClass('success');
        }
    });
    $("#classify_form-update").on("submit", function() {
        ajaxForm(this, function(data) {
            if(data.code==1){
                showSuccess("修改分类成功", function(){
                    closeAllLayer();
                    $("#searchA").click();
                })
            }else if("error" == data.msg){
                showError("修改分类出错.");
            }else if("failure" == data.msg){
                showError("修改资分类失败.");
            }else{
                showError(data.msg);
            }
        }, function(){
            showError("修改分类出错.");
        });
        return false; // 阻止表单自动提交事件
    });

    $("#save2").click(function(){
        if(validator2.form()){
            $('#updateClassify').modal('hide');
            $("#classify_form-update").submit();
        }
    });

    /**修改排序*/
    $("a[data-name='updateSequence']").click(function () {
        var currentSequence=parseInt($(this).attr("data-currentSequence"));
        var id=parseInt($(this).attr("data-id"));
        var chooseSequence=$("#chooseSequence"+id).val();
        var r = /^[0-9]*[1-9][0-9]*$/;　　//正整数
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
            ajaxRequest(ctxPath +"/admin/main/update-module-sequence", params, function(data){
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

function updateChildModuleDate(moduleId,moduleName) {
    $("#tr"+moduleId).children("td").eq(0).html(moduleName);
}


function getModuleName(pid){
    var userTypeId=$("#userTypeId").val();
    var fid=$("#fid").val();
    var ageGroupId=$("#ageGroupId").val();
    var htmls = "";
    $.getJSON("/admin/main/findModules",{"userTypeId":userTypeId,"fid":fid,"ageGroupId":ageGroupId}, function (data) {
        htmls +='<option value="">全部</option>';
        if(data.data.list.length>0){
            $.each(data.data.list, function (index, recommandType) {
                htmls+='<option value='+recommandType.id+'>'+recommandType.recommandName+'</option>'
            });
        }else{
            htmls += '<option value=""><span>无搜索结果</span></option>';
        }
    }).done(function (){
        $("#pid").html(htmls);
        $("#pid").val(pid);
    });
}

function getModuleName2(pid){
    var userTypeId=$("#userTypeId-add").val();
    var fid=$("#fid-add").val();
    var ageGroupId=$("#ageGroupId-add").val();
    var htmls ='';
    if(userTypeId!=''&&userTypeId!=null&&fid!=''&&fid!=null&&ageGroupId!=''&&fid!=null){
        $.getJSON("/admin/main/findModules",{"userTypeId":userTypeId,"fid":fid,"ageGroupId":ageGroupId}, function (data) {
            htmls +='<option value="">全部</option>';
            if(data.data.list.length>0){
                $.each(data.data.list, function (index, recommandType) {
                    htmls+='<option value='+recommandType.id+'>'+recommandType.recommandName+'</option>'
                });
            }else{
                htmls += '<option value=""><span>无搜索结果</span></option>';
            }
        }).done(function (){
            $("#pid-add").html(htmls);
            $("#pid-add").val(pid);
        });
    }

}
