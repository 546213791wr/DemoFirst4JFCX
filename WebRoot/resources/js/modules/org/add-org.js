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
                    url:"/admin/org/checkOrgName",
                    data:{
                        orgName: function(){ return $("#orgName").val(); }
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
	$("#save").click(function(){
		if(validator.form() && $("#checkTLD").text() == "√"){
		    //上传
            if ($("#fileName").val() == ""&&$("#logoUrlInput").val()=="") {
                showError("请选择图片");
                return false;
            }
            if($("#fileName").val() == ""&&$("#logoUrlInput").val()!=""){
                var orgName=$("#orgName").val();
                var fid=$("#fid").val();
                var domainUrl=$("#domainUrl").val();
                var url=$("#org_form").attr("action");
                var logoUrl=$("#logoUrlInput").val();
                var gid=$("#gid").val();
                var json={"orgName":orgName,"fid":fid,"domainUrl":domainUrl,"logoUrl":logoUrl,"gid":gid};
                ajaxRequest(url,json,function(data) {
                    if(data.code == 1){
                        showSuccess("新增机构成功", function(){
                            closeAllLayer();
                            loadPage(ctxPath + "/admin/org/list?gid="+$("#gid").val());
                        });
                    }else{
                        showError(data.msg);
                    }
                }, function(){
                    showError("新增机构出错.");
                });
                return false;
            }
            $("#org_form").attr("action", "/admin/pltresIOput/inputImg");
            $("#org_form").attr("enctype", "multipart/form-data");
            $("#org_form").attr("method", "post");
            ajaxForm($("#org_form"), function (json) {
                if (json.code == 1) {
                    /*upload/image/logo/dingzhi-lq-logo.png*/
                    $("#logoUrlInput").val(json.data.imgName);


            //  保存机构
                    $("#org_form").removeAttr("action");
                    $("#org_form").attr("action", "/admin/org/save");
                    $("#org_form").removeAttr("enctype");
                    $("#org_form").attr("method", "post");
                    var orgName=$("#orgName").val();
                    var fid=$("#fid").val();
                    var domainUrl=$("#domainUrl").val();
                    var url=$("#org_form").attr("action");
                    var logoUrl=$("#logoUrlInput").val();
                    var gid=$("#gid").val();
                    var json={"orgName":orgName,"fid":fid,"domainUrl":domainUrl,"logoUrl":logoUrl,"gid":gid};
                    ajaxRequest(url,json,function(data) {
                        if(data.code == 1){
                            showSuccess("新增机构成功", function(){
                                closeAllLayer();
                                loadPage(ctxPath + "/admin/org/list?gid="+$("#gid").val());
                            });
                        }else{
                            showError(data.msg);
                        }
                    }, function(){
                        showError("新增机构出错.");
                    });
                    return false; // 阻止表单自动提交事件
                } else {
                    showError(json.message);
                }
            }, function () {
                showError("图片上传失败");
            });
            return false;
        }
    });

	$("#cancel").click(function () {
        closeAllLayer();
        loadPage(ctxPath + "/admin/org/list?gid="+$("#gid").val());
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

    $('#orgName').bind('input propertychange', function () {
        var orgName = $('#orgName').val();
        if(!orgName || orgName == ''){
            return;
        }
        pinyin(orgName);
        var json={'name': $('#orgName').val()};
        $.getJSON("/admin/org/findOrgnizitionByName",json, function (data) {
            var htmls = "";
            if(data.data.list.length>0){
                $.each(data.data.list,function (index, org) {
                    htmls += '<dd><a href="javascript:;" onclick="chooseOrg(' + org.beijingMappingId + ',\'' + org.name + '\')">' + org.name + '</a></dd>';
                })
                $("#query-list-org-add").html(htmls);
                $("#query-list-org-add").css('display','block');
            }else {
                htmls += '<dd><span>无搜索结果</span></dd>';
                $("#query-list-org-add").html(htmls);
                $("#query-list-org-add").css('display','none');
            }

        });
    });
	
});

function chooseOrg(beijingMappingId,name){
    sureTag = 1;
    $("#fid1").val(beijingMappingId);
    $("#fid").val(beijingMappingId);
    $("#orgName").val(name);
    pinyin(name);
    $("#query-list-org-add").css('display','none');
}
