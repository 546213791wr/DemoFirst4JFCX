$(document).ready(function () {
	mySubmit()
})

function loading(msg){
    if(msg == null || msg == ''){
        msg = "正在处理";
    }
    var layerIndex = layer.msg(msg, {icon: 16, shade: 0.3, shadeClose: false, time: 0});
    return layerIndex;
}


/*
 * 通过图书分类搜索
 */

function searchByClassfy(obj) {
	$("#classify").find("a").each(function () {
		$(this).removeClass("current")
    })
	$(obj).addClass("current")
	$("#classifyId").val($(obj).attr("data-id"));
    mySubmit();
}

function searchByLevel(obj) {
    $("#classLevel").find("a").each(function () {
        $(this).removeClass("current")
    })
    $(obj).addClass("current")
    $("#level").val($(obj).attr("data-id"));
    mySubmit();
}

// 提交方法
function mySubmit(){
    $this = $("#searchForm");
    var actionUrl = $this.attr('action');
    var data = {};
    $this.find('input').each(function(){
    	if($(this).attr('name') != '' && $(this).attr('name') != undefined ) {
            data[$(this).attr('name')] = $(this).val();
        }
    });
    $this.find('select').each(function(){
        data[$(this).attr('name')] = $(this).val();
    });
    //alert(JSON.stringify(data));
    $("#globLoader").show();
    $('#list_book').html('');
    $('#list_book').load(actionUrl, data);
    setTimeout(function(){$("#globLoader").hide();},3000);
    return false;
}

// 分页方法
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
function searchByAllClassfy(obj) {
	$("#classify").find("a").each(function () {
		$(this).removeClass("current")
    })
	$(obj).addClass("current")
	$("#classifyId").val($(obj).attr("data-id"));
    mySubmit();
}
function teacherSerch(obj){
    $("#publish").find("a").each(function () {
		$(this).removeClass("current")
    })
	$(obj).addClass("current")
	$("#teacherPublsh").val($(obj).attr("data-id"));
    mySubmit();
	
}
function classSearch(obj){
    $("#class").find("a").each(function () {
        $(this).removeClass("current")
    })
    $(obj).addClass("current")

	var publish=$("#publish .current").attr("data-id");
	if(publish!=null&&publish!=0){
	    $("#classId").val($(obj).attr("data-id"));
	   mySubmit();
	}else{
		// layer.msg("请选择发布条件！");
	}
}
