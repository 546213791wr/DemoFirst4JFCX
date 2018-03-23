function init(){
	mySubmit();
	$('#missionNotPassUl').show();
}
var flag = 1;
function notPassListDD() {
	flag = 1;
	$('#tabA').html("");
	mySubmit();
}

function passListDD() {
	flag = 2;
	$('#tabA').html("");
	mySubmit();
}

function mySubmit() {
	var data = {};
//    $(this).find('input').each(function(){
//    	if($(this).attr('name') != '') {
//            data[$(this).attr('name')] = $(this).val();
//            alert($(this).val())
//        }
//    });
	var pageNumber = 1;
	if (typeof($('#pageNumber').val()) != 'undefined') 
		pageNumber = $('#pageNumber').val();
	if (flag == 1) {
		var actionUrl = ctx + "/front/stmission/toStudentMissionStatusListNotPass?pageNumber=" + pageNumber;
		$('#tabA').load(actionUrl, data);
	} else {
		var actionUrl = ctx + "/front/stmission/toStudentMissionStatusListPass?pageNumber=" + pageNumber;
		$('#tabA').load(actionUrl, data);
	}
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

