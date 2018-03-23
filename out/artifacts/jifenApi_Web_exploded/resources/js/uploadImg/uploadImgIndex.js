/**
 * 
 */
var sortObj = null;
$(document).ready(function(){
	trHover();
	//查询
	$("#searchA").click(function(){
		var url = $("#searchForm").attr("action");
		loadPage(url, url, $("#searchForm").serializeObject());
	});
	$("a[data-name='modify']").click(function(){
		var uploadImgId = $(this).attr("data-uploadImgId");
		loadPage(ctxPath + "/uploadImg/toModifyUploadImg", "", {"uploadImgId": uploadImgId});
	});
	$("a[data-name='delete']").click(function(){
		uploadImgId = $(this).attr("data-uploadImgId");
		confirm("确定删除该上传图片?", function(){
			var params = {"uploadImgId": uploadImgId};
			ajaxRequest(ctxPath + "/uploadImg/deleteUploadImg", params, function(data){
                if(data.success){
                	showSuccess("删除机构上传图片成功", function(){
                		loadPage(ctxPath + "/uploadImg");
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("删除机构上传图片出错.");
                }else if("failure" == data.msg){
                	showError("删除机构上传图片失败.");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("删除机构上传图片出错.");
			});
		}, function(){
			
		});
	});
});
