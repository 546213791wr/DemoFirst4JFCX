/**
 * 
 */
var uploadFlag = false;//上传标识
var uploadFileServerSaveName = "";//上传的文件在服务器上的名字
var uploader = null;
var state = 'pending';
var validator = null;
$(document).ready(function(){
	init();
});
function init(){
	initWebUploader();
	initEvent();
	initForm();
	initSelect2();
}
function initForm(){
	validator = $("#res_form").validate({
		rules:{
			
		},
		messages:{
			
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
	$("#res_form").on("submit", function() {
		ajaxForm(this, function(data) {
            if(data.success){
            	showSuccess("资源excel导入成功", function(){
            		closeAllLayer();
            		loadPage(ctxPath + "/res");
            	});
            }else if("error" == data.msg){
            	showError("资源excel导入出错.");
            }else if("failure" == data.msg){
            	showError("资源excel导入失败.");
            }else{
            	showError(data.msg);
            }
        }, function(){
        	showError("资源excel导入出错.");
        });
        return false; // 阻止表单自动提交事件
    });
}
function initSelect2(){
	$("#resTypeSelect").select2({
		placeholder: '资源类型',
		allowClear: true
	});
}
function initEvent(){
	//删除
	$("#remove").click(function(){
		initStatus();
	});
	//上传
	$("#ctlBtn").click(function(){
		if(isEmpty(uploader.getFiles())){
			showError("请先选择文件");
			return false;
		}
		if(state === 'uploading') {
            uploader.stop(true);
            $('.update-item').find('p.state').text('已暂停');
        }else{
        	uploader.upload();
        }
	});
	//保存
	$("#save").click(function(){
		if(validator.form()){
			if(validate()){
				$("#res_form").submit();
			}
		}
	});
}
/**
 * 初始化上传组件
 */
function initWebUploader(){
	// 初始化Web Uploader
	uploader = WebUploader.create({
		// swf文件路径
		swf: ctxPath + '/resources/common/plugins/webuploader/Uploader.swf',
        // 文件接收服务端。
		server: ctxPath + '/res/uploadResExcel',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#picker',
        //允许的类型
        accept: {
            title: 'xlsx',
            extensions: 'xlsx',
            mimeTypes: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
	});
	uploader.on("beforeFileQueued", function(file){
		if(!isEmpty(uploader.getFiles())){
			showError("请先删除选择的文件.");
			return false;
		}
	});
	// 当有文件添加进来的时候
	uploader.on('fileQueued', function(file) {
		waitUpload(file);
	});
	uploader.on("startUpload", function(){
		
	});
	/** 文件上传过程中创建进度条实时显示 */
	uploader.on('uploadProgress', function(file, percentage) {
		uploading(percentage, file);
	});
	/** 文件上传成功，给item添加成功class, 用样式标记上传成功 */
	uploader.on('uploadSuccess', function(file, response) {
		response = getJson(response);
    	uploadFlag = response.success;
    	if(uploadFlag){
    		uploadSuccess(response, file);
    	}else{
    		showError(response.msg);
    	}
	});
	/** 文件上传失败，显示上传出错 */
	uploader.on('uploadError', function(file) {
		alert('uploadError');
		uploader.removeFile(file);
		showError("上传失败");
		uploadError();
	});
	/** 完成上传完了，成功或者失败，先删除进度条 */
	uploader.on('uploadComplete', function(file) {
		uploader.removeFile(file);
		uploadEnd();
	});
	uploader.on('all', function(type) {
        if(type === 'startUpload' ) {
            state = 'uploading';
        }else if (type === 'stopUpload' ) {
            state = 'paused';
        }else if (type === 'uploadFinished' ) {
            state = 'done';
        }
        if(state === 'uploading' ) {
            $("#ctlBtn").text('暂停上传');
        }else{
        	$("#ctlBtn").text('开始上传');
        }
    });
}
function initStatus(){
	$("#ctlBtn").hide();//隐藏上传按钮
	$("#remove").hide();//隐藏删除按钮
	$("#progress-bar-container").hide();
	clearFileListElement();
	uploader.reset();
	uploadFlag = false;
    $("#fileName").val("");
}
/**
 * 等待上传
 */
function waitUpload(file){
	$("#ctlBtn").show();//显示上传按钮
	$("#remove").show();//显示删除按钮
	showSelectedFile(file);
	uploadFlag = false;
}
function showSelectedFile(file){
	$("#thelist").html('<div id="' + file.id + '" class="item">' +
	        '<h4 class="info">' + file.name + '</h4>' +
	        '<p class="state">等待上传...</p>' +
	    '</div>' );
}
/**上传中
 * @param percentage
 */
function uploading(percentage, file) {
	var $li = $('#progress-bar');
	var $percent = $li.find('.progress .bar');
	$("#progress-bar-container").show();
	$(".progress-striped").show();
	// 避免重复创建
	if (!$percent.length) {
		$percent = $('<div class="progress progress-striped active">'
						+ '<div class="bar" role="progressbar" style="width: 0%">'
						+ '</div>' + '</div>')
					.appendTo($li).find('bar');
	}
	$('#' + file.id).find('p.state').text('上传中');
	var process = percentage * 100 + '';
	$percent.css('width', process + '%');
	if (process.lastIndexOf('.') > -1) {
		process = process.substring(0, process.lastIndexOf('.'));
	}
	$("#progress").html(process + '%');
}
/**上传成功
 * @param response
 */
function uploadSuccess(response, file){
	$( '#'+file.id ).find('p.state').text('已上传');
	$("#progress-bar-container").css("display", "none");
    $("div[role='progressbar']").css("width", '0%');
	
    $("#ctlBtn").hide();
    uploadFlag = true;
    $("#fileName").val(response.msg);
}
/**
 * 上传出错
 */
function uploadError(){
	
}
/**
 * 上传结束
 */
function uploadEnd(){
	$(".progress").css("display", "none");
	$("#progress_value").css("width", 0);
}
/**
 * 清空显示上传文件的元素
 */
function clearFileListElement(){
	$("#thelist").html("");
}
/**验证表单
 * @returns {Boolean}
 */
function validate(){
	var resType = $("#resTypeSelect").select2("val");
	if(isEmpty(resType)){
		showError("请选择资源类型.");
		return false;
	}
	var fileName = $("#fileName").val();
	if(isEmpty(fileName)){
		showError("请上传excel数据.");
		return false;
	}
	return true;
}