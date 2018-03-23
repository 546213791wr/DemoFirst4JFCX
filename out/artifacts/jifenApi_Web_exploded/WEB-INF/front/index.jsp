<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="/resources/include/taglib.jsp" %>
<!doctype html>
<html>

<head>
    <meta charset="utf-8" />
    <title>超星校园阅读系统</title>
    <link rel="stylesheet" href="/f_resources/css/style.css?v=20180126">
    <link rel="stylesheet" href="/f_resources/icomoon/style.css">
    <link rel="stylesheet" href="/f_resources/css/select_new.css">
    <!-- Swiper CSS -->
    <link rel="stylesheet" href="/f_resources/css/swiper2/idangerous.swiper.css?v=20180126">
</head>

<body>
<jsp:include page="/commons/header.jsp" />
<div class="index_nav">
    <div class="index default_nav">

        <!-- 幻灯片 -->
        <section class="banner_nav">
            <div class="default_nav">
                <!-- Swiper -->
                <div class="device">
                    <a class="arrow-left banner-left" href="javascript:;"><i class="icon-chevron-right"></i></a>
                    <a class="arrow-right banner-right" href="javascript:;"><i class="icon-chevron-right"></i></a>
                    <div class="swiper-container swiper-banner">
                        <div class="swiper-wrapper">
                            <c:forEach items="${carousels}"  var="item" varStatus="status">
                                <div   class="swiper-slide swiper-no-swiping">
                                    <c:if test="${item.pcUrl ne null}">
                                        <img  onclick="window.open('${item.pcUrl}')" src="${item.carouselUrl}${item.carouselName}">
                                    </c:if>
                                    <c:if test="${item.pcUrl eq null}">
                                        <img  src="${item.carouselUrl}${item.carouselName}">
                                    </c:if>
                                </div>
                            </c:forEach>
                        </div>
                    </div>
                    <div class="pagination banner-pagination"></div>
                </div>
            </div>
        </section>
        <div class="content1">

            <!--我的班级-->
            <c:if test="${userTypeId eq 2}">
                <section class="index_teacher_class">
                    <!--有数据-->
                    <c:if test="${hasClass eq 1}">
                        <div class="class_data_has" style="display: block;">
                            <div class="title1 tLeft">
                                <a class="logOutBottom_left fRight fontS12 color444" href="javascript:void(0)" onclick="show_lay(2)">
                                    <i class="icon-class"></i>
                                    <span>选择班级</span>
                                </a>
                                <strong class="fontS18 color333">我的班级</strong>
                            </div>
                            <ul class="classes">
                                <c:forEach varStatus="status" var="item" items="${classDetail}">
                                    <li class="class" onclick="toMissionDetail(${item.classId})">
                                        <p class="class_name">${item.name}</p>
                                        <ul class="infos overflowHidden">
                                            <li>
                                                <strong class="fontS20 color333">${item.missionNum}</strong>
                                                <p class="fontS12 color999">任务</p>
                                            </li>
                                            <li>
                                                <strong class="fontS20 color333">${item.reportNum}</strong>
                                                <p class="fontS12 color999">读后感</p>
                                            </li>
                                            <li>
                                                <strong class="fontS20 color333">${item.studentNum}</strong>
                                                <p class="fontS12 color999">学生</p>
                                            </li>
                                        </ul>
                                    </li>
                                </c:forEach>
                            </ul>
                        </div>
                    </c:if>
                    <!--没有数据-->
                    <c:if test="${hasClass eq 0}">
                        <div class="class_data_empty" style="display: block;">
                            <div class="title1 tLeft">
                                <strong class="fontS18 color333">我的班级</strong>
                            </div>
                            <div class="center">
                                <img src="/f_resources/img/new/class_icon.png" alt="">
                                <p class="fontS14 color999">您还没有执教班级</p>
                                <div class="button">
                                    <a href="javascript:;" class="btn btn_border" onclick="show_lay(2)">选择班级</a>
                                </div>
                            </div>
                        </div>
                    </c:if>
                </section>
            </c:if>
            <c:if test="${userTypeId eq 1}">
                <section class="index_student_lists">
                    <ul class="page_link">
                        <li class="">
                            <a href="/front/readStatus/0/index">
                                <img src="/f_resources/img/new/stu-icon-reading.png" alt="">
                                <p class="link_name">最近阅读</p>
                            </a>
                        </li>
                        <li class="">
                            <a href="/front/mission/index">
                                <img src="/f_resources/img/new/stu-icon-task.png" alt="">
                                <p class="link_name">我的任务</p>
                            </a>
                        </li>
                        <li class="">
                            <a href="/front/report/0/allReadReport">
                                <img src="/f_resources/img/new/stu-icon-read-report.png" alt="">
                                <p class="link_name">我的读后感</p>
                            </a>
                        </li>
                        <li class="">
                            <a href="javascript:void(0)" onclick="report(${user.uid},${user.classId})">
                                <img src="/f_resources/img/new/stu-icon-my-report.png" alt="">
                                <p class="link_name">我的报告</p>
                            </a>
                        </li>

                    </ul>

                </section>
            </c:if>
            <div class="content2">
                <c:forEach items="${recomandTypes}"  var="item" varStatus="status">
                    <!-- 个性推荐 -->
                    <c:if test="${userTypeId eq 1}" >
                        <c:if test="${item.type eq 0 && booksPage > 0 && books.size() > 0}" >
                            <section class="individuality_nav">
                                <div class="title1 tLeft">
                                    <strong class="fontS18 color333">个性推荐</strong>
                                    <c:if test="${level != null}">
                                        <span class="fontS12 color999">根据您当前阅读等级[${level}级]及阅读喜好生成</span>
                                    </c:if>
                                    <c:if test="${level eq null}">
                                        <span class="fontS12 color999">根据您当前阅读等级及阅读喜好生成</span>
                                    </c:if>
                                    <!--  <a href="">更多 >></a> -->
                                </div>
                                <!-- Swiper -->
                                <div class="device">
                                    <a class="arrow-left individuality-left" href="javascript:;"><i class="icon-circle-right"></i></a>
                                    <a class="arrow-right individuality-right" href="javascript:;"><i class="icon-circle-right"></i></a>
                                    <div class="swiper-container swiper-individuality">
                                        <div class="swiper-wrapper">
                                            <c:forEach begin="0" end="${booksPage}" varStatus="supperStatus">
                                                <div class="swiper-slide">
                                                    <ul>
                                                        <c:forEach begin="0" end="${supperStatus.index < booksPage ? 7 : (books.size() - (supperStatus.index * 8)-1)}"  varStatus="status">
                                                            <li>
                                                                <a  href="javascript:;" onclick="toBookDetail(${books[supperStatus.index * 8 + status.index].topicId})">
                                                                    <img src="${not empty books[supperStatus.index * 8 + status.index].horCover ? books[supperStatus.index * 8 + status.index].horCover : books[supperStatus.index * 8 + status.index].cover}">
                                                                    <p class="title">${books[supperStatus.index * 8 + status.index].resName}</p>
                                                                    <p class="fontS12 color999">${books[supperStatus.index * 8 + status.index].resAuthor}</p>
                                                                </a>
                                                            </li>
                                                        </c:forEach>
                                                    </ul>
                                                </div>
                                            </c:forEach>
                                        </div>
                                    </div>
                                    <div class="pagination individuality-pagination"></div>
                                </div>
                            </section>
                        </c:if>
                    </c:if>
                    <!-- 图书推荐 -->
                    <c:if test="${item.type eq 1}" >
                        <section class="book_nav">
                            <div class="title1 tLeft">
                                <a class="fRight fontS12 color444" href="${bookMoreUrl}">
                                    <span>更多</span>
                                    <i class="icon-chevron-right"></i>
                                </a>
                                <strong class="fontS18 color333">图书推荐</strong>
                            </div>
                            <div class="default_nav">
                                <div class="ew_tab" id="tabA">
                                    <div class="tab-c tLeft" style="display: block;">
                                        <ul>
                                            <c:forEach items="${bookList}" var="item" varStatus="status">
                                                <c:if test="${status.index<1}">
                                                    <c:forEach items="${item.pltres}" var="pltres" varStatus="pltreStatus">
                                                        <c:if test="${pltreStatus.index lt 4}">
                                                            <li>
                                                                <a href="javascript:void(0)" onclick="toBookDetail(${pltres.topicId})">
                                                                    <img src="${not empty pltres.horCover ? pltres.horCover : pltres.cover}">
                                                                    <p class="title">${pltres.resName}</p>
                                                                    <p class="author">${pltres.resAuthor}</p>
                                                                </a>
                                                            </li>
                                                        </c:if>
                                                    </c:forEach>
                                                </c:if>
                                            </c:forEach>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </c:if>
                    <!-- 期刊推荐 -->
                    <c:if test="${item.type eq 2}" >
                        <section class="periodical_nav tLeft">
                            <div class="title1 tLeft">
                                <%--<a class="fRight fontS12 color444" href="javascript:void(0)">--%>
                                    <%--<span>更多</span>--%>
                                    <%--<i class="icon-chevron-right"></i>--%>
                                <%--</a>--%>
                                <strong class="fontS18 color333">期刊推荐</strong>
                            </div>
                            <div class="default_nav">
                                <div class="ew_tab" id="tabB">
                                    <div class="tab-c" style="display: block;">
                                        <ul>
                                            <c:forEach varStatus="status" items="${magezineList}" var="item">
                                                <c:if test="${status.index<1}">
                                                    <c:forEach items="${item.magzineLocals}" var="magItem" varStatus="magItemStatus">
                                                        <c:if test="${magItemStatus.index lt 4}">
                                                            <li>
                                                                <a target="_blank" href="${magItem.pcUrl}">
                                                                    <img src="${magItem.cover}">
                                                                    <p class="title">${magItem.title}</p>
                                                                        <%--<p class="number">2017年 第18期</p>--%>
                                                                </a>
                                                            </li>
                                                        </c:if>
                                                    </c:forEach>

                                                </c:if>
                                            </c:forEach>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </c:if>
                    <!-- 课程推荐 -->
                    <c:if test="${item.type eq 3}" >
                        <section class="curriculum_nav tLeft">
                            <div class="title1 tLeft">
                                <a class="fRight fontS12 color444" href="${courseMoreUrl}">
                                    <span>更多</span>
                                    <i class="icon-chevron-right"></i>
                                </a>
                                <strong class="fontS18 color333">课程推荐</strong>
                            </div>
                            <div class="default_nav">
                                <div class="ew_tab" id="tabC">
                                    <div class="tab-c" style="display: block;">
                                        <ul>
                                            <c:forEach items="${pltreCourseList[0].pltres}"  var="courseItem" varStatus="status">
                                                <c:if test="${status.index<3}">
                                                    <li>
                                                        <a target="_blank" href="http://mooc1.chaoxing.com/course/${courseItem.topicId}.html">
                                                            <img src="${courseItem.cover}">
                                                            <p class="title">${courseItem.resName}</p>
                                                        </a>
                                                    </li>
                                                </c:if>
                                            </c:forEach>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </c:if>
                </c:forEach>
                <!-- 阅读和小组 -->
                <section class="columns_nav">
                    <div class="title1 tLeft">
                        <a class="fRight fontS12 color444" href="/front/team/index">
                            <span>更多</span>
                            <i class="icon-chevron-right"></i>
                        </a>
                        <strong class="fontS18 color333">小组推荐</strong>
                    </div>
                    <div class="default_nav right">
                        <ul>
                            <c:forEach items="${listRecommandGroup}"  var="item" varStatus="status">
                                <li>
                                    <img src="${item.imgUrl}">
                                    <div>
                                        <span><a target="_blank" href="http://group.yd.chaoxing.com/pc/topic/${item.groupId }/topicList">${item.name}</a></span>
                                        <p>${item.author}</p>
                                    </div>
                                </li>
                            </c:forEach>

                        </ul>
                    </div>
                </section>
            </div>
            <div class="content3">
                <div class="ew_tab" id="tabD">
                    <ul>
                        <li class="tab-i tab-cur">图书阅读榜</li>
                        <li class="tab-i">阅读字数榜</li>
                    </ul>
                    <c:if test="${userTypeId eq 2}">
                        <div class="tab-c">
                            <div class="range_table">
                                <table class="range_table_head">
                                    <thead>
                                    <tr>
                                        <td class="rank">排名</td>
                                        <td class="class">班级</td>
                                        <td class="number">人均有效阅读量(本)</td>
                                    </tr>
                                    </thead>
                                </table>
                                <div id="range_table2">
                                    <div id="range_table2_1">
                                        <table class="range_table_body">
                                            <tbody>
                                            <c:if test="${not empty groupBookRank}">
                                                <c:forEach items="${groupBookRank}" var="item" varStatus="status">
                                                    <tr>
                                                        <c:if test="${status.index eq 0}">
                                                            <td class="rank"><img src="/f_resources/img/new/1.png" alt="" /></td>
                                                        </c:if>
                                                        <c:if test="${status.index eq 1}">
                                                            <td class="rank"><img src="/f_resources/img/new/2.png" alt="" /></td>
                                                        </c:if>
                                                        <c:if test="${status.index eq 2}">
                                                            <td class="rank"><img src="/f_resources/img/new/3.png" alt="" /></td>
                                                        </c:if>
                                                        <c:if test="${status.index gt 2}">
                                                            <td class="rank">${status.index+1}</td>
                                                        </c:if>
                                                        <td class="class">${item.className}</td>
                                                        <td class="number"><fmt:formatNumber value="${item.num eq 0 ? 0 : item.num}" pattern="#0.00"/></td>

                                                    </tr>
                                                </c:forEach>
                                            </c:if>
                                            <c:if test="${empty groupBookRank}">
                                                <li class="data_empty1 fixHeight">
                                                    <img src="/f_resources/img/new/data-empty1.png" alt="">
                                                    <p class="fontS14 color666 center">暂无数据，无法显示排名</p>
                                                </li>
                                            </c:if>

                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="tab-c">
                            <div class="range_table">
                                <table class="range_table_head">
                                    <thead>
                                    <tr>
                                        <td class="rank">排名</td>
                                        <td class="class">班级</td>
                                        <td class="number">人均有效阅读字数(万字)</td>
                                    </tr>
                                    </thead>
                                </table>
                                <div id="range_table1">
                                    <div id="range_table1_1">
                                        <table class="range_table_body">
                                            <tbody>
                                            <c:if test="${not empty groupWordRank}">
                                                <c:forEach items="${groupWordRank}" var="item" varStatus="status">
                                                    <tr>
                                                        <c:if test="${status.index eq 0}">
                                                            <td class="rank"><img src="/f_resources/img/new/1.png" alt="" /></td>
                                                        </c:if>
                                                        <c:if test="${status.index eq 1}">
                                                            <td class="rank"><img src="/f_resources/img/new/2.png" alt="" /></td>
                                                        </c:if>
                                                        <c:if test="${status.index eq 2}">
                                                            <td class="rank"><img src="/f_resources/img/new/3.png" alt="" /></td>
                                                        </c:if>
                                                        <c:if test="${status.index gt 2}">
                                                            <td class="rank">${status.index+1}</td>
                                                        </c:if>
                                                        <td class="class">${item.className}</td>
                                                        <td class="number"><fmt:formatNumber value="${item.num eq 0 ? 0 : item.num}" pattern="#0.00"/></td>
                                                    </tr>
                                                </c:forEach>
                                            </c:if>
                                            <c:if test="${empty groupWordRank}">
                                                <li class="data_empty1 fixHeight">
                                                    <img src="/f_resources/img/new/data-empty1.png" alt="">
                                                    <p class="fontS14 color666 center lineHeight40">暂无数据，无法显示排名</p>
                                                </li>
                                            </c:if>

                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </c:if>
                    <c:if test="${userTypeId eq 1}">
                        <div class="tab-c">
                            <div class="range_table">
                                <table class="range_table_head">
                                    <thead>
                                    <tr>
                                        <td class="rank">排名</td>
                                        <td class="class">姓名</td>
                                        <td class="number">有效阅读量(本)</td>
                                    </tr>
                                    </thead>
                                </table>
                                <div id="range_table2">
                                    <div id="range_table2_1">
                                        <table class="range_table_body">
                                            <tbody>
                                            <c:if test="${not empty classBookRank}">
                                                <c:forEach items="${classBookRank}" var="item" varStatus="status">
                                                    <tr>
                                                        <c:if test="${status.index eq 0}">
                                                            <td class="rank"><img src="/f_resources/img/new/1.png" alt="" /></td>
                                                        </c:if>
                                                        <c:if test="${status.index eq 1}">
                                                            <td class="rank"><img src="/f_resources/img/new/2.png" alt="" /></td>
                                                        </c:if>
                                                        <c:if test="${status.index eq 2}">
                                                            <td class="rank"><img src="/f_resources/img/new/3.png" alt="" /></td>
                                                        </c:if>
                                                        <c:if test="${status.index gt 2}">
                                                            <td class="rank">${status.index+1}</td>
                                                        </c:if>
                                                        <td class="class">
                                                            <img src="http://mooc.chaoxing.com/u/140/${item.uid}" alt="" onerror='this.src="/f_resources/img/new/avatar-student.png"'>
                                                            <p>${item.userName}</p>
                                                            <p class="class1">${item.showName}</p>
                                                        </td>
                                                        <td class="number">${item.num}</td>
                                                    </tr>
                                                </c:forEach>
                                            </c:if>
                                            <c:if test="${empty classBookRank}">
                                                <li class="data_empty1 fixHeight">
                                                    <img src="/f_resources/img/new/data-empty1.png" alt="">
                                                    <p class="fontS14 color666 center lineHeight40">暂无数据，无法显示排名</p>
                                                </li>
                                            </c:if>

                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="tab-c">
                            <div class="range_table">
                                <table class="range_table_head">
                                    <thead>
                                    <tr>
                                        <td class="rank">排名</td>
                                        <td class="class">姓名</td>
                                        <td class="number">有效阅读字数(万字)</td>
                                    </tr>
                                    </thead>
                                </table>
                                <div id="range_table1">
                                    <div id="range_table1_1">
                                        <table class="range_table_body">
                                            <tbody>
                                            <c:if test="${not empty classWordRank}">
                                                <c:forEach items="${classWordRank}" var="item" varStatus="status">
                                                    <tr>
                                                        <c:if test="${status.index eq 0}">
                                                            <td class="rank"><img src="/f_resources/img/new/1.png" alt="" /></td>
                                                        </c:if>
                                                        <c:if test="${status.index eq 1}">
                                                            <td class="rank"><img src="/f_resources/img/new/2.png" alt="" /></td>
                                                        </c:if>
                                                        <c:if test="${status.index eq 2}">
                                                            <td class="rank"><img src="/f_resources/img/new/3.png" alt="" /></td>
                                                        </c:if>
                                                        <c:if test="${status.index gt 2}">
                                                            <td class="rank">${status.index+1}</td>
                                                        </c:if>
                                                        <td class="class">
                                                            <img src="http://mooc.chaoxing.com/u/140/${item.uid}" alt="" onerror="this.src='/f_resources/img/new/avatar-student.png'">
                                                            <p>${item.userName}</p>
                                                            <p class="class1">${item.className}</p>
                                                        </td>
                                                        <td class="number"><fmt:formatNumber value="${item.num eq 0 ? 0 : item.num}" pattern="#0.00"/></td>
                                                    </tr>
                                                </c:forEach>
                                            </c:if>
                                            <c:if test="${empty classWordRank}">
                                                <li class="data_empty1 fixHeight">
                                                    <img src="/f_resources/img/new/data-empty1.png" alt="">
                                                    <p class="fontS14 color666 center">暂无数据，无法显示排名</p>
                                                </li>
                                            </c:if>

                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </c:if>


                </div>
            </div>
        </div>
    </div>

    <!--意见 反馈-->
    <!--<div class="fixed_feedback">-->
        <!--<a href="javascript:;">-->
            <!--<i class="icon-feedback"></i>-->
            <!--<p>意见反馈</p>-->
        <!--</a>-->
    <!--</div>-->
</div>
<jsp:include page="/commons/footer.jsp" />
<!--选择班级-start-->
<input type="hidden" name="typeId" value="${userTypeId}"/>
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
        <div class="bot_btn buttons">
            <a class="a_con close_btn">取消</a>
            <a class="a_con btn btn_green" onclick="do_add(this)" style="cursor:pointer" class="a_con do_add">确定</a>

        </div>
    </div>
</div>
<!--选择班级-end-->
<script src="/f_resources/js/jquery.min.js?v=20180126"></script>
<script src="/f_resources/js/main.js?v=20180126"></script>
<script src="/f_resources/js/select_new.js"></script>
<!-- Swiper JS -->
<script src="/f_resources/js/swiper2/idangerous.swiper.js?v=20180126"></script>
<!-- Initialize Swiper -->
<script>
    // 幻灯片
    var myBanner = new Swiper('.swiper-banner', {
        pagination: '.banner-pagination',
        loop: true,
        autoplay: 5000,
        speed: 300,
        grabCursor: true,
        paginationClickable: true,
        noSwiping : true
    });
    $('.banner-right').on('click', function(e) {
        e.preventDefault();
        myBanner.swipePrev();
    });
    $('.banner-left').on('click', function(e) {
        e.preventDefault();
        myBanner.swipeNext();
    });
    // 个性推荐
    var myIndividuality = new Swiper('.swiper-individuality', {
        pagination: '.individuality-pagination',
        loop: true,
        grabCursor: true,
        paginationClickable: true
    });
    $('.individuality-right').on('click', function(e) {
        e.preventDefault();
        myIndividuality.swipePrev();
    });
    $('.individuality-left').on('click', function(e) {
        e.preventDefault()
        myIndividuality.swipeNext();
    });
    // 图书推荐
    new EW_tab({
        'tabBtn': '#tabA .tab-i',
        'tabCon': '#tabA .tab-c',
        'cur': 'tab-cur'
    });
    // 期刊推荐
    new EW_tab({
        'tabBtn': '#tabB .tab-i',
        'tabCon': '#tabB .tab-c',
        'cur': 'tab-cur'
    });
    // 课程推荐
    new EW_tab({
        'tabBtn': '#tabC .tab-i',
        'tabCon': '#tabC .tab-c',
        'cur': 'tab-cur'
    });
    // 图书阅读榜-阅读字数榜
    new EW_tab({
        'tabBtn': '#tabD .tab-i',
        'tabCon': '#tabD .tab-c',
        'cur': 'tab-cur'
    });
    // 返回顶部
    // function gotop() {
    //     // toTop('goTop', false);
    // }
    // addLoadEvent(gotop);
    //
    function toBookDetail(topicId){
        window.open('/front/book/' + topicId+'/0/0/0/detail');
    }

    function toMoreBook(){
        window.open('/front/book/index?id=2') ;
    }

</script>
<script>
    $(".index.default_nav .index_student_lists li").hover(function () {
        $(this).addClass("active");
    },function () {
        $(this).removeClass("active");
    })
    function toMissionDetail(classId) {
        window.location.href="/front/class/report/"+classId;
    }

    function report(uid, classId) {
        if (!classId || classId == '' || classId == 0) {
            layer.msg("用户没有关联班级无法查看报告，请先关联班级！");
        } else {
            window.location.href = "/front/student/report/" + uid;
        }
    }
</script>
</body>

</html>
