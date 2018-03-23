<%@ page contentType="text/html;charset=UTF-8" isErrorPage="true" %>
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
	<script language="javascript">
        function showDetail()
        {
            var elm = document.getElementById('detail_system_error_msg');
            if(elm.style.display == '') {
                elm.style.display = 'none';
            }else {
                elm.style.display = '';
            }
        }
	</script>
</head>
<body>

<div class="yichang " id="505">
	<img src="/resources/img/505.png"/>
	<p onclick="showDetail();">错误代码500，发生未知错误...</p>
	<a  href="javascript:;" onclick="history.go(-1)">返回</a>
	<div id="detail_system_error_msg" style="display:none">
		<pre><%exception.printStackTrace(new java.io.PrintWriter(out));%></pre>
	</div>
</div>
</body>
</html>