function init(){
	
}

function publishMission(resId) {
	//取得班级列表
	var classArray = new Array();
	var classChk = document.getElementsByName("classChk");
	for(var i = 0; i < classChk.length; i++){
    	if(classChk[i].checked){
    		classArray.push(classChk[i].value);
    	}
	} 
    if (classArray.length == 0) {
    	alert("请选择班级");
    	return;
    }
    var classIdsStr = classArray.join(",");
    //取得截止时间
    var endTime = $('#endTime').val();
    
	$.ajax({
		url : ctx + "/front/mission/publishMission",
		type : "post",
		async : false,
		data : {
			"resId": resId,
			"classIdsStr" : classIdsStr,
			"endTime" : endTime
		},
		success : function(json, arg, response) {
			alert(json);
		},
		error : function() {
			alert("通讯失败");
		}
	});
}