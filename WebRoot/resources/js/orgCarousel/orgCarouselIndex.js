/**
 * 
 */
$(document).ready(function(){
	trHover();
	init();
	//查询
	$("#searchA").click(function(){
		var url = $("#searchForm").attr("action");
		loadPage(url, url, $("#searchForm").serializeObject());
	});
	/** 修改 */
	$("a[data-name='modify']").click(function(){
		var orgCarouselId = $(this).attr("data-orgCarouselId");
		
		loadPage(ctxPath + "/orgCarousel/toModifyOrgCarousel", '', {"orgCarouselId": orgCarouselId, 'orgId': $("#orgId").val()});
	});
	/** 删除 */
	$("a[data-name='delete']").click(function(){
		orgCarouselId = $(this).attr("data-orgCarouselId");
		confirm("确定删除该机构轮播图片?", function(){
			var params = {"orgCarouselId": orgCarouselId};
			ajaxRequest(ctxPath + "/orgCarousel/deleteOrgCarousel", params, function(data){
                if(data.success){
                	showSuccess("删除机构轮播图片成功", function(){
                		loadPage(ctxPath + "/orgCarousel", '', {"orgCarouselId": orgCarouselId, 'orgId': $("#orgId").val()});
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("删除机构轮播图片出错.");
                }else if("failure" == data.msg){
                	showError("删除机构轮播图片失败.");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("删除机构轮播图片出错.");
			});
		}, function(){
			
		});
	});
	/** 指定使用其它机构的轮播图片按钮 */
	$("#specify-org").click(function(){
		var currentOrgId = $("#orgId").val();
		ajaxLoadOtherOrgs(currentOrgId);
	});
	/** 切换其他包含轮播图片的机构 */
	$("#orgSelect").change(function(){
		var selectedOrgId = $("#orgSelect").select2("val");
		ajaxLoadOrgsCarousels(selectedOrgId);
	});
	$("#useSpecifyOrgsCarousels").click(function(){
		var specifyOrgId = $("#orgSelect").select2("val");
		if(isEmpty(specifyOrgId)){
			showError("请指定一个机构.");
			return;
		}
		var currentOrgId = $("#orgId").val();
		var url = ctxPath + "/orgCarousel/useSpecifyOrgsCarousels";
		var params = {"orgId": currentOrgId, "specifyOrgId": specifyOrgId};
		ajaxRequest(url, params, function(data){
			if(data.success){
            	showSuccess("使用指定机构的轮播图片成功", function(){
            		closeAllLayer();
            	});
            }else if("error" == data.msg){
            	showError("使用指定机构的轮播图片出错.");
            }else if("failure" == data.msg){
            	showError("使用指定机构的轮播图片失败.");
            }else{
            	showError(data.msg);
            }
		}, function(){
			showError("使用指定机构的轮播图片出错.");
		});
	});
	/** 排序 */
	$("#sequence").click(function(){
		var tbody = document.getElementById('orgsCarousels');
		sortObj = new Sortable(tbody);
		$("#sequence").css("display", "none");
		$("#sequence-save").css("display", "");
	});
	/** 排序保存 */
	$("#sequence-save").click(function(){
		//保存
		var sequenceStr = "";
		$("#orgsCarousels img").each(function(i){
			sequenceStr += $(this).attr("id") + ":" + (i+1) + ",";
		});
		if(!isEmpty(sequenceStr)){
			sequenceStr = sequenceStr.substring(0, sequenceStr.length - 1);
		}
		var params = {"sortingStr": sequenceStr};
		ajaxRequest(ctxPath + "/orgCarousel/carouselSorting", params, function(data){
			if(data.success){
            	showSuccess("轮播图片排序成功", function(params){
            		loadPage(ctxPath + '/orgCarousel', '', {'orgId':$("#orgId").val()});
            		closeAllLayer();
            	});
            	if(sortObj != null){
    				sortObj.destroy();
    			}
            }else if("error" == data.msg){
            	showError("轮播图片排序出错.");
            }else if("failure" == data.msg){
            	showError("轮播图片排序失败.");
            }else{
            	showError(data.msg);
            }
		}, function(){
			showError("轮播图片排序出错.");
		});
	});
});
/**
 * 初始化
 */
function init(){
	$("#ageGroupSelect").select2({
		placeholder: '年龄段',
		allowClear: true
	});
	$("#orgSelect").select2({
		placeholder: '包含轮播图片的其它机构列表',
		allowClear: true
	});
}
/**加载包含轮播图片的其他机构列表
 * @param orgId
 */
function ajaxLoadOtherOrgs(orgId){
	var loadingIndex = loading("正在加载包含轮播图片的其他机构列表");
	var url = ctxPath + "/orgCarousel/loadOtherContainCarouselsOrgs"
	var params = {"currentOrgId": orgId};
	ajaxRequest(url, params, function(data){
		closeLayer(loadingIndex);
		var optionHtml = "";
		$(data).each(function(i){
			optionHtml += "<option value='"+ this.id +"'>"+ this.organizationName +"</option>"
		});
		$("#select2Content").html(optionHtml);
		$("#orgSelect").select2({
			placeholder: '包含轮播图片的其它机构列表',
			allowClear: true
		});
		layer.open({
			type : 1,
			title: '指定使用其它机构轮播图片',
			skin : 'layui-layer-rim', // 加上边框
			area : [ '450px', '200px' ], // 宽高
			content : $('#specify_org_container'),
			end : function(){//当弹窗被销毁时触发
				loadPage(ctxPath + '/orgCarousel', '', {'orgId':$("#orgId").val()});
			}
		});
	}, function(){
		closeLayer(loadingIndex);
		showError("加载包含轮播图片的其他机构列表出错");
	});
}
/**加载其它机构的轮播图片列表
 * @param orgId
 */
function ajaxLoadOrgsCarousels(orgId){
	var loadingIndex = loading();
	var url = ctxPath + "/orgCarousel/loadOrgsCarousels";
	var params = {"orgId": orgId};
	ajaxRequest(url, params, function(data){
		closeLayer(loadingIndex);
		$("#orgsCarousels").html("");
		packageSpecifyOrgsCarousels(data);
	}, function(){
		closeLayer(loadingIndex);
		showError("加载机构的轮播图片出错.");
	});
}
/**封装指定机构的轮播图片
 * @param data
 */
function packageSpecifyOrgsCarousels(data){
	var html = "";
	if(data != null){
		$(data).each(function(i){
			var trHtml = "<tr>" +
							"<td class='tc'>" +
								"<div class='thumbnails'>" +
									"<a>" +
										"<img src='"+ (ctxPath + this.uploadImg.accessUrl) +"' />" +
									"</a>" +
									"<div class='actions'>" +
										"<a href='"+ (ctxPath + this.uploadImg.accessUrl) +"' class='lightbox_trigger'><i class='icon-search'></i></a>" +
									"</div>" +
								"</div>" +
							"</td>" +
							"<td class='tc'>"+ (this.uploadImg.name) +"</td>" +
							"<td class='tc'>"+ ('0' == this.uploadImg.linkFlag ? '普通图片' : '超链接') +"</td>" +
							"<td class='tc'>"+ this.uploadImg.linkTypeName +"</td>" +
							"<td>"+ this.uploadImg.linkContent +"</td>" +
							"<td class='tc'>--</td>" +
							"<td class='tc'>--</td>" +
							"<td class='tc'>--</td>";
			
			html += trHtml;
		});
	}
	$("#orgsCarousels").html(html);
}