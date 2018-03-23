<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="/resources/include/taglib.jsp" %>

<!doctype html>
<html>

<head>
    <meta charset="utf-8" />
    <title>超星校园阅读系统</title>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="/f_resources/css/style.css?v=20180126">
    <link rel="stylesheet" href="/f_resources/icomoon/style.css">
    <!-- Swiper CSS -->
    <link rel="stylesheet" href="/f_resources/css/swiper.min.css?v=20180126">
</head>

<body class="login_body" style="overflow-y:hidden;">
<section id="login">
    <div class="qrCode">
        <div class="qrcode qrcode1">
            <a href="javascript:;">
                <i class="icon-app"></i>
                <span>移动端下载</span>
            </a>
            <img src="/f_resources/img/qrcode_login.png" alt="qrcode">
        </div>
        <div class="qrcode qrcode2">
            <a href="javascript:;">
                <i class="icon-wechat"></i>
                <span>微信公众号</span>
            </a>
            <img src="/f_resources/img/qrcode_login1.png" alt="qrcode">
        </div>
    </div>
    <div class="default_nav">

        <div class="device">
            <%--<a class="arrow-left" href="javascript:;">--%>
                <%--<i class="icon-chevron-right"></i>--%>
            <%--</a>--%>
            <%--<a class="arrow-right" href="javascript:;">--%>
                <%--<i class="icon-chevron-right"></i>--%>
            <%--</a>--%>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <a href="http://reading.chaoxing.com/star2018/" target="_blank">
                            <img src="/upload/image/login-2018-01-23.jpg">
                        </a>
                    </div>
                    <%--<div class="swiper-slide">--%>
                        <%--<a href="http://reading.chaoxing.com/star2/front/pc-yx-read/index" target="_blank">--%>
                            <%--<img src="/upload/image/images_02.jpg">--%>
                        <%--</a>--%>
                    <%--</div>--%>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="login_nav">
            <h1>
            <c:if test="${openOrg ne null}">
            <img src="${openOrg.logoUrl}">
            </c:if>
            <c:if test="${openOrg eq null}">
                <img src="/f_resources/img/logo_login.png">
        	</c:if>
            </h1>
            <ul>
                <li>
                    <i class="icon-organization"></i>

                    <%--<input type="text" id="fName" name="searchKey" value="超星小学" placeholder="选择机构"/>--%>
                    <c:if test="${openOrg ne null}">
                        <input type="hidden" id="fid" value="${openOrg.fid}" />
                        <input type="text" id="fName" onfocus="inputIcon1();this.placeholder=''" onblur="inputIcon1_1();this.placeholder='学校'" name="searchKey" value="${openOrg.orgName}" disabled="disabled" style="background-color: white"/>
                        <input class="institution_option" type="button" value=""/>
                    </c:if>
                    <c:if test="${openOrg eq null}">
                        <input type="hidden" id="fid" value="" />
                        <input type="text" id="fName" onfocus="inputIcon1();this.placeholder=''" onblur="inputIcon1_1();this.placeholder='学校'" name="searchKey" placeholder="学校" />
                        <input class="institution_option" type="button" value="" onclick="query()"/>
                        <i class="icon-search"></i>
                    </c:if>

                    <dl id="query-list">
                        <%--<c:forEach items="${list}" varStatus="status" var="org">--%>
                        <%--<dd><a href="javascript:;" onclick="chooseOrg('${org.organization.beijingMappingId}','${org.organization.name}')">${org.organization.name}</a></dd>--%>
                        <%--</c:forEach>--%>
                    </dl>
                    <%--<span>用户不存在/用户名是空的</span>--%>
                </li>
                <li>
                    <i class="icon-user"></i>
                    <%--<input type="text" id="loginName" name="searchKey" value="用户名/手机号/邮箱" onblur="if(this.value==''){this.value='用户名/手机号/邮箱'}" onfocus="if(this.value=='用户名/手机号/邮箱'){this.value=''}" />--%>
                    <input type="text" id="loginName" onfocus="inputIcon2();this.placeholder=''" onblur="inputIcon2_1();this.placeholder='用户名/手机号/邮箱'" name="searchKey" placeholder="用户名/手机号/邮箱" />
                    <span id="errorName"></span>
                </li>
                <li>
                    <i class="icon-password"></i>
                    <input type="password" id="pwd" name="pwd" onfocus="inputIcon3();this.placeholder=''" onblur="inputIcon3_1();this.placeholder='密码'" placeholder="密码" />
                    <span id="easypwd" style="display: none">密码过于简单，请<a href="javascript:;">修改密码</a></span>
                </li>
            </ul>
            <a href="javascript:;" class="submit" onclick="toSubmit()">登录</a>
            <%--test change password dialog--%>
            <%--<a href="javascript:;" class="submit">登录</a>--%>

            <%--<a href="/front/index" class="cancel">随便逛逛</a>--%>
            <a href="http://passport2.chaoxing.com/pwd/getpwd" class="forget">忘记密码？</a>
        </div>
    </div>
    <!-- 修改密码 -->
    <div class="change_pw">
        <div class="popUpBg_login" onclick="popDown1()"></div>
        <div class="change_pw_con">
            <s onclick="popDown1()">×</s>
            <div class="tit">
             <img src="/f_resources/img/changePw.png" alt="未登录">
            </div>
            <p class="info">密码太简单了哦，请重新设置一个吧~</p>
    <form class="cmxform" id="inputPassword" method="get" action="">
            <div class="con_white">
                <input type="hidden" id="uid">
                <div class="form_panel">
                    <label for="password">新密码</label>
                    <input class="input_pw" name="password" id="password" type="password"/>
                </div>
                <div class="form_panel">
                    <label for="confirm_password">确认新密码</label>
                    <input class="input_pw" name="confirm_password" id="confirm_password" type="password"/>

                    <p class="tip tip1" id="chMsg"></p>
                    <%--<p class="tip tip1">密码过于简单</p>--%>

                </div>
                <div class="buttons">
                    <a href="javascript:;" class="cancel" onclick="popDown1()">取消</a>
                    <a href="javascript:;" class="confirm" onclick="modifyPwd()">完成</a>
                </div>
            </div>
    </form>
        </div>
    </div>
    <%--选择机构--%>
    <div class="selectOrg">
    <div class="popBg"></div>
    <div class="content1">
        <i class="icon-close"></i>
        <div class="content2">
            <p class="title1">选择机构</p>
            <p class="title2">请选择您要登陆的机构，若有疑问，请联系学校管理员</p>
            <ul class="orgList" id="orgList">
            </ul>
        </div>
    </div>
    </div>
</section>
<jsp:include page="/commons/footer.jsp" />
    <script src="/f_resources/js/jquery.min.js"></script>
<script src="${ctx}/resources/common/plugins/layer/layer.js" type="text/javascript"></script>
<script type="text/javascript">
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
            toSubmit();
        }
    });
    function chooseOrg(fid,name){
        console.log(fid+"----"+name);
        sureTag = 1;
        $("#fid").val(fid);
        $("#fName").val(name);
    }
    function query() {
        var name = $("#fName").val();
        name = name.replace("选择机构","");
        $.getJSON("/front/org/query", {query: name}, function (data) {
        	var result=name.replace(/(^\s+)|(\s+$)/g,"");
            if(result.length==0){
            	$("#query-list").html("");
            	$(".login_nav dl").removeClass("is-show");
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

            $(".login_nav dl").addClass("is-show");
        });
    }
    function manuLength(str){
        return str.replace(/(^\s*)|(\s*$)/g, "").length;
    }

    /**
     * 登陆后选择机构登录
     * @param fid
     */
    function  loginByFid(fid) {
        var loginName = $("#loginName").val();
        var pwd = $("#pwd").val();
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
                        var uid = data.data.uid;
                        $("#uid").val(uid);
                        $(".change_pw").show();
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

    function toSubmit() {
        layer.load(1);

        $("#confirm_password").val('');
        $("#password").val('');
        $("#chMsg").text('');

        var fid = $("#fid").val();
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

        var url = "/front/login/login-fid";

        $("#errorName").text('');
        $.ajax({
            url:url,
            type:'post',
            dataType:'json',
            data:{fid:fid,username:loginName,password:pwd},
            success:function (data) {
                layer.closeAll("loading");
                console.debug(data);
                if (data.code == 1) {
                    var htmls = "";
                    if (data.data.orgList.length > 1) {
                        $.each(data.data.orgList, function (index, org) {
                            htmls += '<li><a href="javascript:;" onclick="loginByFid(\'' + org.fid + '\')">' + org.orgName + '</a></li>';
                        });
                    } else if (data.data.orgList.length == 1) {
                        loginByFid(data.data.orgList[0].fid);
                        return;
                    } else {
                        htmls += '<li><a href="javascript:;">没有可选择的机构</a></li>';
                    }
                    $("#orgList").html(htmls);
                    $(".selectOrg").show();
                } else {
                    if (data.data.resetPwd == 1) {
                        var uid = data.data.uid;
                        $("#uid").val(uid);
                        $(".change_pw").show();
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

    function modifyPwd() {
        var fid = $("#fid").val();
        var pwd = $("#pwd").val();
        var new_pw = $("#password").val();
        var new_pw2 = $("#confirm_password").val();
        if(new_pw.length < 6){
            $("#chMsg").text('密码长度必须大于6');
            return false;
        }
        if(new_pw != new_pw2){
            $("#chMsg").text('两次输入密码不一致');
            return false;
        }

        var reg = new RegExp("^[0-9]*$");
        if(reg.test(new_pw)){
            $("#chMsg").text('密码不能为全部都是数字');
            return false;
        }
        layer.load(1);
        var uid = $("#uid").val();
        var url = 'https://passport2-api.chaoxing.com/api/update-pwd?id='+uid+'&pwd='+pwd+'&newPwd='+new_pw+'&ip='
        $.getJSON('/front/login/chpwd',{url:url},function (json) {
            if(json.code == 1){
                layer.msg("修改成功!");
                $(".change_pw").hide();
                $("#pwd").val(new_pw);
            }else{
                $("#chMsg").text(json.message);
            }
            layer.closeAll('loading');
        })

    }
</script>
<script src="/f_resources/js/main.js?v=20180126"></script>
<!-- Swiper JS -->
<script src="/f_resources/js/swiper.min.js"></script>
<script>
    function popDown1(){
    $(".change_pw").hide();
    }
    <%--临时用于打开选择机构弹窗--%>
    $(".selectOrg .icon-close").click(function () {
        $(".selectOrg").hide();
    })

</script>
<!-- Initialize Swiper -->
<script>
    $(function() {
        selfAdaption();
        var mySwiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            loop: true,
            autoplay: 5000,
            speed: 300,
            grabCursor: true,
            paginationClickable: true
        });


    <%--new change password dialog≈  --%>
        $(".change_pw").hide();
    });


</script>

    <script src="http://static.runoob.com/assets/jquery-validation-1.14.0/lib/jquery.js"></script>
    <script src="http://static.runoob.com/assets/jquery-validation-1.14.0/dist/jquery.validate.min.js"></script>
    <script>
    <%--password validate--%>
    $.validator.setDefaults({
        submitHandler: function() {
            alert("提交事件!");
        }
    });
    // 扩展当前规则为一个新规则
    jQuery.validator.addMethod("password", function(value, element) {
    return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
    }, "只能包括英文字母和数字");
    $().ready(function() {
        var validator = $("#inputPassword").validate({
            groups: {
                username: "password confirm_password"
            },
            errorPlacement: function(error, element) {
                error.appendTo(element.parent("div").next("div").children("p"));
            },
            rules: {
    password: {
                required: true,
                minlength: 6
                },
    confirm_password: {
                required: true,
                minlength: 6,
                equalTo: "#password"
                }
            },
            messages: {
    password: {
                    required: "请输入密码",
                    minlength: "密码长度不能小于 6 个字母"
                },
    confirm_password: {
                    required: "请输入密码",
                    minlength: "密码长度不能小于 6个字母",
                    equalTo: "两次密码输入不一致"
                }
            }
        });
    });

    </script>
    </body>

</html>
