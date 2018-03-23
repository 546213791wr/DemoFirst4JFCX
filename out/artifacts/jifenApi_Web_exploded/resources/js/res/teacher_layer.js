/**
 * 
 */
$(document).ready(function() {
	dateChoose();
  });

function loading(msg){
    if(msg == null || msg == ''){
        msg = "正在处理";
    }
    var layerIndex = layer.msg(msg, {icon: 16, shade: 0.3, shadeClose: false, time: 0});
    return layerIndex;
}
  
function dateChoose() {
	$('#dd').calendar({
        trigger: '#dt',
        zIndex: 99999,
        format: 'yyyy-mm-dd',
        onSelected: function(view, date, data) {
            console.log('event: onSelected')
        },
        onClose: function(view, date, data) {
            console.log('event: onClose')
            console.log('view:' + view)
            console.log('date:' + date)
            console.log('data:' + (data || 'None'));
        }
    });
};

//去编辑题目
function gotoQuestion(resId){

    loading("加载中…");
    location.href='/front/question/to-list?resId='+resId;
    popDown();

}
