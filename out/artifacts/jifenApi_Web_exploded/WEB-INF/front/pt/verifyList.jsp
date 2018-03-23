<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="/resources/include/taglib.jsp" %>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>莆田市书香校园</title>
	<link rel="stylesheet" href="${ctx}/f_resources/css/style.css">
	<link rel="stylesheet" href="${ctx}/f_resources/css/font.css">
	<link rel="stylesheet" href="${ctx}/f_resources/css/select2.min.css">
	<link rel="stylesheet" href="${ctx}/f_resources/css/test-item.css">
</head>
<body>
<link rel="shortcut icon" href="http://cs.xueya.test.basicedu.chaoxing.com/favicon.ico" type="image/x-icon">
<script src="${ctx}/f_resources/js/jquery.min.js"></script>
<script src="${ctx}/f_resources/js/select2.min.js"></script>
<script src="${ctx}/f_resources/js/verify/verifyList.js"></script>
<!--<script src="js/html5.js"></script>-->
<header id="fixed">
	<div class="header1">

		<img  src="/f_resources/img/z-new/logo.png" alt="Logo">


		<nav>

			<li><a href="http://cs.xueya.test.basicedu.chaoxing.com/front/index">首页</a></li>


			<li><a data-type="2" href="http://cs.xueya.test.basicedu.chaoxing.com/front/book/index?id=4000">阅读</a></li>


			<li><a data-type="3"
				   href="http://cs.xueya.test.basicedu.chaoxing.com/front/course/course-type?moduleId=4007">课程</a></li>


			<li><a data-type="4" href="javascript:void(0)" style="cursor:pointer">测评</a></li>


			<li class="more">
				<div class="navlist1">
					<span class="navlist_btn">···</span>
					<dl class="navlists2">


						<dd><a href="http://cs.xueya.test.basicedu.chaoxing.com/front/activity/index">活动</a>
						</dd>


						<dd><a href="http://cs.xueya.test.basicedu.chaoxing.com/front/team/index">小组</a>
						</dd>


					</dl>
				</div>
			</li>


			<div class="search">
				<span class="search_option">测评</span>
				<input type="text" name="searchKey" id="searchKey" placeholder="输入关键字" style="color: #666;">
				<input type="button" value=" " onclick="toSearch()">
				<i class="icon-search"></i>
				<dl id="searchList">
					<dd><a href="javascript:;" onclick="searchList(1)">阅读</a></dd>
					<dd><a href="javascript:;" onclick="searchList(2)">课程</a></dd>
					<dd id="evaluateA"><a href="javascript:;" onclick="searchList(3)">测评</a></dd>
				</dl>
			</div>
			<li class="navnews">
				<a href="javascript:;">
					<i class="icon-news colorbd"></i>
					<i class="unread_red"></i>
				</a>

				<div class="popnews_con scrollbar_light" style="">
					<div class="popnews_lists">
						<!--第一条消息-->


						<ul class="popnews_list">
							<p class="title">2018-01-23</p>


							<li></li>
							<li class=""><a href="http://cs.xueya.test.basicedu.chaoxing.com/front/tea-mission/2/to-publish?resId=53">xs38（1年级1班）通过了
								<spanclass
								="colorgreen">《我的第一本科学漫画书·埃及金字塔历险记》的测评任务。</spanclass="colorgreen"></a></li>


							<li></li>
							<li class=""><a
									href="http://cs.xueya.test.basicedu.chaoxing.com/front/tea-mission/2/to-publish?resId=185">xs38（1年级1班）通过了
								<spanclass
								="colorgreen">《太空》的测评任务。</spanclass="colorgreen"></a></li>


							<li></li>
							<li class=""><a href="http://cs.xueya.test.basicedu.chaoxing.com/front/tea-mission/2/to-publish?resId=28">小学生01（2016级1班）通过了
								<spanclass
								="colorgreen">《尼古拉的三个问题》的测评任务。</spanclass="colorgreen"></a></li>


							<li></li>
							<li class=""><a
									href="http://cs.xueya.test.basicedu.chaoxing.com/front/tea-mission/2/to-publish?resId=332">xs03（1年级1班）通过了
								<spanclass
								="colorgreen">《十兄弟》的测评任务。</spanclass="colorgreen"></a></li>


							<li></li>
							<li class=""><a href="http://cs.xueya.test.basicedu.chaoxing.com/front/class/report/1">xs01老师删除了发布给<span
									class="colorGreen">1年级1班</span>的任务<span class="colorGreen">《洋葱头历险记》</span></a></li>


							<li></li>
							<li class=""><a href="http://cs.xueya.test.basicedu.chaoxing.com/front/class/report/1">js02老师删除了发布给<span
									class="colorGreen">1年级1班</span>的任务<span class="colorGreen">《名人传》</span></a></li>


							<li></li>
							<li class=""><a href="http://cs.xueya.test.basicedu.chaoxing.com/front/class/report/1">js02老师删除了发布给<span
									class="colorGreen">1年级1班</span>的任务<span class="colorGreen">《世界为谁存在》</span></a></li>


							<li></li>
							<li class=""><a href="http://cs.xueya.test.basicedu.chaoxing.com/front/class/report/1">xs01老师删除了发布给<span
									class="colorGreen">1年级1班</span>的任务<span class="colorGreen">《西雅图酋长的宣言》</span></a></li>


						</ul>

						<ul class="popnews_list">
							<p class="title">2018-01-24</p>


							<li></li>
							<li class=""><a
									href="http://cs.xueya.test.basicedu.chaoxing.com/front/tea-mission/2/to-publish?resId=332">杨雪（1年级1班）通过了
								<span class="colorgreen">《十兄弟》的测评任务。</span></a></li>


							<li></li>
							<li class=""><a
									href="http://cs.xueya.test.basicedu.chaoxing.com/front/tea-mission/2/to-publish?resId=573">xs01（1年级1班）通过了
								<span class="colorgreen">《曹冲称象》的测评任务。</span></a></li>


						</ul>


						<!--最后一条消息-->
					</div>
				</div>
			</li>
			<li class="user">


				<div class="navuser1">
					<div class="navuser_btn">
						<img src="http://p.ananas.chaoxing.com/star3/80_80c/7f2d8d7e5b3e80903986cba9c7188443.png">
					</div>
					<!--教师端-->

					<dl class="navuser2 navuser2_teacher">
						<dd><a href="http://i.mooc.chaoxing.com/space/index"><i class="icon-space"></i>我的空间</a>
						</dd>
						<dd><a href="javascript:void(0)" onclick="logout()"><i class="icon-exit"></i>退出</a></dd>
					</dl>

					<!--学生端-->

				</div>


			</li>

			<li class="signli">
				<!--未签到-->
				<span class="fontS12 " id="sign1" onclick="signTsk()" style="display: block;">
                        <span class="colorSign"><i class="icon-sign"></i>签到</span></span>
				<!--已签到-->
				<span class="fontS12 color666" id="sign2" onclick="viewSign()" style="display:none;"><span>已签到</span></span>
				<!--签到弹窗-->
				<div class="sign_win is-show" style="display: none;">
					<s>×</s>
					<div class="tit">

						<img class="loginImg" src="/f_resources/img/z-new/qiandao.png" alt="未登录">
					</div>
					<div class="star">
						<span class="sign_win_tip">今日签到成功！</span>
						<div class="head_ico">
							<i class="icon-star"></i>
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

			<li class="fontS20 qrcode1">
				<i class="icon-app color666"></i>

				<img src="/f_resources/img/z-new/qrcode_login.png" alt="qrcode" style="display: none;">
			</li>
			<li class="fontS20 qrcode2">
				<i class="icon-tencent color666"></i>

				<img src="/f_resources/img/z-new/qrcode_login1.png" alt="qrcode" style="display: none;">
			</li>


		</nav>

	</div>
	<!--意见 反馈-->


	<script type="text/javascript">
        // header 水平滚动 absolute效果
        window.onscroll = function () {
            var sl = -Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
            document.getElementById('fixed').style.left = sl + 'px';
        }
        //加载用户消息
        function loadMsg(uid) {
            $.ajax({
                url: '',
                success: function (json) {

                }
            })
        }
        $(function () {
            var searchValue = "";
            var searchType = "";
            var ageGroupId = "1";
            var uid = '53051789';

            $.getJSON("/front/sign/isSignToday", function (json) {
                console.log(json);
                if (json.code == 1) {
                    $("#sign1").css("display", "block");
                    $("#sign2").css("display", "none");
                    $("#sign-msg").show();
                } else {
                    $("#sign1").css("display", "none");
                    $("#sign2").css("display", "block");
                    $("#sign-msg").hide();
                }
            })
            if (null != uid && uid != '') {
                loadMsg(uid);
            }
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

                var menu = "";
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

        var loadingMsg = '<div class="loading" id="myloading">' +
            ' <img src="/f_resources//f_resources/img/z-new/loading.gif"/>' +
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

        };

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
<!-- 出题页面 -->
<section class="task_nav">
	<div class="default_nav">
		<input type="hidden" id="paperId" value="">
		<div class="crumb">
			<a href="javascript:void(0)">题目审核</a>
		</div>
		<ul class="item-tab">
			<li class="current" id="questions_li"><a href="javascript:;" onclick="changeTab('questions')">待审核题目</a></li>
			<li id="auditedQues_li"><a href="javascript:;" onclick="changeTab('auditedQues')">已审核题目</a></li>
		</ul>
		<div class="search-box">
			<form action="">
				<div class="inp-item">
					<label>资源名称</label>
					<input type="text" placeholder="请输入资源名称" id="resName">
				</div>
				<div class="inp-item">
					<label>题目维度</label>
					<select name="" id="dimension">

					</select>
				</div>
				<div class="inp-item">
					<label>学校名称</label>
					<select name="" id="org">

					</select>
				</div>
				<div class="inp-item status" id="statusDiv" style="display: none;">
					<label>状态</label>
					<select name="" >
						<option value="">已通过</option>
						<option value="">未通过</option>
					</select>
				</div>
				<div class="inp-item submit-box">
					<input type="button"  value="确定" id="submit" onclick="getQuestionList()">
				</div>
			</form>
		</div>
		<!--测试题目-->
		<div class="questions-box">
			<span class="total">共123题</span>
			<ul id="questions" class="questions">
				<li>
					<div class="tags">
						<span>资源名称：我有友情要出租</span>
						<span>题目维度：欣赏共情</span>
						<span>学校：莆田市第一中学（张雪峰）</span>
					</div>
					<div class="padding20">
						<dl>
							<dt>
								<span class="ques-order">1.</span>原子联结成坚固和有规则的晶格结构，我们称之为(  );
								<img src="/f_resources/img/z-new/test-cover.png">
							</dt>
							<dd><span>A.单晶体</span></dd>
							<dd><span>B.多晶体</span></dd>
							<dd class="right"><span>C.晶体(正确答案)</span></dd>
							<dd><span>D.单晶体</span></dd>
						</dl>
						<p class="analysis">解析：该题属于书本基础知识，请多看看书该题属于书本基础知识.</p>
						<div class="audit">
							<input class="not-pass" type="button" value="不通过">
							<input class="pass" type="button" value="通过">
							<div class="not-pass-reason">
								<span class="triggle-up"></span>
								<h4>不通过原因</h4>
								<div>
									<input id="reason11" type="checkbox" name="reason">
									<label class="reason-label" for="reason11">错别字</label>
								</div>
								<div>
									<input id="reason12" type="checkbox" name="reason">
									<label class="reason-label" for="reason12">语句不通顺</label>
								</div>
								<textarea type="text" placeholder="请输入其他原因，最长50字" onfocus="this.placeholder=''" onblur="if(this.value==''){this.placeholder='请输入其他原因，最长50字'}" maxlength="50"></textarea>
								<div class="submit-reason">
									<input class="submit" type="button" value="确定">
								</div>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="tags">
						<span>资源名称：我有友情要出租</span>
						<span>题目维度：欣赏共情</span>
						<span>学校：莆田市第一中学（张雪峰）</span>
					</div>
					<div class="padding20">
						<dl>
							<dt>
								<span class="ques-order">1.</span>原子联结成坚固和有规则的晶格结构，我们称之为(  );
								<img src="/f_resources/img/z-new/test-cover.png">
							</dt>
							<dd><span>A.单晶体</span></dd>
							<dd><span>B.多晶体</span></dd>
							<dd class="right"><span>C.晶体(正确答案)</span></dd>
							<dd><span>D.单晶体</span></dd>
						</dl>
						<p class="analysis">解析：该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书.</p>
						<div class="audit">
							<input class="not-pass" type="button" value="不通过">
							<input class="pass" type="button" value="通过">
							<div class="not-pass-reason">
								<span class="triggle-up"></span>
								<h4>不通过原因</h4>
								<div>
									<input id="reason21" type="checkbox" name="reason">
									<label class="reason-label" for="reason21">错别字</label>
								</div>
								<div>
									<input id="reason22" type="checkbox" name="reason">
									<label class="reason-label" for="reason22">语句不通顺</label>
								</div>
								<textarea type="text" placeholder="请输入其他原因，最长50字" maxlength="50"></textarea>
								<div class="submit-reason">
									<input class="submit" type="button" value="确定">
								</div>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="tags">
						<span>资源名称：我有友情要出租</span>
						<span>题目维度：欣赏共情</span>
						<span>学校：莆田市第一中学（张雪峰）</span>
					</div>
					<div class="padding20">
						<dl>
							<dt>
								<span class="ques-order">1.</span>原子联结成坚固和有规则的晶格结构，我们称之为(  );
								<img src="/f_resources/img/z-new/test-cover.png">
							</dt>
							<dd><span>A.单晶体</span></dd>
							<dd><span>B.多晶体</span></dd>
							<dd class="right"><span>C.晶体(正确答案)</span></dd>
							<dd><span>D.单晶体</span></dd>
						</dl>
						<p class="analysis">解析：该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书.</p>
						<div class="audit">
							<input class="not-pass" type="button" value="不通过">
							<input class="pass" type="button" value="通过">
							<div class="not-pass-reason">
								<span class="triggle-up"></span>
								<h4>不通过原因</h4>
								<div>
									<input id="reason31" type="checkbox" name="reason">
									<label class="reason-label" for="reason31">错别字</label>
								</div>
								<div>
									<input id="reason32" type="checkbox" name="reason">
									<label class="reason-label" for="reason32">语句不通顺</label>
								</div>
								<textarea type="text" placeholder="请输入其他原因，最长50字" maxlength="50"></textarea>
								<div class="submit-reason">
									<input class="submit" type="button" value="确定">
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
			<ul id="auditedQues" class="questions" style="display: none">
				<li>
					<div class="tags">
						<span>资源名称：我有友情要出租</span>
						<span>题目维度：欣赏共情</span>
						<span class="has-pass">状态：已通过</span>
						<span>学校：莆田市第一中学（张雪峰）</span>
					</div>
					<div class="padding20">
						<dl>
							<dt>
								<span class="ques-order">1.</span>原子联结成坚固和有规则的晶格结构，我们称之为(  );
								<img src="/f_resources/img/z-new/test-cover.png">
							</dt>
							<dd class="ques-content">
								<dl>
									<dd><span>A.单晶体</span></dd>
									<dd><span>B.多晶体</span></dd>
									<dd class="right"><span>C.晶体(正确答案)</span></dd>
									<dd><span>D.单晶体</span></dd>
								</dl>
								<p class="analysis">解析：该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书.</p>
							</dd>
						</dl>
						<p class="btn">
							<span class="fold-btn"> <span class="text">展开</span> <span class="icon icon-chevron-down"></span></span>
						</p>
					</div>
				</li>
				<li>
					<div class="tags">
						<span>资源名称：我有友情要出租</span>
						<span>题目维度：欣赏共情</span>
						<span class="no-pass">状态：未通过</span>
						<span>学校：莆田市第一中学（张雪峰）</span>
					</div>
					<div class="padding20">
						<dl>
							<dt>
								<span class="ques-order">1.</span>原子联结成坚固和有规则的晶格结构，我们称之为(  );
								<img src="/f_resources/img/z-new/test-cover.png">
							</dt>
							<dd class="ques-content">
								<dl>
									<dd><span>A.单晶体</span></dd>
									<dd><span>B.多晶体</span></dd>
									<dd class="right"><span>C.晶体(正确答案)</span></dd>
									<dd><span>D.单晶体</span></dd>
								</dl>
								<p class="analysis">解析：该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书.</p>
							</dd>
						</dl>
						<p class="btn">
							<span class="fold-btn"> <span class="text">展开</span> <span class="icon icon-chevron-down"></span></span>
						</p>
					</div>
				</li>
				<li>
					<div class="tags">
						<span>资源名称：我有友情要出租</span>
						<span>题目维度：欣赏共情</span>
						<span class="has-pass">状态：已通过</span>
						<span>学校：莆田市第一中学（张雪峰）</span>
					</div>
					<div class="padding20">
						<dl>
							<dt>
								<span class="ques-order">1.</span>原子联结成坚固和有规则的晶格结构，我们称之为(  );
								<img src="/f_resources/img/z-new/test-cover.png">
							</dt>
							<dd class="ques-content">
								<dl>
									<dd><span>A.单晶体</span></dd>
									<dd><span>B.多晶体</span></dd>
									<dd class="right"><span>C.晶体(正确答案)</span></dd>
									<dd><span>D.单晶体</span></dd>
								</dl>
								<p class="analysis">解析：该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书该题属于书本基础知识，请多看看书.</p>
							</dd>
						</dl>
						<p class="btn">
							<span class="fold-btn"> <span class="text">展开</span> <span class="icon icon-chevron-down"></span></span>
						</p>
					</div>
				</li>
			</ul>
			<!-- 分页-->
			<div class="scott">1,2,3,4</div>
		</div>
	</div>
</section>

<!-- 页面尾部 -->
<footer>
	<p>COPYRIGHT © basicedu.chaoxing.com ALL RIGHTS RESERVED. | 京ICP备 13046642号-2</p>
</footer>

</body>
</html>