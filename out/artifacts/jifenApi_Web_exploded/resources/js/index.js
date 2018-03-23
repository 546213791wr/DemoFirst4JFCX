/**
 * 
 */
var changePwdLayer;
$(document).ready(function(){
	init();
	/** 退出登录 */
	$("#login_out").click(function(){
		window.location.href = ctxPath + "/admin/logout";
	});
	/** 修改密码 */
	$("#change_pwd").click(function(){
		initChangePwd();
		changePwdLayer = layer.open({
			type : 1,
			title: '修改密码',
			skin : 'layui-layer-rim', // 加上边框
			area : [ '460px', '260px' ], // 宽高
			content : $('#change_pwd_container')
		});
	});
	var validator = $("#change_pwd_form").validate({
		rules:{
			oldPassword:{
				required:true
			},
			newPassword:{
				required:true
			},
			reNewPassword:{
				required:true,
				equalTo: "#newPassword"
			}
		},
		messages: {  
			oldPassword: "请输入原密码",  
			newPassword: {  
				required: "请输入新密码", 
			},  
			reNewPassword: {  
				required: "请输入确认密码",  
				equalTo: "密码不一致"  
			}  
		},
		errorClass: "help-inline",
		errorElement: "span",
		highlight:function(element, errorClass, validClass) {
			$(element).parents('.control-group').removeClass('success');
			$(element).parents('.control-group').addClass('error');
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).parents('.control-group').removeClass('error');
			$(element).parents('.control-group').addClass('success');
		}
	});
	$("#change_pwd_form").on("submit", function() {
		clearErrorMsg();
		ajaxForm(this, function(data){
			if(data.success){
				showSuccess("修改密码成功", function(){
            		closeAllLayer();
            	});
            }else if("error" == data.msg){
            	showErrorMsg("修改密码出错!");
            }else if("failure" == data.msg){
            	showErrorMsg("修改密码失败!");
            }else{
            	showErrorMsg(data.msg);
            }
		}, function(){
			showErrorMsg("修改密码出错!");
		});
        return false; // 阻止表单自动提交事件
    });
	/** 修改密码提交 */
	$("#submit").click(function(){
		if(validator.form()){
			$("#change_pwd_form").submit();
		}
	});
});
/**
 * 初始化
 */
function init(){
	// loadMenu();
}
/**
 * 加载左侧菜单
 */
function loadMenu(){
	ajaxRequest(ctxPath + "/admin/user/menu", "", function(data){
		packageMenus(data);
	}, function(){
		showError("加载左侧菜单error");
	});
}
/**封装菜单列表
 * @param menus
 */
function packageMenus(menus){
	if(menus.length < 1){
		return;
	}
	var menuHtml = "<ul style='display: block;'>";
	$(menus).each(function(i){
		menuHtml += packageMenu(this);
	});
	menuHtml += "</ul>";
	$('#sidebar').append(menuHtml);
}
/**封装菜单目录
 * @param menu
 */
function packageMenu(menu){
	var menuHtml = "<li class='submenu'>";
	var children = menu.children;
	if(!isEmpty(children) && children.length > 0){//是目录
		menuHtml += "<a href='javascript:void(0)'><i class='"+ menu.cssClass +"'></i><span>"+ menu.name +"</span></a>";
		$(children).each(function(){
			menuHtml += "<ul style='display: none;'>";
			menuHtml += "<li style='display: block;'>";
			menuHtml += "<a name='hyperlink' href='javascript:void(0)' url='"+ this.url +"'>"+ this.name +"</a>";
			menuHtml += "</li>";
			menuHtml += "</ul>";
		});
	}else{
		menuHtml += "<ul style='display: none;'>";
		menuHtml += "<li style='display: block;'>";
		menuHtml += "<a name='hyperlink' href='javascript:void(0)' url='"+ menu.url +"'>"+ menu.name +"</a>";
		menuHtml += "</li>";
		menuHtml += "</ul>";
	}
	menuHtml += "</li>";
	return menuHtml;
}
/**
 * 初始化修改密码弹出窗口
 */
function initChangePwd(){
	$("#change_pwd_form")[0].reset();
	$("#errorSpan").html("");
}
/**显示错误信息
 * @param errorMsg
 */
function showErrorMsg(errorMsg){
	$("#errorSpan").html(errorMsg);
}
/**
 * 清空错误信息
 */
function clearErrorMsg(){
	$("#errorSpan").html("");
}