/**
 * 
 */
$(document).ready(function(){
        var validator = $("#org_form").validate({
		rules:{
			orgName:{
				required:true,
                remote:{
                    type:"POST",
                    url:"/admin/org/checkOrgName", //请求地址
                    data:{
                        orgName: function(){ return $("#orgName").val(); },
                        id: function(){ return $("#id").val(); }
                    }
                }
			},
			fid:{
				required:true,
                remote:{
                    type:"POST",
                    url:"/admin/org/checkOrgFid",
                    data:{
                        fid: function(){ return $("#fid").val(); }
                    }
                }
			}
    	},
        messages:{
            orgName:{
                remote:"同名机构已存在"
            },
            fid:{
                remote:"相同FID机构已存在"
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
	$("#org_form").on("submit", function() {

        $(this).attr("action", "/admin/org/update-org");
        $(this).removeAttr("enctype");
        $(this).attr("method", "post");
        var orgId=$("#orgId").val();
        var domainUrl=$("#domainUrl").val();
        var logoUrl=$("#logoUrlInput").val();
        var url=$(this).attr("action");
        var json={"id":orgId,"domainUrl":domainUrl,"logoUrl":logoUrl};
        params={"orgName":parent.$("#orgName1").val(),"status":parent.$("#status1").val()};
        ajaxRequest(url,json,function(data) {
            if(data.code == 1){
                showSuccess("修改机构成功", function () {
                    console.log(params);
                    var cityCode=$('#cityCode').val();
                    console.debug(cityCode)
                    if(cityCode == null|| cityCode==""){
                         parent.loadPage(ctxPath + "/admin/org/list?gid="+$('#gid').val(),null,params);
                    }else {
                         parent.loadPage(ctxPath + "/admin/org/listOrg?gid="+$('#gid').val()+"&cityCode="+cityCode,null,params);
                    }
                    parent.closeAllLayer();

                });
            } else if ("error" == data.msg) {
                showError("修改机构出错.");
            } else if ("failure" == data.msg) {
                showError("修改机构失败.");
            } else {
                showError(data.msg);
            }
        }, function () {
        });
        return false; // 阻止表单自动提交事件
    });

	$("#save").click(function(){
		if(validator.form() && $("#checkTLD").text() == "√"){
			$("#org_form").submit();
		}
	});


        $("#fileName").change(function () {
            var objUrl = getObjectURL(this.files[0]);
            var logoUrl=$(this).val();
            if(objUrl){
                if (!/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/.test(logoUrl)){
                    alert("请上传jpg或png格式的图片！");
                    return false;
                }else{
                    $("#logoUrl").attr('src',objUrl);
                }
            }
        });

        $("#imgUpBtn").click(function () {
            if ($("#fileName").val() == "") {
                showError("请选择图片");
                return false;
            }
            $("#org_form").attr("action", "/admin/pltresIOput/inputImg");
            $("#org_form").attr("enctype", "multipart/form-data");
            $("#org_form").attr("method", "post");
            ajaxForm($("#org_form"), function (json) {
                if (json.code == 1) {
                    $("#logoUrlInput").val(json.data.imgName);
                    showSuccess("图片上传成功", function () {
                        closeAllLayer();
                    });
                } else {
                    showError(json.message);
                }
            }, function () {
                showError("图片上传失败");
            });
            return false;
        });
        /*上传图片 end*/


        function getObjectURL(file) {
            var url=null;
            if(window.creatObjectURL!=undefined){
                url=window.creatObjectURL(file);
            }else if(window.URL!=undefined){
                url=window.URL.createObjectURL(file);
            }else if(window.webkitURL!=undefined){
                url=window.webkitURL.createObjectURL(file);
            }
            return url;
        }


    }
);