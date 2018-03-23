<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="/resources/include/taglib.jsp" %>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>莆田市大数据报告</title>
	<style>
		*{
			margin: 0;
			padding: 0;
		}
		.main{
			font-size: 0;
		}
		.main img{
			width: 100%;
			border:none;
		}
		.links{
			position: relative;
		}
		.links>a{
			position: absolute;
			top:1120px;
			width: 94px;
			height: 530px;
			/*border:1px solid red;*/
		}
		.left{
			left:568px;
		}
		.right{
			right:178px;
		}
	</style>
</head>
<body>
<div class="container" style="background-color:#e9f0f6;">
	<div style="width: 100%;background-color:#fff;text-align: center">
		<img style="width:1440px;margin: 0 auto" src="/read-pt/img/reports/head.png">
	</div>
	<div class="main links" style="width: 1440px; background-color:#fff;margin: 0 auto">
		<img src="/read-pt/img/reports/city.png">
		<a class="left" href="/front/pt-index/countyReport" target="_blank"></a>
		<a class="right" href="/front/pt-index/schoolReport" target="_blank"></a>
	</div>
</div>
</body>
</html>