/**
 *
 */
$(document).ready(function () {
    /**form表单格式验证*/
    var validator = $("#reRes_form").validate({
        rules:{
            fanyaResId:{
                required:true
            },
            resName:{
                required:true
            },
            level:{
                required:true
            },
            coverName:{
                required:true
            },
            classifyId:{
                required:true
            },
            wordNum:{
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

    /**表单提交*/
    $("#reRes_form").on("submit", function() {
        ajaxForm(this, function(data) {
            if(data.code==1){
                showSuccess("新增资源成功", function(){
                    closeAllLayer();
                    var level=$("#level").val();
                    var classifyId=$("#classifyId").val();
                    loadPage(ctxPath +"/admin/reRes/list?level="+level+"&classifyId="+classifyId);
                });
            }else {
                showError("新增资源出错.");
            }
        }, function(){

        });
        return false; // 阻止表单自动提交事件
    });
    $("#save").click(function(){
        if(validator.form()){
            if($("#fileName").val() == ""){
                showError("请选择图片");
                return false;
            }
            $("#reRes_form").attr("action",ctxPath+"/admin/pltresIOput/inputReResImg");
            $("#reRes_form").attr("enctype","multipart/form-data");
            $("#reRes_form").attr("method","post");
            ajaxForm($("#reRes_form"), function (json) {
                if (json.code == 1) {
                    $("#coverName").val(json.data.imgName);

                    $("#reRes_form").attr("action",ctxPath+"/admin/reRes/save-reRes");
                    $("#reRes_form").removeAttr("enctype");
                    $("#reRes_form").submit();
                } else {
                    showError(json.message);
                }
            }, function () {
                showError("图片上传失败");
            });
            return false;





        }
    });
    $("#fileName").change(function () {
        $("#coverImg").attr('src', '');
        $("#coverImg").css("display","inline");
        var $file = $(this);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        var $img = $("#coverImg");

        if (fileObj && fileObj.files && fileObj.files[0]) {
            dataURL = windowURL.createObjectURL(fileObj.files[0]);
            $img.attr('src', dataURL);
        } else {
            dataURL = $file.val();
            var imgObj = document.getElementById("coverImg");
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
        }
    });
});
function findInXyBook(){
    var fanyaResId = $("#fanyaResId").val();
    if(fanyaResId!=''&&(!(isNaN(fanyaResId)))){
        $.getJSON(ctxPath + "/admin/reRes/pull-reRes",{"fanyaResId":fanyaResId},function (data) {
            if(data.code==1){
                var reRes=data.data.reRes;
                $("#level").val(reRes.level);
                $("#resName").val(reRes.resName);
                $("#classifyId").val(reRes.classifyId);
            }else {
                showError(data.message);
            }
        })
    }else{
        showError("请输入正确的资源ID");
    }
}