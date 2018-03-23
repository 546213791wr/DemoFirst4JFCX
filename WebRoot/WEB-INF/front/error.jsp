<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="/resources/include/taglib.jsp" %>
<!doctype html>
<html>

	<head>
		<meta charset="utf-8" />
		<title>超星校园阅读系统</title>
		<link rel="stylesheet" href="${ctx}/f_resources/css/style.css?v=20180126">
		<link rel="stylesheet" href="${ctx}/f_resources/icomoon/style.css">
		<link rel="stylesheet" type="text/css" href="${ctx}/f_resources/css/bookIntro.css?v=20180126" />
		<link rel="stylesheet" type="text/css" href="${ctx}/f_resources/css/new.css?v=20180126" />
	</head>

	<body>
		<jsp:include page="/commons/header.jsp" />
		<!-- 异常页面 -->
		<section class="errorPage">
			<img class="" src="/f_resources/img/new/error.png" />
		</section>
		<%--<jsp:include page="/commons/footer.jsp" />--%>

		<script src="/f_resources/js/jquery.min.js?v=20180126"></script>
		<script src="/f_resources/js/main.js?v=20180126"></script>
		<script src="/f_resources/layer/layer.js?v=20180126"></script>

	</body>
<script>
	var windowHeight = document.body.clientHeight;
	$(".errorPage").css("height",windowHeight-74);
	</script>
</html>