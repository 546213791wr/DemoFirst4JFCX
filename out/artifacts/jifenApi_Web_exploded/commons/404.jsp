<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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

<!--404页面-->
<div class="yichang " id="404">
	<img src="/resources/img/404.png"/>
	<p>错误代码404，您访问的页面丢失了...</p>
	<a href="javascript:;" onclick="history.go(-1)">返回</a>
</div>

</body>
</html>