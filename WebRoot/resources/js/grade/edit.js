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

    $('#name').bind('input propertychange', function () {
        //进行相关操作
        var json = {'name': $('#name').val(), 'gid': $('#gid').val(), 'id': $('#id').val()};
        $.getJSON("/admin/grade/checkName", json, function (data) {
            if (data.code == 1) {
                $("#checkTLD").html("√");
                $('#save').attr("disabled",'');
            } else {
                $("#checkTLD").html("×");
                $('#save').attr("disabled",'disabled');
            }
        });
    });
});