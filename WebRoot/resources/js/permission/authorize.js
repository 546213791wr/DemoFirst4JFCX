/**
 * 
 */
var ztree = null;
$(document).ready(function(){
	// initFunctionData();
	$("#save").click(function(){
		var authorize = "";
		var selectedNodes = ztree.getCheckedNodes(true);
		if(selectedNodes.length > 0){
			$(selectedNodes).each(function(){
				authorize += this.id + ",";
			});
		}
		if(authorize.length > 0){
			authorize = authorize.substring(0, authorize.length - 1);
		}
		var roleId = $("#roleId").val();
		var params = {"roleId": roleId, "authorize": authorize};
		ajaxRequest(ctxPath + "/permission/authorize", params, function(data){
			if(data.success){
            	showSuccess("授权成功", function(){
            		window.parent.loadPage(ctxPath + "/role");
            		window.parent.closeAllLayer();
            	});
            }else if("error" == data.msg){
            	showError("授权出错");
            }else if("failure" == data.msg){
            	showError("授权失败");
            }else{
            	showError(data.msg);
            }
		}, function(){
			showError("授权出错");
		});
	});
});
/**
 * 初始化功能数据
 */
function initFunctionData(){
	var loadFunctionsUrl = ctxPath + "/admin/rolePermission/toAuthorize";
	var params = {"roleId": $("#roleId").val()};
	ajaxRequest(loadFunctionsUrl, params, function(response){
		debugger;
		$("#total").html(response.length);
		initZtree(response);
	}, function(){
		showError("加载角色权限出错");
	});
}
/**
 * 初始化Ztree
 */
function initZtree(data){
	var setting = {
		check: {
			enable: true,
			nocheckInherit: true
		},
		view: {
			//新增功能
			addHoverDom: function(treeId, treeNode){
				return false;
			},
			//删除节点
			removeHoverDom: function(treeId, treeNode){
				
			},
			selectedMulti: true//多选
		},
		edit: {
			enable: false,//修改
			editNameSelectAll: false,//修改节点时全选节点内容
			//是否显示删除按钮
			showRemoveBtn: function(treeId, treeNode){
				return false;
			},
			//是否显示修改按钮
			showRenameBtn: function(treeId, treeNode){
				return false;
			}
		},
		data: {
			key: {
				url: "notJump"
			},
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
				return true;//不允许
			},
			//修改节点前
			beforeEditName: function(treeId, treeNode){
				return false;
			},
			//删除节点前
			beforeRemove: function(treeId, treeNode){
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
	ztree = $.fn.zTree.init($("#functionTree"), setting, data);
}