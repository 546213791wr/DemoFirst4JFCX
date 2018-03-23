/**
 * 
 */
$(document).ready(function(){
	/** 同步资源 */
	/** 同步专题资源 */
	$("#syncSpecialTopicRes").click(function(){
		confirm("确定同步专题资源?", function(){
			ajaxRequest(ctxPath + "/sync/syncSpecialTopicRes", {}, function(data){
                if(data.success){
                	showSuccess("同步专题资源成功", function(){
                		$("#searchA").click();
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("同步专题资源出错");
                }else if("failure" == data.msg){
                	showError("同步专题资源失败");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("同步专题资源出错");
			}, "正在同步专题资源...")
		}, function(){
			
		});
	});
	/** 同步图书资源 */
	$("#syncBookRes").click(function(){
		confirm("确定同步图书资源?", function(){
			ajaxRequest(ctxPath + "/sync/syncBookRes", {}, function(data){
                if(data.success){
                	showSuccess("同步图书资源成功", function(){
                		$("#searchA").click();
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("同步图书资源出错");
                }else if("failure" == data.msg){
                	showError("同步图书资源失败");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("同步图书资源出错");
			}, "正在同步图书资源...")
		}, function(){
			
		});
	});
	/** 刷新缓存 */
	/** 刷新移动端专题缓存 */
	$("#refreshSpecialTopicCache").click(function(){
		confirm("确定刷新移动端专题缓存?", function(){
			ajaxRequest("/syncCache/syncSpecialTopicCache", {}, function(data){
                if(data.success){
                	showSuccess("刷新移动端专题缓存成功", function(){
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("刷新移动端专题缓存出错");
                }else if("failure" == data.msg){
                	showError("刷新移动端专题缓存失败");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("刷新移动端专题缓存出错");
			}, "正在刷新移动端专题缓存...")
		}, function(){
			
		});
	});
	/** 刷新移动端图书缓存 */
	$("#refreshBookCache").click(function(){
		confirm("确定刷新移动端图书缓存?", function(){
			ajaxRequest("/syncCache/syncBookCache", {}, function(data){
                if(data.success){
                	showSuccess("刷新移动端图书缓存成功", function(){
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("刷新移动端图书缓存出错");
                }else if("failure" == data.msg){
                	showError("刷新移动端图书缓存失败");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("刷新移动端图书缓存出错");
			}, "正在刷新移动端图书缓存...")
		}, function(){
			
		});
	});
	/** 清空首页推荐缓存 */
	$("#clearHomeRecommendCache").click(function(){
		confirm("确定清空首页推荐缓存?", function(){
			ajaxRequest("/syncCache/clearHomeRecommendCache", {}, function(data){
                if(data.success){
                	showSuccess("清空首页推荐缓存成功", function(){
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("清空首页推荐缓存出错");
                }else if("failure" == data.msg){
                	showError("清空首页推荐缓存失败");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("清空首页推荐缓存出错");
			}, "正在清空首页推荐缓存...")
		}, function(){
			
		});
	});
});