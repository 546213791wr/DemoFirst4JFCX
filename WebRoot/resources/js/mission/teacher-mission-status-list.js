function init(){
	var firstClassId = $('#firstClassId').val();
	var firstClassName = $('#firstClassName').val();
	var missionId = $('#missionId').val();
	changeListByClassId(firstClassId, firstClassName, missionId);
}

/**
 * 更新任务截止时间
 * @param missionId
 */
function changeListByClassId(classId, className, missionId) {
	$('#classNameShow').html(className + "<i class=\"icon-10\"></i>");
	$('#missionTitleH5').html(className + "完成情况");
    $.ajax({
		url : ctx + "/front/mission/findMissionListByClassIdAndMissionId",
		type : "post",
		async : false,
		data : {
			"classId": classId,
			"missionId" : missionId
		},
		success : function(json, arg, response) {
			var jsonList = eval(json);
			var tableVar = "";
			for (var i = 0; i < jsonList.length; i++) {
				var publishStatus = jsonList[i].publishStatus == 1 ? "正常":"已关闭";
				var resStatus = jsonList[i].resStatus == 3 ? "100%" : "0%";
				tableVar += "<tr>"
						+ "<td>" + (parseInt(i) + 1) + "</td>"
						+ "<td><img src=\"http://photo.fanya.chaoxing.com/p/" + jsonList[i].fanyaUserId + "_80\"> <span>" + jsonList[i].fanyaUserName + "</span></td>"
						+ "<td>" + jsonList[i].endTime + "</td>"
						+ "<td>" + publishStatus + "</td>"
						+ "<td>" + resStatus + "</td>"
						+ "<td><a href=\"#\">查看阅读报告</a></td>"
					+ "</tr>";
			}
			$('#missionStatusTable').html(tableVar);
		},
		error : function() {
			alert("通讯失败");
		}
	});
}

function toReport() {
	var perReadingNum = $('#perReadingNumDiv').html();
	if (perReadingNum == '0.0') {
		layer.msg("该班级暂无阅读数据，暂不能查看分析报告！");
		return;
	}
	var classId = $("#firstClassId").val();
	window.location = ctx + '/front/teacherClass/showByClassId/'+classId;
}


