<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ include file="/resources/include/taglib.jsp" %>
<!doctype html>
<html>

<head>
    <meta charset="utf-8"/>
    <title>学雅阅读系统</title>
    <link rel="stylesheet" href="/f_resources/css/style-pt.css">
    <!-- Swiper CSS -->
    <link rel="stylesheet" href="/f_resources/css/swiper.css">
</head>

<body style="overflow-y:hidden;" id="login-body">
<section id="login">
    <div class="qrcode-wrap">
        <div class="qrcode">
            <a href="javascript:;">
                <span>扫码下载app</span>
            </a>
            <img src="/f_resources/img/z-new/qrcode_login.png" alt="qrcode">
        </div>
        <div class="qrcode">
            <a href="javascript:;">
                <span>扫码关注公众号</span>
            </a>
            <img src="/f_resources/img/z-new/qrcode_login1.png" alt="qrcode">
        </div>
    </div>
    <div class="default_nav">
        <div class="device">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img src="/f_resources/img/z-new/login-banner.png">
                    </div>
                </div>
            </div>
        </div>
        <div class="login_nav">
            <h1>
                <img src="/f_resources/img/z-new/logo-pt.png">
                <span>莆田市书香校园智慧阅读平台</span>
            </h1>
            <ul id="inpGroup">
                <li>
                    <i class="icon-organization"></i>
                    <input type="hidden" id="fid" value=""/>
                    <input type="text" id="fName" onfocus="inputIcon1();this.placeholder=''"
                           onblur="inputIcon1_1();this.placeholder='学校'" name="searchKey" placeholder="学校"/>
                    <input class="institution_option" type="button" value="" onclick="query()"/>
                    <i class="icon-search"></i>
                    <dl id="query-list">
                    </dl>
                </li>
                <li>
                    <i class="icon-user"></i>
                    <input type="text" id="loginName" onfocus="inputIcon2();this.placeholder=''"
                           onblur="inputIcon2_1();this.placeholder='用户名/手机号/邮箱'" name="searchKey"
                           placeholder="用户名/手机号/邮箱"/>
                    <span id="errorName"></span>
                </li>
                <li>
                    <i class="icon-password"></i>
                    <input type="password" id="pwd" name="pwd" onfocus="inputIcon3();this.placeholder=''"
                           onblur="inputIcon3_1();this.placeholder='密码'" placeholder="密码"/>
                    <span id="easypwd" style="display: none">密码过于简单，请<a href="javascript:;">修改密码</a></span>
                </li>
            </ul>
            <a href="javascript:;" class="submit" onclick="toSubmit()">登录</a>
            <a href="http://passport2.chaoxing.com/pwd/getpwd" class="forget">忘记密码？</a>
        </div>
    </div>
</section>
<script src="/f_resources/js/jquery.min.js"></script>
<script src="/f_resources/js/swiper.min.js"></script>
<script src="${ctx}/resources/common/plugins/layer/layer.js" type="text/javascript"></script>
<script type="text/javascript">
    function inputIcon1() {
        $(".icon-organization").css("color", "#666666");
    }

    function inputIcon1_1() {
        $(".icon-organization").css("color", "#ccc");
    }

    function inputIcon2() {
        $(".icon-user").css("color", "#666666");
    }

    function inputIcon2_1() {
        $(".icon-user").css("color", "#ccc");
    }

    function inputIcon3() {
        $(".icon-password").css("color", "#666666");
    }

    function inputIcon3_1() {
        $(".icon-password").css("color", "#ccc");
    }

    var sureTag = 0;

    function isChinese(temp) {
        var re = /[^\u4e00-\u9fa5]/;
        if (re.test(temp)) return false;
        return true;
    }

    $(document).on("input", "#fName", function (event) {
        if (isChinese(event.target.value)) {
            if (sureTag == 0) {
                query();
            } else {
                sureTag = 0;
            }
        }
    })

    $(function () {
        selfAdaption();
        qrcode();
        focus();
    });

    // 二维码显示隐藏
    function qrcode() {
        $('.qrcode a').hover(function () {
            $(this).parents(".qrcode").find("img").show(0);
        }, function () {
            $(this).parents(".qrcode").find("img").hide(0);
        })
    }

    // 登录窗口
    function selfAdaption() {
        var bodyHeight = document.body.offsetHeight;
        document.getElementById("login").style.height = bodyHeight - 222 + "px";
    }

    // 输入框获取焦点 图标显示颜色
    function focus() {
        $("#inpGroup input[type=text],#inpGroup input[type=password]").on("focus", function () {
            $(this).siblings('i').addClass("focus");
        }).on("blur", function () {
            $(this).siblings('i').removeClass("focus");
        })
    }

    function manuLength(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "").length;
    }

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
        var fid = $("#fid").val();
        // 设置FID 必须是5位以内的数，其他数据则默认是无效，或者其他定制
        if (fid.length > 5) {
            fid = fid.substring(0, 5);
        }
        var loginName = $("#loginName").val();
        var pwd = $("#pwd").val();

        if (manuLength(fid) == 0 || manuLength(loginName) == 0 || manuLength(pwd) == 0) {
            layer.closeAll("loading");
            layer.msg("输入信息不能为空");
            return false;
        }
        var url = "/front/login/login-fid";
        $("#errorName").text('');
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: {fid: fid, username: loginName, password: pwd},
            success: function (data) {
                layer.closeAll("loading");
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
            }, error: function () {
                layer.closeAll("loading");
                layer.msg("登录出错!");
            }
        });
    }


    // 机构的模糊搜索
    function query() {
        var name = $("#fName").val();
        name = name.replace("选择机构", "");
        $.getJSON("/front/org/query", {query: name}, function (data) {
            var result = name.replace(/(^\s+)|(\s+$)/g, "");
            if (result.length == 0) {
                $("#query-list").html("");
                $(".login_nav dl").removeClass("is-show");
                return;
            }
            var htmls = "";
            if (data.data.list.length > 0) {
                $.each(data.data.list, function (index, org) {
                    htmls += '<dd><a href="javascript:;" onclick="chooseOrg(' + org.fid + ',\'' + org.orgName + '\')">' + org.orgName + '</a></dd>';
                });
            } else {
                htmls += '<dd><a href="javascript:;">无搜索结果</a></dd>';
            }
            $("#query-list").html(htmls);
            $(".login_nav dl").addClass("is-show");
        });
    }

    function chooseOrg(fid, name) {
        sureTag = 1;
        $("#fid").val(fid);
        $("#fName").val(name);
        $("#query-list").css('display', 'none');
    }
</script>
</body>

</html>
