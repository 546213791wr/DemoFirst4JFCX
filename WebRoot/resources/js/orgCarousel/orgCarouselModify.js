/**
 * 
 */
$(document).ready(function(){
	init();
	var validator = $("#orgCarousel_form").validate({
		rules:{
			
		},
		messages: {  
			
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
	$("#orgCarousel_form").on("submit", function() {
		ajaxForm(this, function(data) {
            if(data.success){
            	showSuccess("修改机构轮播图片成功", function(){
            		closeAllLayer();
            		loadPage(ctxPath + "/orgCarousel", '', {'orgId': $("#orgId").val()});
            	});
            }else if("error" == data.msg){
            	showError("修改机构轮播图片出错.");
            }else if("failure" == data.msg){
            	showError("修改机构轮播图片失败.");
            }else{
            	showError(data.msg);
            }
        }, function(){
        	showError("修改机构轮播图片出错.");
        });
        return false; // 阻止表单自动提交事件
    });
	$("#save").click(function(){
		if(validate() && validator.form()){
			$("#orgCarousel_form").submit();
		}
	});
});
function init(){
	$("#carouselSelect").select2({
		placeholder: '选择一张图片',
		allowClear: true
	});
	$("#carouselSelect").change(function(){
		clearSelectedCarousel();
		var uploadImgId = $(this).select2("val");
		ajaxGetSelectedCarousel(uploadImgId);
	});
}
/**
 * 清空已经选择的轮播图片信息
 */
function clearSelectedCarousel(){
	$("#upload_img").css("display", "none");
	$("#upload_img").attr("src", "");
	$("#name").html("");
	$("#link-flag").html("");
	$("#link-type").html("");
	$("#link-content").html("");
}
/**ajax获取选择的轮播图片信息
 * @param id
 */
function ajaxGetSelectedCarousel(id){
	var url = ctxPath + "/orgCarousel/loadSpecifyCarousel";
	var params = {"uploadImgId": id};
	ajaxRequest(url, params, function(data){
		initSelectedCarousel(data);
	}, function(){
		showError("加载选择的轮播图片error");
	});
}
/**初始化选择的轮播图片信息
 * @param data
 */
function initSelectedCarousel(data){
	$("#upload_img").attr("src", ctxPath + "/" + data.accessUrl);
	$("#upload_img").css("display", "block");
	$("#name").html(data.name);
	var linkFlag = data.linkFlag;
	if("0" == linkFlag){
		$("#link-flag").html("普通图片");
		$("#link-type").html("--");
		$("#link-content").html("--");
	}else{
		$("#link-flag").html("超链接");
		$("#link-type").html(data.linkTypeName);
		$("#link-content").html(data.linkContent);
	}
}
/**验证表单
 * @returns {Boolean}
 */
function validate(){
	var uploadImgId = $("#carouselSelect").select2("val");
	if(isEmpty(uploadImgId)){
		showError("请选择一张轮播图片.");
		return false;
	}
	return true;
}