/*阅读系统--图书简介--文本展开*/
			$(function() { //显示三行 多余隐藏 点击展开
					$(".detail_txt_intro").click(function() {
						$(this).children(0).removeClass("detail_txt_intro_intro");
						$(this).children(".detail_txt_intro_open").html("").addClass("detail_txt_intro_close");
						$(this).siblings(".test").removeClass("detail_txt_intro_open");
					});
					$(".detail_txt_intro_close").click(function() {
						$(this).siblings("span").addClass("detail_txt_intro_intro");
						$(".test").removeClass("detail_txt_intro_close");
						$(this).html("展开全部");
					});
					
					/*读后感--省略*/
					$(".bookItro_read_list_txt").click(function() {
						$(this).children(0).removeClass("bookItro_read_list_txt_txt");
						$(this).children(".detail_txt_intro_open").html("").addClass("detail_txt_intro_close1");
						$(this).siblings("span").removeClass("detail_txt_intro_open");
					});
					
					$(".detail_txt_intro_close1").click(function(){
						$(this).siblings("span").addClass("bookItro_read_list_txt_txt");
						$(this).html("展开全部");
					});

				});
				/*点击事件*/
			function changeColor(a) {
				if($(a).children("i").hasClass("activeGreen") == true) {
					$(a).children("i").removeClass("activeGreen");
					
				} else {
					$(a).children("i").addClass("activeGreen");
				}
			}
				/*收藏--点击事件*/
			function changeCollect(a) {
				if($(a).children("i").hasClass("activeLove") == true) {
					$(a).children("i").removeClass("activeLove");
					$(".cancelCollect_popUp").css("display","block");
					
				} else {
					$(a).children("i").addClass("activeLove");
				}
			}
			/*这里是测试的*/
			/*$(".noRead").click(function() {
				$(this).css("display", "none");
				$(".hasRead").css("display", "block");
		
			});*/
/*读后感点击出现弹窗*/
function popUp(id){
	$(".noRead_popUp").css("display","block");
	$.ajax({
		url : "/front/report/editeBookReport",
		type : "post",
		async : false,
		data : {
			id : id
		},
		success : function(json,arg,response) {
			var readReport = JSON.parse(response.responseText);
			var title = readReport.title;
			var content = readReport.content;
			$("#reportTitle").val(title);
			$("#reportContent").val(content);
		},
		error : function() {
			alert("修改失败！");
		}
	});
	$("#reportId").val(id);
}

function popUp1(id){
	$(".deleteRead_popUp").css("display","block");
	$("#reportId").val(id);
}

/**确定删除读后感*/
function deleteReport(){
	$(".deleteRead_popUp").css("display","none");
	var reportId = $("#reportId").val();
	var bookId = $("#bookId").val();
	var data = {bookId:bookId,reportId:reportId};
    $('#reportList').load("/front/report/deleteBookReport", data);
}
function popUp3(){
	$(".planTo_popUp").css("display","block");
}
/*测评页面的弹窗*/
/*未参与*/
function popUp4(resId){
	$(".start_popUp").css("display","block");
	$(".start_popUp .popUpCon3 .fontBlue").css("color","#1b80f1");
	$(".start_popUp .popUpCon3 .fontBlue").html("未参与测评");
	$(".start_popUp .popUpCon3 .popUpCon3_btn a.greenBg").html("开始测评");
	$("#noPassStar").remove();
	$("#nopassa1").remove();
	$("#nopassa2").remove();
	$.ajax({
		url:'/front/stuEvaluate/'+resId+'/toResPop',
		method:'post',
		async:false,
		success:function(json){
			var data=json.data.res;
			$("#noPassResName").html(data.resName);
			var div=$("#noPassdegree");
			var ul=$("#nopassUl");
			var li='<li id="noPassStar">';
			for(var i=0;i<data.level;i++){
				li+='<img src="/f_resources/img/icon_star1.png">';
			}
			li+='</li>';
			ul.append(li);
			
			var a=$("#noPassA");
			var a1='<a href="#" id="nopassa1" class="greenBorder" onclick="addPlan('+data.id+')">加入阅读任务</a>';
		    var a2='<a href="#" id="nopassa2" class="greenBg" onclick="popDown('+data.id+')">开始测评</a>';
		    a.append(a1);
		    a.append(a2);
		}
	})
}
function popUp5(){
	$(".start_popUp").css("display","block");
	$(".start_popUp .popUpCon3 .popUpCon3_btn a.greenBg").html("再测一次");
	$(".start_popUp .popUpCon3 .fontBlue").html("未通过测评");
	$(".start_popUp .popUpCon3 .fontBlue").css("color","#fd6951");
}
function popDown(){
	$(".noRead_popUp").css("display","none");
	$(".deleteRead_popUp").css("display","none");
	$(".planTo_popUp").css("display","none");
	$(".start_popUp").css("display","none");
	$(".cancelCollect_popUp").css("display","none");
	$(".passed_popUp").css("display","none");
	$("#resId").val("");
}

/*测评页面的弹窗*/
/*已通过*/
function passedPop(resId){
	$(".passed_popUp").css("display","block");	
	$("#star").remove();
	$("#a1").remove();
	$("#a2").remove();
	
	$.ajax({
		url:'/front/stuEvaluate/'+resId+'/toResPop',
		method:'post',
		async:false,
		success:function(json){
			var data=json.data.res;
			$("#resName").html(data.resName);
			var div=$("#degree");
			var ul=$("#ul");
			var li='<li id="star">';
			for(var i=0;i<data.level;i++){
				li+='<img src="/f_resources/img/icon_star1.png">';
			}
			li+='</li>';
			ul.append(li);
			if(data.status!=null&&data.status<3){
				$("#passcontent").html("太棒了！你已经通过了测评！");	
			}
			var a=$("#passA");
			var a1='<a id="a1" href="#" onclick="passedPop('+data.id+')" class="greenBorder" >再测一次</a>';
		    var a2='<a id="a2" href="#" class="greenBg" onclick="lookAnswer('+data.id+')">查看答案</a>';
		    a.append(a1);
		    a.append(a2);
		   
		}
	})
	
}
/*未参与*/
/*popUp4*/
/*加入阅读任务*/
function addPlan(resId){
	$(".planTo_popUp").css("display","block");
	$(".start_popUp").css("display","none");
	var endTime=$("#dt").val("");
	$("#day").attr("checked",false);
	$("#week").attr("checked",false);
	$("#month").attr("checked",false);
	$("#missionSubmit").remove();
	var addMission=$("#addMission");
	var missionSubmit='<a href="#" id="missionSubmit" class="deleteConfirm greenBg" onclick="addPlanYes('+resId+')">确定</a>';
	addMission.append(missionSubmit); 
	
}
/*测评---计划时间弹窗*/
function addPlanYes(resId){
	$(".cepingInfo").show();
	$(".cepingInfo span").html("加入新任务！");
	$(".planTo_popUp").hide(1000);
	setTimeout(function(){
		$(".cepingInfo").hide();
	},2000);//持续2秒
	
	var enddate;
	var endTime=$("#dt").val();
	var val=$('input:radio[name="days"]:checked').val();   
	if(endTime==""){
		endTime=null;
	}
	if(val==""){
		endTime=null;
	}
	if(endTime!=null&&val!=null){
		alert("日期和快捷设置不能同时选择！");
		return;
	}
	if(endTime==null&&val==null){
		alert("日期和快捷设置请选择一样！");
		return;
	}
	if(endTime!=null){
		enddate=endTime;
	}
	if(val!=null){
		enddate=val;
	}
	$.ajax({
		url:'/front/stuMission/addStuMission?resId='+resId+'&enddate='+enddate,
		method:'post',
		async:false,
		success:function(json){
			if(json.code==1){
				alert("添加任务成功！");
				popDown();
			}else{
				alert("操作失败！");
			}
		}
	})
}
/*未通过测评--弹窗*/
function noPass(resId){
	$(".start_popUp").show();
	$(".start_popUp .popUpCon3 .fontBlue").css("color","#fd6951");
	$(".start_popUp .popUpCon3 .fontBlue").html("未通过测评");
	$(".start_popUp .popUpCon3 .popUpCon3_btn a.greenBg").html("再测一次");
	$("#noPassStar").remove();
	$("#nopassa1").remove();
	$("#nopassa2").remove();
	$.ajax({
		url:'/front/stuEvaluate/'+resId+'/toResPop',
		method:'post',
		async:false,
		success:function(json){
			var data=json.data.res;
			$("#noPassResName").html(data.resName);
			var div=$("#noPassdegree");
			var ul=$("#nopassUl");
			var li='<li id="noPassStar">';
			for(var i=0;i<data.level;i++){
				li+='<img src="/f_resources/img/icon_star1.png">';
			}
			li+='</li>';
			ul.append(li);
			var a=$("#noPassA");
			var a1='<a href="#" id="nopassa1" class="greenBorder" onclick="addPlan('+data.id+')">加入阅读任务</a>';
		    var a2='<a href="#" id="nopassa2" class="greenBg" onclick="popDown('+data.id+')">开始测评</a>';
		    a.append(a1);
		    a.append(a2);
		}
	})
}

