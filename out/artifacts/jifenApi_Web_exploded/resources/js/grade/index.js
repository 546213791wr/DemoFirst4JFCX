function chooseOrgG(gid,name){
    $('#gid').val(gid);
    $('#gOrgName').val(name);
    $("#query-list").css('display','none');
    $("#query-list").html('');
}

/**
 *
 */
var ztreeObj = null;
var currNode = null;
$(document).ready(function(){

    $('#gOrgName').bind('input propertychange', function () {
        var json={'name': $('#gOrgName').val()};
        $('#gid').val('');
        $.getJSON("/admin/org-group/queryListByName",json, function (data) {
            var htmls = "";
            if(data.list != null && data.list.length>0){
                $.each(data.list,function (index, org) {
                    htmls += '<dd><a href="javascript:;" onclick="chooseOrgG(' + org.id + ',\'' + org.name + '\')">' + org.name + '</a></dd>';
                })
            }else {
                htmls += '<dd><span>无搜索结果</span></dd>';
            }
            $("#query-list").html(htmls);
            $("#query-list").css('display','block');
        });
    });

    $("#searchA").click(function(){
        init();
    });

    $("#import").click(function(){
        var gid = $('#gid').val();
        layer.open({
            type: 2,
            title: '组织架构导入',
            shade: 0.8,
            area: ['500px', '325px'],
            content: ctxPath + "/admin/grade/to-import?gid=" + gid //iframe的url
        });
    });

});
/**初始化数据
 */
function init(){
    var url = ctxPath + "/admin/grade/list";
    var gid = $('#gid').val();
    var gname = $("#gOrgName").val();
    if(!gid) {
        alert("没有选择机构组");
        return;
    }

    var root = {'name':gname,'id':gid,'isParent':true,'type':'1'};
    initZtree(root);
}

/**
 * 初始化Ztree
 */
function initZtree(data){
    var setting = {
        async : {
            enable: true,
            type:'post',
            url:"/admin/grade/getGradeClassByPid",
            autoParam:["id","type"]
        },
        view: {
            //新增
            addHoverDom: function(treeId, treeNode){
                var sObj = $("#" + treeNode.tId + "_span");
                if(treeNode.type != 1 && treeNode.type != 2){
                    return;
                }

                if(treeNode.type == 1){
                    //无权限则不显示
                    if($("#addBtn_"+treeNode.tId).length < 1){
                        var addStr = "<span resClassifyId='"+ treeNode.id +"' class='button add' id='addBtn_" + treeNode.tId + "' title='新增年级' onfocus='this.blur();'></span>";
                        sObj.after(addStr);
                        $("#addBtn_"+treeNode.tId).click(function(){
                            var id = treeNode.id;
                            layer.open({
                                type: 2,
                                title: '新增年级',
                                shade: 0.8,
                                area: ['500px', '350px'],
                                content: ctxPath + "/admin/grade/to-add?gid=" + id //iframe的url
                            });
                        });
                    }
                }  else if(treeNode.type == 2){
                    //无权限则不显示
                    if($("#addBtn_"+treeNode.tId).length < 1){
                        var addStr = "<span resClassifyId='"+ treeNode.id +"' class='button add' id='addBtn_" + treeNode.tId + "' title='新增班级' onfocus='this.blur();'></span>";
                        sObj.after(addStr);
                        $("#addBtn_"+treeNode.tId).click(function(){
                            var id = treeNode.id;
                            layer.open({
                                type: 2,
                                title: '新增班级',
                                shade: 0.8,
                                area: ['500px', '325px'],
                                content: ctxPath + "/admin/class/to-add?gradeId=" + id //iframe的url
                            });
                        });
                    }
                }

            },
            selectedMulti: false//多选
        },
        edit: {
            enable: true,//修改
            editNameSelectAll: false,//修改节点时全选节点内容
            renameTitle: "修改",
            //是否显示删除按钮
            showRemoveBtn:false,
            //是否显示修改按钮
            showRenameBtn: function(treeId, treeNode){
                if(treeNode.type == 2){
                    return true;
                } else if(treeNode.type == 3){
                    return true;
                }
                return false;
            }
        },
        data: {
            key: {
                name: "name"
            },
            simpleData: {
                //指定数据的上下级关系
                enable: true,
                idKey: "id"
            }
        },
        callback: {
            onClick :function (treeId, treeNode, clickFla) {
            },
            //修改节点前
            beforeEditName: function(treeId, treeNode){
                var id = treeNode.id;
                if(treeNode.type == 2){
                    layer.open({
                        type: 2,
                        title: '修改年级',
                        shade: 0.8,
                        area: ['500px', '350px'],
                        content: ctxPath + "/admin/grade/to-edit?id=" + id
                    });
                } else  if(treeNode.type == 3){
                    layer.open({
                        type: 2,
                        title: '修改班级',
                        shade: 0.8,
                        area: ['500px', '325px'],
                        content: ctxPath + "/admin/class/to-edit?id=" + id
                    });
                }
                return false;
            },
            //删除节点前
            beforeRemove: function(treeId, treeNode){
                id = treeNode.id;
                currNode = treeNode;
                if(treeNode.type == 2){
                    confirm("确定删除该年级?", function(){
                        var params = {};
                        ajaxRequest(ctxPath + "/admin/grade/delete?id="+id, params, function(data){
                            if(data.code == 1){
                                showSuccess("删除年级成功", function(){
                                    closeAllLayer();
                                    //刷新当前节点父节点
                                    ztreeObj.reAsyncChildNodes(currNode.getParentNode(),"refresh");
                                });
                            }else{
                                showError(data.msg);
                            }
                        }, function(){
                            showError("删除年级出错.");
                        });
                    }, function(){

                    });
                } else if(treeNode.type == 3){
                    confirm("确定删除该班级?", function(){
                        var params = {};
                        ajaxRequest(ctxPath + "/admin/class/delete?id="+id, params, function(data){
                            if(data.code == 1){
                                showSuccess("删除班级成功", function(){
                                    //刷新当前节点父节点
                                    closeAllLayer();
                                    ztreeObj.reAsyncChildNodes(currNode.getParentNode(),"refresh");
                                });
                            }else{
                                showError(data.msg);
                            }
                        }, function(){
                            showError("删除班级出错.");
                        });
                    }, function(){

                    });
                }

                return false;
            }
        }
    };

    ztreeObj = $.fn.zTree.init($("#orgGroupTree"), setting, data);
}