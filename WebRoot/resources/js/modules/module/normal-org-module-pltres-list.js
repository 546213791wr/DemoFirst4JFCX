/**
 * 
 */
$(document).ready(function(){
	trHover();

    /**   carouselList    */
    $("#searchC").click(function(){
        var url = $("#searchForm2").attr("action");
        console.log($("#searchForm2").serializeObject());
        loadPage(url, null, $("#searchForm2").serializeObject());

    });

	/**   activityList    */
    $("#searchB").click(function(){

        var url = $("#searchForm1").attr("action");
        console.log($("#searchForm1").serializeObject());
        loadPage(url, null, $("#searchForm1").serializeObject());

    });

/**        allList           */
	//查询
	$("#searchA").click(function(){

		var url = $("#searchForm").attr("action");
		console.log($("#searchForm").serializeObject());
		
		loadPage(url, null, $("#searchForm").serializeObject());
		
	});



	/** 修改 禁用 状态*/
	$("a[data-name='disRes']").on('click',function(){

		var classifyResId = $(this).attr("data-crId");
		var classifyResStatus=$(this).attr("data-crStatus");
        var params={"classifyResId":classifyResId,"classifyResStatus":classifyResStatus};

        ajaxRequest(ctxPath +"/admin/pltresClassify/updatePltresClassifyRes", params, function(data){
            if(data.code==1){

                showSuccess("禁用成功", function(){
                    loadPage(ctxPath + "/admin/pltresClassify/allList");
                    closeAllLayer();

                });
            }else if("error" == data.msg){

                showError("出错");
            }else if("failure" == data.msg){

                showError("失败");
            }else{

                showError(data.msg);
            }
        }, function(){

            showError("出错");
        });
    });





	/** 删除 资源和分类的关联关系*/
	$("a[data-name='deleteRes']").click(function(){
        classifyResId = $(this).attr("data-classifyResId");
		confirm("确定删除该资源?", function(){
			var params = {"classifyResId": classifyResId};

			ajaxRequest(ctxPath +"/admin/pltresClassify/deletePltresClassifyRes", params, function(data){
				 if(data.code==1){

                	showSuccess("删除资源成功", function(){
                		loadPage(ctxPath +"/admin/pltresClassify/allList");
                		closeAllLayer();

                	});
                }else if("error" == data.msg){

                	showError("删除资源出错");
                }else if("failure" == data.msg){

                	showError("删除资源失败");
                }else{

                	showError(data.msg);
                }
			}, function(){

				showError("删除资源出错");
			});
		}, function(){

		});
	});

	/** 修改活动 */
    $("a[data-name='modifyActivity']").on('click',function(){

            var id=$(this).attr("data-id");
            var orgName=$(this).attr("data-orgName");
            var orgFid=$(this).attr("data-orgFid");
            loadPage(ctxPath + "/admin/pltresClassify/toUpdateActivity?id=" + id+"&orgName="+orgName+"&orgFid="+orgFid);
    });

    /** 删除 活动*/
    $("a[data-name='deleteActivity']").click(function(){
        id = $(this).attr("data-id");
        confirm("确定删除该活动?", function(){
            var params = {"id": id};

            ajaxRequest(ctxPath +"/admin/pltresClassify/deleteActivity", params, function(data){
                if(data.code==1){

                    showSuccess("删除活动成功", function(){
                        loadPage(ctxPath +"/admin/pltresClassify/activityList");
                        closeAllLayer();

                    });
                }else if("error" == data.msg){

                    showError("删除活动出错");
                }else if("failure" == data.msg){

                    showError("删除活动失败");
                }else{

                    showError(data.msg);
                }
            }, function(){

                showError("删除活动出错");
            });
        }, function(){

        });
    });





	/** 按钮切换*/
	$("#readResBtn").click(function () {
        if($("#readRes").css("display")=='none'){
            $("#readRes").css('display','block');
            $("#activityRes").css('display','none');
            $("#carouselRes").css('display','none');
            loadPage('/admin/pltresClassify/allList');
            $("#carouselRes").html('<jsp: include page="showRes.jsp"></jsp:>');
        }
    });
    $("#activityResBtn").click(function () {
        if($("#activityRes").css("display")=='none'){
            $("#readRes").css('display','none');
            $("#activityRes").css('display','block');
            $("#carouselRes").css('display','none');
            loadPage('/admin/pltresClassify/activityList');

        }
    });
    $("#carouselBtn").click(function () {
        if($("#carouselRes").css("display")=='none'){
            $("#readRes").css('display','none');
            $("#activityRes").css('display','none');
            $("#carouselRes").css('display','block');
            loadPage('/admin/pltresClassify/carouselList');
        }
    });

    $("#inputRes").click(function () {
        $("#fileDiv").css("display","block");
    });

    $("#fileForm").submit(function () {
        if($("#fileName").val() == ""){
            showError("请选择文件");
            return false;
        }
        ajaxForm(this, function (data) {
            if (data.code == 1) {
                showSuccess("导入成功", function () {
                    closeAllLayer();
                    $("#fileDiv").css("display","none");
                    $("#fileName").val("");
                });
            } else {
                showError(data.message);
            }
        }, function () {
            showError("导入失败");
        });
        return false;
    });

    $("#fileCloseBtn").click(function () {
        $("#fileDiv").css("display","none");
        $("#fileName").val("");
    });

    /** 轮播图添加按钮*/
    $("#addPicture").click(function () {
       var orgFid= $(".orgFid").val();
       var orgName=$(".orgName").val();
       loadPage(ctxPath+'/admin/pltresClassify/to-add-carousel?orgFid='+orgFid+'&orgName='+orgName);
    })

    /** 轮播图禁用*/
    $("a[data-name='status']").click(function(){

        var id = $(this).attr("data-id");
        var status=$(this).attr("data-status");
        var params = {"id": id,"status":status};

        ajaxRequest(ctxPath + "pltresClassify/update-carousel-status", params, function(data){
            if(data.code==1){
                showSuccess("成功", function(){
                    loadPage(ctxPath + "pltresClassify/carouselList");
                    closeAllLayer();
                });
            }else if("error" == data.msg){

                showError("出错");
            }else if("failure" == data.msg){

                showError("失败");
            }else{

                showError(data.msg);
            }
        }, function(){

            showError("出错");
        });

    })

    /** 修改图片 */
    $("a[data-name='modifyCarousel']").on('click',function(){

        var id=$(this).attr("data-id");
        var orgName=$(this).attr("data-orgName");
        var fid=$(this).attr("data-fid");
        loadPage(ctxPath + "/admin/pltresClassify/to-update-carousel?id=" + id+"&orgName="+orgName+"&fid="+fid);
    });

    /** 删除 图片*/
    $("a[data-name='deleteCarousel']").click(function(){
        id = $(this).attr("data-id");
        confirm("确定删除该图片?", function(){
            var params = {"id": id};
            ajaxRequest(ctxPath +"/admin/pltresClassify/delete-carousel", params, function(data){
                if(data.code==1){

                    showSuccess("删除图片成功", function(){
                        loadPage(ctxPath +"/admin/pltresClassify/carouselList");
                        closeAllLayer();

                    });
                }else if("error" == data.msg){

                    showError("删除图片出错");
                }else if("failure" == data.msg){

                    showError("删除图片失败");
                }else{

                    showError(data.msg);
                }
            }, function(){

                showError("删除图片出错");
            });
        }, function(){

        });
    });

});

/** 动态生成下拉框 */
function chooseOrg(params,fid,name){
    if(params==1){
        $("#resId").find("input[class='orgFid']").val(fid);
        $("#resId").find("input[class='orgName']").val(name);
        $("#resId").find("dl[class='query-list']").css('display','none');
    }

    if(params==2){
        $("#actId").find("input[class='orgFid']").val(fid);
        $("#actId").find("input[class='orgName']").val(name);
        $("#actId").find("dl[class='query-list']").css('display','none');
    }
    if(params==3){
        $("#carId").find("input[class='orgFid']").val(fid);
        $("#carId").find("input[class='orgName']").val(name);
        $("#carId").find("dl[class='query-list']").css('display','none');
    }

}

function getFirstModule() {
    var orgFid=$(".orgFid").val();
    var userTypeId=$("#userTypeId").val();
    if (userTypeId=="全部"){
        userTypeId="";
    }
    var ageGroupId=$("#ageGroupId").val();
    if (ageGroupId=="全部"){
        ageGroupId="";
    }
    if(orgFid!=''&&orgFid!=null&&userTypeId!=''&&userTypeId!=null&&ageGroupId!=''&&ageGroupId!=null){
        $("#moduleId").removeAttr("disabled");
        var transfer={"fid":orgFid,"ageGroupId":ageGroupId,"userTypeId":userTypeId};
        $.ajax({
            url : ctx + "/admin/module/getByFidAndAgeGroupIdAndUserTypeId",
            type : "POST",
            dataType:'json',
            data : transfer,
            success : function(data) {
                var htmls = "";
                if(data.data.list.length>0){
                    $.each(data.data.list, function (index, modules) {
                        htmls += "<option value='"+modules.id+"'>"+modules.name+"</option>";
                    });
                }else{
                    htmls += "<option value=''>无一级模块</option>";
                }
                $("#moduleId").html(htmls);
            },
            error : function() {
                alert("失败");
            }
        });
    }
}

function getChildModule(pid) {
	if(pid==null||pid==null){
		pid=$("#moduleId").val();
	}

	$("#topModuleId").val(pid);//向文件传输模块中一级模块ID中赋值

    var userTypeId=$("#userTypeId").val();
    var ageGroupId=$("#ageGroupId").val();
    if(pid!=''&&pid!=null){
        $("#childModuleId").removeAttr("disabled");
        $.ajax({
            url : ctx + "/admin/module/getByPidAndAgeGroupIdAndUserTypeId",
            type : "POST",
            dataType:'json',
            data : {"pid":pid,"ageGroupId":ageGroupId,"userTypeId":userTypeId},
            success : function(data) {
                var htmls = "";
                if(data.data.list.length>0){
                    $.each(data.data.list, function (index, modules) {
                        htmls += "<option value='"+modules.id+"'>"+modules.name+"</option>";
                    });
                }else{
                    htmls += "<option value=''>无二级模块</option>";
                }
                $("#childModuleId").html(htmls);
            },
            error : function() {
                alert("失败");
            }
        });


    }
}

function getClassify(childModuleId) {

    if(childModuleId==null||childModuleId==null){
        moduleId=$("#childModuleId").val();
    }
    if(moduleId!=''&&moduleId!=null){
        $("#classifyId").removeAttr("disabled");
        $.ajax({
            url : ctx + "/admin/pltresClassify/getByModuleId2",
            type : "POST",
            dataType:'json',
            data : {"moduleId":moduleId},
            success : function(data) {
                console.log(data.data);
                var htmls = "";
                if(data.data.list.length>0){
                    $.each(data.data.list, function (index, classify) {
                        htmls += "<option value='"+classify.id+"'>"+classify.name+"</option>";
                    });
                }else{
                    htmls += "<option value=''>无分类</option>";
                }
                $("#classifyId").html(htmls);
            },
            error : function() {
                alert("失败");
            }
        });


    }
}

function getGrade() {
    if($("#ageGroupId").val()!=''&&$("#ageGroupId").val()!=null){
        $("#gradeId").removeAttr("disabled");
        var htmls='';
        if($("#ageGroupId").val()==1){
            htmls+="<option value='' selected=\"selected\">"+"全部"+"</option>";
            htmls+="<option value='"+1+"'>"+"1年级"+"</option>";
            htmls+="<option value='"+2+"'>"+"2年级"+"</option>";
            htmls+="<option value='"+3+"'>"+"3年级"+"</option>";
            htmls+="<option value='"+4+"'>"+"4年级"+"</option>";
            htmls+="<option value='"+5+"'>"+"5年级"+"</option>";
            htmls+="<option value='"+6+"'>"+"6年级"+"</option>";
        }
        if($("#ageGroupId").val()==2){

            htmls+="<option value='' selected=\"selected\">"+"全部"+"</option>";
            htmls+="<option value='"+7+"'>"+"7年级"+"</option>";
            htmls+="<option value='"+8+"'>"+"8年级"+"</option>";
            htmls+="<option value='"+9+"'>"+"9年级"+"</option>";
        }
        if($("#ageGroupId").val()==3){
            htmls+="<option value='' selected=\"selected\">"+"全部"+"</option>";
            htmls+="<option value='"+10+"'>"+"10年级"+"</option>";
            htmls+="<option value='"+11+"'>"+"11年级"+"</option>";
            htmls+="<option value='"+12+"'>"+"12年级"+"</option>";
        }
        $("#gradeId").html(htmls);
    }
}




