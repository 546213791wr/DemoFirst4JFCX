/**
 * 
 */
$(document).ready(function() {

})
/*function deleteQuestion(id, resId) {
	layer.confirm('是否确定删除？', {
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		$.ajax({
			url :  '/front/question/' + id + '/delete',
			methode : 'post',
			async : false,
			success : function(data) {
				var data = eval('(' + data + ')');
				if (data.code == 1) {

					layer.msg("删除成功！");
					$("#teacherQuestion").load(
							 "/front/question/ajax-teacherQuestion?resId="
									+ resId);
				} else {
					layer.msg("删除失败！");
				}
			}
		})
	}, function() {
		layer.close();
	});

}*/
function updateQuestion(id, resId) {
	$("#validate1").hide();
	$("#validate2").hide();
	$("#validate3").hide();
	$("#validate4").hide();
	$("#validate5").hide();
	$("#icon1").hide();
	$("#icon2").hide();
	var h = $(document).height();
	s = $(window).scrollTop();
	$("#popBg").css("height", h);
	$("#popBg").fadeIn(300);
	$("#popNav").fadeIn(300);
	$(window).scroll(function() {
		$(this).scrollTop(s)
	});
	$(document).bind("touchmove", function(e) {
		e.preventDefault();
	})
	$.ajax({
		url : '/front/question/getQuestionById?id=' + id,
		method : 'post',
		async : false,
		success : function(data) {
			var question = data.data.question;
			var options = data.data.question.listOptions;
			for (var i = 0; i < options.length; i++) {
				$("#option" + (i + 1)).val(options[i].content);
				if (options[i].isRight == 1) {
					$("input[name='isRight']").get(i).checked = true
				}
			}
			$("#content").val(question.content);
			$("#analysis").val(question.analysis);
			$("#questionId").val(question.id);
			//维度选中
			var ops = document.getElementById("dimensionId");
			var value = data.data.dimension.dimensionId//这个值就是你获取的值;  
			if (value != "") {
				for (var i = 0; i < ops.options.length; i++) {
					if (value == ops.options[i].value) {
						ops.options[i].selected = 'selected';
						break;
					}
				}
			}

		}

	})
}
