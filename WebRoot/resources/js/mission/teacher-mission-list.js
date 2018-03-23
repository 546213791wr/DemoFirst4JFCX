function init(){
	
}

function selectClass(id) {
	$('#nowClassId').val(id);
	$('#pageNumber').val(1);
	mySubmit();
}


function toReport() {
	var perReadingNum = $('#perReadingNumDiv').html();
	if (perReadingNum == '0.0') {
		layer.msg("该班级暂无阅读数据，暂不能查看分析报告！");
		return;
	}
	var classId = $("#nowClassId").val();
	window.location = ctx + '/front/teacherClass/show?classId='+classId;
}


function toGradeReport(){
	window.location = ctx + '/front/gradeReport/show';
}


function mySubmit() {
	var pageNumber = 1;
	if (typeof($('#pageNumber').val()) != 'undefined') 
		pageNumber = $('#pageNumber').val();
	var classId = 0;
	if (typeof($('#nowClassId').val()) != 'undefined') 
		classId = $('#nowClassId').val();
	var actionUrl = ctx + "/front/mission/toMissionStatuslist?pageNumber=" + pageNumber + "&classId=" + classId;
	window.location.href = actionUrl;
}

//分页方法
function previousFn(){
    var pageNumber = $('input[name=pageNumber]').val();
    $('input[name=pageNumber]').val(pageNumber - 1);
    mySubmit();
}

function nextFn(){
    var pageNumber = $('input[name=pageNumber]').val();
    $('input[name=pageNumber]').val(parseInt(pageNumber) + 1);
    mySubmit();
}

function goFn2(pageNumer){
    if (pageNumer == '') {
        pageNumer = 1;
    }
    $('input[name=pageNumber]').val(pageNumer);

    mySubmit();
}

function setUpdateMissionId(id) {
	$('#updateMissionId').val(id);
	$.ajax({
		url : ctx + "/front/mission/getClassNameByMissionId",
		type : "post",
		async : false,
		data : {
			"missionId": id
		},
		success : function(json, arg, response) {
			$('#updateClassName').html(json.replace("\"","").replace("\"",""));
		},
		error : function() {
			alert("通讯失败");
		}
	});
}
/**
 * 更新任务截止时间
 * @param missionId
 */
function updateMission() {
	var missionId = $('#updateMissionId').val();
    var endTime = $('#dt').val();
	$.ajax({
		url : ctx + "/front/mission/updateMission",
		type : "post",
		async : false,
		data : {
			"missionId": missionId,
			"endTime" : endTime
		},
		success : function(json, arg, response) {
			mySubmit();
		},
		error : function() {
			alert("通讯失败");
		}
	});
}

/**
 * 删除任务
 * @param missionId
 */
function deleteMission(missionId) {
	$.ajax({
		url : ctx + "/front/mission/shutMission",
		type : "post",
		async : false,
		data : {
			"missionId": missionId
		},
		success : function(json, arg, response) {
			mySubmit();
		},
		error : function() {
			alert("通讯失败");
		}
	});
}