function login(){
	$("#loginform").submit();
}


function showTab1(){
	$("#tab1").show();
	$("#tab_1").show();
	$("#tab_2").hide();
	$("#tab1").attr("class","active");
	$("#tab2").attr("class","");
}
function queryTab1(){
 	//document.getElementById("myform1").submit();
// 	$.ajax({
//	 	type: "post",
//	 	async:false,
//	    contentType:'application/x-www-form-urlencoded;charset=utf-8',
//	  	url: "/management/orgInfoIndex.do",
//	 	dataType: "text",
//	 	success: function(data) {
//	 		alert();
//	 	}
//	 });
 	
	showTab1();
}

function showTab2(){
	$("#tab2").show();
	$("#tab_2").show();
	$("#tab_1").hide();
	$("#tab2").attr("class","active");
	$("#tab1").attr("class","");
}

function queryTab2(){
	//document.getElementById("myform2").submit(); 
	showTab2();
}

function modifyOrgInfo(orgid){
	var newOrgName = $("#orgname").val();
	///alert(newOrgName);
	$.ajax({
	 	type: "post",
	 	async:true,
	    contentType:'application/x-www-form-urlencoded;charset=utf-8',
	    data: '&newOrgName='+newOrgName+'&orgid='+orgid,
	  	url: "/management/modifyOrgInfo.do",
	 	dataType: "text",
	 	success: function(data) {
	 		if(data=='000000'){
	 			alert("机构名称修改成功");
	 		}else{
	 			alert("机构名称修改失败");
	 		}
	 	},
	 	error: function () {
	 		alert("机构名称修改失败");
        }
	 });
}

function addmachine(){
	/*var newOrgName = $("#orgname").val();
	///alert(newOrgName);
	$.ajax({
	 	type: "post",
	 	async:true,
	    contentType:'application/x-www-form-urlencoded;charset=utf-8',
	    data: '&newOrgName='+newOrgName,
	  	url: "/management/addmachinetmp.do",
	 	dataType: "text",
	 	success: function(data) {
	 		if(data=='000000'){
	 			alert("机构名称修改成功");
	 		}else{
	 			alert("机构名称修改失败");
	 		}
	 	},
	 	error: function () {
	 		alert("机构名称修改失败");
        }
	 });*/
	
	var strVar = "";
    strVar += "<tr>";
    strVar += "                      <td><input type=\"text\" value=\"\"/><\/td>";
    strVar += "                      <td><span class=\"false\">未激活<\/span><\/td>";
    strVar += "                      <td class=\"center\">";
    strVar += "                        <form action=\"#\" method=\"get\" class=\"form-horizontal\">";
    strVar += "                            <div class=\"control-group\">";
    strVar += "                              <div class=\"controls none\">";
    strVar += "                                <select >";
    strVar += "                                  <option>小学版<\/option>";
    strVar += "                                  <option>初中版<\/option>";
    strVar += "                                  <option>高中版<\/option>";
    strVar += "                                <\/select>";
    strVar += "                              <\/div>";
    strVar += "                            <\/div>";
    strVar += "                        <\/form>";
    strVar += "                      <\/td>";
    strVar += "                      <td class=\"center\">";
    strVar += "                        <a class=\"btn btn-success btn-mini\" href=\"#\">激活<\/a>";
    strVar += "                      <\/td>";
    strVar += "                    <\/tr>";
    
	////var tmphtml = $("#yyy").html();
	
	////alert(tmphtml);
	
	//////tmphtml = strVar+tmphtml;
	//alert(tmphtml);
	////$("#yyy").html(tmphtml);
	$("#yyy").append(strVar);
}

//机器激活
function activemachine(){
	var newOrgName = $("#orgname").val();
	$.ajax({
	 	type: "post",
	 	async:true,
	    contentType:'application/x-www-form-urlencoded;charset=utf-8',
	    data: '&newOrgName='+newOrgName,
	  	url: "/management/activemachine.do",
	 	dataType: "text",
	 	success: function(data) {
	 		if(data=='000000'){
	 			alert("激活成功");
	 		}else{
	 			alert("激活失败");
	 		}
	 	},
	 	error: function () {
	 		alert("激活失败");
        }
	 });
}