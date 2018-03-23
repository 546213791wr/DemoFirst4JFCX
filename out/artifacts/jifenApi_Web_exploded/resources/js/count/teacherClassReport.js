
function selectClass(classId) {
	window.location.href ="/front/teacherClass/show?classId=" + classId;
}

function teacherCheck(stuUserId) {
	window.location.href ="/front/stuReport/teacherCheck/" + stuUserId;
}
//阅读等级图
function loadLevelCount() {
	var classId = $("#levelCount").val();

	var url ="/front/teacount/read-level?classId=" + classId;

	$.ajax({
		url : url,
		type : "GET",
		async:false,
		success : function(obj) {
			
			/*// 获取该班级的人均有效阅读图书数量
			var perReadingNum = obj.data.perReadingNum;
			// 在页面上显示人均有效阅读图书
			$("#perReadingNum").text(perReadingNum);*/
			// 阅读等级分布区间图
			var levelCount = obj.data.readLevel;
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
					value : levelCount[i].num,
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
//平均阅读能力图
function loadReadingAbility(){
	var classId = $("#levelCount").val();
	$.ajax({

		url:"/front/teacount/read-ability?classId=" + classId,

		method:'get',
		async:false,
		success : function(obj) {
			var count=obj.data.count;
			//
			var indicatorData=[];
			var valueData=[];
			for(var i=0;i<count.length;i++){
				indicatorData[i]={
						name:count[i].name	,
						max: 100
				};
				valueData[i]=count[i].percentage;
			}
			var myChart = echarts.init(document.getElementById('chartsRadar'));
		    var option = {
		      title: {
		        text: '平均阅读能力图',
		        textStyle: {
		          fontWeight: 'normal',
		          fontSize: 14,
		          color: '#fff'
		        },
		        backgroundColor: '#5ebafa',
		        left: '0'
		      },
		      legend: {
		        data: ['测评前能力'],
		        show: false
		      },
		      tooltip: {
		        trigger: 'item'
		      },
		      radar: {
		        indicator: indicatorData,
		        radius: 150,
		        shape: 'circle',
		        name: {
		          textStyle: {
		            color: '#919191',
		            fontSize: 10
		          }
		        },
		        nameGap: 5,
		        splitLine: {
		          lineStyle: {
		            width: 0,
		            color: ['#fff']
		          }
		        },
		        splitArea: {
		          areaStyle: {
		            color: ['#efefef', '#efefef', '#f7f7f7', '#f7f7f7', '#fbfbfb']
		          }
		        },
		        axisLine: {
		          lineStyle: {
		            color: '#ececec'
		          }
		        }
		      },
		      series: [{
		        name: '测评前能力 vs 测评后能力',
		        type: 'radar',
		        symbolSize: 10,
		        itemStyle: {
		          normal: {
		            borderWidth: 4
		          }
		        },
		        data: [{
		          value:valueData,
		          name: '测评前能力',
		          itemStyle: {
		            normal: {
		              color: '#0097ff'
		            }
		          },
		          areaStyle: {
		            normal: {
		              opacity: 0.3
		            }
		          },
		          lineStyle: {
		            normal: {
		              width: 3
		            }
		          }
		        }],
		        animationDelay: 1000,
		        animationDuration: 5000
		      }]
		    };
		    myChart.setOption(option);
		}
	})
	
}
//阅读时间分布图
function loadReadTime(){
	var classId = $("#levelCount").val();
	$.ajax({

		url:"/front/teacount/read-time?classId=" + classId,

		method:'get',
		async:false,
		success : function(obj) {
			var data=obj.data.count;
			//日期内容
			var dataData=[];
			//图书本数
			var bookData=[];
			for(var i=0;i<data.length;i++){
				dataData[i]=data[i].days;
				bookData[i]=data[i].num;
			}
			 var myChart = echarts.init(document.getElementById('chartsLine'));
	          var option = {
	            title: {
	              text: '有效阅读图书时间分布表',
	              textStyle: {
	                fontWeight: 'normal',
	                fontSize: 14,
	                color: '#fff'
	              },
	              backgroundColor: '#c48ff6',
	              left: '0'
	            },
	            legend: {
	              show: false
	            },
	            tooltip: {
	              trigger: 'item'
	            },
	            color: ['#8a66ea', '#d09d2a', '#6eb940'],
	            grid: {
	              left: '3%',
	              right: '3%',
	              bottom: '10%',
	              containLabel: true
	            },
	            xAxis: [{
	              type: 'category',
	              boundaryGap: false,
	              axisLabel: {
	                textStyle: {
	                  color: '#989898'
	                }
	              },
	              axisTick: {
	                show: false
	              },
	              axisLine: {
	                show: false
	              },
	              data: dataData
	            }],
	            yAxis: [{
	              type: 'value',
	              axisLine: {
	                show: false
	              },
	              axisTick: {
	                show: false
	              },
	              axisLabel: {
	                textStyle: {
	                  color: '#999'
	                }
	              }
	            }],
	            series: [{
	              name: '阅读时间',
	              type: 'line',
	              symbolSize: 10,
	              itemStyle: {
	                normal: {
	                  borderWidth: 4
	                },
	              },
	              smooth: true,
	              label: {
	                normal: {
	                  show: false
	                }
	              },
	              lineStyle: {
	                normal: {
	                  width: 3
	                }
	              },
	              areaStyle: {
	                normal: {
	                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                    offset: 1,
	                    color: '#fff'
	                  }, {
	                    offset: 0,
	                    color: '#a16bd4'
	                  }], false)
	                }
	              },
	              data:bookData
	            }],
	            animationDelay: 1000,
	            animationDuration: 3000
	          };
	          myChart.setOption(option);
		}
	})
}
//班级报告通过率图
function loadPassingRate(){
	var classId = $("#levelCount").val();
	$.ajax({
		url:"/front/tea-count/read-time?classId=" + classId,
		method:'get',
		async:false,
		success : function(obj) {
			
			var option = {
		            title: {
		              text: '班级通过率',
		              textStyle: {
		                fontWeight: 'normal',
		                fontSize: 14,
		                color: '#fff'
		              },
		              backgroundColor: '#95de7f',
		              left: '0'
		            },
		            legend: {
		              show: false
		            },
		            tooltip: {
		              trigger: 'item'
		            },
		            color: ['#7ddb61', '#faa5c4'],
		            series: [{
		              name: '通过率',
		              type: 'pie',
		              radius: ['50%', '70%'],
		              label: {
		                normal: {
		                  show: false,
		                }
		              },
		              itemStyle: {
		                normal: {
		                  borderColor: '#e9ebef',
		                  borderWidth: 4
		                },
		              },
		              data: [{
		                  value: 75,
		                  name: '通过'
		                },
		                {
		                  value: 25,
		                  name: '未通过'
		                }
		              ],
		            }],
		            animationDelay: 1000,
		            animationDuration: 3000
		          };
		          myChart.setOption(option);
		}
	})
}
/** 回到顶部 */
function gotop() {
	// toTop('top', false);
}
/*addLoadEvent(gotop);*/