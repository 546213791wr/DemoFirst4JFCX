
//获取数据
function getQuestionList() {
    //获取参数
    var para = {};
    para['resName'] = $("#resName").val();
    para['dimensionId'] = $("#dimension").val();
    para['orgId'] = $("#org").val();

    $.ajax({
        url: "/front/verify/getDimensionList",
        data:para,
        dataType:'json',
        success:function(result){
            //console.info(result);
        }
    });
}

//  select2的初始化
function selectInit() {
    //初始化维度select
    $("#dimension").select2({
        ajax: {
            url: "/front/verify/getDimensionList",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    searchName: params.term,
                };
            },
            processResults: function (data) {
                return {
                    results: data.data.dimensionList
                };
            },
            cache: true
        }
    });

    //初始化机构
    $("#org").select2({
        ajax: {
            url: "/front/verify/getOrgByExpert",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    searchName: params.term,
                };
            },
            processResults: function (data) {
                return {
                    results: data.data.orgList
                };
            },
            cache: true
        }
    });

    $(".status select").select2({
        minimumResultsForSearch: -1
    })
}
// 不通过弹框的显示
function noPassPop() {
       // var _this=$(obj);
    $(document).off("click").on("click",".audit .not-pass" , function () {
        var pop=$(this).parents(".audit").find(".not-pass-reason");
        if(pop.css("display")==='none'){
            pop.fadeIn(300);
            $(this).parents("li").siblings().find(".not-pass-reason").fadeOut(300);
        }else{
            pop.fadeOut(300);
        }
    })
}
// 点击其他区域，关闭不通过原因弹框
function closeNotPass() {
    $(document).on('click', function (e) {
        var e = e || window.event; //浏览器兼容性
        var elem = e.target || e.srcElement;
        while (elem) {
            if ($(elem).hasClass('not-pass-reason')||$(elem).hasClass('not-pass')) {
                return;
            }
            elem = elem.parentNode;
        }
        $('.not-pass-reason').fadeOut(300);
    });
}
// 已审核题的展开，收起
function fold(){
    $(document).on("click","#auditedQues .fold-btn",function () {
        if($(this).hasClass("open")){
            $(this).removeClass("open");
            $(this).parents("li").find(".ques-content").slideUp();
            $(this).find(".text").text("展开");
        }else{
            $(this).addClass("open");
            $(this).parents("li").find(".ques-content").slideDown();
            $(this).find(".text").text("收起");
        }
    })
}

function query() {
    var resName = $("#resName").val();
    if (resName != null && resName != "") {
        var htmls = "";
        $.ajax({
            type: 'POST',
            url: "/front/verify/getResName",
            data: {'resName': resName},
            success: function (data) {
                if (data.length > 0) {
                    $.each(data, function (index, res) {
                        htmls += '<dd><a href="javascript:;" onclick="chooseRes(' + res.id + ',\'' + res.resName + '\')">' + res.resName + '</a></dd>';
                    });
                } else {
                    htmls += '<dd><span onclick="closeIt()">无搜索结果</span></dd>';
                }
                $("#query").html(htmls);
                $("#query").css("display", "block");
            },
            dataType: 'json'
        });
    }
}

function chooseRes(id, resName) {
    $("#resId").val(id);
    $("#resName").val(resName);
    $("#query").css("display", "none");
}
