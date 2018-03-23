function selectClass(gradeId) {
	window.location.href = ctx + "/front/gradeReport/show?gradeId=" + gradeId;
}

function teacherCheck(classId) {
	window.location.href = ctx + "/front/teacherClass/show?classId=" + classId;
}
function loadLevelCount() {
	var gradeId = $("#levelCount").val();
	var url = ctx + "/front/gradeReport/getGradeDetail/" + gradeId;
	$.ajax({
		url : url,
		type : "GET",
		success : function(obj) {
			// 获取该班级的人均有效阅读图书数量
			var perReadingNum = obj.data.perReadingNum;
			// 在页面上显示人均有效阅读图书
			$("#perReadingNum").text(perReadingNum);
			// 阅读等级分布区间图
			var levelCount = obj.data.levelCount;
			// 右边的等级标签图
			var levelLabel = [];
			// 图标中的值
			var data = [];
			if (levelCount.length <= 0) {
				return;
			}
			// 标签颜色
			var color = [ '#66a5f1', '#f4c458', '#8cdc5a', '#eb7c56',
					'#d47af5', '#f57acb' ];
			for (var i = 0; i < levelCount.length; i++) {
				data[i] = {
					value : levelCount[i].count,
					name : levelCount[i].level + '级'
				};
				levelLabel[i] = levelCount[i].level + '级';
				color[i + 6] = '#f' + (50000 + 50 * i);
			}

			var myChart = echarts.init(document.getElementById('chartsPie'));
			var option = {
				title : {
					text : '阅读等级分布区间图',
					textStyle : {
						fontWeight : 'normal',
						color : '#505050'
					},
					left : '0'
				},
				legend : {
					orient : 'vertical',
					itemGap : 28,
					itemWidth : 10,
					itemHeight : 10,
					inactiveColor : '#22ac38',
					textStyle : {
						color : '#505050',
						fontSize : 14
					},
					right : '50',
					top : '100',
					data : levelLabel
				},
				tooltip : {
					trigger : 'item'
				},
				color : color,
				series : [ {
					name : '阅读等级',
					type : 'pie',
					radius : [ 0, '120' ],
					label : {
						normal : {
							show : false
						}
					},
					itemStyle : {
						normal : {
							borderColor : '#666666',
							borderWidth : 1
						},
					},
					data : data
				} ],
				animationDelay : 1000,
				animationDuration : 3000
			};
			myChart.setOption(option);

		},
		error : function() {
			alert("阅读等级分布区间图生成失败");
		}

	})
}
/** 回到顶部 */
function gotop() {
	// toTop('top', false);
}
addLoadEvent(gotop);