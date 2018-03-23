<%@ page contentType="text/html;charset=UTF-8" %>

<html>
<head>
	<meta charset="utf-8" />
	<title>异常页面</title>
	<style type="text/css">
		.yichang{
			text-align: center;
			margin-top: 300px;
		}
		.yichang a{
			color: #0d8ef5;

		}
	</style>
</head>
<body>

<!--无权限页面-->
<div class="yichang " id="noLimits">
	<img src="/resources/img/noLimit.png"/>
	<p>抱歉！无权限访问...</p>
	<a  href="javascript:;" onclick="history.go(-1)">返回</a>
</div>
</body>
</body>
</html>