<%--<script type="text/javascript">--%>
<%--document.domain = "chaoxing.com";--%>
<%--</script>--%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ include file="/resources/include/taglib.jsp" %>

<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
<script src="/f_resources/js/html5.js?v=20171221"></script>
<script src="/f_resources/js/jquery.min.js?v=20171221"></script>
<script src="/f_resources/layer/layer.js"></script>
<script src="/f_resources/js/main.js?v=20180126"></script>
<link rel="stylesheet" href="/f_resources/css/style.css?v=20180126">
<link rel="stylesheet" href="${ctx}/f_resources/icomoon/style.css">
<header id="fixed">
    <div class="header1">
        <c:if test="${openOrg ne null}">
            <img onclick="window.location='/front/index'" src="${openOrg.logoUrl}" alt="Logo">
        </c:if>
        <c:if test="${openOrg eq null}">
            <img onclick="window.location='/front/index'" src="/f_resources/img/logo.png" alt="Logo">
        </c:if>
        <nav>
            <%--<c:if test="${pcmodules ne null}">--%>
            <li><a href="/front/index" <c:if test="${menu == 1}"> class="current" </c:if>>首页</a></li>
            <c:forEach items="${pcmodules}" var="module" varStatus="status">
                <c:if test="${status.index<3}">
                    <c:if test="${module.showName eq '测评'}">
                        <li><a data-type="${module.menuType}" href="javascript:void(0)"
                               onclick="evluate('${module.pcJumpContent}')" style="cursor:pointer" <c:if
                                test="${menu == module.menuType}"> class="current" </c:if> >${module.showName}</a></li>
                    </c:if>
                    <c:if test="${module.showName ne '测评'}">
                        <li><a data-type="${module.menuType}" href="${module.pcJumpContent}" <c:if
                                test="${menu == module.menuType}"> class="current" </c:if> >${module.showName}</a></li>
                    </c:if>
                </c:if>
            </c:forEach>
            <c:if test="${fn:length(pcmodules) gt 3}">
                <li class="more">
                    <div class="navlist1">
                        <span class="navlist_btn"><i class="icon-more"></i></span>
                        <dl class="navlists2">
                            <c:forEach var="item" items="${pcmodules}" varStatus="status">
                                <c:if test="${status.index>2}">
                                    <dd><a href="${item.pcJumpContent}" <c:if
                                            test="${menu == item.menuType}"> class="current" </c:if> >${item.showName}</a>
                                    </dd>
                                </c:if>
                            </c:forEach>
                        </dl>
                    </div>
                </li>
            </c:if>

            <div class="search">
                <span class="search_option">阅读</span>
                <input type="text" name="searchKey" id="searchKey" placeholder="输入关键字" style="color: #666;"/>
                <input type="button" value=" " onclick="toSearch()"/>
                <i class="icon-search"></i>
                <dl id="searchList">
                    <dd><a href="javascript:;" onclick="searchList(1)">阅读</a></dd>
                    <dd><a href="javascript:;" onclick="searchList(2)">课程</a></dd>
                    <dd id="evaluateA"><a href="javascript:;" onclick="searchList(3)">测评</a></dd>
                </dl>
            </div>
            <li class="navnews">
                <a id="unread" onclick="unReadMessage()">
                    <i class="icon-news colorbd"></i>
                </a>
                <%--消息弹窗--%>
                <div class="popnews_con scrollbar_light">
                    <div class="popnews_lists">
                        <!--第一条消息-->

                            <c:forEach items="${messageTime}" var="time" varStatus="status">
                                <ul class="popnews_list">
                                <p class="title">${time}</p>
                                <c:forEach items="${messageList[status.index]}" var="item">
                                    <c:choose>
                                        <c:when test="${fn:contains(item.content, '<li>')}">
                                            ${item.content}
                                        </c:when>
                                        <c:otherwise>
                                            <li>${item.content}</li>
                                        </c:otherwise>
                                    </c:choose>
                                </c:forEach>

                        </ul>
                    </c:forEach>

                        <!--最后一条消息-->
                    </div>
                </div>
            </li>
            <li class="user">
                <%--已登录--%>
                <c:if test="${userRightSTM ne null}">
                    <div class="navuser1">
                        <div class="navuser_btn">
                            <img src="http://photo.chaoxing.com/p/${userRightSTM.uid}_80"/>
                        </div>
                        <!--教师端-->
                        <c:if test="${userRightSTM.userTypeId eq 2}">
                            <dl class="navuser2 navuser2_teacher">
                                <dd><a href="http://i.mooc.chaoxing.com/space/index"><i class="icon-space"></i>我的空间</a>
                                </dd>
                                <dd><a href="javascript:void(0)" onclick="logout()"><i class="icon-exit"></i>退出</a></dd>
                            </dl>
                        </c:if>
                        <!--学生端-->
                        <c:if test="${userRightSTM.userTypeId eq 1}">
                            <dl class="navuser2 navuser2_student">
                                <dd><a href="http://i.mooc.chaoxing.com/space/index"><i class="icon-space"></i>我的空间</a>
                                </dd>
                                <dd><a href="/front/readStatus/0/index"><i class="icon-recently-read"></i>最近阅读</a></dd>
                                <dd><a href="/front/mission/index"><i class="icon-task"></i>我的任务</a></dd>
                                <dd><a href="/front/report/0/allReadReport"><i class="icon-read-report"></i>我的读后感</a></dd>
                                <dd><a href="javascript:void(0)" onclick="report(${userRightSTM.uid},${userRightSTM.classId})"><i class="icon-report"></i>我的报告</a>
                                </dd>
                                <dd><a href="javascript:void(0)" onclick="logout()"><i class="icon-exit"></i>退出</a></dd>
                            </dl>
                        </c:if>
                    </div>
                </c:if>
                <%--未登录--%>
                <c:if test="${userRightSTM eq null}">
                    <span class="color666 fontS14" style="display:block;" onclick="toSubmit()">请登录</span>
                </c:if>
            </li>
            <c:if test="${userRightSTM ne null}">
                <li class="signli">
                    <!--未签到-->
                    <span class="fontS12 " id="sign1" onclick="signTsk()" style="display:none;">
                        <span class="colorSign"><i class="icon-sign"></i>签到</span></span>
                    <!--已签到-->
                    <span class="fontS12 color666" id="sign2" onclick="viewSign()"
                          style="display:none;"><span>已签到</span></span>
                    <!--签到弹窗-->
                    <div class="sign_win is-show" style="display: none;">
                        <s>×</s>
                        <div class="tit">

                            <img class="loginImg" src="/f_resources/img/qiandao1.png" alt="未登录">
                        </div>
                        <div class="star">
                            <span class="sign_win_tip">今日签到成功！</span>
                            <div class="head_ico">
                                <!--<i class="icon-star"></i>-->
                                <img src="/f_resources/img/star1.png" alt="">
                            </div>
                            <span id="tdStar"></span>
                        </div>
                        <p class="font14 color999">
                            <span id="ctEx"></span>
                        </p>
                        <ul class="step" id="stars">
                        </ul>
                        <ul class="sign_win_days">

                        </ul>
                        <div class="fontS12 color999">
                            ————已连续签到<span id="ctDays"></span>天————
                        </div>
                    </div>
                </li>
            </c:if>
            <li class="fontS20 qrcode1">
                <i class="icon-app color666"></i>
                <%--二维码--%>
                <img src="/f_resources/img/qrcode_login.png" alt="qrcode" style="display: none;">
            </li>
            <li class="fontS20 qrcode2">
                <i class="icon-tencent color666"></i>
                <%--二维码--%>
                <img src="/f_resources/img/qrcode_login1.png" alt="qrcode" style="display: none;">
            </li>
            </ul>
            <%--</c:if>--%>
        </nav>

    </div>
    <!--意见 反馈-->
    <%--<div class="fixed_feedback">--%>
    <%--<a href="javascript:;">--%>
    <%--<i class="icon-feedback"></i>--%>
    <%--<p>意见反馈</p>--%>
    <%--</a>--%>
    <%--</div>--%>
    <script type="text/javascript">
        // header 水平滚动 absolute效果
        window.onscroll=function(){
            var sl=-Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);
            document.getElementById('fixed').style.left=sl+'px';
        }

        $(function () {
            var searchValue = "${searchValue}";
            var searchType = "${searchType}";
            var ageGroupId = "${userRightSTM.ageGroupId}";
            var uid = '${userRightSTM.uid}';

            $.getJSON("/front/sign/isSignToday", function (json) {
                console.log(json);
                if(json.data.messageCode==1){
                    var unRead='<i class="unread_red"></i>';
                    $("#unread").append(unRead);
                }
                if (json.code == 1) {
                    $("#sign1").css("display","block");
                    $("#sign2").css("display", "none");
                    $("#sign-msg").show();
                } else {
                    $("#sign1").css("display", "none");
                    $("#sign2").css("display", "block");
                    $("#sign-msg").hide();
                }
            })
//            if (null != uid && uid != '') {
//                loadMsg(uid);
//            }
            if (ageGroupId > 2) {
                $("#evaluateA").remove();
            }
            if ('' != searchValue) {
                $("#searchKey").val(searchValue);
            }
            if (searchType == '1') {
                searchList(1);
            } else if (searchType == '2') {
                searchList(2);
            } else {
                searchList(3);

                var menu = "${menu}";
                if (menu == 1) {
                    $(".search_option").html("阅读");
                } else if (menu == 2) {
                    $(".search_option").html("阅读");
                } else if (menu == 3) {
                    $(".search_option").html("课程");
                } else if (menu == 4) {
                    $(".search_option").html("测评");
                } else if (menu == 5) {
                    $(".search_option").html("阅读");
                } else if (menu == 6) {
                    $(".search_option").html("阅读");
                }
            }

        });

        $("#searchKey").keydown(function (event) {
            if (event.which == 13) {
                toSearch();
            }
        });

        function searchList(num) {
            if (num == 1) {
                $(".search_option").html("阅读");
                $("#searchList").removeClass("is-show");
            } else if (num == 2) {
                $(".search_option").html("课程");
                $("#searchList").removeClass("is-show");
            } else if (num == 3) {
                $(".search_option").html("测评");
                $("#searchList").removeClass("is-show");
            }

        }

        function toSearch() {
            var searchValue = $("#searchKey").val();
            searchValue = encodeURI(encodeURI(searchValue));
            //去除空格
            var option = $(".search").find("span").html().replace(/(^\s*)|(\s*$)/g, "");
            ;

            if (searchValue == '' || searchValue == '请输入您要搜索的内容') {
                alert("请输入您要搜索的内容");
                return false;
            } else {
                if ("阅读" == option) {
                    window.location.href = "/front/search/search-book?searchValue=" + searchValue + "&searchType=1";
                } else if ("课程" == option) {
                    window.location.href = "/front/search/search-course?searchValue=" + searchValue + "&searchType=2";
                    ;
                } else if ("测评" == option) {
                    window.location.href = "/front/evaluate/index?name=" + searchValue + "&searchType=3";
                    ;
                }
            }

        }

        //加载用户消息
        function unReadMessage(){
            $.ajax({
                url: '/front/sign/read-message'
            })
        }

        var loadingMsg = '<div class="loading" id="myloading">' +
            ' <img src="/f_resources/img/loading.gif"/>' +
            '<p style="font-size: 12px;color: #666"> <br/> 加载中······</p>' +
            '</div>';

        function evluate(url) {
            $.ajax({
                url: '/front/login/checkLogin',
                success: function (json) {
                    var data = json.code;
                    if (data == 1) {
                        $.ajax({
                            url: '/front/evaluate/validat-teacher',
                            success: function (json) {
                                var data = json.code;
                                if (data == 1) {
                                    window.location = url;
                                } else {
                                    layer.msg("请先关联班级！");
                                    show_lay(2);
                                }
                            }
                        });
                    } else {
                        window.location = '/front/login';
                    }
                }
            });
        }
        //退出登录
        function logout() {
//            var url = "http://passport2.chaoxing.com/logout.html?refer=" + window.location.protocol + "//" + window.location.hostname+"/front/login";
//            window.location.href = url;
            $.getJSON('/front/login/log-out', function () {
                if (window["context"] == undefined) {
                    if (!window.location.origin) {
                        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
                    }
                    window["context"] = location.origin + "/V6.0";
                }
                window.location.href = "http://passport2.chaoxing.com/logout.html?refer=" + window.location.origin;
            })
        };
        //跳转登录
        function toSubmit() {
            window.location.href = '/front/login';
        }
        // 签到

        function signTsk() {
            $.getJSON("/front/sign/isSignToday", function (json) {
                if (json.code == 1) {
                    // 去签到
                    $.getJSON('/front/sign/index', function (json) {
                        if (json.code == 1) {
                            var tdStr = json.data.userSignDetail.integral;
                            var extend = json.data.userSignDetail.extendScore;
                            var tdScore = parseInt(tdStr) + parseInt(extend);
                            $("#tdStar").html("+" + tdScore);

                            var continueDays = json.data.userSignDetail.continuumDays;
                            if (extend > 0) {
                                $("#ctEx").html(' [其中连续签到' + continueDays + '天奖励 <span class="colorYellow"> ' + extend + '星币</span> ]');
                            }

                            $("#ctDays").html(continueDays);

                            var htmls = "";
                            var ctHtmls = "";
                            for (var i = 1; i < 8; i++) {
                                var html = "";
                                var ctHtml = "";
                                if (continueDays >= i) {
                                    html = '<li class="active">' +
                                        '<a>' +
                                        '<i class="icon-check"></i>' +
                                        '</a>' +
                                        '</li>';

                                    ctHtml = '<li class="activeGreen">' + i + '天</li>'

                                } else {
                                    html = '<li>' +
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
                            $("#sign1").css("display", "none");
                            $("#sign2").css("display", "block");
                        }
                    })
                } else {
                    $("#sign1").css("display", "none");
                    $("#sign2").css("display", "block");

                }

            })

            $("#sign-msg").hide();
            $(".sign_win").show();
            $(".sign_win").addClass("is-show");

        };

        function report(uid, classId) {
            if (!classId || classId == '' || classId == 0) {
                layer.msg("用户没有关联班级无法查看报告，请先关联班级！");
                window.location.href = "/front/student/report/" + uid;
            }
            else {
                window.location.href = "/front/student/report/" + uid;
            }
        }

        //已签到显示
        function viewSign() {
            $.getJSON("/front/sign/isSignToday", function (json) {
                if (json.code == 0) {
                    //
                    var tdStr = json.data.userSignDetail.integral;
                    var extend = json.data.userSignDetail.extendScore;
                    var tdScore = parseInt(tdStr) + parseInt(extend);
                    $("#tdStar").html("+" + tdScore);

                    var continueDays = json.data.userSignDetail.continuumDays;
                    if (extend > 0) {
                        $("#ctEx").html(' [其中连续签到' + continueDays + '天奖励 <span class="colorYellow"> ' + extend + '星币</span> ]');
                    }

                    $("#ctDays").html(continueDays);

                    var htmls = "";
                    var ctHtmls = "";
                    for (var i = 1; i < 8; i++) {
                        var html = "";
                        var ctHtml = "";
                        if (continueDays >= i) {
                            html = '<li class="active">' +
                                '<a>' +
                                '<i class="icon-check"></i>' +
                                '</a>' +
                                '</li>';

                            ctHtml = '<li class="activeGreen">' + i + '天</li>'

                        } else {
                            html = '<li>' +
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
                    $("#sign1").css("display", "none");
                    $("#sign2").css("display", "block");
                } else {
                    $("#sign1").css("display", "none");
                    $("#sign2").css("display", "block");

                }
            });
            $("#sign-msg").hide();
            $(".sign_win").addClass("is-show");
            $(".logOutPop").removeClass("is-show");
            $(".sign_win").show();
        }



    </script>

</header>

