$(document).ready(function () {
    $("#save").click(function () {
        if ($("#checkTLD").text() != "√") {
            return;
        }
        ajaxForm($("#form"), function (data) {
            if (data.code == 1) {
                showSuccess("保存成功", function () {
                    //刷新当前节点父节点
                    window.parent.init();
                    window.parent.closeAllLayer();
                });
            } else {
                showError(json.message);
            }
        }, function () {
        });
    });
});

function judgeName() {
    var name=$('#name').val();
    //正则表达式
    var reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$");
    var reg2 = new RegExp(/\s+/g);
    //判断输入框中有内容
    if((!reg.test(name))||reg2.test(name)) {
        $("#checkTLD").html("×");
        return;
    }
    //进行相关操作
    var json = {'name': name, 'gradeId': $('#gradeId').val(), 'id': $('#id').val()};
    $.getJSON("/admin/class/checkName", json, function (data) {
        if (data.code == 1) {
            $("#checkTLD").html("√");
        } else {
            $("#checkTLD").html("×");
        }
    });
}