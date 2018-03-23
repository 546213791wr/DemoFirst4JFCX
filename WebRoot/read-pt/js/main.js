function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != "function") {
    window.onload = func
  } else {
    window.onload = function() {
      oldonload();
      func()
    }
  }
};

// 日期控件
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

/* Tab切换 */
function EW_tab(option) {
  this.oTab_btn = this.getDom(option.tabBtn);
  this.oTab_clist = this.getDom(option.tabCon);
  if (!this.oTab_btn || !this.oTab_clist) return;
  this.sCur = option.cur;
  this.type = option.type || 'click';
  this.nLen = this.oTab_btn.length;
  this.int()
}
EW_tab.prototype = {
  getId: function(id) {
    return document.getElementById(id)
  },
  getByClassName: function(className, parent) {
    var elem = [],
      node = parent != undefined && parent.nodeType == 1 ? parent.getElementsByTagName('*') : document.getElementsByTagName('*'),
      p = new RegExp("(^|\\s)" + className + "(\\s|$)");
    for (var n = 0, i = node.length; n < i; n++) {
      if (p.test(node[n].className)) {
        elem.push(node[n])
      }
    }
    return elem
  },
  getDom: function(s) {
    var nodeName = s.split(' '),
      p = this.getId(nodeName[0].slice(1)),
      c = this.getByClassName(nodeName[1].slice(1), p);
    if (!p || c.length == 0) return null;
    return c
  },
  change: function() {
    var cur = new RegExp(this.sCur, 'g');
    for (var n = 0; n < this.nLen; n++) {
      this.oTab_clist[n].style.display = 'none';
      this.oTab_btn[n].className = this.oTab_btn[n].className.replace(cur, '')
    }
  },
  int: function() {
    var that = this;
    this.oTab_btn[0].className += ' ' + this.sCur;
    // this.oTab_clist[0].style.display = 'block';
    var that2 = this.oTab_clist[0];
    $(that2).fadeIn(500);
    for (var n = 0; n < this.nLen; n++) {
      this.oTab_btn[n].index = n;
      this.oTab_btn[n]['on' + this.type] = function() {
        that.change();
        that.oTab_btn[this.index].className += ' ' + that.sCur;
        // that.oTab_clist[this.index].style.display = 'block'
        var that3 = that.oTab_clist[this.index];
        $(that3).fadeIn(500);
      }
    }
  }
}

// GoTop返回顶部
function toTop(id, show) {
  var oTop = document.getElementById(id);
  var bShow = show;
  if (!bShow) {
    oTop.style.display = 'none';
    setTimeout(btnShow, 50)
  }
  oTop.onclick = scrollToTop;

  function scrollToTop() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var iSpeed = Math.floor(-scrollTop / 2);
    if (scrollTop <= 0) {
      if (!bShow) {
        oTop.style.display = 'none'
      }
      return
    }
    document.documentElement.scrollTop = document.body.scrollTop = scrollTop + iSpeed;
    setTimeout(arguments.callee, 50)
  }

  function btnShow() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop <= 0) {
      oTop.style.display = 'none'
    } else {
      oTop.style.display = 'block'
    }
    setTimeout(arguments.callee, 50)
  }
};

// 登录窗口
function selfAdaption() {
  var bodyHeight = document.body.offsetHeight;
  document.getElementById("login").style.height = bodyHeight - 222 + "px";
}
$(".institution_option").click(function() {
  $(".login_nav dl").addClass("is-show");
});
$(".login_nav dl").click(function() {
  $(".login_nav dl").removeClass("is-show");
});
$('.qrcode1').hover(function() {
  $('.qrcode1 img').fadeToggle(0);
})
$('.qrcode2').hover(function() {
  $('.qrcode2 img').fadeToggle(0);
})

// 头部搜索下拉
$(".search_option").click(function() {
  $(".search dl").toggleClass("is-show");
});
$(document).bind("click", function(e) {
  var target = $(e.target);
  if (target.closest(".search").length == 0) {
    $(".search dl").removeClass("is-show");
  }
  //头部菜单下拉
  if (target.closest(".navlist1").length == 0) {
    $(".navlist1 dl").removeClass("is-show");
  }
  //头部用户菜单下拉
  if (target.closest(".navuser1").length == 0) {
    $(".navuser1 dl").removeClass("is-show");
  }
  //头部消息弹窗
  if (target.closest(".navnews").length == 0) {
    $(".navnews .popnews_con").hide(0);
  }
});
//头部菜单下拉
$(".navlist_btn").click(function() {
  $(".navlist1 dl").toggleClass("is-show");
});
//头部用户菜单下拉
$(".navuser_btn").click(function() {
  $(".navuser1 dl").toggleClass("is-show");
});
//头部消息弹窗
$(".navnews").click(function() {
  $(".navnews .popnews_con").fadeToggle();
  $(".navnews .unread_red").hide();
});
// 侧边栏
$("dt.login a").click(function() {
  window.location='/front/login'
  // $(".login_win").show();
});
$(".login_win s").click(function() {
  $(".login_win").hide();
});
$(".institution_option").click(function() {
  $(".login_win dl").addClass("is-show");
});
$(".login_win dl").click(function() {
  $(".login_win dl").removeClass("is-show");
});
$("dt.logoff .sign").click(function() {
  $(".sign_win").show();
});
$(".sign_win s").click(function() {
  $(".sign_win").hide();
});
$("dt.logoff img").mouseenter(function() {
  $("dt.logoff .leave").show();
});
$("dt.logoff .leave").mouseleave(function() {
  $("dt.logoff .leave").hide();
});
$("a.feedback").click(function() {
  $(".feedback_win").show();
});
$(".feedback_win s").click(function() {
  $(".feedback_win").hide();
});

// 任务下拉菜单
$(".grade").click(function() {
  $(".grade_list").toggleClass("is-show");
});
$(document).bind("click", function(e) {
  var target = $(e.target);
  if (target.closest(".grade").length == 0) {
    $(".grade_list").removeClass("is-show");
  }
});

// 发布弹窗
function succeedUp() {
  $('#succeedUp').show().delay(2000).fadeOut();
}

// 任务展开
// $("#leftPane .menu_list:eq(0)").addClass("current");
$("#leftPane .menu_body:eq(0)").show();
$(".menu_list").hover(function() {
  $(this).children(".hover").show();
}, function() {
  $(this).children(".hover").hide();
});
$("#leftPane .hover").click(function() {
  if($(this).hasClass("current")){

    $(this).parent().removeClass("current");
    $(this).prev(".menu_body").slideUp(300);
  }else{

    $(this).parent().addClass("current");
    $(this).prev(".menu_body").slideDown(300);
  }
  $(this).parent().siblings().removeClass("current");
  $(this).parent().siblings().children(".menu_body").slideUp("slow");

});

// $("#rightPane .menu_list:eq(0)").addClass("current");
$(".menu_list").hover(function() {
  $(this).children(".hover").show();
}, function() {
  $(this).children(".hover").hide();
});
$("#rightPane .hover").click(function() {
  $(this).parent().toggleClass("current");
  $(this).parent().siblings().removeClass("current");
  $(this).prev(".menu_body").slideToggle(300);
  $(this).parent().siblings().children(".menu_body").slideUp("slow");
});

// 任务弹窗
function deleteOpen() {
  $(".delete_win").show();
  $(".cover").show();
};

function deleteClose() {
  $(".delete_win").hide();
  $(".cover").hide();
};

function newOpen() {
  $(".new_win").show();
  $(".cover").show();
};

function newClose() {
  $(".new_win").hide();
  $(".cover").hide();
};
// function alterOpen() {
//   $(".alter_win").show();
//   $(".cover").show();
// };
// function alterClose() {
//   $(".alter_win").hide();
//   $(".cover").hide();
// };

// 单选题
$(".single s").click(function() {
  $(".answer s").removeClass("select");
  $(this).toggleClass("select");
});
// 多选题
$(".multiple s").click(function() {
  $(this).toggleClass("select");
});



function loading(msg){
  if(isEmpty(msg)){
    msg = "正在处理";
  }
  var layerIndex = layer.msg(msg, {icon: 16, shade: 0.3, shadeClose: false, time: 0});
  return layerIndex;
}
/**关闭弹出层
 * @param index
 */
function closeLayer(index){
  layer.close(index);
}
/**
 * 关闭所有弹出层
 */
function closeAllLayer(){
  layer.closeAll();
}
//数据报告改版
// 学期下拉
$(".term1 .term2").click(function() {
  $(".term1 .list").toggleClass("is-show");
});
$(".term1 dd").click(function() {
  $(".term1 .term2").html($(this).html());
  $(".term1 .list").removeClass("is-show");
  $('.term1 #period').val($(this).attr("value"));
});
//数据报告-计算规则弹窗
$(".report_rule_link").hover(function () {
  $(this).children(".report_rule").show();
},function () {
  $(this).children(".report_rule").hide();
})
