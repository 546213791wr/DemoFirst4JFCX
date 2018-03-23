/**
 * 
 */
var ztreeObj = null;
var dragAndDropTreeNode = null;
var dragAndDropTargetTreeNode = null;
$(document).ready(function(){
	initFunctionData();
});
/**
 * 初始化功能数据
 */
function initFunctionData(){
	var loadFunctionsUrl = ctxPath + "/function/loadAllFunctions";
	var params = {};
	ajaxRequest(loadFunctionsUrl, params, function(response){
		$("#total").html(response.length);
		initZtree(response);
	}, function(){
		showError("加载功能列表出错.");
	});
}
/**
 * 初始化Ztree
 */
function initZtree(data){
	var setting = {
		view: {
			//新增功能
			addHoverDom: function(treeId, treeNode){
				//无权限则不显示
				if(treeNode.addPermission){
					var sObj = $("#" + treeNode.tId + "_span");
					if($("#addBtn_"+treeNode.tId).length < 1){
						var addStr = "<span functionId='"+ treeNode.id +"' class='button add' id='addBtn_" + treeNode.tId + "' title='新增功能' onfocus='this.blur();'></span>";
						sObj.after(addStr);
						$("#addBtn_"+treeNode.tId).click(function(){
							var functionId = $(this).attr("functionId");
							layer.open({
							  type: 2,
							  title: '新增功能',
							  shade: 0.8,
							  area: ['500px', '585px'],
							  content: ctxPath + "/function/toAddFunction?parentFunctionId=" + functionId //iframe的url
							});
						});
					}
				}
			},
			//删除节点
			removeHoverDom: function(treeId, treeNode){
				$("#addBtn_"+treeNode.tId).unbind().remove();
			},
			selectedMulti: false//多选
		},
		edit: {
			enable: true,//修改
			editNameSelectAll: false,//修改节点时全选节点内容
			renameTitle: "修改功能",
			removeTitle: "删除功能	",
			//是否显示删除按钮
			showRemoveBtn: function(treeId, treeNode){
				//无权限则不显示
				if(!treeNode.deletePermission){
					return;
				}
				return "0" != treeNode.parentId;
			},
			//是否显示修改按钮
			showRenameBtn: function(treeId, treeNode){
				//无权限则不显示
				if(!treeNode.modifyPermission){
					return false;
				}
				return "0" != treeNode.parentId;
			}
		},
		data: {
			simpleData: {
				//指定数据的上下级关系
				enable: true,
				idKey: "id",
				pIdKey: "parentId",
				rootPId: 0
			}
		},
		callback: {
			//拖动前
			beforeDrag: function(treeId, treeNodes){
				//根据拖拽权限判定是否允许拖拽
				return treeNodes[0].dragAndDropPermission;//允许拖拽
			},
			//拽操作结束之前的事件回调函数
			beforeDrop: function(treeId, treeNodes, targetNode, moveType){
				dragAndDropTreeNode = treeNodes;
				dragAndDropTargetTreeNode = targetNode;
				confirm("是否拖拽节点"+ treeNodes[0].name +"到"+ targetNode.name +"节点下?", function(){
					//请求后台
					var url = ctxPath + "/function/dragAndDropFunction";
					var params = {"functionId": dragAndDropTreeNode[0].id, "newParentId": dragAndDropTargetTreeNode.id};
					ajaxRequest(url, params, function(data){
						if(data.success){
		                	showSuccess("拖拽节点成功", function(){
		                		closeAllLayer();
		                		//调用ztree的移动节点的方法("inner",成为子节点)
		                		ztreeObj.moveNode(dragAndDropTargetTreeNode, dragAndDropTreeNode[0], "inner");
		                	});
		                }else if("error" == data.msg){
		                	showError("拖拽节点出错.");
		                }else if("failure" == data.msg){
		                	showError("拖拽节点失败.");
		                }else{
		                	showError(data.msg);
		                }
					}, function(){
						showError("拖拽节点出错.");
					});
				}, function(){
					
				});
				return false;//不允许拖拽成功，确认框确认后才实现
			},
			//修改节点前
			beforeEditName: function(treeId, treeNode){
				var functionId = treeNode.id;
				layer.open({
				  type: 2,
				  title: '修改功能',
				  shade: 0.8,
				  area: ['500px', '585px'],
				  content: ctxPath + "/function/toModifyFunction?functionId=" + functionId //iframe的url
				});
				return false;
			},
			//删除节点前
			beforeRemove: function(treeId, treeNode){
				deleteFunctionId = treeNode.id;
				confirm("确定删除该功能?", function(){
					var params = {"functionId": deleteFunctionId};
					ajaxRequest(ctxPath + "/function/deleteFunction", params, function(data){
		                if(data.success){
		                	showSuccess("删除功能成功", function(){
		                		loadPage(ctxPath + "/function");
		                		closeAllLayer();
		                	});
		                }else if("error" == data.msg){
		                	showError("删除功能出错.");
		                }else if("failure" == data.msg){
		                	showError("删除功能失败.");
		                }else{
		                	showError(data.msg);
		                }
					}, function(){
						showError("删除功能出错.");
					});
				}, function(){
					
				});
				return false;
			},
			//重命名前
			beforeRename: function(treeId, treeNode, newName, isCancel){
				return false;
			},
			//删除
			onRemove: function(e, treeId, treeNode){
				return false;
			},
			//重命名
			onRename: function(e, treeId, treeNode, isCancel){
				return false;
			}
		}
	};
	ztreeObj = $.fn.zTree.init($("#functionTree"), setting, data);
}