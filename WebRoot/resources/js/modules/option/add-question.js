

$(document).ready(function () {
    var validator = $("#reRes_form").validate({
        rules:{
            questionName:{
                required:true
            },
            option:{
                required:true
            },
            opt:{
                required:true
            },
            dimension:{
                required:true
            },
            analysis:{
                required:true
            }
        },
        errorClass: "help-inline",
        errorElement: "span",
        highlight:function(element, errorClass, validClass) {
            $(element).parents('.control-group').removeClass('success');
            $(element).parents('.control-group').addClass('error');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents('.control-group').removeClass('error');
            $(element).parents('.control-group').addClass('success');
        }
    });

    $("#reRes_form").on("submit", function() {
        ajaxForm(this, function(data) {
            if(data.code==1){
                showSuccess("新增题目成功", function(){
                    closeAllLayer();
                    var reResName=$("#reResName").val();
                    var resId=$("#resId").val();
                    loadPage(ctxPath+'/admin/option/system-list',null,{"reResName":reResName,"id":resId});
                });
            }else {
                showError("新增题目出错.");
            }
        }, function(){
        });
        return false; // 阻止表单自动提交事件
    });

    $("#save").click(function(){
        var tem=0;
        $("input[type='button']").each(function () {
            if(!$(this).attr("disabled")){
                alert("图片还未上传！");
                tem=1;
            }
        });
        if(tem==1){
            return;
        }
        $("input[name='annex']").each(function () {
            $("#analysis").after("<input type=\"hidden\" name=\"annex\" value="+$(this).val()+" />");
        });

        $("input:radio").each(function (index,domEle) {
            if($(domEle).attr("checked")=="checked"){
                $(domEle).attr("value",index+1);
            }
        });
        if(validator.form()) {
            $("#reRes_form").attr("action", ctxPath + "/admin/option/add-question");
            $("#reRes_form").removeAttr("enctype");
            $("#reRes_form").submit();
        }
        });


    $("#addOption").click(function () {
        var tem=0;
        $("input[name='option']").each(function () {
            tem++;
        });
        if(tem<4){
            $(this).before("<div>\n" +
                "                    <input class=\"option\" type=\"radio\" name=\"option\"/>\n" +
                "                    <input type=\"text\" autocomplete=\"off\" class=\"span6\" placeholder=\"请输入选项内容\" name=\"opt\"/>\n" +
                "                    <a  class=\"btn btn-danger btn-mini\" onclick=\"deleteOption(this)\">删除</a><br/>\n" +
                "                    </div>")
        }else {
            alert('最多4个选项！');
        }
    });


    $("#addFile").click(function () {
        var tem=0;
        $("input[name='annex']").each(function () {
            tem++;
        });
        if(tem<4){
            $(this).parent().before("<div class=\"controls\" >\n" +
                "                        <form method=\"post\" action=\"/admin/pltresIOput/inputReResImg\" enctype=\"multipart/form-data\">\n" +
                "                            <input type=\"hidden\" value=\"2\" name=\"imgDir\"/>\n" +
                "                            <input type=\"hidden\" name=\"annex\" value=\"0\" />\n" +
                "                            <img src=\"\" style=\"width: 80px;height: 100px;display: none\"/>\n" +
                "                            <input type=\"file\" class=\"fileName\" name=\"fileName\" accept=\"image/*\" onchange=\"changeFile(this)\"/>\n" +
                "                            <input type=\"button\" class=\"importImg\" onclick=\"upload(this)\" value=\"上传\" disabled=\"disabled\"/>\n" +
                "                            <a class=\"btn\" onclick=\"deleteOption(this)\">删除</a><br/>\n" +
                "                        </form>\n" +
                "                    </div>")
        }else {
            alert('最多4张图片！');
        }
    });

});



function upload(obj) {
    var form=$(obj).parent();
    annexN=$(obj).parent().find("input[name='annex']");
    btn=$(obj).parent().find("input[type='button']");
    ajaxForm($(form), function (json) {
        if (json.code == 1) {
            annexN.val(json.data.imgName);
            btn.attr('disabled',true);
            showSuccess("图片上传成功", function () {
                closeAllLayer();
            });
        } else {
            showError(json.message);
        }
    }, function () {
        showError("图片上传失败");
    });
    return false;

}

function changeFile(obj) {
    var preview=$(obj).prev();
    var annexN=$(obj).parent().find("input[name='annex']");
    var next=$(obj).next();
    if($(obj).val().length<1){
        annexN.val('0');
        next.attr('disabled',true);
    }else {
        annexN.val('1');
        next.attr('disabled',false);
    }
    preview.attr('src', '');
    preview.css("display","inline");
    var $file = $(obj);
    var fileObj = $file[0];
    var windowURL = window.URL || window.webkitURL;
    var dataURL;
    var $img = preview;

    if (fileObj && fileObj.files && fileObj.files[0]) {
        dataURL = windowURL.createObjectURL(fileObj.files[0]);
        $img.attr('src', dataURL);
    } else {
        preview.css("display","none");
    }
}

function deleteFile(obj) {
    $(obj).parent().parent().html("");
    $(obj).parent().parent().css("display","none");
}

function deleteOption(obj) {
    $(obj).parent().html("");
    $(obj).parent().css("display","none");
}


