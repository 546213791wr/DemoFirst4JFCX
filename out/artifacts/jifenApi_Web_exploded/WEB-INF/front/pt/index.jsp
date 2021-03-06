<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="/resources/include/taglib.jsp" %>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>莆田市书香校园</title>
	<link rel="stylesheet" href="${ctx}/f_resources/css/swiper.min.css">
	<link rel="stylesheet" href="${ctx}/f_resources/css/header.css">
	<link rel="stylesheet" href="${ctx}/f_resources/css/style-pt.css">
</head>
<body>
<div class="container">
	<!--头部-->
	<header id="fixed">
		<div class="header1">
			<nav>
				<ul>
					<li class="logo">
						<img  src="/f_resources/img/z-new/logo-index.png" alt="Logo">
					</li>
					<li><a class="current" href="http://cs.xueya.test.basicedu.chaoxing.com/front/index">首页</a></li>
					<li><a data-type="2" href="http://cs.xueya.test.basicedu.chaoxing.com/front/book/index?id=4000">阅读</a></li>
					<li><a data-type="3"
						   href="http://cs.xueya.test.basicedu.chaoxing.com/front/course/course-type?moduleId=4007">课程</a></li>
					<li><a data-type="4" href="javascript:void(0)" style="cursor:pointer">活动</a></li>
					<li class="fontS20 qrcode2 floatr">
						<span class="color666">扫码关注公众号</span>
						<img src="/f_resources/img/z-new/qrcode_login1.png" alt="qrcode" style="display: none;">
					</li>
					<li class="fontS20 qrcode1 floatr">
						<span class="color666">扫码下载app</span>
						<img src="/f_resources/img/z-new/qrcode_login.png" alt="qrcode" style="display: none;">
					</li>
					<li class="user floatr">
						<div class="navuser1">
							<div class="navuser_btn">
								<img src="/f_resources/img/z-new/login-banner.png">钟旭
							</div>
							<!--教师端-->
							<dl class="navuser2 navuser2_teacher">
								<dd><a href="http://i.mooc.chaoxing.com/space/index">进入空间</a>
								</dd>
								<dd><a href="/front/verify">审核</a></dd>
								<dd><a href="javascript:void(0)" onclick="logout()"></i>退出</a></dd>
							</dl>
							<!--学生端-->
						</div>
					</li>
					<li class="floatr">
						<div class="search">
							<input type="text" name="searchKey" id="searchKey" placeholder="请输入关键字" style="color: #666;">
							<i class="icon-search"></i>
						</div>
					</li>
				</ul>
			</nav>
		</div>
	</header>
	<!--banner start-->
	<div class="banner">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide">
					<img src="/f_resources/img/z-new/banner.png">
				</div>
				<div class="swiper-slide">
					<img src="/f_resources/img/z-new/banner.png">
				</div>
				<div class="swiper-slide">
					<img src="/f_resources/img/z-new/banner.png">
				</div>
			</div>
			<div class="swiper-pagination"></div>
		</div>
	</div>
	<!--banner end-->
	<!--数据统计 start-->
	<div class="data-statis">
		<!--基础概况-->
		<div>
			<h2>基础概况</h2>
			<ul class="data-list">
				<li>
					<img src="/f_resources/img/z-new/icon-school.png">
					<div class="data-box colorF78">
						<span>125</span>所
						<p> 参与学校</p>
					</div>
				</li>
				<li>
					<img src="/f_resources/img/z-new/icon-student.png">
					<div class="data-box color179">
						<span>3456</span>人
						<p> 学生人数</p>
					</div>
				</li>
				<li>
					<img src="/f_resources/img/z-new/icon-book.png">
					<div class="data-box color3cd">
						<span>5345</span>本
						<p> 图书资源</p>
					</div>
				</li>
				<li>
					<img src="/f_resources/img/z-new/icon-area.png">
					<div class="data-box colorD67">
						<span>1253</span>
						<p> 参与区县</p>
					</div>
				</li>
				<li>
					<img src="/f_resources/img/z-new/icon-teacher.png">
					<div class="data-box color21D">
						<span>5345</span>人
						<p> 教师人数</p>
					</div>
				</li>
				<li>
					<img src="/f_resources/img/z-new/icon-school.png">
					<div class="data-box colorFEC">
						<span>5345</span>道
						<p> 测评题库</p>
					</div>
				</li>
			</ul>
		</div>
		<!--活跃量 -->
		<div>
			<h2>活跃量</h2>
			<div id="active"></div>
		</div>
		<!--大数据分析报告-->
		<div id="reports">
			<a href="javascript:;">
				大数据分析报告 <span class="icon-right"></span>
			</a>
		</div>
	</div>
	<!--数据统计 end -->
	<!--排行版 start-->
	<div class="ranking-wrap">
		<div class="ranking-list">
			<h2>排行版</h2>
			<p>统计周期为最近30天的数据</p>
			<ul class="rankings">
				<li>
					<h3 class="title">区/县排行榜（top10)</h3>
					<div class="table-wrap">
						<table>
							<thead>
							<tr>
								<td width="20%">排序</td>
								<td width="50%">区/县名称</td>
								<td width="30%">活跃量</td>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td><img src="/f_resources/img/z-new/first.png"></td>
								<td>城南区</td>
								<td>52000</td>
							</tr>
							<tr>
								<td><img src="/f_resources/img/z-new/second.png"></td>
								<td>城南区城南区城南区城南区城南区城南区城南区城南区城南区11</td>
								<td>52000</td>
							</tr>
							<tr>
								<td><img src="/f_resources/img/z-new/third.png"></td>
								<td>城南区</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>4</td>
								<td>城南区</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>5</td>
								<td>城南区</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>6</td>
								<td>城南区</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>7</td>
								<td>城南区</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>8</td>
								<td>城南区</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>9</td>
								<td>城南区</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>10</td>
								<td>城南区</td>
								<td>52000</td>
							</tr>
							</tbody>
						</table>
					</div>
				</li>
				<li>
					<h3 class="title">学校排行榜（top10)</h3>
					<div class="table-wrap">
						<table>
							<thead>
							<tr>
								<td width="20%">排序</td>
								<td width="50%">学校名称</td>
								<td width="30%">活跃量</td>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td><img src="/f_resources/img/z-new/first.png"></td>
								<td>莆田市第一中学</td>
								<td>52000</td>
							</tr>
							<tr>
								<td><img src="/f_resources/img/z-new/second.png"></td>
								<td>莆田市第一中学</td>
								<td>52000</td>
							</tr>
							<tr>
								<td><img src="/f_resources/img/z-new/third.png"></td>
								<td>莆田市第一中学</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>4</td>
								<td>莆田市第一中学</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>5</td>
								<td>莆田市第一中学</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>6</td>
								<td>莆田市第一中学</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>7</td>
								<td>莆田市第一中学</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>8</td>
								<td>莆田市第一中学</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>9</td>
								<td>莆田市第一中学</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>10</td>
								<td>莆田市第一中学</td>
								<td>52000</td>
							</tr>
							</tbody>
						</table>
					</div>
				</li>
				<li>
					<h3 class="title">喜爱图书榜（top10)</h3>
					<div class="table-wrap">
						<table>
							<thead>
							<tr>
								<td width="20%">排序</td>
								<td width="50%">资源名称</td>
								<td width="30%">已读人数</td>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td><img src="/f_resources/img/z-new/first.png"></td>
								<td>国王的靴子</td>
								<td>52000</td>
							</tr>
							<tr>
								<td><img src="/f_resources/img/z-new/second.png"></td>
								<td>国王的靴子</td>
								<td>52000</td>
							</tr>
							<tr>
								<td><img src="/f_resources/img/z-new/third.png"></td>
								<td>国王的靴子</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>4</td>
								<td>国王的靴子</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>5</td>
								<td>国王的靴子</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>6</td>
								<td>国王的靴子</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>7</td>
								<td>国王的靴子</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>8</td>
								<td>国王的靴子</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>9</td>
								<td>国王的靴子</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>10</td>
								<td>国王的靴子</td>
								<td>52000</td>
							</tr>
							</tbody>
						</table>
					</div>
				</li>
				<li>
					<h3 class="title">学生排行榜（top10)</h3>
					<div class="table-wrap">
						<table>
							<thead>
							<tr>
								<td width="20%">排序</td>
								<td width="50%">学生名称</td>
								<td width="30%">有效阅读量（本）</td>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td><img src="/f_resources/img/z-new/first.png"></td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							<tr>
								<td><img src="/f_resources/img/z-new/second.png"></td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							<tr>
								<td><img src="/f_resources/img/z-new/third.png"></td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>4</td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>5</td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>6</td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>7</td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>8</td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>9</td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>10</td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							</tbody>
						</table>
					</div>
				</li>
				<li>
					<h3 class="title">教师排行榜（top10)</h3>
					<div class="table-wrap">
						<table>
							<thead>
							<tr>
								<td width="20%">排序</td>
								<td width="50%">学生名称</td>
								<td width="30%">任务发布量（条）</td>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td><img src="/f_resources/img/z-new/first.png"></td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							<tr>
								<td><img src="/f_resources/img/z-new/second.png"></td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							<tr>
								<td><img src="/f_resources/img/z-new/third.png"></td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>4</td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>5</td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>6</td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>7</td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>8</td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>9</td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>10</td>
								<td>
									<span>钟旭</span>
									<span class="color666">莆田市第一中学</span>
								</td>
								<td>52000</td>
							</tr>
							</tbody>
						</table>
					</div>
				</li>
				<li>
					<h3 class="title">读后感榜（top10)</h3>
					<div class="table-wrap">
						<table>
							<thead>
							<tr>
								<td width="20%">排序</td>
								<td width="50%">资源名称</td>
								<td width="30%">读后感量</td>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td><img src="/f_resources/img/z-new/first.png"></td>
								<td>国王的靴子</td>
								<td>52000</td>
							</tr>
							<tr>
								<td><img src="/f_resources/img/z-new/second.png"></td>
								<td>我有友情要出租</td>
								<td>52000</td>
							</tr>
							<tr>
								<td><img src="/f_resources/img/z-new/third.png"></td>
								<td>我有友情要出租</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>4</td>
								<td>我有友情要出租</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>5</td>
								<td>我有友情要出租</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>6</td>
								<td>我有友情要出租</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>7</td>
								<td>我有友情要出租</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>8</td>
								<td>我有友情要出租</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>9</td>
								<td>我有友情要出租</td>
								<td>52000</td>
							</tr>
							<tr>
								<td>10</td>
								<td>我有友情要出租</td>
								<td>52000</td>
							</tr>
							</tbody>
						</table>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<!--排行版 end-->
	<!--footer-->
	<footer>
		<p>COPYRIGHT © basicedu.chaoxing.com ALL RIGHTS RESERVED. | 京ICP备 13046642号-2</p>
	</footer>
</div>
<script src="${ctx}/f_resources/js/jquery.min.js"></script>
<script src="${ctx}/f_resources/js/swiper.min.js"></script>
<script src="${ctx}/f_resources/js/echarts.min.js"></script>
<script src="${ctx}/f_resources/js/main.js"></script>
<script>
    $(function () {
        bannerInit();
        active();
    });
    // swiper初始化
    function bannerInit() {
        var mySwiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: 3000,
            pagination: '.swiper-pagination'
        })
    }
    //活跃量的图表‘
    function active() {
        var thisData = {
            week: ['01-08', '01-09', '01-10', '01-10', '01-11', '01-12', '01-13', '01-14'],
            count: [2000, 6340, 8458, 3460, 6550, 8742, 4000, 5000]
        };
        option = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: "rgba(255,255,255,1)",
                padding: 10,
                formatter: '{c}人',
                position:'top',
                textStyle:{
                    color:'#42A5FF'
                },
                extraCssText:'box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14);',
                axisPointer:{
                    lineStyle:{
                        color:'#E4F2FF'
                    }
                }
            },
            xAxis: {
                type: 'category',
                data: thisData.week,
                splitLine: {
                    show: false,
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    color:"#999"
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                name:'人数',
                nameGap:'25',
                nameTextStyle:{
                    color:"#999",
                    padding:[0,40,0,0]
                },
                axisLabel: {
                    formatter: '{value}',
                    color:"#999"
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    color: '#eee'
                },
                axisTick: {
                    show: false
                }
            },
            grid: {
                x: '80',
                width: '90%',
                height: '75%'
            },
            series: [
                {
                    name: '人数',
                    type: 'line',
                    data: thisData.count,
                    symbol: 'none',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: '#42A5FF',
                                width: 3
                            }
                        }
                    }
                }
            ]
        };
        var myChart = echarts.init(document.getElementById('active'));
        myChart.setOption(option);
    }
</script>
</body>
</html>