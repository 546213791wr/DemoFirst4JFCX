/**
 * 
 */
$(document).ready(function(){
	init();
	var validator = $("#activity_form").validate({
		rules:{
			title:{
				required:true
			},
			linkUrl:{
				required:true
			}
		},
		messages:{
			title: '请输入名称',
			linkUrl:'请输入跳转地址'
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
	$("#activity_form").on("submit", function() {
		ajaxForm(this, function(data) {
            if(data.success){
            	showSuccess("新增活动成功", function(){
            		closeAllLayer();
            		loadPage(ctxPath + "/activity", "");
            	});
            }else if("error" == data.msg){
            	showError("新增活动出错");
            }else if("failure" == data.msg){
            	showError("新增活动失败");
            }else{
            	showError(data.msg);
            }
        }, function(){
        	
        });
        return false; // 阻止表单自动提交事件
    });
	$("#save").click(function(){
		if(validator.form()){
			if(isEmpty($("#logoUrl").val())){
				showError("请上传活动封面");
				return false;
			}
			$("#activity_form").submit();
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
	    server: ctxPath + '/activity/upload',
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
	$("#logoUrl").val("");
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
	$("#logoUrl").val(response.msg);
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