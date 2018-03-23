/**
 * 
 */
var ztreeObj = null;
var dragAndDropTreeNode = null;
var dragAndDropTargetTreeNode = null;
//
//$(document).ready(function(){
//    initResClassifyData();
//});
/**初始化章节信息数据
 * @param orgId
 */
function initResClassifyData(url){
	var loadResClassifiesUrl = url;
    alert(url);
	var params = {};
	ajaxRequest(loadResClassifiesUrl, params, function(response){
		$("#total").html(response.length);
		initZtree(response);
	}, function(){
		showError("加载章节信息列表出错.");
	});
}
/**
 * 初始化Ztree
 */
function initZtree(data){
	var setting = {
		view: {
			//新增章节信息
			addHoverDom: function(treeId, treeNode){
				var sObj = $("#" + treeNode.tId + "_span");
				//无权限则不显示
//				if(!treeNode.bottom){
					if($("#addBtn_"+treeNode.tId).length < 1){
						var addStr = "<span resClassifyId='"+ treeNode.id +"' class='button add' id='addBtn_" + treeNode.tId + "' title='新增章节信息' onfocus='this.blur();'></span>";
						sObj.after(addStr);
						$("#addBtn_"+treeNode.tId).click(function(){
							var resClassifyId = $(this).attr("resClassifyId");
							layer.open({
							  type: 2,
							  title: '新增章节信息',
							  shade: 0.8,
							  area: ['500px', '325px'],
							  content: ctxPath + "/admin/teach-material-type/to-add/" + resClassifyId //iframe的url
							});
						});
					}
//				}
				if(treeNode.bottom){//教材列表管理页面
                    if($("#resBtn_"+treeNode.tId).length < 1){
                        var resStr = "<span resClassifyId='"+ treeNode.id +"' class='button manageRes' id='resBtn_" + treeNode.tId + "' title='管理分类下的教材列表' onfocus='this.blur();'></span>";
                        sObj.after(resStr);
                        $("#resBtn_"+treeNode.tId).click(function(){
                            var resClassifyId = $(this).attr("resClassifyId");
                            loadPage(ctxPath + "/admin/teach-material/show", "", {"resClassifyId": resClassifyId});
                        });
                    }
				}
			},
			//删除节点
			removeHoverDom: function(treeId, treeNode){
				$("#addBtn_"+treeNode.tId).unbind().remove();
				$("#resBtn_"+treeNode.tId).unbind().remove();
				$("#showResBtn_"+treeNode.tId).unbind().remove();
				$("#sortBtn_"+treeNode.tId).unbind().remove();
			},
			selectedMulti: false//多选
		},
		edit: {
			enable: true,//修改
			editNameSelectAll: false,//修改节点时全选节点内容
			renameTitle: "修改章节信息",
			removeTitle: "删除章节信息	",
			//是否显示删除按钮
			showRemoveBtn: function(treeId, treeNode){
                return true;
			},
			//是否显示修改按钮
			showRenameBtn: function(treeId, treeNode){
                return true;
			}
		},
		data: {
			key: {
				name: "chapterName"
			},
			simpleData: {
				//指定数据的上下级关系
				enable: true,
				idKey: "id",
				pIdKey: "pid",
				rootPId: 0
			}
		},
		callback: {
			//拖动前
			beforeDrag: function(treeId, treeNodes){
				//根据拖拽权限判定是否允许拖拽
				return false;//不允许拖拽
//				return treeNodes[0].dragAndDropPermission;//允许拖拽
			},
			//拽操作结束之前的事件回调函数
			beforeDrop: function(treeId, treeNodes, targetNode, moveType){
				dragAndDropTreeNode = treeNodes;
				dragAndDropTargetTreeNode = targetNode;
				confirm("是否拖拽节点"+ treeNodes[0].name +"到"+ targetNode.name +"节点下?", function(){
					//请求后台
					var url = ctxPath + "/resClassify/dragAndDropResClassify";
					var params = {"resClassifyId": dragAndDropTreeNode[0].id, "newParentId": dragAndDropTargetTreeNode.id};
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
				var resClassifyId = treeNode.id;
				layer.open({
				  type: 2,
				  title: '修改章节信息',
				  shade: 0.8,
				  area: ['500px', '260px'],
				  content: ctxPath + "/admin/teach-material-type/to-edit/" + resClassifyId //iframe的url
				});
				return false;
			},
			//删除节点前
			beforeRemove: function(treeId, treeNode){
				deleteResClassifyId = treeNode.id;
				confirm("确定删除该章节信息?", function(){
					var params = {};
					ajaxRequest(ctxPath + "/admin/teach-material-type/delete/"+deleteResClassifyId, params, function(data){
		                if(data.code == 1){
		                	showSuccess("删除章节信息成功", function(){
                                initResClassifyData();
		                		closeAllLayer();
		                	});
		                }else{
		                	showError(data.msg);
		                }
					}, function(){
						showError("删除章节信息出错.");
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
	ztreeObj = $.fn.zTree.init($("#resClassifyTree"), setting, data);
}
