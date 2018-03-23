/**
 * 通用的js
 */
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};
$.ajaxSetup ({
	cache: false // close AJAX cache
});
var urlHistory = {
		referer: "",
		preReferer: ""
};
//扩展拦截返回ajax处理
if(typeof(interceptorFlag_key) != "undefined" && typeof(interceptorFlag_value) != "undefined"){
	jQuery.extend({
		interceptorFlag_key: interceptorFlag_key,
		interceptorFlag_value: interceptorFlag_value,
		interceptor : function(response) {
			try {
				if(interceptorFlag_value == eval("response." + interceptorFlag_key)){
					var errorMsg = response.msg;
					var responseUrl = response.responseUrl;
					$.responseUrl = responseUrl;
					showError(errorMsg, function(){
						if(!isEmpty($.responseUrl)){
							window.location.replace($.responseUrl);
						}
						closeAllLayer();
					});
					return true;
				}
			} catch (e) {
				alert(e);
			}
			return false;
		}
	});
}
//禁用Backspace的后退功能
function banBackSpace(e) {
	var ev = e || window.event;// 获取event对象
	var obj = ev.target || ev.srcElement;// 获取事件源
	var t = obj.type || obj.getAttribute('type');// 获取事件源类型
	// 获取作为判断条件的事件类型
	var vReadOnly = obj.getAttribute('readonly');
	var vEnabled = obj.getAttribute('enabled');
	// 处理null值情况
	vReadOnly = (vReadOnly == null) ? false : vReadOnly;
	vEnabled = (vEnabled == null) ? true : vEnabled;
	// 当敲Backspace键时，事件源类型为密码或单行、多行文本的，
	// 并且readonly属性为true或enabled属性为false的，则退格键失效
	var flag1 = (ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vEnabled != true)) ? true : false;
	// 当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
	var flag2 = (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") ? true : false;
	// 判断
	if (flag2) {
		return false;
	}
	if (flag1) {
		return false;
	}
}
// 禁止后退键 作用于Firefox、Opera
//document.onkeypress = banBackSpace;
// 禁止后退键 作用于IE、Chrome
//document.onkeydown = banBackSpace; 
/**验证对象是否为空
 * @param obj
 * @returns {Boolean}
 */
function isEmpty(obj){
	return obj == null || "" == obj || "" == $.trim(obj);
}
/**根据json字符串获取json
 * @param jsonStr
 */
function getJson(jsonStr){
	if(isEmpty(jsonStr)){
		return null;
	}
	return JSON.parse(jsonStr);
}
/**根据json获取json字符串
 * @param json
 * @returns
 */
function getJsonStr(json){
	if(isEmpty(json)){
		return null;
	}
	return JSON.stringify(json);
}
/**验证方法是否存在
 * @param functionName
 */
function isFunctionExist(functionName){
	return !isEmpty(functionName) && typeof(functionName) == "function";
}
/**ajax提交
 * @param url
 * @param type
 * @param params
 * @param success
 * @param error
 * @param loadMsg
 */
function ajaxRequest(url, params, success, error, loadMsg){
	var layerIndex = loading(loadMsg);
	$.ajax({
		url: url,
		type: "post",
		data: params,
		dataType: "json",
		headers: {
	        "X-Requested-With-Type":"ajax"
	    },
		success: function(response){
			layer.close(layerIndex);
			success(response);
		},
		error:function(){
			layer.close(layerIndex);
			error();
		}
	});
}
/**ajax提交表单
 * @param formElement
 * @param success
 * @param error
 */
function ajaxForm(formElement, success, error){
	var layerIndex = loading();
	$(formElement).ajaxSubmit({
        type: "post", // 提交方式 get/post
        dataType: "json",
        headers: {
	        "X-Requested-With-Type":"ajax"
	    },
        success: function(response) {
        	layer.close(layerIndex);
        	success(response);
        },
        error:function(){
        	layer.close(layerIndex);
        	error();
        }
    });
}
/**
 * @returns
 */
/**加载遮罩层
 * @param msg
 * @returns
 */
function loading(msg){
	if(isEmpty(msg)){
		msg = "正在处理";
	}
	var layerIndex = layer.msg(msg, {icon: 16, shade: 0.3, shadeClose: false, time: 0});
	return layerIndex;
}
/**关闭弹出层
 * @param index
 */
function closeLayer(index){
	layer.close(index);
}
/**
 * 关闭所有弹出层
 */
function closeAllLayer(){
	layer.closeAll();
}
/**确认框
 * @param content
 * @param yes
 * @param no
 */
function confirm(content, yes, no){
	layer.confirm(content, {
		btn : [ '确定', '取消' ],// 按钮
		icon: 3
	}, function(index) {
		closeLayer(index);
		eval("("+ yes +"())")
	}, function(index) {
        closeLayer(index);
		eval("("+ no +"())")
	});
}
/**
 * 成功提示框
 * 
 * @param content
 * @param callback
 */
function showSuccess(content, callback){
	var argumentLength = arguments.length;
	if(argumentLength == 1){
		layer.alert(content, {icon: 1});
		return;
	}
	layer.alert(content, {icon: 1}, eval("("+ callback +")"));
}
/**错误提示框
 * @param content
 * @param callback
 */
function showError(content, callback){
	var argumentLength = arguments.length;
	if(argumentLength == 1){
		layer.alert(content, {icon: 2});
		return;
	}
	layer.alert(content, {icon: 2}, eval("(" + callback + ")"));
}
/**加载页面
 * @param url
 * @param data
 */
function loadPage(url, referer, data){
	var layerIndex = loading("加载中...");
	$("#content").load(url, data, function(response, status, xhr){
		closeLayer(layerIndex);
		if("error" == status){
			//加载出错时显示错误页面的信息
			$("#content").html(response);
		}else if("success" == status){
			urlHistory.referer = url;
			urlHistory.preReferer = referer;
		}
	});
}
/**
 * 返回上一页
 */
function backToPrePage(){
	loadPage(urlHistory.preReferer, urlHistory.referer);
}
/**
 * 返回首页
 */
function backToIndex(){
	window.parent.location.href = ctxPath + "/";
}
/**
 * tr hover改变背景色
 */
function trHover(){
	/** table隔行变色 */
	$("table tr:gt(0)").hover(function(){
		$(this).addClass("tr_hover");
	},function(){
		$(this).removeClass("tr_hover");
	});
}
$(document).ready(function(){
	var clientHeight = document.documentElement.clientHeight;
	var modalMaxHeight = clientHeight - 200;
	$(document).on("hidden", ".modal", function(){//modal隐藏的时候清空远程加载的内容
		$(this).removeData("modal");
	}).on("show", ".modal", function(){//显示的时候修改modal
		$(".modal-body").css("max-height", modalMaxHeight + "px");
	}).resize(function(){//窗口改变大小后修改modal的高度及修改modal的上下居中
		clientHeight = document.documentElement.clientHeight;
		if(isPC()){
			modalMaxHeight = clientHeight - 100;
		}else{
			modalMaxHeight = clientHeight - 80;
		}
		$(".modal-body").css("max-height", modalMaxHeight + "px");
		var modalContentHeight = $(".modal-content").height();
		var marginTop = (modalMaxHeight - modalContentHeight) / 2;
		$(".modal-dialog").parent().css("margin-top", marginTop + "px");
	});
});