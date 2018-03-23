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
		var orgDomainId = $(this).attr("data-orgDomainId");
		
		loadPage(ctxPath + "/orgDomain/toModifyOrgDomain", '', {"orgDomainId": orgDomainId, 'orgId': $("#orgId").val()});
	});
	/** 删除 */
	$("a[data-name='delete']").click(function(){
		orgDomainId = $(this).attr("data-orgDomainId");
		confirm("确定删除该机构关联域?", function(){
			var params = {"orgDomainId": orgDomainId};
			ajaxRequest(ctxPath + "/orgDomain/deleteOrgDomain", params, function(data){
                if(data.success){
                	showSuccess("删除机构关联域成功", function(){
                		loadPage(ctxPath + "/orgDomain", '', {"orgDomainId": orgDomainId, 'orgId': $("#orgId").val()});
                		closeAllLayer();
                	});
                }else if("error" == data.msg){
                	showError("删除机构关联域出错.");
                }else if("failure" == data.msg){
                	showError("删除机构关联域失败.");
                }else{
                	showError(data.msg);
                }
			}, function(){
				showError("删除机构关联域出错.");
			});
		}, function(){
			
		});
	});
	/** 指定使用其它机构的机构关联域按钮 */
	$("#specify-org").click(function(){
		var currentOrgId = $("#orgId").val();
		ajaxLoadOtherOrgs(currentOrgId);
	});
	/** 切换其他包含机构关联域的机构 */
	$("#orgSelect").change(function(){
		var selectedOrgId = $("#orgSelect").select2("val");
		ajaxLoadOrgRelatedDomains(selectedOrgId);
	});
	$("#useSpecifyOrgsCarousels").click(function(){
		var specifyOrgId = $("#orgSelect").select2("val");
		if(isEmpty(specifyOrgId)){
			showError("请指定一个机构.");
			return;
		}
		var currentOrgId = $("#orgId").val();
		var url = ctxPath + "/orgDomain/useSpecifyOrgsDomains";
		var params = {"orgId": currentOrgId, "specifyOrgId": specifyOrgId};
		ajaxRequest(url, params, function(data){
			if(data.success){
            	showSuccess("使用指定机构的机构关联域成功", function(){
            		closeAllLayer();
            	});
            }else if("error" == data.msg){
            	showError("使用指定机构的机构关联域出错.");
            }else if("failure" == data.msg){
            	showError("使用指定机构的机构关联域失败.");
            }else{
            	showError(data.msg);
            }
		}, function(){
			showError("使用指定机构的机构关联域出错.");
		});
	});
	/** 排序 */
	$("#sequence").click(function(){
		var tbody = document.getElementById('orgDomains');
		sortObj = new Sortable(tbody);
		$("#sequence").css("display", "none");
		$("#sequence-save").css("display", "");
	});
	/** 排序保存 */
	$("#sequence-save").click(function(){
		//保存
		var sequenceStr = "";
		$("#orgDomains td[data-name='orgDomain']").each(function(i){
			sequenceStr += $(this).attr("data-id") + ":" + (i+1) + ",";
		});
		if(!isEmpty(sequenceStr)){
			sequenceStr = sequenceStr.substring(0, sequenceStr.length - 1);
		}
		var params = {"sortStr": sequenceStr};
		ajaxRequest(ctxPath + "/orgDomain/sortOrgDomains", params, function(data){
			if(data.success){
            	showSuccess("机构关联域排序成功", function(params){
            		loadPage(ctxPath + '/orgDomain', '', {'orgId':$("#orgId").val()});
            		closeAllLayer();
            	});
            	if(sortObj != null){
    				sortObj.destroy();
    			}
            }else if("error" == data.msg){
            	showError("机构关联域排序出错.");
            }else if("failure" == data.msg){
            	showError("机构关联域排序失败.");
            }else{
            	showError(data.msg);
            }
		}, function(){
			showError("机构关联域排序出错.");
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
		placeholder: '包含机构关联域的其它机构列表',
		allowClear: true
	});
}
/**加载包含机构关联域的其他机构列表
 * @param orgId
 */
function ajaxLoadOtherOrgs(orgId){
	var loadingIndex = loading("正在加载其它关联了域的机构列表");
	var url = ctxPath + "/orgDomain/loadOtherRelatedDomainsOrgs"
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
			title: '指定使用其它机构关联域',
			skin : 'layui-layer-rim', // 加上边框
			area : [ '450px', '200px' ], // 宽高
			content : $('#specify_org_container'),
			end : function(){//当弹窗被销毁时触发
				loadPage(ctxPath + '/orgDomain', '', {'orgId':$("#orgId").val()});
			}
		});
	}, function(){
		closeLayer(loadingIndex);
		showError("加载其它关联了域的机构列表出错.");
	});
}
/**加载其它机构的机构关联域列表
 * @param orgId
 */
function ajaxLoadOrgRelatedDomains(orgId){
	var loadingIndex = loading();
	var url = ctxPath + "/orgDomain/loadOrgRelatedDomains";
	var params = {"orgId": orgId};
	ajaxRequest(url, params, function(data){
		closeLayer(loadingIndex);
		$("#orgDomains").html("");
		packageSpecifyOrgsDomains(data);
	}, function(){
		closeLayer(loadingIndex);
		showError("加载机构的机构关联域出错.");
	});
}
/**封装指定机构的机构关联域
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
	$("#orgDomains").html(html);
}