<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="/resources/include/taglib.jsp" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>莆田市书香校园</title>
  <link rel="stylesheet" href="${ctx}/read-pt/css/swiper-3.4.2.min.css">
  <link rel="stylesheet" href="${ctx}/read-pt/css/jquery.mCustomScrollbar.min.css">
  <link rel="stylesheet" href="${ctx}/read-pt/css/font.css">
  <link rel="stylesheet" href="${ctx}/read-pt/css/common.css">
  <link rel="stylesheet" href="${ctx}/read-pt/css/index.css">
</head>
<body>
<div class="container">
  <div class="page-top">
    <!--头部导航部分-->
    <div class="header">
      <ul>
        <li class="logo">
          <img src="/read-pt/img/logo-pt.png" alt="Logo">
          <div>
            <h1>莆田市书香校园</h1>
            <h2>智慧阅读平台</h2>
          </div>
        </li>
        <!--<li><a class="current" href="http://cs.xueya.test.basicedu.chaoxing.com/front/index">首页</a></li>-->
        <!--<li><a data-type="2" href="http://cs.xueya.test.basicedu.chaoxing.com/front/book/index?id=4000">阅读</a></li>-->
        <li class="user floatr" id="userFloatr">

          <%--未登录--%>
          <c:if test="${userRightSTM eq null}">
            <div class="login-btn">
              <input type="button" id="logon" value="登录">
            </div>
          </c:if>
          <c:if test="${userRightSTM ne null}">
            <div class="navuser1">
              <div class="navuser_btn">
                <img src="/read-pt/img/photo/photo_1.png">
                  ${not empty userRightSTM.realName ? userRightSTM.realName : userRightSTM.loginName}
              </div>
              <dl class="navuser2">
                <dd><a href="http://i.mooc.chaoxing.com/space/index">进入空间</a>
                </dd>
                <!--专家-->
                <c:if test="${userRightSTM.userTypeId eq 5}">
                  <dd><a href="http://${openOrg.domainUrl}.xueya.chaoxing.com/front/verify/${userRightSTM.cityCode}/expertVerify">审核</a></dd>
                </c:if>
                <dd><a id="quit" href="javascript:void(0)">退出</a></dd>
              </dl>

            </div>
          </c:if>
        </li>
      </ul>
    </div>
    <!--banner部分-->
    <div class="banner">
      <div id="banner-img"></div>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <!--<h2>莆田市书香校园智慧阅读大数据平台</h2>-->
            <h2 class="title-banner" style="margin:140px auto 0;display:inline-block">
              <img src="/read-pt/img/title.png">
            </h2>
            <div class="links">
              <a href="/front/pt-index/cityReport" target="_blank">全市大数据分析报告 <span class="icon icon-chevron-right"></span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--登录框-->
    <div class="login-pop">
      <div class="bg"></div>
      <div class="pop">
        <div class="login_nav">
           <span class="icon-close"></span>
          <div>
            <img src="/read-pt/img/logo-pt.png">
            <p>莆田市书香校园智慧阅读大数据平台</p>
          </div>
          <div>
            <div class="login-tabs">
              <span class="current">管理员登录</span>
              <span>机构登录</span>
            </div>
            <div>
              <div  class="inp-group" id="adminLogin">
                <ul >
                  <li>
                    <i class="icon-user"></i>
                    <input type="text" id="loginName1" name="searchKey" placeholder="用户名/手机号/邮箱" onblur="if(this.value==''){this.placeholder='用户名/手机号/邮箱'};$(this).siblings('i').removeClass('focus')" onfocus="this.placeholder='';$(this).prev('i').addClass('focus')" />
                    <span id="errorName1" class="error"></span>
                  </li>
                  <li>
                    <i class="icon-password"></i>
                    <input type="password" id="pwd1" name="pwd" placeholder="密码" onblur="if(this.value==''){this.placeholder='密码'};$(this).siblings('i').removeClass('focus')" onfocus="this.placeholder='';$(this).siblings('i').addClass('focus')" />
                  </li>
                </ul>
                <div>
                  <a href="javascript:;" class="submit" onclick="toSubmit('1')">登录</a>
                </div>
                <a href="http://passport2.chaoxing.com/pwd/getpwd" class="forget">忘记密码？</a>
              </div>
              <div  class="inp-group" id="inpGroup" >
                <ul >
                  <li>
                    <i class="icon-oraganization"></i>
                    <c:if test="${openOrg ne null}">
                      <input type="hidden" id="fid" value="${openOrg.fid}" />
                      <input type="text" id="fName" name="searchKey" placeholder="选择机构" value="${openOrg.orgName}" onblur="if(this.value==''){this.placeholder='选择机构'};$(this).siblings('i').removeClass('focus')" onfocus="this.placeholder='';$(this).siblings('i').addClass('focus')" />
                    </c:if>
                    <c:if test="${openOrg eq null}">
                      <input type="hidden" id="fid" value="" />
                      <input type="text" id="fName" name="searchKey" placeholder="选择机构" onblur="if(this.value==''){this.placeholder='选择机构'};$(this).siblings('i').removeClass('focus')" onfocus="this.placeholder='';$(this).siblings('i').addClass('focus')" />
                    </c:if>
                    <i class="icon-search" style="cursor:pointer" onclick="query()"></i>
                    <dl id="query-list">
                      <dd><a href="javascript:;">成都市草堂中学</a></dd>
                      <dd><a href="javascript:;">成都市第七中学</a></dd>
                      <dd><a href="javascript:;">绵阳中学</a></dd>
                    </dl>
                  </li>

                  <li>
                    <i class="icon-user"></i>
                    <input type="text" id="loginName" name="searchKey" placeholder="用户名/手机号/邮箱" onblur="if(this.value==''){this.placeholder='用户名/手机号/邮箱'};$(this).siblings('i').removeClass('focus')" onfocus="this.placeholder='';$(this).prev('i').addClass('focus')" />
                    <span id="errorName" class="error"></span>
                  </li>
                  <li>
                    <i class="icon-password"></i>
                    <input type="password" id="pwd" name="pwd" placeholder="密码" onblur="if(this.value==''){this.placeholder='密码'};$(this).siblings('i').removeClass('focus')" onfocus="this.placeholder='';$(this).prev('i').addClass('focus')" />
                  </li>
                </ul>
                <div>
                  <a href="javascript:;" class="submit" onclick="toSubmit('0')">登录</a>
                </div>
                <a href="http://passport2.chaoxing.com/pwd/getpwd" class="forget">忘记密码？</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--登录框结束-->
  </div>
  <div class="mian">
    <!--数据展示1-->
    <ul class="data-list middle-width">
      <li>
        <img src="/read-pt/img/index-icon1.png">
        <div class="data-box">
          <span>${dataCount.schoolNum}</span>所参与学校
          <p>优质资源，更多学校参与</p>
        </div>
      </li>
      <li>
        <img src="/read-pt/img/index-icon2.png">
        <div class="data-box">
          <span>${dataCount.studentNum}</span>学生人数
          <p>趣味内容，更多学生参与</p>
        </div>
      </li>
      <li>
        <img style="width: 36px" src="/read-pt/img/index-icon3.png">
        <div class="data-box">
          <span>${dataCount.bookNum}</span>本图书资源
          <p>丰富的图书资源，更多选择</p>
        </div>
      </li>
      <li>
        <img src="/read-pt/img/index-icon4.png">
        <div class="data-box">
          <span>${dataCount.areaNum}</span>参与区县
          <p>区县联动，更显教育活力</p>
        </div>
      </li>
      <li>
        <img src="/read-pt/img/index-icon5.png">
        <div class="data-box">
          <span>${dataCount.teacherNum}</span>教师人数
          <p>帮助教学，更多老师参与</p>
        </div>
      </li>
      <li>
        <img style="width: 36px" src="/read-pt/img/index-icon6.png">
        <div class="data-box">
          <span>${dataCount.pubQuestionNum}+${dataCount.questionNum}</span>测评题库
          <p>丰富的测试资源，知识掌握程度高</p>
        </div>
      </li>
    </ul>
    <!--阅读区域表格-->
    <div class="district">
      <div class="middle-width">
        <div class="echarts">
          <h2 class="title2">阅读趋势图（近7天）</h2>
          <div id="readDistrict"></div>
        </div>
        <div class="new-feeds">
          <h2 class="title2">答题动态</h2>
          <div class="news-wrap">
            <ul class="news">
              <li>
                <img class="avat" src="/read-pt/img/photo/photo_2.png">
                <div class="info">
                  <p>刘祉成<span>1分钟前答题</span></p>
                  <p>《我有友情要出租》</p>
                </div>
              </li>
              <li>
                <img class="avat" src="/read-pt/img/photo/photo_4.png">
                <div class="info">
                  <p>徐李晨曦<span>2分钟前答题</span></p>
                  <p>《小野人》</p>
                </div>
              </li>
              <li>
                <img class="avat" src="/read-pt/img/photo/photo_5.png">
                <div class="info">
                  <p>林羽虹<span>3分钟前答题</span></p>
                  <p>《彩色的翅膀》</p>
                </div>
              </li>
              <li>
                <img class="avat" src="/read-pt/img/photo/photo_8.png">
                <div class="info">
                  <p>杨馨怡<span>4分钟前答题</span></p>
                  <p>《海马先生》</p>
                </div>
              </li>
              <li>
                <img class="avat" src="/read-pt/img/photo/photo_10.png">
                <div class="info">
                  <p>杜婉冉<span>5分钟前答题</span></p>
                  <p>《花婆婆》</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--区域分析图-->
    <div class="district-analyze">
      <div class="middle-width">
        <div class="analyze1">
          <h2 class="title2">区域分析图（近30天）<span class="tips">活跃量是指用户登陆系统的总次数</span></h2>
          <div id="analyzeEchart1"></div>
        </div>
        <div class="analyze2">
          <ul class="tabs" id="analyzeTab">
            <li class="current">活跃量</li>
            <li>出题量</li>
            <li>阅读量</li>
          </ul>
          <div class="analyze-datas">
            <ul class="first-dis district-ranking">
              <li>
                <label>1.城厢区 </label>
                <div>
                  <span class="data" style="width: 90%"></span>
                  <span class="first">895462</span>
                </div>
              </li>
              <li>
                <label>2.涵江区 </label>
                <div>
                  <span class="data"></span>
                  <span>889862</span>
                </div>
              </li>
              <li>
                <label>3.仙游县 </label>
                <div>
                  <span class="data"></span>
                  <span>862510</span>
                </div>
              </li>
              <li>
                <label>4.荔城区 </label>
                <div>
                  <span class="data"></span>
                  <span>798462</span>
                </div>
              </li>
              <li>
                <label>5.秀屿区 </label>
                <div>
                  <span class="data"></span>
                  <span>51986</span>
                </div>
              </li>
            </ul>
            <ul class="district-ranking">
              <li>
                <label>1.城厢区 </label>
                <div>
                  <span class="data" style="width: 90%"></span>
                  <span class="first">321</span>
                </div>
              </li>
              <li>
                <label>2.涵江区 </label>
                <div>
                  <span class="data"></span>
                  <span>298</span>
                </div>
              </li>
              <li>
                <label>3.仙游县 </label>
                <div>
                  <span class="data"></span>
                  <span>287</span>
                </div>
              </li>
              <li>
                <label>4.荔城区 </label>
                <div>
                  <span class="data"></span>
                  <span>256</span>
                </div>
              </li>
              <li>
                <label>5.秀屿区 </label>
                <div>
                  <span class="data"></span>
                  <span>243</span>
                </div>
              </li>
            </ul>
            <ul class="district-ranking">
              <li>
                <label>1.城厢区 </label>
                <div>
                  <span class="data" style="width: 90%"></span>
                  <span class="first">4200</span>
                </div>
              </li>
              <li>
                <label>2.涵江区 </label>
                <div>
                  <span class="data"></span>
                  <span>3890</span>
                </div>
              </li>
              <li>
                <label>3.仙游县 </label>
                <div>
                  <span class="data"></span>
                  <span>3560</span>
                </div>
              </li>
              <li>
                <label>4.荔城区 </label>
                <div>
                  <span class="data"></span>
                  <span>3480</span>
                </div>
              </li>
              <li>
                <label>5.秀屿区 </label>
                <div>
                  <span class="data"></span>
                  <span>3360</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--排行榜-->
    <div class="ranking">
      <div class="middle-width">
        <ul class="ranking-ul">
          <li>
             <h2 class="title"><span>学校排行榜(top8)</span></h2>
             <div>
               <ul class="best-ranking">
                 <li>
                   <div class="avat-box">
                     <img class="avat" src="/read-pt/img/photo/photo_2.png">
                     <img class="award" src="/read-pt/img/second.png">
                   </div>
                   <span>湄洲二中</span>
                   <span>秀屿区</span>
                   <span>49856</span>
                   <span>活跃量(次)</span>
                 </li>
                 <li class="first">
                   <div class="avat-box">
                     <img class="avat" src="/read-pt/img/photo/photo_3.png">
                     <img class="award" src="/read-pt/img/first.png">
                   </div>
                   <span>莆田六中</span>
                   <span>涵江区</span>
                   <span>51268</span>
                   <span>活跃量(次)</span>
                 </li>
                 <li>
                   <div class="avat-box">
                     <img class="avat" src="/read-pt/img/photo/photo_4.png">
                     <img class="award" src="/read-pt/img/third.png">
                   </div>
                   <span>莆田五中</span>
                   <span>城厢区</span>
                   <span>47516</span>
                   <span>活跃量(次)</span>
                 </li>
               </ul>
               <table class="active-table">
                 <tbody>
                   <tr>
                     <td width="14%">4</td>
                     <td width="66%" class="ranking-info">
                       <img class="avat" src="/read-pt/img/photo/photo_1.png">
                       <div><p>莆田四中</p><p>荔城区</p></div>
                     </td>
                     <td width="20%">42658</td>
                   </tr>
                   <tr>
                     <td>5</td>
                     <td class="ranking-info">
                       <img class="avat" src="/read-pt/img/photo/photo_12.png">
                       <div>
                         <p>莆田十中</p>
                       </div>
                     </td>
                     <td>40256</td>
                   </tr>
                   <tr>
                     <td>6</td>
                     <td class="ranking-info">
                       <img class="avat" src="/read-pt/img/photo/photo_13.png">
                       <div>
                         <p>莆田第二十二中学</p>
                         <p>秀屿区</p>
                       </div>
                     </td>
                     <td>39786</td>
                   </tr>
                   <tr>
                     <td>7</td>
                     <td class="ranking-info">
                       <img class="avat" src="/read-pt/img/photo/photo_5.png">
                       <div>
                         <p>莆田锦江中学</p>
                         <p>涵江区</p>
                       </div>
                     </td>
                     <td>38565</td>
                   </tr>
                   <tr>
                     <td>8</td>
                     <td class="ranking-info">
                       <img class="avat" src="/read-pt/img/photo/photo_11.png">
                       <div>
                         <p>仙游一中</p>
                         <p>仙游县</p>
                       </div>
                     </td>
                     <td>38454</td>
                   </tr>
                 </tbody>
               </table>
             </div>
          </li>
          <li>
            <h2 class="title"><span>学生排行榜(top8)</span></h2>
            <div>
              <ul class="best-ranking">
                <li>
                  <div class="avat-box">
                    <img class="avat" src="/read-pt/img/photo/photo_12.png">
                    <img class="award" src="/read-pt/img/second.png">
                  </div>
                  <span>徐李晨曦</span>
                  <span>仙游一中</span>
                  <span>389</span>
                  <span>阅读量（本）</span>
                </li>
                <li class="first">
                  <div class="avat-box">
                    <img class="avat" src="/read-pt/img/photo/photo_7.png">
                    <img class="award" src="/read-pt/img/first.png">
                  </div>
                  <span>刘祉成</span>
                  <span>莆田锦江中学</span>
                  <span>420</span>
                  <span>阅读量（本）</span>
                </li>
                <li>
                  <div class="avat-box">
                    <img class="avat" src="/read-pt/img/photo/photo_8.png">
                    <img class="award" src="/read-pt/img/third.png">
                  </div>
                  <span>林羽虹</span>
                  <span>莆田四中</span>
                  <span>356</span>
                  <span>阅读量（本）</span>
                </li>
              </ul>
              <table>
                <tbody>
                <tr>
                  <td width="14%">4</td>
                  <td width="66%" class="ranking-info">
                    <img class="avat" src="/read-pt/img/photo/photo_10.png">
                    <div>
                      <p>杨馨怡</p>
                      <p>仙游一中</p>
                    </div>
                  </td>
                  <td width="20%">348</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td class="ranking-info">
                    <img class="avat" src="/read-pt/img/photo/photo_11.png">
                    <div>
                      <p>杜婉冉</p>
                      <p>莆田第二十二中学</p>
                    </div>
                  </td>
                  <td>336</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td class="ranking-info">
                    <img class="avat" src="/read-pt/img/photo/photo_12.png">
                    <div>
                      <p>何睿华</p>
                      <p>莆田十一中</p>
                    </div>
                  </td>
                  <td>321</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td class="ranking-info">
                    <img class="avat" src="/read-pt/img/photo/photo_13.png">
                    <div>
                      <p>党欣怡</p>
                      <p>莆田华侨中学</p>
                    </div>
                  </td>
                  <td>298</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td class="ranking-info">
                    <img class="avat" src="/read-pt/img/photo/photo_14.png">
                    <div>
                      <p>顾佳欣</p>
                      <p>湄洲二中</p>
                    </div>
                  </td>
                  <td>287</td>
                </tr>
                </tbody>
              </table>
            </div>
          </li>
          <li>
            <h2 class="title"><span>教师排行榜(top8)</span></h2>
            <div>
              <ul class="best-ranking">
                <li>
                  <div class="avat-box">
                    <img class="avat" src="/read-pt/img/photo/photo_9.png">
                    <img class="award" src="/read-pt/img/second.png">
                  </div>
                  <span>李哲熙</span>
                  <span>湄洲二中</span>
                  <span>76</span>
                  <span>教师出题量(道)</span>
                </li>
                <li class="first">
                  <div class="avat-box">
                    <img class="avat" src="/read-pt/img/photo/photo_15.png">
                    <img class="award" src="/read-pt/img/first.png">
                  </div>
                  <span>吴胤贤</span>
                  <span>莆田十一中</span>
                  <span>89</span>
                  <span>教师出题量(道)</span>
                </li>
                <li>
                  <div class="avat-box">
                    <img class="avat" src="/read-pt/img/photo/photo_13.png">
                    <img class="award" src="/read-pt/img/third.png">
                  </div>
                  <span>唐菲絮</span>
                  <span>莆田锦江中学</span>
                  <span>69</span>
                  <span>教师出题量(道)</span>
                </li>
              </ul>
              <table>
                <tbody>
                <tr>
                  <td width="14%">4</td>
                  <td width="66%" class="ranking-info">
                    <img class="avat" src="/read-pt/img/photo/photo_6.png">
                    <div>
                      <p>王奕涵</p>
                      <p>莆田六中</p>
                    </div>
                  </td>
                  <td width="20%">66</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td class="ranking-info">
                    <img class="avat" src="/read-pt/img/photo/photo_9.png">
                    <div>
                      <p>黄欣怡</p>
                      <p>莆田第二十二中学</p>
                    </div>
                  </td>
                  <td>64</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td class="ranking-info">
                    <img class="avat" src="/read-pt/img/photo/photo_11.png">
                    <div>
                      <p>刘建成</p>
                      <p>莆田十中</p>
                    </div>
                  </td>
                  <td>60</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td class="ranking-info">
                    <img class="avat" src="/read-pt/img/photo/photo_14.png">
                    <div>
                      <p>夏御宸</p>
                      <p>莆田四中</p>
                    </div>
                  </td>
                  <td>55</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td class="ranking-info">
                    <img class="avat" src="/read-pt/img/photo/photo_2.png">
                    <div>
                      <p>徐玉涵</p>
                      <p>莆田五中</p>
                    </div>
                  </td>
                  <td>51</td>
                </tr>
                </tbody>
              </table>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--喜爱图书排行榜-->
    <div class="popular-books">
      <div class="middle-width">
        <h2>喜爱图书排行榜（top15）</h2>
        <div class="swiper-container popular-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <ul class="recommends">
                  <li class="current">
                    <img class="cover" src="/read-pt/img/top1.JPG">
                    <h3>我有友情要出租</h3>
                    <p>[美]方素珍 著</p>
                    <span class="read-num">56894人已读</span>
                  </li>
                  <li>
                    <img class="cover" src="/read-pt/img/top2.JPG">
                    <h3>小熊和最好的爸爸-当厨师</h3>
                    <p>(英)朱莉娅·唐纳森 文</p>
                    <span class="read-num">55426人已读</span>
                  </li>
                  <li>
                    <img class="cover" src="/read-pt/img/top3.JPG">
                    <h3>快乐的小松鼠</h3>
                    <p>(法)米歇尔·皮克马尔</p>
                    <span class="read-num">54268人已读</span>
                  </li>
                  <li>
                    <img class="cover" src="/read-pt/img/top4.JPG">
                    <h3>城南旧事</h3>
                    <p>魏巍</p>
                    <span class="read-num">50256人已读</span>
                  </li>
                  <li>
                    <img class="cover" src="/read-pt/img/top5.JPG">
                    <h3>花婆婆</h3>
                    <p>武陵樵子</p>
                    <span class="read-num">49862人已读</span>
                  </li>
                </ul>
              <ul class="tables">
                <li class="first-dis">
                  <span class="triangle"></span>
                  <h4>《我有友情要出租》读后感</h4>
                  <div class="swiper-table">
                    <table>
                      <tr>
                        <td width="5%">
                          <img src="/read-pt/img/first_2.png" alt="">
                        </td>
                        <td width="20%" class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_12.png">
                          <div>
                            <p class="color3">刘祉成</p>
                            <p>莆田六中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            友情是用金钱买不到的，只有懂得分享，主动去跟小朋友玩，才会获得友情，朋友之间要相互照顾，互相谦让，友谊才会长久！
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3" width="10%"><i class="icon-thumbs-up"></i>39895</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/second_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_3.png">
                          <div>
                            <p  class="color3">徐李晨曦</p>
                            <p>湄洲二中</p>
                          </div>
                        </td>
                        <td>
                          <div  class="recommand-details">
                            这本书讲的是丛林里的一只大猩猩，因为没有朋友，所以要以五元钱出租它的友情的故事。一个叫咪咪的小女孩经过这里，想和大猩猩交朋友，但她只有一元钱，大猩猩说一元就一元吧。于是咪咪每天都来租大猩猩的友情，和大猩猩一起玩各种各样的游戏，他们玩的可高兴了。后来，有一天，大猩猩不想收咪咪的钱了，还要给咪咪吃饼干，.大猩猩来到大树下，左等右等，就是不见咪咪的影子。终于，一辆大汽车开来了，咪咪从里面探出头来说：“我没有钱了，而且我们要搬家了，再见！”咪咪留下她的布娃娃就走了。大猩猩望着远去的汽车很难过，它又没有朋友了，只好回到大树下，等待下一个好朋友，但这次它要免费出租他的友情。 读了这本书，我想朋友是要用心去寻找的，友情也不是钱可以买来的，和朋友在一起的时候要珍惜，不要等失去了才觉得朋友的可贵。朋友就在附近，等待和你相遇……
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>37855</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/third_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_4.png">
                          <div>
                            <p  class="color3">林羽虹</p>
                            <p>莆田五中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            今天我读了《我有友情要出租》，并且讲给了爸爸听，这本书很好看，我觉得有朋友很开心。我要和朋友好好相处，分享好玩的玩具和好吃的零食。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>36895</td>
                      </tr>
                    </table>
                  </div>

                </li>
                <li>
                  <span class="triangle"></span>
                  <h4>《小熊和最好的爸爸-当厨师》读后感</h4>
                  <div class="swiper-table">
                    <table >
                      <tr>
                        <td width="5%">
                          <img src="/read-pt/img/first_2.png" alt="">
                        </td>
                        <td width="20%" class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_4.png">
                          <div>
                            <p class="color3">杨馨怡</p>
                            <p>莆田四中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            小熊和爸爸倾辛万苦去找新家，最后他们终于找到了一个新家那是要靠自己的功劳，才能造房子。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3" width="10%"><i class="icon-thumbs-up"></i>35879</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/second_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_4.png">
                          <div>
                            <p  class="color3">杜婉冉</p>
                            <p>莆田十中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            小熊和爸爸的家被雨水给淹没了，他们不停的寻找，最终找了一个很舒适的新家，小熊和爸爸都很满意。我觉得搬新家的时候总有一些困难
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>34896</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/third_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_5.png">
                          <div>
                            <p  class="color3">何睿华</p>
                            <p>莆田第二十二中学</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            熊爸爸爱小熊，带着小熊做饭，教小熊认食物，陪着小熊一天天慢慢长大，小熊感觉很温暖。我喜欢这样的爸爸。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>33594</td>
                      </tr>
                    </table>
                  </div>
                </li>
                <li>
                  <span class="triangle"></span>
                  <h4>《快乐的小松鼠》读后感</h4>
                  <div class="swiper-table">
                    <table>
                      <tr>
                        <td width="5%">
                          <img src="/read-pt/img/first_2.png" alt="">
                        </td>
                        <td width="20%" class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_6.png">
                          <div>
                            <p class="color3">唐昊</p>
                            <p>莆田华侨中学</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            要记住自己说过的话，说到就要做到，一个人如果不能诚实守信，就找不到真心相待的朋友。不管是对朋友的承诺还是给自己定下的目标，请务必做到！
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3" width="10%"> <i class="icon-thumbs-up"></i>28654</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/second_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_4.png">
                          <div>
                            <p  class="color3">綦宇飞</p>
                            <p>莆田六中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            小狐狸霸占了小松鼠的树洞屋，赶走了小鸟，小乌龟和小松鼠，他这样做是不对的，小松鼠又找了一个新家山洞屋，最后，小狐狸认识到了自己的错误，并改正了错误，小动物都原谅了它！
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>27654</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/third_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_2.png">
                          <div>
                            <p  class="color3">方晨</p>
                            <p>湄洲二中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            读了这本书，我知道了我们要乐于帮助别人，要向小松鼠学习。小狐狸太坏啦！抢了别人的家，我们不要像小狐狸学习。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"> <i class="icon-thumbs-up"></i>25654</td>
                      </tr>
                    </table>
                  </div>
                </li>
                <li>
                  <span class="triangle"></span>
                  <h4>《城南旧事》读后感</h4>
                  <div class="swiper-table">
                    <table>
                      <tr>
                        <td width="5%">
                          <img src="/read-pt/img/first_2.png" alt="">
                        </td>
                        <td width="20%" class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_15.png">
                          <div>
                            <p class="color3">于渊缜</p>
                            <p>莆田五中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            读了城南旧事这本书，深刻的感受到了林海音小时候的天真可爱，一篇篇精彩的故事，一个个精致的人物，再加上一幅幅生动的画面，描绘的淋漓尽致。小英子、宋妈、爸爸妈妈等人的形象。深刻的牢记在我的心里。是我难以忘却
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  width="10%" class="color3"> <i class="icon-thumbs-up"></i>24954</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/second_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_12.png">
                          <div>
                            <p  class="color3"> 许译丹</p>
                            <p>莆田四中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            整本书每一章都感人肺腑，让我受益匪浅。每个人的心中都有一个不一样的童年，有喜有悲，有许多有趣美好的时光值得我们怀念。《城南旧事》写的真好！
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"> <i class="icon-thumbs-up"></i>24054</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/third_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_4.png">
                          <div>
                            <p  class="color3">李晓乐</p>
                            <p>莆田十中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            淡淡的哀愁，沉沉的相思。——题记 我一向对名著不太感冒，往往是看了半截便将其束之高阁了。《城南旧事》不同，淡淡的文字，悠悠的叙述将我领进二十世纪二十年代的北京，也让我忆起了童年往事。 《城南旧事》中满含着怀旧的基调，将其自身包含的多层次的情绪色彩，以一种自然的、不着痕迹的手段精细地表现出来。书中的一切都是那样有条不紊，缓缓的流水、缓缓的驼队、缓缓而过的人群、缓缓而逝的岁月……景、物、人、事、情完美结合，似一首淡雅而含蓄的诗。 英子的世界是单纯的，充满疑问的，她从不在自己的世界里上锁，总是任由人们进进出出。所以她和被人们认为是疯子的秀贞结下了友情，三天两头的往惠安馆里钻；她和“小偷”写下承诺，甚而认真地听着“小偷”的故事；她爱着自己的奶妈，望着她离去，英子伤心难过。 透过英子童稚的双眼，我们看到了大人世界的悲欢离合那里有一种不出来的天真，却道尽人世复杂的情感。 小时侯爱听故事，爱问“后来呢？”，爱帮助人，动不动就拍拍胸脯，说一句“包在我身上”，不懂大人为什么会互相讨厌对方，因为在“我”的眼里，他明明是个好人啊。看不明白大人们为什么人前一套，人后一套，“我们”在一起玩时，心里想什么就说什么，即使闹翻了，哭鼻子了，到第二天还是一样在一起嘻嘻哈哈。 为什么我们总是羡慕孩子的无忧无虑，那是因为他们的世界里没有戒备，没有心计，只是单纯的。 “看见东阳下的骆驼队走过来，听见缓慢悦耳的铃声，童年重临于我的心头。”
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"> <i class="icon-thumbs-up"></i>23654</td>
                      </tr>
                    </table>
                  </div>
                </li>
                <li>
                  <span class="triangle"></span>
                  <h4>《花婆婆》读后感</h4>
                  <div class="swiper-table">
                    <table >
                      <tr>
                        <td width="5%">
                          <img src="/read-pt/img/first_2.png" alt="">
                        </td>
                        <td width="20%" class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_12.png">
                          <div>
                            <p class="color3">陈惜君</p>
                            <p>莆田十一中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            阅读完花婆婆让我更加喜欢故事中的花婆婆，她的播撒让世界变得漂亮，是一个无私奉献的人，我也要像花婆婆一样做个心灵美的人！
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3" width="10%"><i class="icon-thumbs-up"></i>32659</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/second_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_7.png">
                          <div>
                            <p  class="color3">党欣怡</p>
                            <p>莆田锦江中学</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            我们每一个人都应该像花婆婆学习，做一些有意义的事情，爱护大自然，学习她的坚持和认真，让世界变的更加美丽！
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>31589</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/third_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_9.png">
                          <div>
                            <p  class="color3">顾佳欣</p>
                            <p>仙游一中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            艾丽丝小时候答应爷爷，要做三件事，她长大以后一件一件的做到了，我长大以后要像花婆婆一样，做好每一件事情坚持努力。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>29862</td>
                      </tr>
                    </table>
                  </div>
                </li>
              </ul>
            </div>
            <div class="swiper-slide">
              <ul class="recommends">
                <li class="current">
                  <img class="cover" src="/read-pt/img/top6.jpg">
                  <h3>窗边的小豆豆</h3>
                  <p>辛唐米娜</p>
                  <span class="read-num">47688人已读</span>
                </li>
                <li>
                  <img class="cover" src="/read-pt/img/top7.JPG">
                  <h3>祝你生日快乐</h3>
                  <p>汪静之</p>
                  <span class="read-num">43852人已读</span>
                </li>
                <li>
                  <img class="cover" src="/read-pt/img/top8.JPG">
                  <h3>开往远方的列车</h3>
                  <p>王粲</p>
                  <span class="read-num">42577人已读</span>
                </li>
                <li>
                  <img class="cover" src="/read-pt/img/top9.JPG">
                  <h3>神奇飞书</h3>
                  <p>杨银波 </p>
                  <span class="read-num">40123人已读</span>
                </li>
                <li>
                  <img class="cover" src="/read-pt/img/top10.JPG">
                  <h3>宝葫芦的秘密 </h3>
                  <p>杨黎</p>
                  <span class="read-num">39785人已读</span>
                </li>
              </ul>
              <ul class="tables">
                <li  class="first-dis">
                  <span class="triangle"></span>
                  <h4>《窗边的小豆豆》读后感</h4>
                  <div class="swiper-table">
                    <table>
                      <tr>
                        <td width="5%">
                          <img src="/read-pt/img/first_2.png" alt="">
                        </td>
                        <td width="20%" class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_2.png">
                          <div>
                            <p class="color3">王孟涵</p>
                            <p>莆田十一中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            小豆豆刚入学不到一个月就退学了，但是她天真，在巴学园里喜欢他们的小林校长，他们学校组织了很多丰富多彩的活动和我们学校一样，这本书是一本销量最大的一本书，这本书记录了他来到先学后的一段记录，他的想法和大家与众不同小林校长让他们带来的山的味道海的味道，小林校长看他们带的食物之后就唱一首吃饭歌，我们现在的食堂一点都不一样。小豆豆那个开朗的心深深让我记住了。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3" width="10%"><i class="icon-thumbs-up"></i>23655</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/second_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_5.png">
                          <div>
                            <p  class="color3">张文</p>
                            <p>莆田华侨中学</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            小豆豆本来是很调皮的，但是在巴学园的“爱的教育”下面，她慢慢变得懂事、听话，变成了一个让大家喜欢的孩子。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>23656</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/third_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_5.png">
                          <div>
                            <p  class="color3">李菲</p>
                            <p>莆田六中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            今天，我终于把《窗边的小豆豆》读完了。 这是一个日本作家黑柳彻子写的他本人上小学的一段真实的故事。小豆豆因为淘气被原学校退学后，来到了巴学园，在校长的爱护和引导下，逐渐茁壮成长。 没有本质上就很坏很顽劣的孩子，只有不得方、不得体的教育方法。什么样的孩子，只要因材施教、循循善诱，引导得法，都能变成一个有用的人。这是这本书想告诉我们的道理。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>
                          23657
                        </td>
                      </tr>
                    </table>
                  </div>

                </li>
                <li>
                  <span class="triangle"></span>
                  <h4>《祝你生日快乐》读后感</h4>
                  <div class="swiper-table">
                    <table>
                      <tr>
                        <td width="5%">
                          <img src="/read-pt/img/first_2.png" alt="">
                        </td>
                        <td width="20%" class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_7.png">
                          <div>
                            <p class="color3">戚健</p>
                            <p>莆田第二十二中学</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            很感人的一本书，友情难得可贵，就算生病了小姐姐也不怕，开心乐观的态度来对待生活，希望小姐姐的病好起来，她会来找小丁子。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3" width="10%"><i class="icon-thumbs-up"></i>23658</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/second_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_1.png">
                          <div>
                            <p  class="color3">冷辉鹏</p>
                            <p>莆田锦江中学</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            我觉得书里的小丁子是一位乐于助人的小丁子。他还祝一位女孩生日快乐我觉得他是一个好孩子而且是很好很好的孩子。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>23659</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/third_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_12.png">
                          <div>
                            <p  class="color3">李文雪</p>
                            <p>仙游一中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            读完这一篇文章，心情很沉重，小女孩用毅力和病魔做斗争，她的这种精神值得我们学习，不管今后遇到什么困难，我们都应勇敢面对。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>23660</td>
                      </tr>
                    </table>
                  </div>
                </li>
                <li>
                  <span class="triangle"></span>
                  <h4>《开往远方的列车》读后感</h4>
                  <div class="swiper-table">
                    <table>
                      <tr>
                        <td width="5%">
                          <img src="/read-pt/img/first_2.png" alt="">
                        </td>
                        <td width="20%" class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_3.png">
                          <div>
                            <p class="color3">朱晓飞</p>
                            <p>湄洲二中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            玛丽安的内心经历了由希望到失望再到绝望最后到希望的复杂心路历程，从文字我们可以看出玛丽安对妈妈的思念和牵挂，也流露出世间最美好的东西，那就是亲情，希望天底下所有儿童都能拥有属于自己的亲情
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3" width="10%"><i class="icon-thumbs-up"></i>23661</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/second_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_7.png">
                          <div>
                            <p  class="color3">彭福达</p>
                            <p>莆田五中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            开远方的列车上，十四位孤儿等待认养。孤儿玛莉安期待亲生妈妈会出现来接她，但妈妈始终没有来，过了一站又一站，直到最后一站才被一对有爱的老夫妇收养。有时候，你最后得到的会比你原先想要的更好。玛莉安把妈妈送给她已经发黄的羽毛插在女士的帽子上。 玛莉安思念妈妈，人们也不喜欢收养她，相比之下，我们是多么的幸福，我们有爸爸妈妈的爱，有丰富的物质生活，更应该珍惜。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>23662</td>
                      </tr>
                    </table>
                  </div>
                </li>
                <li>
                  <span class="triangle"></span>
                  <h4>《神奇飞书》读后感</h4>
                  <div class="swiper-table">
                    <table>
                      <tr>
                        <td width="5%">
                          <img src="/read-pt/img/first_2.png" alt="">
                        </td>
                        <td width="20%" class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_7.png">
                          <div>
                            <p class="color3">徐国芳</p>
                            <p>莆田十中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            这本书主要讲了莫里斯和他的书。也让我明白了，人的一生就是一本书，有希望，有欢乐，有悲伤，还有苦难，我们要勇敢面对所有的困难。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3" width="10%"><i class="icon-thumbs-up"></i>23664</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/second_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_9.png">
                          <div>
                            <p  class="color3">蔡静轩</p>
                            <p>莆田第二十二中学</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            书是除了我们之外的一个大世界，在这个世界也需要感情，也需要爱，只有全心关注，注入自己的真心真情，才能使书中世界变得丰富多彩。一件事往往需要坚持，坚持到最后的结局总是我们意想不到的甜蜜。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>23665</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/third_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_10.png">
                          <div>
                            <p  class="color3">潘建朝</p>
                            <p>莆田锦江中学</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            “书籍是人类进步的阶梯。”曾经有名的作家高尔基说过。书，可以让人们的思想进步；可以让人的精神充实；可以让你找到成功之路…我会像莫里斯先生一样，让五彩缤纷的书带我飞向天空。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>23666</td>
                      </tr>
                    </table>
                  </div>
                </li>
                <li>
                  <span class="triangle"></span>
                  <h4>《宝葫芦的秘密 》读后感</h4>
                  <div class="swiper-table">
                    <table>
                      <tr>
                        <td width="5%">
                          <img src="/read-pt/img/first_2.png" alt="">
                        </td>
                        <td width="20%" class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_11.png">
                          <div>
                            <p class="color3">徐建哲</p>
                            <p>仙游一中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            这篇文章说的是一个童话故事，是奶奶讲的从小要努力学习才会有好成绩，要付出才有好结果。我们要好好努力才有好成绩。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3" width="10%"><i class="icon-thumbs-up"></i>23667</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/second_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_12.png">
                          <div>
                            <p  class="color3">王学锋</p>
                            <p>莆田十一中</p>
                          </div>
                        </td>
                        <td>
                          <div  class="recommand-details">
                            读了宝葫芦的秘密这本书，告诉我们要脚踏实地做自己，靠自己的双手攀登，不要踩在别人的肩膀上，只有我们独立思索，才真正具有真理和生命。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>23668</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/third_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_8.png">
                          <div>
                            <p  class="color3">郝骄</p>
                            <p>莆田华侨中学</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            读了宝葫芦的秘密我的记忆最深的是那一个葫芦，因为它可以让你的世界非常奇妙丰富，让人感觉走到了梦境，但世界上没有不劳而获的东西，只有努力才可成功，你付出多少就会收获多少。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>23669</td>
                      </tr>
                    </table>
                  </div>
                </li>
              </ul>
            </div>
            <div class="swiper-slide">
              <ul class="recommends">
                <li class="current">
                  <img class="cover" src="/read-pt/img/top11.JPG">
                  <h3>书中书</h3>
                  <p>汪国真</p>
                  <span class="read-num">39786人已读</span>
                </li>
                <li>
                  <img class="cover" src="/read-pt/img/top12.JPG">
                  <h3>我要大蜥蜴</h3>
                  <p>章廷谦 </p>
                  <span class="read-num">39787人已读</span>
                </li>
                <li>
                  <img class="cover" src="/read-pt/img/top13.JPG">
                  <h3>雪花人</h3>
                  <p>张悉妮</p>
                  <span class="read-num">39788人已读</span>
                </li>
                <li>
                  <img class="cover" src="/read-pt/img/top14.JPG">
                  <h3>臭臭的比尔</h3>
                  <p>周德东</p>
                  <span class="read-num">39789人已读</span>
                </li>
                <li>
                  <img class="cover" src="/read-pt/img/top15.JPG">
                  <h3>小威向前冲</h3>
                  <p>周国平</p>
                  <span class="read-num">39790人已读</span>
                </li>
              </ul>
              <ul class="tables">
                <li class="first-dis">
                  <span class="triangle"></span>
                  <h4>《书中书》读后感</h4>
                  <div class="swiper-table">
                    <table>
                      <tr>
                        <td width="5%">
                          <img src="/read-pt/img/first_2.png" alt="">
                        </td>
                        <td width="20%" class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_8.png">
                          <div>
                            <p class="color3">吴玉辉</p>
                            <p>莆田六中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            读了这本绘本书，小女孩的好奇心一直引领我们继续读，引领小朋友们对于事实与真相的探索，满足小朋友们内心对于富有神秘感的兴趣。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3" width="10%"><i class="icon-thumbs-up"></i>23670</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/second_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_11.png">
                          <div>
                            <p  class="color3">张伟</p>
                            <p>湄洲二中</p>
                          </div>
                        </td>
                        <td>
                          <div  class="recommand-details">
                            小女孩收到了奇妙的礼物，是一本书。书中无限重复的画面，激起了小女孩的好奇心，于是，她试着用浴室镜、放大镜和3D立体眼镜，找出答案……故事太神奇了！
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>23671</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/third_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_13.png">
                          <div>
                            <p  class="color3">钱朋薇</p>
                            <p>莆田五中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            书中的小朋友对这本书非常好奇。他发挥了自己的想象力，走进了这本书。最后，他终于成为了一名小画家。我也觉得这本书太神奇了，真的想走进去看一看。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>23672</td>
                      </tr>
                    </table>
                  </div>
                </li>
                <li>
                  <span class="triangle"></span>
                  <h4>《我要大蜥蜴》读后感</h4>
                  <div class="swiper-table">
                    <table>
                      <tr>
                        <td width="5%">
                          <img src="/read-pt/img/first_2.png" alt="">
                        </td>
                        <td width="20%" class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_14.png">
                          <div>
                            <p class="color3">张海东</p>
                            <p>莆田四中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            阿力一直想要大蜥蜴，可是妈妈不同意。阿力再三恳求， 妈妈的再三要求，最后，阿力得到了大蜥蜴。妈妈特别喜欢像阿力这种有爱情的人。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3" width="10%"><i class="icon-thumbs-up"></i>23673</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/second_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_15.png">
                          <div>
                            <p  class="color3">王贺祥</p>
                            <p>莆田十中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            好有趣的一对母子，他们用写信的方式进行沟通，最后终于解决了问题。感觉好有爱！以后我和妈妈也要多些沟通，多些交流！
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>23674</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/third_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_7.png">
                          <div>
                            <p  class="color3">韩甲慧</p>
                            <p>莆田第二十二中学</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            他们用书信的方式来沟通，用商量的语气彼此交流，文章温馨又轻快。也认识到大蜥蜴需要吃的食物和成长的时间。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>23675</td>
                      </tr>
                    </table>
                  </div>

                </li>
                <li>
                  <span class="triangle"></span>
                  <h4>《雪花人》读后感</h4>
                  <div class="swiper-table">
                    <table>
                      <tr>
                        <td width="5%">
                          <img src="/read-pt/img/first_2.png" alt="">
                        </td>
                        <td width="20%" class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_6.png">
                          <div>
                            <p class="color3">黄祖响</p>
                            <p>莆田锦江中学</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            读完这本书我要像书中的主人公学习，学习他为了梦想坚持不懈，在遇到困难时不退缩。在我们学习中也要学习他这种永不放弃的精神。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3" width="10%"><i class="icon-thumbs-up"></i>23676</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/second_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_5.png">
                          <div>
                            <p  class="color3">孙超</p>
                            <p>仙游一中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            我喜欢雪花，故事的主人公为了给不同形状的雪花拍照，特别有毅力。我要像他学习，不管遇到什么样的困难，都要克服。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>23677</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/third_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_4.png">
                          <div>
                            <p  class="color3">王艺洁</p>
                            <p>莆田十一中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            威利是一个伟大的人。他不顾一切的去做自己喜欢的事情，不论遇到多大的困难和问题他都不放弃自己的追求的理想。他的精神值得我们学习！
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>23678</td>
                      </tr>
                    </table>
                  </div>
                </li>
                <li>
                  <span class="triangle"></span>
                  <h4>《臭臭的比尔》读后感</h4>
                  <div class="swiper-table">
                    <table>
                      <tr>
                        <td width="5%">
                          <img src="/read-pt/img/first_2.png" alt="">
                        </td>
                        <td width="20%" class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_3.png">
                          <div>
                            <p class="color3">王崇颢</p>
                            <p>莆田华侨中学</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            《臭臭的比尔》讲的是比尔不爱干净，总爱跟脏东西在一起，后来一个阿姨帮他洗干净，我们要注意讲究个人卫生。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3" width="10%"><i class="icon-thumbs-up"></i>23679</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/second_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_2.png">
                          <div>
                            <p  class="color3">方悦</p>
                            <p>莆田六中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            比尔是一只活泼可爱的小狗，就是不喜欢讲卫生，而碧奇阿姨为了比尔能够干净卫生可吃尽了苦头，我一定不能学比尔，我要做一个讲卫生的好孩子
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>23680</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/third_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_1.png">
                          <div>
                            <p  class="color3">纪泓伊</p>
                            <p>湄洲二中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            通过读故事让我懂得了要做一个爱劳动爱干净的人，这样才能让大家喜欢，爸爸妈妈养育我很辛苦，所以以后我也要帮爸爸妈妈做些力所能及的事情。
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>23681</td>
                      </tr>
                    </table>
                  </div>
                </li>
                <li>
                  <span class="triangle"></span>
                  <h4>《小威向前冲》读后感</h4>
                  <div class="swiper-table">
                    <table>
                      <tr>
                        <td width="5%">
                          <img src="/read-pt/img/first_2.png" alt="">
                        </td>
                        <td width="20%" class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_3.png">
                          <div>
                            <p class="color3">纪彩梅</p>
                            <p>莆田五中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            文中通过拟人的写法。详细叙述了生命是怎么由来的 以卡通人物形象的形式诠释了生命由来的整个过程。每个生命都是独一无二 来之不易的。读后让人懂得要更加珍惜生命。珍惜生活。珍惜我们身边的人！
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3" width="10%"><i class="icon-thumbs-up"></i>23682</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/second_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_6.png">
                          <div>
                            <p  class="color3">方琨</p>
                            <p>莆田四中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            《小威向前冲》，它是一本性教育阅读本，告诉了我们孩子是一颗小精子变成小宝宝的，以及蕴含着遗传的小秘密。我觉得好神奇呀！
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>23683</td>
                      </tr>
                      <tr>
                        <td>
                          <img src="/read-pt/img/third_2.png" alt="">
                        </td>
                        <td class="ranking-info">
                          <img class="avat" src="/read-pt/img/photo/photo_9.png">
                          <div>
                            <p  class="color3">孙福祥</p>
                            <p>莆田十中</p>
                          </div>
                        </td>
                        <td >
                          <div class="recommand-details">
                            原来我们都是精子和卵子结合成的啊，感觉好神奇啊。精子和卵子会什么，我们就会什么啊！就像妈妈会英语，我也英语说的好一样。（孩子想表达的是遗传的神奇吧）
                          </div>
                          <div><span class="fold">展开</span></div>
                        </td>
                        <td  class="color3"><i class="icon-thumbs-up"></i>23684</td>
                      </tr>
                    </table>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    </div>
  </div>
  <!--底部-->
  <div>
    <div class="news-lists">
        <div class="middle-width">
            <div class="new-titles">
                <span class="title1">新闻动态</span>
                <div class="tabs" id="newsTab">
                    <span class="current">教育动态</span>
                    <span>教育工作</span>
                </div>
            </div>
            <div class="lists">
                <div class="edu-news list-box">
                    <ul>
                        <li>
                            <span>致全市师生及家长的一封信</span>
                            <span>2018-02-06</span>
                        </li>
                        <li>
                            <span>2017年莆田市“学无涯”杯青少年儿童动手电子制作锦标赛</span>
                            <span>2018-02-05</span>
                        </li>
                        <li>
                            <span>义务教育学生营养改善计划实施方案出台</span>
                            <span>2018-02-04</span>
                        </li>
                        <li>
                            <span>莆田市教育讲坛开讲，陈惠黔副市长上第一课</span>
                            <span>2018-02-03</span>
                        </li>
                        <li>
                            <span>第二十四届青少年爱国主义读书教育活动圆结束</span>
                            <span>2018-02-02</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>致全市师生及家长的一封信</span>
                            <span>2018-02-01</span>
                        </li>
                        <li>
                            <span>2017年莆田市“学无涯”杯青少年儿童动手电子制作锦标赛</span>
                            <span>2018-01-30</span>
                        </li>
                        <li>
                            <span>义务教育学生营养改善计划实施方案出台</span>
                            <span>2018-01-29</span>
                        </li>
                        <li>
                            <span>莆田市教育讲坛开讲，陈惠黔副市长上第一课</span>
                            <span>2018-01-28</span>
                        </li>
                        <li>
                            <span>第二十四届青少年爱国主义读书教育活动圆结束</span>
                            <span>2018-01-27</span>
                        </li>
                    </ul>
                </div>
                <div class="edu-work list-box">
                  <ul>
                    <li>
                      <span>致全市师生及家长的一封信</span>
                      <span>2018-02-06</span>
                    </li>
                    <li>
                      <span>2017年莆田市“学无涯”杯青少年儿童动手电子制作锦标赛</span>
                      <span>2018-02-05</span>
                    </li>
                    <li>
                      <span>义务教育学生营养改善计划实施方案出台</span>
                      <span>2018-02-04</span>
                    </li>
                    <li>
                      <span>莆田市教育讲坛开讲，陈惠黔副市长上第一课</span>
                      <span>2018-02-03</span>
                    </li>
                    <li>
                      <span>第二十四届青少年爱国主义读书教育活动圆结束</span>
                      <span>2018-02-02</span>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <span>致全市师生及家长的一封信</span>
                      <span>2018-02-01</span>
                    </li>
                    <li>
                      <span>2017年莆田市“学无涯”杯青少年儿童动手电子制作锦标赛</span>
                      <span>2018-01-30</span>
                    </li>
                    <li>
                      <span>义务教育学生营养改善计划实施方案出台</span>
                      <span>2018-01-29</span>
                    </li>
                    <li>
                      <span>莆田市教育讲坛开讲，陈惠黔副市长上第一课</span>
                      <span>2018-01-28</span>
                    </li>
                    <li>
                      <span>第二十四届青少年爱国主义读书教育活动圆结束</span>
                      <span>2018-01-27</span>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="middle-width">
            <p>COPYRIGHT © basicedu.chaoxing.com ALL RIGHTS RESERVED. | 京ICP备 13046642号-2</p>
        </div>
    </div>
  </div>
</div>
<script src="${ctx}/read-pt/js/jquery.min.js"></script>
<script src="${ctx}/resources/common/plugins/layer/layer.js" type="text/javascript"></script>
<script src="${ctx}/read-pt/js/particles.min.js"></script>
<script src="${ctx}/read-pt/js/swiper-3.4.2.min.js"></script>
<script src="${ctx}/read-pt/js/echarts.min.3.7.js"></script>
<script src="${ctx}/read-pt/js/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="${ctx}/read-pt/js/index.js"></script>
</body>
</html>