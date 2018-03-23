/**
 * Created by zhxfj on 2018/2/27.
 */
$(function () {
    var name='活跃量';
    data=[
        {name: '秀屿区',value: 895462 },
        {name: '仙游县',value: 889862},
        {name: '城厢区',value: 862510},
        {name: '荔城区',value: 798462},
        {name: '涵江区',value: 51986}
    ];
    particleJs();
    userMenu();
    logionRole();
    login();
    loginPop();
    readDistrict();
    analyzeEchart(name,data);
    analyzeTab();
    popularComment();
    newsTab();
    swiper();
    rankingBoxHeight();
    districtDataLen();
    scrollBarInit();
    expand();
    answerStatu();
    loginQuit();
});
function userMenu() {
    //头部用户菜单下拉
    $(".navuser_btn").click(function () {
        $(".navuser1 dl").toggleClass("is-show");
    });
    $(document).bind("click", function (e) {
        var target = $(e.target);
        //头部用户菜单下拉
        if (target.closest(".navuser1").length == 0) {
            $(".navuser1 dl").removeClass("is-show");
        }
    });
}
// 轮播的初始化
function  swiper() {
// 轮播设置
    var mySwiper = new Swiper ('.popular-swiper', {
        // loop: true,
        pagination : '.swiper-pagination',
        paginationClickable :true,
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        effect : 'fade',
        fade: {
            crossFade: true
        }
    });
    triangle();
    recomendFold($(".tables .first-dis"));
}



//登录

function isChinese(temp)
{
    var re=/[^\u4e00-\u9fa5]/;
    if(re.test(temp)) return false;
    return true;
}
var sureTag = 0;
function inputIcon1(){
    $(".icon-organization").css("color","#666666");
}
function inputIcon2(){
    $(".icon-user").css("color","#666666");
}
function inputIcon3(){
    $(".icon-password").css("color","#666666");
}
function  inputIcon1_1(){
    $(".icon-organization").css("color","#ccc");
}
function inputIcon2_1(){
    $(".icon-user").css("color","#ccc");
}
function inputIcon3_1(){
    $(".icon-password").css("color","#ccc");
}
$(document).on("input","#fName",function (event) {

    if(isChinese(event.target.value)){
        if(sureTag == 0){
            query();
        }else{
            sureTag = 0;
        }
    }
})
$("#pwd").keydown(function( event ) {
    if ( event.which == 13 ) {
        toSubmit('0');
    }
});

$("#pwd1").keydown(function( event ) {
    if ( event.which == 13 ) {
        toSubmit('1');
    }
});
function chooseOrg(fid,name){
    console.log(fid+"----"+name);
    sureTag = 1;
    $("#fid").val(fid);
    $("#fName").val(name);
    $("#query-list").hide();
}
function query() {
    var name = $("#fName").val();
    name = name.replace("选择机构","");
    $.getJSON("/front/org/query", {query: name}, function (data) {
        var result=name.replace(/(^\s+)|(\s+$)/g,"");
        if(result.length==0){
            $("#query-list").html("");
            $("#query-list").hide();
            return ;
        }
        var htmls = "";
        if(data.data.list.length>0){
            $.each(data.data.list, function (index, org) {
                htmls += '<dd><a href="javascript:;" onclick="chooseOrg(' + org.fid + ',\'' + org.orgName + '\')">' + org.orgName + '</a></dd>';
            });
        }else{
            htmls += '<dd><a href="javascript:;">无搜索结果</a></dd>';
        }
        $("#query-list").html(htmls);
        $("#query-list").show();
    });
}
function manuLength(str){
    return str.replace(/(^\s*)|(\s*$)/g, "").length;
}

/**
 * 登陆后选择机构登录
 * @param fid
 */
function  loginByFid(fid,loginType) {
    var loginName;
    var pwd;
    if(loginType == 0){
        loginName = $("#loginName").val();
        pwd = $("#pwd").val();
    }else {
        loginName = $("#loginName1").val();
        pwd = $("#pwd1").val();
    }

    layer.load(1);
    $.ajax({
        url:'/front/login/login-in',
        type:'post',
        dataType:'json',
        data:{fid:fid,username:loginName,password:pwd},
        success:function (data) {
            layer.closeAll("loading");
            if (data.code == 1) {
                window.location = data.data.url;
            }else{
                if (data.data.resetPwd == 1) {
                    if(data.data.uid == ''){
                        // 跳转至 超星修改密码的网页上进行修改密码。
                        showResetPwd(fid);
                    }else{
                        var uid = data.data.uid;
                        $("#uid").val(uid);
                        $(".change_pw").show();
                    }

                } else {
                    $("#errorName").text(data.data.msg);
                }
            }
        },error:function () {
            layer.closeAll("loading");
            layer.msg("登录出错!");
        }
    });
}

function showResetPwd(fid) {
    $("#pwd").val('');
    $("#errorName").html('<a href="https://passport2.chaoxing.com/login?fid='+fid+'" target="_blank">请点击此处修改密码</a>');
}

function toSubmit(loginType) {
    layer.load(1);

    $("#confirm_password").val('');
    $("#password").val('');
    $("#chMsg").text('');
    var fid ;
    var loginName ;
    var pwd ;
    if(loginType == '0'){
        fid = $("#fid").val();
        // 设置FID 必须是5位以内的数，其他数据则默认是无效，或者其他定制
        if(fid.length > 5 ){
            fid = fid.substring(0,5);
        }
        var loginName = $("#loginName").val();
        var pwd = $("#pwd").val();
        if(manuLength(fid) == 0 || manuLength(loginName) == 0 || manuLength(pwd) == 0){
            layer.closeAll("loading");
            layer.msg("输入信息不能为空");
            return false;
        }
        $("#errorName").text('');
    }else {
        fid = '12026';//管理员默认登录机构
        loginName = $("#loginName1").val();
        pwd = $("#pwd1").val();
        if(manuLength(loginName) == 0 || manuLength(pwd) == 0){
            layer.closeAll("loading");
            layer.msg("输入信息不能为空");
            return false;
        }
        $("#errorName1").text('');
    }

    var url = "/front/login/login-fid";

    $.ajax({
        url:url,
        type:'post',
        dataType:'json',
        data:{fid:fid,username:loginName,password:pwd},
        success:function (data) {
            layer.closeAll("loading");
            if (data.code == 1) {
                var htmls = "";
                if (data.data.orgList.length > 1) {
                    $.each(data.data.orgList, function (index, org) {
                        htmls += '<li><a href="javascript:;" onclick="loginByFid(\'' + org.fid + '\',\'' + loginType + '\')">' + org.orgName + '</a></li>';
                    });
                } else if (data.data.orgList.length == 1) {
                    loginByFid(data.data.orgList[0].fid,loginType);
                    return;
                } else {
                    htmls += '<li><a href="javascript:;">没有可选择的机构</a></li>';
                }
                $("#orgList").html(htmls);
                $(".selectOrg").show();
            } else {
                if (data.data.resetPwd == 1) {
                    if(data.data.uid == ''){
                        showResetPwd(fid);
                    }else {
                        var uid = data.data.uid;
                        $("#uid").val(uid);
                        $(".change_pw").show();
                    }
                } else {
                    if(loginType == '0'){
                        $("#errorName").text(data.data.msg);
                    }else {
                        $("#errorName1").text(data.data.msg);
                    }
                }
            }
        },error:function () {
            layer.closeAll("loading");
            layer.msg("登录出错!");
        }
    });
}





// 登录角色的却换
function logionRole() {
    $(".login-tabs>span").on("click",function () {
        if(!$(this).hasClass("current")){
            var thisIndex=$(this).index();
            $(this).addClass("current").siblings().removeClass("current");
            $(".inp-group").eq(thisIndex).siblings().css("display","none");
            $(".inp-group").eq(thisIndex).fadeIn();
        }
    })
}



//  点击登录弹出登录框
function login() {
    $("#logon").on("click",function () {
        $(".login-pop").fadeIn();
    });
    $(document).on("click",".login-pop .bg,.login-pop .icon-close",function () {
        $(this).parents(".login-pop").fadeOut();
    })
}
//  阅读区域图表
function readDistrict(){
    var myechart=echarts.init($('#readDistrict')[0]);
    var option = {
        backgroundColor:'#fff',
        color:['rgba(78,140,255,.3)'],
        tooltip: {
            trigger: 'axis',
            formatter: '{c}人',
            padding:[5,10],
            backgroundColor:' #5897E5',
            position: function (point, params, dom, rect, size) {
                return [point[0], '10%'];
            }
        },
        xAxis: {
            type: 'category',
            splitLine:{
                show:false
            },
            axisLine:{
                show:false
            },
            axisTick:{
                show:false
            },
            axisLabel:{
                color:'#999'
            },
            boundaryGap: false,
            data: ['01-08', '01-09', '01-10', '01-11', '01-12', '01-13', '01-14']
        },
        yAxis: {
            type: 'value',
            name:'阅读人数',
            nameTextStyle:{
                color:'#999'
            },
            axisLine:{
                show:false
            },
            axisTick:{
                show:false
            },
            splitLine:{
                show:false
            },
            axisLabel:{
                color:'#999'
            }
        },
        series: [{
            data: [30000, 50000, 40000, 30000, 45000, 50000, 42000],
            type: 'line',
            areaStyle: {
                normal:{
                    color:'rgba(78,140,255,.3)'
                }
            }
        }]
    };
    myechart.setOption(option);
}
//  区域分析图图表
function analyzeEchart(name,data) {
    var myChart=echarts.init($('#analyzeEchart1')[0]);
    myChart.showLoading();
    $.get('/read-pt/assets/putian.json',function (getJson) {
        myChart.hideLoading();
        echarts.registerMap('putian', getJson);
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>'+name+'：{c}'
            },
            color:['#FFF48B','#91EC8C','#FF7F7C','#FF7F7C','#E89AFF'],
            visualMap: {
                min: 0,
                max: 2500,
                type:'piecewise',
                left: 'left',
                top: 'bottom',
                text: ['高','区域'+name+' : 低'],           // 文本，默认为数值文本
                orient:'horizontal',
                itemWidth:12,
                itemGap:4,
                pieces: [
                    // {min:  data[0].value,color:'#1066C0'},
                    {min:  data[1].value, max:  data[0].value,color:'#1066C0'},
                    {min:  data[2].value, max:  data[1].value,color:'#3786D9'},
                    {min:  data[3].value, max:  data[2].value,color:'#5093DA'},
                    {min:  data[4].value, max:  data[3].value,color:'#7BB5F2'},
                    {min:0, max: data[4].value,color:'#9DC9F7'}
                ]
            },
            series: [
                {
                    type: 'map',
                    map: 'putian',
                    label: {
                        normal: {
                            show: true,
                            color:'#333'
                        },
                        emphasis:{
                            show:false
                        }
                    },
                    data:data,
                    itemStyle:{
                        emphasis: {
                            areaColor:'#9EE2EA',
                            position:[10,10],
                            borderWidth:0
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
        myChart.on("mouseover", function (params){
            myChart.dispatchAction({
                type: 'downplay'
            });
        });
        liHover(myChart);
    });
}
//
function liHover(myChart) {
    $(".district-ranking>li").on("mouseenter",function () {
        var seriesIndex=$(this).parents(".district-ranking").index();
        var thisName=$(this).find("label").text();
        var thisIndex=$(this).index();
        thisName=thisName.substr(2,thisName.length);
        myChart.dispatchAction({
            type: 'showTip',
            seriesIndex:0,
            dataIndex:thisIndex,
            name:thisName
        })
    })
}
//  分析
function analyzeTab(myChart) {
    $("#analyzeTab>li").on("click",function () {
        if(!$(this).hasClass("current")){
            var thisIndex=$(this).index();
            var name,data;
            $(this).addClass("current").siblings().removeClass("current");
            $(".analyze-datas>ul").eq(thisIndex).siblings().fadeOut(0);
            $(".analyze-datas>ul").eq(thisIndex).fadeIn();
            if(thisIndex==0){
                name='活跃量';
                data=[
                    {name: '秀屿区',value: 895462 },
                    {name: '仙游县',value: 889862},
                    {name: '城厢区',value: 862510},
                    {name: '荔城区',value: 798462},
                    {name: '涵江区',value: 51986}
                ];
            }else if(thisIndex==1){
                name='出题量';
                data=[
                    {name: '秀屿区',value: 321 },
                    {name: '仙游县',value: 298},
                    {name: '城厢区',value: 287},
                    {name: '荔城区',value: 256},
                    {name: '涵江区',value: 243}
                ];
            }else if(thisIndex==2){
                name='阅读量';
                data=[
                    {name: '秀屿区',value: 4200 },
                    {name: '仙游县',value: 3890},
                    {name: '城厢区',value: 3560},
                    {name: '荔城区',value: 3480},
                    {name: '涵江区',value: 3360}
                ];
            }
            analyzeEchart(name,data);
        }
    })
}
//  喜爱图书评论切换
function popularComment() {
    $(".recommends>li").on("mouseenter",function () {
        if(!$(this).hasClass("current")){
            var thisIndex=$(this).index();
            var tables=$(this).parents(".recommends").next(".tables");
            var currentLi=tables.find("li").eq(thisIndex);
            $(this).addClass("current").siblings().removeClass("current");
            tables.find("li").css("display","none");
            currentLi.css("display","block");
            recomendFold(currentLi);
        }
    })
}
//  新闻tab的切换
function newsTab() {
    $("#newsTab>span").on("click",function () {
        if(!$(this).hasClass("current")){
            var thisIndex=$(this).index();
            $(this).addClass("current").siblings().removeClass("current");
            $(".list-box").css("display","none");
            $(".list-box").eq(thisIndex).fadeIn();
        }
    })
}
// 优秀读后感三角形箭头的位置
function triangle() {
    $(".tables>li").each(function () {
        var thisIndex=$(this).index();
        var book=$($(".recommends>li")[0]);
        var thisMargin=parseInt(book.css("margin-left"));
        var thisLeft=parseInt(book.outerWidth(true))*(thisIndex+0.5)-thisMargin;
        $(this).find(".triangle").css("left",thisLeft);
    })
}
//  读后感的展开，收取
function recomendFold(currentLi) {
  currentLi.find(".recommand-details").each(function () {
    if($(this).next().find(".unfold").length>0){
      $(this).css("max-height","none");
    }else{
      if($(this).height()>50){
        $(this).next().find(".fold").css("display","inline-block");
        $(this).css("max-height","40px");
      }
    }
  });
}
// 读后感的展开，折叠
function expand() {
  $(".fold").off("click").on("click",function () {
    if($(this).text()=='展开'){
      $(this).addClass("unfold");
      $(this).text('收起');
      $(this).parent().prev(".recommand-details").css("max-height","");
    }else if($(this).text()=='收起'){
      $(this).removeClass("unfold");
      $(this).text('展开');
      $(this).parent().prev(".recommand-details").css("max-height","40px");
    }
  })
}
//排行榜高度的控制
function rankingBoxHeight() {
    $(".ranking-ul>li").each(function () {
        var boxH=$(this).parents("ul").height();
        $(this).css("height",boxH);
    })
}
// banner背景图的设置
function particleReise() {
  $(window).on('resize', function () {
    particleJs();
  });
}
function particleJs() {
    particlesJS('banner-img',
        {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#2b4d73"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 5,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#5897E5",
                    "opacity": 0.25,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed":.5,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true,
            "config_demo": {
                "hide_card": false,
                "background_color": "#b61924",
                "background_image": "",
                "background_position": "50% 50%",
                "background_repeat": "no-repeat",
                "background_size": "cover"
            }
        }
    );
}
//  区域分析数量长度
function districtDataLen(){
    $(".district-ranking .data").each(function () {
        var MaxNum=$(this).parents(".district-ranking").find(".first").text();
        var thisNum=$(this).next().text();
        var prec=(thisNum/MaxNum)*0.9*100;
        $(this).css("width",prec+'%');
    })
}
// 滚动条美化
function scrollBarInit() {
    $(".swiper-table").mCustomScrollbar({
        horizontalScroll:false
    });
}

// 动态答题
function answerStatu() {
    $(".news").css("position","relative");
    setInterval(function () {
        var obj=$(".news>li:last-child").clone('true');
        $('.news').prepend(obj);
        $('.news').addClass('newsMove');
        setTimeout(function () {
            $('.news>li:last-child').remove();
            $('.news').removeClass('newsMove');
        },500);
    },3000)
}
//  登录效果
function loginPop() {
    /*$(".login-pop .submit").on("click",function () {
      var inps=$(this).parents(".inp-group").find("input");
      $(".login-pop").fadeOut();
      $(".login-btn").css("display","none");
      $(".navuser1").css("display","inline-block");
    })*/
}
// 登录退出
function loginQuit() {

    $("#quit").on("click",function () {
        var url = "http://passport2.chaoxing.com/logout.html?refer=" + window.location.protocol + "//" + window.location.hostname+"/front/pt-index";
        window.location.href = url;
//      $.getJSON('/front/login/log-out',null,function(data){
//          $('#userFloatr').html('<div class="login-btn"> <input type="button" id="logon" value="登录"></div>');
//          login();
//      });

    })
}