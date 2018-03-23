/**
 * 
 */
$(document).ready(function() {
	var resId = $("#resId").val();
	$("#allQuestion").load("ajax-search-allquestion?resId=" + resId);
	$("#teacherQuestion").load("ajax-teacherQuestion?resId=" + resId);
})
//过程动画
function loading(msg){
    if(msg == null || msg == ''){
        msg = "正在处理";
    }
    var layerIndex = layer.msg(msg, {icon: 16, shade: 0.3, shadeClose: false, time: 0});
    return layerIndex;
}
function search(dimensionId, resId) {
	loading("加载中...");
	$("#allQuestion").load(
			 "/front/question/ajax-search-allquestion?resId=" + resId
					+ "&dimensionId=" + dimensionId);
}
function searchall(resId) {
	loading("加载中...");
	$("#allQuestion").load(
			 "/front/question/ajax-search-allquestion?resId=" + resId);
}
function deleteQuestion(id, resId) {
	layer.confirm('是否确定删除？', {
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		$.ajax({
			url :  '/front/question/' + id +'/'+ resId+'/delete',
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

}

function addQuestion(resId) {
	var content = $("#content").val();
	var option4 = $("#option4").val();
	var option3 = $("#option3").val();
	var option2 = $("#option2").val();
	var option1 = $("#option1").val();
	var radio = $('input:radio[name="isRight"]:checked').val();
	var select = $('select[name="dimensionId"]').val();
	if (content == null || content == "") {
		$("#icon2").show();
		$("#validate2").show();
		return;
	} else {
		$("#icon2").hide();
		$("#validate2").hide();
	}
	if (option4 == null || option3 == null || option2 == null
			|| option1 == null || option4 == "" || option3 == ""
			|| option2 == "" || option1 == "") {
		$("#icon2").show();
		$("#validate3").show();
		return;
	} else {
		$("#icon2").hide();
		$("#validate3").hide();
	}
	if (radio == null || radio == "") {
		$("#icon2").show();
		$("#validate4").show();
		return;
	} else {
		$("#icon2").hide();
		$("#validate4").hide();
	}
	if (select == null || select == "") {
		$("#icon2").show();
		$("#validate5").show();
		return;
	} else {
		$("#icon2").hide();
		$("#validate5").hide();
	}

	var url;
	var questionId = $("#questionId").val();
	if (questionId == null) {
		url = '/front/question/add?resId=' + resId;
	} else {
		url = '/front/question/add?resId=' + resId + '&questionId='
				+ questionId;
	}
	var data = $("#question").serialize();
	$.ajax({
		url : url,
		data : data,
		method : 'post',
		dataType : 'text',
		success : function(json) {
			var data1 = JSON.parse(json);
			if (data1.code == 1) {
				layer.msg("操作成功");
				popDown();
				loading("加载中...");
				$("#teacherQuestion").load(
						 "/front/question/ajax-teacherQuestion?resId="
								+ resId);
			} else {
				layer.msg("操作失败");
			}
		},
		error : function() {
			layer.msg("error");
		}
	})

}
// 清空彈出框
function clear() {
	$("#content").val("");
	$("#analysis").val("");
	$("#questionId").val("");
	$("#option4").val("");
	$("#option3").val("");
	$("#option2").val("");
	$("#option1").val("");
	var ops = document.getElementById("dimensionId");
	ops.options[0].selected = 'selected';
	$("input[name='isRight']").get(0).checked = false;
	$("input[name='isRight']").get(1).checked = false;
	$("input[name='isRight']").get(2).checked = false;
	$("input[name='isRight']").get(3).checked = false;

}
// 打开题目新增弹窗
function questionLayer() {
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
	clear();
	$("#validate1").hide();
	$("#validate2").hide();
	$("#validate3").hide();
	$("#validate4").hide();
	$("#validate5").hide();
	$("#icon1").hide();
	$("#icon2").hide();
}
//
/*
 * function validateQuestion(){ var content=$("#content").val(); var
 * option4=$("#option4").val(); var option3=$("#option3").val(); var
 * option2=$("#option2").val(); var option1=$("#option1").val(); var
 * radio=$('input:radio[name="isRight"]:checked').val(); var
 * select=$('select[name="dimensionId"]').val(); if(radio==null||radio==""){
 * $("#icon2").show(); $("#validate4").show(); return ; }else
 * if(select==null||select==""){ $("#icon2").show(); $("#validate5").show();
 * return ; }else if(content==null||content==""){ $("#icon2").show();
 * $("#validate2").show(); return ; }else
 * if(option4==null||option3==null||option2==null||option1==null||option4==""||option3==""||option2==""||option1==""){
 * $("#icon2").show(); $("#validate3").show(); return ; } }
 */
function validate1() {
	var content = $("#content").val();
	if (content == null || content == "") {
		$("#icon2").show();
		$("#validate2").show();
		$("#validate3").hide();
		$("#validate4").hide();
		$("#validate5").hide();
	} else {
		$("#icon2").hide();
		$("#validate2").hide();
	}
}
function validate2() {
	var option = $("#option1").val();
	if (option == null || option == "") {
		$("#icon2").show();
		$("#validate3").show();
		$("#validate2").hide();
		$("#validate4").hide();
		$("#validate5").hide();
	} else {
		$("#icon2").hide();
		$("#validate3").hide();
	}

}
function validate3() {
	var option = $("#option2").val();
	if (option == null || option == "") {
		$("#icon2").show();
		$("#validate3").show();
		$("#validate2").hide();
		$("#validate4").hide();
		$("#validate5").hide();
	} else {
		$("#icon2").hide();
		$("#validate3").hide();
	}

}
function validate4() {
	var option = $("#option3").val();
	if (option == null || option == "") {
		$("#icon2").show();
		$("#validate3").show();
		$("#validate2").hide();
		$("#validate4").hide();
		$("#validate5").hide();
	} else {
		$("#icon2").hide();
		$("#validate3").hide();
	}

}
function validate5() {
	var option = $("#option4").val();
	if (option == null || option == "") {
		$("#icon2").show();
		$("#validate3").show();
		$("#validate2").hide();
		$("#validate4").hide();
		$("#validate5").hide();
	} else {
		$("#icon2").hide();
		$("#validate3").hide();
	}

}
function validate6() {
	var select = $('select[name="dimensionId"]').val();
	if (select == null || select == "") {
		$("#icon2").show();
		$("#validate5").show();
		$("#validate2").hide();
		$("#validate4").hide();
		$("#validate3").hide();
		return;
	} else {
		$("#icon2").hide();
		$("#validate5").hide();
	}
}
