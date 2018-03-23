<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="/resources/include/taglib.jsp" %>
<c:if test="${listpg.size() > 1}">
<c:if test="${page == 1}">
    <span class="disabled"><i class="icon-chevron-right"></i></span>
</c:if>
<c:if test="${page > 1}">
    <a href="javascript:void(0)" onclick="previousFn();"><span class="disabled"><i class="icon-chevron-right"></i></span></a>
</c:if>
<c:if test="${page >= 4}">
    <a href="javascript:void(0)" onclick="goFn2(1)">1</a>
</c:if>
<c:forEach items="${listpg}" varStatus="status" var="pg">
    <c:if test="${pg lt page}">
        <a href="javascript:void(0)" onclick="goFn2(${pg})">${pg}</a>
    </c:if>
    <c:if test="${pg eq page}">
        <span class="current" onclick="goFn2(${page})">${pg}</span>
    </c:if>
    <c:if test="${pg gt page && pg lt page+5}">
        <a href="javascript:void(0)" onclick="goFn2(${pg})">${pg}</a>
    </c:if>
    <c:if test="${pg == page+5}">
        ...
    </c:if>
</c:forEach>
<c:if test="${listpg.size() > 1}">
    <a href="javascript:void(0)" onclick="nextFn();" class="arrow"><i class="icon-chevron-right"></i></a>
</c:if>
<c:if test="${listpg.size() <= 1}">
    <span class="arrow"><i class="icon-chevron-right"></i></span>
</c:if>
</c:if>
<script type="text/javascript">
    var total='${totalpg}';
    // 分页方法
    function previousFn(){
        var pageNumber = $('input[name=pageNumber]').val();
        $('input[name=pageNumber]').val(pageNumber - 1);
        mySubmit();
    }

    function nextFn(){
        var pageNumber = $('input[name=pageNumber]').val();
    	if(parseInt(pageNumber) < parseInt(total)){
        $('input[name=pageNumber]').val(parseInt(pageNumber) + 1);
        mySubmit();
    	}
    }

    function goFn2(pageNumer){
        if (pageNumer == '') {
            pageNumer = 1;
        }
        $('input[name=pageNumber]').val(pageNumer);

        mySubmit();
    }
</script>