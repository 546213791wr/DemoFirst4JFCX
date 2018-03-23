/**
 * 
 */
$(document).ready(function(){
	init();
	var validator = $("#fanyaUserType_form").validate({
		rules:{
			name:{
				required:true
			}
		},
		messages:{
			name:"泛雅用户类型类型名称不能为空."
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
	$("#fanyaUserType_form").on("submit", function() {
		ajaxForm(this, function(data) {
            if(data.success){
            	showSuccess("修改泛雅用户类型成功", function(){
            		closeAllLayer();
            		loadPage(ctxPath + "/fanyaUserType");
            	});
            }else if("error" == data.msg){
            	showError("修改泛雅用户类型出错.");
            }else if("failure" == data.msg){
            	showError("修改泛雅用户类型失败.");
            }else{
            	showError(data.msg);
            }
        }, function(){
        	showError("修改泛雅用户类型出错.");
        });
        return false; // 阻止表单自动提交事件
    });
	$("#save").click(function(){
		if(validator.form()){
			if(isEmpty($("#iconName").val())){
				showError("请先上传图标.");
				return false;
			}
			$("#fanyaUserType_form").submit();
		}
	});
	$("#remove").click(function(){
		waitUpload();
	});
});
function init(){
	initWebUploader();
}
/**
 * 初始化上传组件
 */
function initWebUploader(){
	// 初始化Web Uploader
	var uploader = WebUploader.create({
	    // 选完文件后，是否自动上传。
	    auto: true,
	    // swf文件路径
	    swf: ctxPath + '/resources/common/plugins/webuploader/Uploader.swf',
	    // 文件接收服务端。
	    server: ctxPath + '/uploadImg/upload',
	    // 选择文件的按钮。可选。
	    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
	    pick: '#filePicker',
	    // 只允许选择图片文件。
	    accept: {
	        title: 'Images',
	        extensions: 'gif,jpg,jpeg,bmp,png',
	        mimeTypes: 'image/*'
	    }
	});
	// 当有文件添加进来的时候
	uploader.on('fileQueued', function(file) {
		waitUpload();
	});
	/** 文件上传过程中创建进度条实时显示 */
	uploader.on('uploadProgress', function(file, percentage) {
		uploading(percentage);
	});
	/** 文件上传成功，给item添加成功class, 用样式标记上传成功 */
	uploader.on('uploadSuccess', function(file, response) {
		response = getJson(response);
		uploader.removeFile(file);
    	uploadFlag = response.success;
    	if(uploadFlag){
    		uploadSuccess(response);
    	}else{
    		uploadError();
    		showError(response.msg);
    	}
	});
	/** 文件上传失败，显示上传出错 */
	uploader.on( 'uploadError', function(file) {
		uploader.removeFile(file);
		showError("上传失败");
		uploadError();
	});
	/** 完成上传完了，成功或者失败，先删除进度条 */
	uploader.on( 'uploadComplete', function(file) {
		uploader.removeFile(file);
		uploadEnd();
	});
}
/**
 * 等待上传
 */
function waitUpload(){
	$("#filePicker").css("display", "block");
	$(".progress").css("display", "none");
	$("#upload_img").attr("src", "");
	$("#upload_img").css("display", "none");
	$("#remove").css("display", "none");
	$("input[name='path']").val("");
	$("#iconName").val("");
}
/**上传中
 * @param percentage
 */
function uploading(percentage){
	var processValue = percentage * 100 + '%';
    $("#progress_value").css('width', processValue);
    $("#progress_value").html(processValue);
}
/**上传成功
 * @param response
 */
function uploadSuccess(response){
	$("#upload_img").css("display", "block");
	$("#upload_img").attr("src", ctxPath + response.map.accessTempUrl);
	$("#remove").css("display", "block");
	$("#iconName").val(response.msg);
	$("#modifyImgFlag").val("1");//修改了上传图片
}
/**
 * 上传出错
 */
function uploadError(){
	$("#filePicker").css("display", "block");
}
/**
 * 上传结束
 */
function uploadEnd(){
	$(".progress").css("display", "none");
	$("#progress_value").css("width", 0);
}