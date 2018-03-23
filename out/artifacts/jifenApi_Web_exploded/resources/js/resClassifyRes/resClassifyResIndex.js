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
		var resClassifyResId = $(this).attr("data-resClassifyResId");
		loadPage(ctxPath + "/resClassifyRes/toModifyResClassifyRes", '', {'resClassifyResId': resClassifyResId});
	});
	/** 删除 */
	$("a[data-name='delete']").click(function(){
		resClassifyResId = $(this).attr("data-resClassifyResId");
		confirm("确定删除该资源分类关联资源?", function(){
			var params = {"resClassifyResId": resClassifyResId};
			ajaxRequest(ctxPath + "/resClassifyRes/deleteResClassifyRes", params, function(data){
                if(data.success){
                	showSuccess("删除资源分类关联资源成功", function(){
                		loadPage(ctxPath + "/resClassifyRes", '', {'resClassifyId': $("#resClassifyId").val()});
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("删除资源分类关联资源出错.");
                }else if("failure" == data.msg){
                	showError("删除资源分类关联资源失败.");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("删除资源分类关联资源出错.");
			});
		}, function(){
			
		});
	});
	/** 排序 */
	$("#sequence").click(function(){
		var tbody = document.getElementById('resClassifyRess');
		sortObj = new Sortable(tbody);
		$("#sequence").css("display", "none");
		$("#sequence-save").css("display", "");
	});
	/** 排序保存 */
	$("#sequence-save").click(function(){
		//保存
		var sequenceStr = "";
		$("#resClassifyRess td[data-name='resClassifyRes']").each(function(i){
			sequenceStr += $(this).attr("data-id") + ":" + (i+1) + ",";
		});
		if(!isEmpty(sequenceStr)){
			sequenceStr = sequenceStr.substring(0, sequenceStr.length - 1);
		}
		var params = {"sortStr": sequenceStr};
		ajaxRequest(ctxPath + "/resClassifyRes/sortResClassifyRes", params, function(data){
			if(data.success){
            	showSuccess("资源分类关联资源排序成功", function(params){
            		loadPage(ctxPath + '/resClassifyRes', '', {'resClassifyId': $("#resClassifyId").val()});
            		closeAllLayer();
            	});
            	if(sortObj != null){
    				sortObj.destroy();
    			}
            }else if("error" == data.msg){
            	showError("资源分类关联资源排序出错.");
            }else if("failure" == data.msg){
            	showError("资源分类关联资源排序失败.");
            }else{
            	showError(data.msg);
            }
		}, function(){
			showError("资源分类关联资源排序出错.");
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
		placeholder: '包含资源分类关联资源的其它机构列表',
		allowClear: true
	});
}
/**加载包含资源分类关联资源的其他机构列表
 * @param orgId
 */
function ajaxLoadOtherOrgs(orgId){
	var loadingIndex = loading("正在加载其它关联了域的机构列表");
	var url = ctxPath + "/resClassifyRes/loadOtherRelatedDomainsOrgs"
	var params = {"currentOrgId": orgId};
	ajaxRequest(url, params, function(data){
		closeLayer(loadingIndex);
		var optionHtml = "";
		$(data).each(function(i){
			optionHtml += "<option value='"+ this.id +"'>"+ this.organizationName +"</option>"
		});
		$("#select2Content").html(optionHtml);
		$("#orgSelect").select2({
			placeholder: '其它关联了域的机构列表',
			allowClear: true
		});
		layer.open({
			type : 1,
			title: '指定使用其它资源分类关联资源',
			skin : 'layui-layer-rim', // 加上边框
			area : [ '450px', '200px' ], // 宽高
			content : $('#specify_org_container'),
			end : function(){//当弹窗被销毁时触发
				loadPage(ctxPath + '/resClassifyRes', '', {'orgId':$("#orgId").val()});
			}
		});
	}, function(){
		closeLayer(loadingIndex);
		showError("加载其它关联了域的机构列表出错.");
	});
}
/**加载其它机构的资源分类关联资源列表
 * @param orgId
 */
function ajaxLoadOrgRelatedDomains(orgId){
	var loadingIndex = loading();
	var url = ctxPath + "/resClassifyRes/loadOrgRelatedDomains";
	var params = {"orgId": orgId};
	ajaxRequest(url, params, function(data){
		closeLayer(loadingIndex);
		$("#resClassifyRess").html("");
		packageSpecifyOrgsDomains(data);
	}, function(){
		closeLayer(loadingIndex);
		showError("加载机构的资源分类关联资源出错.");
	});
}
/**封装指定机构的资源分类关联资源
 * @param data
 */
function packageSpecifyOrgsDomains(data){
	var html = "";
	if(data != null){
		$(data).each(function(i){
			var trHtml = "<tr>" +
							"<td class='tc'>"+ this.domainShowName + "(" + this.domainName +")</td>" +
							"<td class='tc'>--</td>" +
							"<td class='tc'>--</td>" +
							"<td class='tc'>--</td>";
			
			html += trHtml;
		});
	}
	$("#resClassifyRess").html(html);
}