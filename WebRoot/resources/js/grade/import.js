$(document).ready(function(){

    $("#import").click(function(){

        if($('#file').val() == ''){
            alert('请选择上传文件');
            return;
        }

        ajaxForm($("#form"), function (data) {
            if (data.code == 1) {
                $('#result').html('已存在'+data.existsCnt+'条，入成功'+data.successCnt+'线条，导入失败'+data.errorCnt+'条。')
            } else {
                $('#result').html(data.message);
            }
        }, function () {
            $('#result').html("导入错误");
        });
    });

});