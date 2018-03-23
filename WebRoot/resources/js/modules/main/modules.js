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

	/** 删除 */
	$("a[data-name='delete']").click(function(){
		
        id = $(this).attr("data-id");

		confirm("确定删除该模块?", function(){
			var params = {"id": id};
			
			ajaxRequest(ctxPath +"/admin/main/delete-module", params, function(data){
				 if(data.code==1){
                	showSuccess("删除模块成功", function(){
                        $("#tr"+id).remove();
                        var tem=parseInt($("#totalNum2").val());
                        $("#totalNum").html("共计"+(tem-1)+"条结果");
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

    var validator = $("#module_form-add").validate({
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
            },
            ageGroupId:{
                required:true
            },
            type:{
                required:true
            },pcMoreUrl:{
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

    /** 新增*/
    $("#module_form-add").on("submit", function() {
        ajaxForm(this, function(data) {
        if(data.code==1){
            showSuccess("新增资源成功", function(){
                closeAllLayer();
                $("#searchA").click();
                /*var userTypeId=$("#userTypeId-add").val();
                var fid=$("#fid-add").val();
                var orgName=$("#orgName-add").val();
                var ageGroupId=$("#ageGroupId-add").val();
                loadPage(ctxPath + "main/modules",null,{"userTypeId":userTypeId,"fid":fid,"orgName":orgName,"ageGroupId":ageGroupId});*/
            });
        }else if("error" == data.msg){
            showError("新增资源出错.");
        }else if("failure" == data.msg){
            showError("新增资源失败.");
        }else{
            showError(data.msg);
        }
    }, function(){
            showError("新增资源出错.");
        });
        return false; // 阻止表单自动提交事件
    });

    $("#save1").click(function(){
        if(validator.form()){
            $('#addModule').modal('hide');
            $("#module_form-add").submit();
        }
    });
        /** 修改模块*/
        $("a[data-name='modify']").click(function () {
            var type=$(this).attr("data-type");
            var id = $(this).attr("data-id");
            var pcMoreUrl=$(this).attr("data-pcMoreUrl");
            var userTypeId = $(this).attr("data-userTypeId");
            var recommandName=$(this).attr("data-recommandName");
            var fid=$(this).attr("data-fid");
            var orgName=$(this).attr("data-orgName");
            $("#id-update").val(id);
            $("#userTypeId-update").val(userTypeId);
            $("#type-update").val(type);
            $("#pcMoreUrl-update").val(pcMoreUrl);
            $("#recommandName-update").val(recommandName);
            $("#fid-update").val(fid);
            $("#orgName-update").val(orgName);
        });

    var validator1 = $("#module_form-update").validate({
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
            },
            ageGroupId:{
                required:true
            },
            type:{
                required:true
            },pcMoreUrl:{
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

    /**修改排序*/
    $("a[data-name='updateSequence']").click(function () {
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
            showSuccess("修改排序成功", function(){
                closeAllLayer();
            });
        }

        if(chooseSequnce>=0&&chooseSequnce!=currentSequnce){

            var params = {"id": id,"chooseSequence": chooseSequnce};
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



    /** 修改*/
    $("#module_form-update").on("submit", function() {
        ajaxForm(this, function(data) {
            if(data.code==1){
                showSuccess("修改资源成功", function(){
                    closeAllLayer();
                    $("#searchA").click();
                    /*var userTypeId=$("#userTypeId-update").val();
                    var ageGroupId=$("#ageGroupId-update").val();
                    var fid=$("#fid-update").val();
                    var orgName=$("#orgName-update").val();

                    loadPage(ctxPath + "main/modules",null,{"userTypeId":userTypeId,"ageGroupId":ageGroupId,"fid":fid,"orgName":orgName});*/
                });
            }else if("error" == data.msg){
                showError("修改资源出错.");
            }else if("failure" == data.msg){
                showError("修改资源失败.");
            }else{
                showError(data.msg);
            }
        }, function(){
            showError("修改资源出错.");
        });
        return false; // 阻止表单自动提交事件
    });
    $("#save2").click(function(){
        if(validator1.form()){
            $('#updateModule').modal('hide');
            $("#module_form-update").submit();
        }
    });

function updateChildModuleDate(moduleId,moduleName) {
    $("#tr"+moduleId).children("td").eq(0).html(moduleName);
}
});