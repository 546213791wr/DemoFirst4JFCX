/**
 *
 */
var questionArray=[];
var resId=$("#resId").val();
var num=0;
//操作题目添加或移除计数
var selectNum=0;

window.onload=function(){
  var resId=$("#resId").val();
  $.ajax({
    url:'/front/question/getpaperquestionIds?resId='+resId,
    dataType: "json",
    success:function(json){
      questionArray=json.data.questionIds;

      if(questionArray == undefined)
      {questionArray = [];
      }
      console.log(questionArray);
    }
  })
}
function succeedUp() {
  $('#succeedUp').show().delay(2000).fadeOut();
}
//关闭题目编辑框
function newClose() {
  $("#a4").remove();
  $("#content").val("");
  $("#analysis").val("");
  $("#answerKey4").val("");
  $("#answerKey3").val("");
  $("#answerKey2").val("");
  $("#answerKey1").val("");
  $("#s1").removeClass("select");
  $("#s2").removeClass("select");
  $("#s3").removeClass("select");
  $("#s4").removeClass("select");
  $("#dimensionId").val(0);

  $(".new_win").hide();
  $(".cover").hide();
};
//删除弹窗打开
function deleteOpen(questionId) {
  $("#a1").remove();
  $("#deleteYes").show();
  $(".cover").show();
  var div=$("#deleteYes");
  var a=' <a href="#" id="a1" class="submit" onclick="deleteQuestion('+questionId+','+resId+')">删除</a>';
  div.append(a);
};
//编辑新题目弹窗打开
function newOpen() {
  $("#test").html("");
  $(".new_win").show();
  $(".cover").show();
  var div=$(".new_win");
  var a='<a href="#" class="submit" id="a4" onclick="addQuestion()">保存</a>';
  div.append(a);
};
//题目编辑修改弹窗打开
function alterOpen(questionId) {

  $.ajax({
    url:'/front/question/'+questionId+'/getQuestionById',
    method:'get',
    success:function(json){
      $("#s1").removeClass("select");
      $("#s2").removeClass("select");
      $("#s3").removeClass("select");
      $("#s4").removeClass("select");
      var question = json.data.question;
      var options = json.data.question.listOptions;
      for (var i = 0; i < options.length; i++) {
        $("#answerKey" + (i + 1)).val(options[i].content);
        if (options[i].isRight == 1) {
          $("#s"+(i+1)).addClass("select");

        }
      }
      $("#content").val(question.content);
      $("#analysis").val(question.analysis);
      //维度选中
      var ops = document.getElementById("dimensionId");
      var value = json.data.dimension.dimensionId//这个值就是你获取的值;
      if (value != "") {
        for (var i = 0; i < ops.options.length; i++) {
          if (value == ops.options[i].value) {
            ops.options[i].selected = 'selected';
            break;
          }
        }
      }
      var div=$(".new_win");
      var a='<a href="#" class="submit" id="a4" onclick="updateQuestion('+questionId+')">保存</a>';
      div.append(a);
      $(".new_win").show();
      $(".cover").show();
    }
  })
};
//删除弹窗关闭
function deleteClose() {
  $(".delete_win").hide();
  $(".cover").hide();
};
//删除题目ajax
function deleteQuestion(questionId,resId){
  $.ajax({
    url:'/front/question/'+questionId+'/'+resId+'/delete',
    data:{questionId:questionId},
    success:function(json){
      var json=eval("("+json+")");
      if(json.code==1){
        layer.msg("删除成功！");
        window.location='/front/question/to-list?resId='+resId;

      }else{
        layer.msg("删除失败！");
      }
    }
  })
}
//维度选中刷新
function dimensionSelect(dimensionId,resId,name){
  $("#dimensionA").remove();
  if(selectNum>0 && questionArray.length>0){
    //提示弹窗出现
    $("#selectYes").show();
    $(".cover").show();
  }else{
    //直接选择维度
    $("#show").html(name);
    window.location.href='/front/question/to-list?resId='+resId+'&dimensionId='+dimensionId;
  }


}

//添加题目
function addQuestion(){
  $("#test").html("");
  var content=$("#content").val();
  var option4=$("#answerKey4").val();
  var option3=$("#answerKey3").val();
  var option2=$("#answerKey2").val();
  var option1=$("#answerKey1").val();
  var isRight;
  if($("#answer1 s").hasClass("select")){
    isRight="option1";
  }
  if($("#answer2 s").hasClass("select")){
    isRight="option2";
  }
  if($("#answer3 s").hasClass("select")){
    isRight="option3";
  }
  if($("#answer4 s").hasClass("select")){
    isRight="option4";
  }
  var analysis=$("#analysis").val();
  var dimensionId=$("#dimensionId").val();
  if(content=='在此输入题目 ...'){
    $("#test").html("请输入题目内容！");

    return ;
  }
  if(option4=='请输入选项内容'||option3=='请输入选项内容'||option2=='请输入选项内容'||option1=='请输入选项内容'){
    $("#test").html("请输入选项内容！");
    return ;
  }
  if(dimensionId==null||dimensionId==0){
    $("#test").html("请选择维度!");
    return ;
  }
  if(isRight==undefined){
    $("#test").html("请选择正确选项！");
    return ;
  }
  var data={resId:resId,content:content,option4:option4,option3:option3,option2:option2,option1:option1,isRight:isRight,dimensionId:dimensionId,analysis:analysis};
  $.ajax({
    url:'/front/question/add',
    method:'post',
    data:data,
    success:function(json){
      var data=eval('('+ json +')');
      if(data.code==1){
        $("#test").html("添加题目成功！");
        window.location.href='/front/question/to-list?resId='+resId;
      }else{
        layer.msg("添加失败！");
      }
    }
  })

}
function updateQuestion(questionId){
  $("#test").html("");
  var content=$("#content").val();
  var option4=$("#answerKey4").val();
  var option3=$("#answerKey3").val();
  var option2=$("#answerKey2").val();
  var option1=$("#answerKey1").val();
  var isRight;
  if($("#answer1 s").hasClass("select")){
    isRight="option1";
  }
  if($("#answer2 s").hasClass("select")){
    isRight="option2";
  }
  if($("#answer3 s").hasClass("select")){
    isRight="option3";
  }
  if($("#answer4 s").hasClass("select")){
    isRight="option4";
  }
  var analysis=$("#analysis").val();
  var dimensionId=$("#dimensionId").val();
  if(content=='在此输入题目 ...'){
    $("#test").html("请输入题目内容");

    return ;
  }
  if(option4=='请输入选项内容'||option3=='请输入选项内容'||option2=='请输入选项内容'||option1=='请输入选项内容'){
    $("#test").html("请输入选项内容");
    return ;
  }
  if(dimensionId==null||dimensionId==0){
    $("#test").html("请选择维度");
    return ;
  }
  if(isRight==undefined||isRight==null){
    $("#test").html("请选择正确选项");
    return ;
  }
  var data={resId:resId,content:content,option4:option4,option3:option3,option2:option2,option1:option1,isRight:isRight,dimensionId:dimensionId,analysis:analysis,questionId:questionId};
  $.ajax({
    url:'/front/question/add',
    method:'post',
    data:data,
    success:function(json){
      var data=eval('('+ json +')');
      if(data.code==1){
        layer.msg("修改成功！");
        window.location.href='/front/question/to-list?resId='+resId;
      }else{
        $("#test").html("修改失败！");
      }
    }
  })
}
//移动题目div
function removeQ(questionId){
  selectNum++;
  var text=$("#"+questionId+"a").html();
  if(text=='+ 添加'){
    if(questionArray.length>9){
      layer.msg('最多只能添加10道，请筛选后保存！');
      return ;
    }
    //教师组卷添加
    var div=$("#"+questionId);
    var a=$("#"+questionId+"a");
    var allDiv=$("#teacherQuestion");
    div.find(".z-handle").css("display","none");
    allDiv.append(div);
    //排列教师组卷序号
    $("#teacherQuestion").find("span").each(function(index,element){
      $(this).html(index+1);
    })
    //排列所有题目序号
    $("#allQuestion").find("span").each(function(index,element){
      $(this).html(index+1);
    })
    questionArray.push(questionId);
    var teaNum=$("#uncan").text();
    var allNum=$("#can").html();
    var can=parseInt(allNum)-1;
    var uncan=parseInt(teaNum)+1;
    $("#can").html(can);
    $("#uncan").html(uncan);
    a.html("- 移除");
  }else if(text=='- 移除'){
    //教师组卷移除
    var div=$("#"+questionId);
    var a=$("#"+questionId+"a");
    var allDiv=$("#allQuestion");
    div.find(".z-handle").css("display","inline-block");
    allDiv.append(div);
    $("#teacherQuestion").find("span").each(function(index,element){
      $(this).html(index+1);
    })
    $("#allQuestion").find("span").each(function(index,element){
      $(this).html(index+1);
    })
    var index=questionArray.indexOf(questionId);
    if (index > -1) {
      questionArray.splice(index, 1);
    }
    var teaNum=$("#uncan").text();
    var allNum=$("#can").html();
    var can=parseInt(allNum)+1;
    var uncan=parseInt(teaNum)-1;
    $("#can").html(can);
    $("#uncan").html(uncan);
    a.html("+ 添加");
  }
  console.log(questionArray);
  // 已选择题目是否为空的情况
  if(questionArray.length==0){
    $(".z-empty").css("display","block");
  }else{
    $(".z-empty").css("display","none");
  }
}
//确认组卷提交
function submitpaper(){
  $(".delete_win").hide();
  $(".cover").hide();
  if(num>1){
    return ;
  }
  if(questionArray.length<1){
    layer.msg("请添加题目后保存！");
    return ;
  }
  num++;
  $("#submitPaper").html("保存中...");
  var paperId=$("#paperId").val();
  var url='/front/question/addpaper';
  var data;
  var questionIds=questionArray.join(",");
  if(paperId==null||paperId==""){
    data={resId:resId,questionIds:questionIds};
  }else{
    data={paperId:paperId,resId:resId,questionIds:questionIds};
  }
  $.ajax({
    url:url,
    data:data,
    method:'post',
    success:function(json){
      var code=json.code;
      if(code==1){
        layer.msg("保存成功！");
        window.location.href="/front/question/to-list?resId="+resId;
      }else{
        layer.msg("操作失败！");
        $("#submitPaper").html("保存题目");
        num=0;
      }
    }
  })
}

