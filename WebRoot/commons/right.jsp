<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="/resources/include/taglib.jsp" %>
    <link rel="stylesheet" type="text/css" href="${ctx}/f_resources/css/select_new.css?v=20171221">
    <style>
    .statusbar .bar_nav dl dt.logoff .tit img {
    width: 100%;
    height: 100%;
    border-radius: 0;
    border: 0 !important;
    }
    </style>
<%

    response.setHeader("Cache-Control", "no-cache");

    response.setHeader("Cache-Control", "no-store");

    response.setDateHeader("Expires", 0);

    response.setHeader("Pragma", "no-cache");

%>

<!-- 状态栏 -->
<div class="statusbar">
    <div class="bar_nav">
        <dl>
            <!-- 未登录 -->
            <c:if test="${userRightSTM eq null}">
                 <dt class="login">
                  <a href="javascript:;">
                    <img src="/f_resources/img/img_user.png" alt="未登录">
                    <span>未登录</span>
                  </a>
                <!-- 登录弹窗 -->
                 <div class="login_win">
                    <s>×</s>
                    <h1>登录</h1>
                    <ul>
                      <li>
                        <i class="icon-organization"></i>
                        <input type="hidden" id="fid" value="" />
                        <input type="text"  id="fName" name="searchKey" value="选择机构" onblur="if(this.value==''){this.value='选择机构'}" onfocus="if(this.value=='选择机构'){this.value=''}" />
                        <input class="institution_option" type="button" value=" " onclick="query()"/>
                        <i class="icon-search"></i>
                        <dl id="query-list">
                          <%--<dd><a href="javascript:;">成都市草堂中学</a></dd>--%>
                        </dl>
                      </li>
                      <li>
                        <i class="icon-user"></i>
                        <input type="text"  id="loginName"  name="searchKey" value="用户名/手机号/邮箱" onblur="if(this.value==''){this.value='用户名/手机号/邮箱'}" onfocus="if(this.value=='用户名/手机号/邮箱'){this.value=''}" />
                      </li>
                      <li>
                        <i class="icon-password"></i>
                        <input type="password" name="pwd" id="pwd">
                      </li>
                    </ul>
                    <a href="javascript:;" onclick="toSubmit()" class="submit">登录</a>
                    <a href="/front/index" class="cancel">随便逛逛</a>
                    <a href="http://passport2.chaoxing.com/pwd/getpwd" class="forget">忘记密码？</a>
                  </div>
                </dt>
            </c:if>
            <!-- 已登录 -->
            <c:if test="${userRightSTM ne null}">
                <dt class="logoff">
                    
                    <div class="logOutPop">
                        <s>×</s>
                        <img class="logOutImg1" src="/f_resources/img/logOut.png" alt="未登录">
                        <div> <img class="logOutImg2" src="http://photo.chaoxing.com/p/${userRightSTM.uid}_80" alt="用户"></div>
                        <p class="sign_win_tip">${userRightSTM.realName}</p>
                        <c:if test="${userRightSTM.userTypeId eq 1}">
                        <p class="font14 color666">${CLASS_NAME}</p>
                        </c:if>
                        <c:if test="${userRightSTM.userTypeId eq 2}">
                        <p class="font14 color666">教师</p>
                        </c:if>
                        
                        <c:if test="${userRightSTM.userTypeId==2}">
                        <div class="logOutBottom">
                            <a class="logOutBottom_left" href="javascript:void(0)" onclick="show_lay(2)"> 
                                <i class="icon-classes"></i>
                                <span>选择班级</span>
                            </a> 
                            <a class="logOutBottom_right" href="javascript:void(0)" id="logout">
                                <i class="icon-leave2"></i>
                                <span>退出</span>
                            </a>
                        </div>
                        </c:if>
                        <c:if test="${userRightSTM.userTypeId ne 2}">
                        <div class="logOutBottom">
                            <a class="logOutBottom_100" href="javascript:void(0)" id="logout">
                                <i class="icon-leave2"></i>
                                <span>退出</span>
                            </a>
                        </div>
                        </c:if>
                    </div>
                <%--选择班级弹窗--end--%>
                    <img class="logUerAvatar" src="http://photo.chaoxing.com/p/${userRightSTM.uid}_80" alt="头像">
                    <strong>${userRightSTM.realName}</strong>
                    <c:if test="${userRightSTM.userTypeId eq 1}">
                        <span>${CLASS_NAME}</span>
                    </c:if>
                    <c:if test="${userRightSTM.userTypeId eq 2}">
                        <span>教师</span>
                    </c:if>

                    <a id="sign1" style="display: none;" class="sign" href="javascript:;" onclick="signTsk()">
                        <i class="icon-sign"></i>签到
                    </a>
                    <a id="sign2" style="display: none;" href="javascript:;" class="finish" onclick="viewSign()">
                      已签到
                    </a>
                <div id="sign-msg" style="display: none"  class="get">
                    <span>请签到</span>
                    <s></s>
                </div>
                    <!-- 签到弹窗 -->
                    <div class="sign_win">
                        <s>×</s>
                        <div class="tit">
                            <%--<i class="icon-sign-check"></i>--%>
                            <img src="/f_resources/img/qiandao.png" alt="未登录">
                        </div>
                        <div class="star">
                            <span class="sign_win_tip">今日签到成功！</span>
                            <div class="head_ico">
                                <i class="icon-star"></i>
                            </div>
                            <span id="tdStar"></span>
                        </div>
                        <p class="font14 color999">
                            <span id="ctEx">

                            </span>
                        </p>
                        <ul class="step" id="stars">

                        </ul>
                <ul class="sign_win_days">

                </ul>
                        <div class="fontS12 color999">
                            ————已连续签到<span id="ctDays"></span>天————
                        </div>
                    </div>
                </dt>
            </c:if>
            <dd>
                <a href="/front/readStatus/0/index">
                   <i class="icon-time"></i>
                    <span>最近浏览</span>
                </a>
            </dd>
            <dd>
                <a  onclick="evluateMission()"  style="cursor:pointer">
                    <i class="icon-task"></i>
                    <span>任务</span>
                </a>
                <!-- 有新任务 -->
                <div id="task-msg" style="display: none"  class="get">
                    <span>新任务！</span>
                    <s></s>
                </div>
            </dd>
            <dd>
                <a onclick="evaluateThought()" style="cursor:pointer">
                    <i class="icon-read"></i>
                    <span>读后感</span>
                </a>
            </dd>
            <dd>
                <a onclick="evluateReport()" style="cursor:pointer">
                    <i class="icon-report"></i>
                    <span>报告</span>
                </a>
                <!-- 升级 -->
                <%--<div class="get">--%>
                    <%--<span>升到5级了！</span>--%>
                    <%--<s></s>--%>
                <%--</div>--%>
            </dd>
            <dd>
                <a href="javascript:;" onclick="alert('暂未开放')">
                    <i class="icon-shop"></i>
                    <span>星币商城</span>
                </a>
            </dd>
            <dd>
                <a target="_blank" href="http://i.mooc.chaoxing.com/space/index">
                    <i class="icon-space"></i>
                    <span>空间</span>
                </a>
            </dd>
        </dl>
        <dl>
            <dt></dt>
            <dd>
                <a class="feedback" href="javascript:;" style="display: none">
                    <i class="icon-feedback"></i>
                </a>
                <!-- 反馈弹窗 -->
                <div class="feedback_win">
                    <s>×</s>
                    <h1>提交反馈</h1>
                    <textarea class="textarea_editor" rows="6" value=='请输入你的意见或建议 ...' onfocus="if (value =='请输入你的意见或建议 ...'){value =''}" onblur="if (value ==''){value='请输入你的意见或建议 ...'}" placeholder="请输入你的意见或建议 ...">请输入你的意见或建议 ...</textarea>
                    <textarea class="textarea_contact" rows="6" value=='请留下你的联系方式 ...' onfocus="if (value =='请留下你的联系方式 ...'){value =''}" onblur="if (value ==''){value='请留下你的联系方式 ...'}" placeholder="请留下你的联系方式 ...">请留下你的联系方式 ...</textarea>
                    <a href="#" class="submit">提交</a>
                </div>
            </dt>
            </dd>
            <dd class="qrcode">
                <a href="javascript:;">
                    <i class="icon-qrcode"></i>
                </a>
                <div></div>
            </dd>
            <dd>
                <a href="javascript:;" id="goTop">
                    <i class="icon-gotop"></i>
                </a>
            </dd>
        </dl>
    </div>
</div>
    <%--选择班级-start--%>
    <input type="hidden" name="typeId" value="${userRightSTM.userTypeId}"/>
  <div class="fade_layer"></div>
    <div class="detail_layer select_peo">
        <s class="s1">×</s>
        <div class="title">
            <p class="title1">选择班级</p>
            <p class="title2">选择你要执教的班级</p>
        </div>
        <div class="title_right">
            <p class="title1">已选择</p>
        </div>
        <div class="select_peo_con">
            <div class="left">
                <div class="areas_list">
                <ul class="yiji">
                   <!--  <li class="areas_list_one"><a>一年级</a></li>
                    <ul class="areas_list_two">
                        <li><span id="105">一班</span></li>
                        <li><span id="106">二班</span></li>
                        <li><span id="107">三班</span></li>
                    </ul>
                    <li class="areas_list_one"><a>二年级</a></li>
                    <ul class="areas_list_two">
                        <li><span id="108">一班</span></li>
                        <li><span id="109">二班</span></li>
                        <li><span id="110">三班</span></li>
                        <li><span id="111">四班</span></li>
                    </ul>
                    <li class="areas_list_one"><a>三年级</a></li>
                    <ul class="areas_list_two">
                        <li><span id="112">一班</span></li>
                        <li><span id="113">二班</span></li>
                        <li><span id="114">三班</span></li>
                        <li><span id="115">四班</span></li>
                        <li><span id="116">五班</span></li>
                    </ul> -->
                </ul>
                </div>
            </div>
            <div class="right">
            <ul class="send_to"> </ul>
            </div>
            <div class="clear"></div>
            <div class="bot_btn">
    <a class="a_con close_btn">取消</a>
                <a onclick="do_add(this)" style="cursor:pointer" class="a_con do_add">确定</a>

            </div>
        </div>
    </div>
    <%--选择班级-end--%>
<script src="${ctx}/f_resources/js/jquery.min.js?v=20171221"></script>
<script src="${ctx}/f_resources/js/select_new.js?v=20171221"></script>
<script src="${ctx}/f_resources/layer/layer.js?v=20171221"></script>
<script type="text/javascript">
    <%----%>
    $(".logUerAvatar").click(function(){
        $(".logOutPop").addClass("is-show");
    $(".sign_win").removeClass("is-show");
    })
    $(".logOutPop s").click(function(){
    $(".logOutPop").removeClass("is-show");
    })
<%--选择班级弹窗--%>

    $("#logout").click(function(){
        $.getJSON('/front/login/log-out',function () {
            if (window["context"] == undefined) {
                if (!window.location.origin) {
                    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
                }
                window["context"] = location.origin+"/V6.0";
            }
            window.location.href = "http://passport2.chaoxing.com/logout.html?refer=" + window.location.origin;
        })
    });


		
	function signTsk(){
        $.getJSON("/front/sign/isSignToday",function (json) {
            if(json.code == 1){
                // 去签到
                $.getJSON('/front/sign/index',function (json) {
                    if(json.code == 1){
                        var tdStr = json.data.userSignDetail.integral;
                        var extend = json.data.userSignDetail.extendScore;
                        var tdScore = parseInt(tdStr)+parseInt(extend);
                        $("#tdStar").html("+"+tdScore);

                        var continueDays = json.data.userSignDetail.continuumDays;
                        if(extend > 0) {
                            $("#ctEx").html(' [其中连续签到'+continueDays+'天奖励 <span class="colorYellow"> '+extend+'星币</span> ]');
                        }

                        $("#ctDays").html(continueDays);

                        var htmls = "";
                        var ctHtmls = "";
                        for(var i=1;i<8;i++){
                            var html="";
                            var ctHtml="";
                            if(continueDays >= i) {
                                html = '<li class="active">'+
                                    '<a>' +
                                    '<i class="icon-check"></i>' +
                                    '</a>' +
                                    '</li>';

                                ctHtml = '<li class="activeGreen">' + i + '天</li>'

                            }else{
                                html = '<li>'+
                                    '<a>' +
                                    '<i class="icon-check"></i>' +
                                    '</a>' +
                                    '</li>';
                                ctHtml = '<li>' + i + '天</li>'
                            }
                            htmls += html;
                            ctHtmls += ctHtml;
                        }
                        $("#stars").html(htmls);
                        $("#ctDays").text(continueDays);
                        $(".sign_win_days").html(ctHtmls);
    $(".sign_win").addClass("is-show");
    $(".logOutPop").removeClass("is-show")
                        $("#sign1").css("display","none");
                        $("#sign2").css("display","block");
                    }
                })
            }else{
                $("#sign1").css("display","none");
                $("#sign2").css("display","block");

            }

        })

        $("#sign-msg").hide();
    };

	function viewSign(){
        $.getJSON("/front/sign/isSignToday",function (json) {
            if(json.code == 0){
                //
                var tdStr = json.data.userSignDetail.integral;
                var extend = json.data.userSignDetail.extendScore;
                var tdScore = parseInt(tdStr)+parseInt(extend);
                $("#tdStar").html("+"+tdScore);

                var continueDays = json.data.userSignDetail.continuumDays;
                if(extend > 0) {
                    $("#ctEx").html(' [其中连续签到'+continueDays+'天奖励 <span class="colorYellow"> '+extend+'星币</span> ]');
                }

                $("#ctDays").html(continueDays);

                var htmls = "";
                var ctHtmls = "";
                for(var i=1;i<8;i++){
                    var html="";
                    var ctHtml="";
                    if(continueDays >= i) {
                        html = '<li class="active">'+
                            '<a>' +
                            '<i class="icon-check"></i>' +
                            '</a>' +
                            '</li>';

                        ctHtml = '<li class="activeGreen">' + i + '天</li>'

                    }else{
                        html = '<li>'+
                            '<a>' +
                            '<i class="icon-check"></i>' +
                            '</a>' +
                            '</li>';
                        ctHtml = '<li>' + i + '天</li>'
                    }
                    htmls += html;
                    ctHtmls += ctHtml;
                }
                $("#stars").html(htmls);
                $("#ctDays").text(continueDays);
                $(".sign_win_days").html(ctHtmls);
                $("#sign1").css("display","none");
                $("#sign2").css("display","block");
            }else{
                $("#sign1").css("display","none");
                $("#sign2").css("display","block");

            }
        });
        $("#sign-msg").hide();
    $(".sign_win").addClass("is-show");
    $(".logOutPop").removeClass("is-show");
    }
    $(".sign_win s").click(function() {
        $(".sign_win").removeClass("is-show");
    });
    $(document).bind("click", function(e) {
    var target = $(e.target);
    // 设置目标区域
    var _con1 = $('#sign2');
    var _con2 = $('.logOutPop');
    var _con3 = $('.sign_win');
    var _con4 = $('.logUerAvatar');
    if(!_con1.is(e.target) && _con1.has(e.target).length === 0&&!_con2.is(e.target) && _con2.has(e.target).length === 0&&!_con3.is(e.target) && _con3.has(e.target).length === 0&&!_con4.is(e.target) && _con4.has(e.target).length === 0){
    console.log("其他区域")
    $(".sign_win").removeClass("is-show");
    $(".logOutPop").removeClass("is-show");
    }
    });

    $(document).ready(function () {
       $.getJSON("/front/sign/isSignToday",function (json) {
           console.log(json);
           if(json.code == 1){
                $("#sign1").css("display","block");
                $("#sign2").css("display","none");
               $("#sign-msg").show();
           }else{
               $("#sign1").css("display","none");
               $("#sign2").css("display","block");
               $("#sign-msg").hide();
           }
       })
        var uid = '${userRightSTM.uid}';
        if('' != uid){
            $.getJSON("/front/msg/${userRightSTM.uid}/unread",function (json) {
               if(json.code == 1){
                   if(json.data.msgCount > 0) {
                       $("#task-msg").show();
                   }
               }else{

               }
           })
        }


    });


    $("#fName").keydown(function( event ) {
        if ( event.which == 13 ) {
            console.log("222")
            query();
        }
    });

    function chooseOrg(fid,name){
        console.log(fid+"----"+name)
        $("#fid").val(fid);
        $("#fName").val(name);
    }

    function query() {
        var name = $("#fName").val();
        name = name.replace("选择机构","");
        console.log(manuLength(name)+"----");
        if(manuLength(name) > 0) {
            $.getJSON("/front/org/query", {query: name}, function (data) {
                var htmls = "";
                console.log(data.data.list)

                $.each(data.data.list, function (index, org) {
                    htmls += '<dd><a href="javascript:;" onclick="chooseOrg(' + org.fid + ',\'' + org.name + '\')">' + org.name + '</a></dd>';
                })
                $("#query-list").html(htmls)

                $(".login_win dl").addClass("is-show");
            })
        }
    }

    function manuLength(str){
        return str.replace(/(^\s*)|(\s*$)/g, "").length;
    }

    function toSubmit() {
        var fid = $("#fid").val();
        var loginName = $("#loginName").val();
        var pwd = $("#pwd").val();

        if(manuLength(fid) == 0 || manuLength(loginName) == 0 || manuLength(pwd) == 0){
            alert("输入信息不能为空");
        }

        var url = "/front/login/login-fid";
//        $.getJSON(url,{fid:fid,username:loginName,password:pwd},function (data) {
//            window.location = data.data.re_url
//        })

        $.ajax({
            url:url,
            type:'post',
            dataType:'json',
            data:{fid:fid,username:loginName,password:pwd},
            success:function (data) {
                window.location.reload();
//                window.location = data.data.re_url;
            },error:function () {
                alert("登录出错!")
            }
        })
    }

    //报告跳转验证教师是否关联班级
    function evluateReport(){
        $.ajax({
            url:'/front/login/checkLogin',
            success : function(json) {
                var data=json.code;
                if(data==1){
                    $.ajax({
                        url:'/front/evaluate/validat-teacher',
                        success : function(json) {
                            var data=json.code;
                            if(data==1){
                                window.location='/front/report/index';
                            }else{
                                layer.msg("请先关联班级！");
                                show_lay(2);
                            }
                        }
                    });
                }else{
                    window.location='/front/login';
                }
            }
        });
    }
    //报告跳转验证教师是否关联班级
    function evluateMission(){
        $.ajax({
            url:'/front/login/checkLogin',
            success : function(json) {
                var data=json.code;
                if(data==1){
                    $.ajax({
                        url:'/front/evaluate/validat-teacher',
                        success : function(json) {
                            var data=json.code;
                            if(data==1){
                                window.location='/front/mission/index';
                            }else{
                                layer.msg("请先关联班级！");
                                show_lay(2);
                            }
                        }
                    });
                }else{
                    window.location='/front/login';
                }
            }
        });
    }
    //读后感跳转验证教师是否关联班级
    function evaluateThought(){
        $.ajax({
            url:'/front/login/checkLogin',
            success : function(json) {
                var data=json.code;
                if(data==1){
                    $.ajax({
                        url:'/front/evaluate/validat-teacher',
                        success : function(json) {
                            var data=json.code;
                            if(data==1){
                                window.location='/front/report/allReadReport';
                            }else{
                                layer.msg("请先关联班级！");
                                show_lay(2);
                            }
                        }
                    });
                }else{
                    window.location='/front/login';
                }
            }
        });
    }
</script>