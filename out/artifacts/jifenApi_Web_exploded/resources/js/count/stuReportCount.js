function drawPass(userId) {
	$.ajax({
		url : ctx + "/front/stuReport/drawPass/" + userId,
		async : true,
		type : "GET",
		success : function(obj) {
			var data = eval('(' + obj.data.json + ')');
			// 评测通过率
			var myChart = echarts
					.init(document.getElementById('chartsPiemini'));
			var notPass = data.allTimes - data.passTimes;
			var passShow = [];
			if (data.passTimes != 0) {
				passShow[0] = {
					value : Math.round(data.passTimes * 100 / data.allTimes),
					name : '通过'
				}
			} else {
				passShow[0] = {};
			}
			if (notPass != 0) {
				passShow[1] = {
					value : 100 - Math.round(data.passTimes * 100
							/ data.allTimes),
					name : '未通过'
				}
			} else {
				passShow[1] = {};
			}
			var option = {
				title : {
					text : '评测通过率表格',
					textStyle : {
						fontWeight : 'normal',
						color : '#505050'
					},
					left : '0'
				},
				legend : {
					show : true
				},
				tooltip : {
					trigger : 'item'
				},
				color : [ '#6aa4f3', '#4a89dc' ],
				series : [ {
					name : '通过率',
					type : 'pie',
					radius : [ 0, '150' ],
					label : {
						normal : {
							position : 'inner',
							textStyle : {
								fontSize : 16
							}
						}
					},
					itemStyle : {
						normal : {
							borderColor : '#666666',
							borderWidth : 1
						},
					},

					data : passShow
				} ],
				animationDelay : 1000,
				animationDuration : 3000
			};

			myChart.setOption(option);
			// 有效阅读图书数
			$("#effectiveReading").text(data.effectiveReading);

		},
		error : function() {
			alert("获取评测通过率饼状图出错")
		}
	})
}
function drawReadingDistribution(userId) {
	$.ajax({
		url : ctx + "/front/stuReport/drawReadingDistribution/" + userId,
		type : "GET",
		success : function(obj) {
			var data = obj.data.readingDistribution;
			// 有效 阅读时间分布
			var readingDistribution = echarts.init(document
					.getElementById('chartsLine'));
			var time = [];
			var count = [];
			for (var i = 0; i < data.length; i++) {
				time[i] = data[i].time;
				count[i] = data[i].readingCount;
			}
			var option3 = {
				title : {
					text : '阅读图书时间分布表',
					textStyle : {
						fontWeight : 'normal',
						color : '#505050'
					},
					left : '0'
				},
				legend : {
					show : false
				},
				tooltip : {
					trigger : 'item'
				},
				color : [ '#6963c1', '#d09d2a', '#6eb940' ],
				grid : {
					left : '10%',
					right : '10%',
					bottom : '10%',
					containLabel : true
				},
				xAxis : [ {
					type : 'category',
					boundaryGap : false,
					data : time
				} ],
				yAxis : [ {
					type : 'value',
					axisLine : {
						show : false
					}
				} ],
				series : [ {
					name : '阅读时间',
					type : 'line',
					smooth : true,
					label : {
						normal : {
							show : false
						}
					},
					lineStyle : {
						normal : {
							width : 3
						}
					},
					data : count
				} ],
				animationDelay : 1000,
				animationDuration : 3000
			};
			readingDistribution.setOption(option3);
		},
		error : function() {
			alert("获取有效阅读图书时间分布表出错")
		}
	})
}
function drawReadingInterest(userId) {
	$.ajax({
		url : ctx + "/front/stuReport/drawReadingInterest/" + userId,
		type : "GET",
		success : function(obj) {
			var data = obj.data.readingInterest;
			// 阅读喜好分析
			var readingInterest = echarts.init(document
					.getElementById('chartsBar'));
			// 获取类别名称
			var name = [];
			// 获取类别数目
			var num = [];

			var tps = [{'key':'文学故事','value':0},{'key':'科学益智','value':0},{'key':'历史文化','value':0},{'key':'社会百科','value':0},{'key':'人文艺术','value':0}]
			for (var i = 0; i < data.length; i++) {
				name[i] = data[i].name;
				num[i] = data[i].num;
				for(var j = 0 ;j < 5;j ++){
					if(name[i] == tps[j].key){
						tps[j].value = num[i];
						continue;
					}
				}
			}

            for(var i = 0; i< 5 ;i ++){
                for(var j=i+1; j<5; j++){
                    if(tps[i].value < tps[j].value){
                        var tmp = tps[i];
                        tps[i] = tps[j];
                        tps[j] = tmp;
                    }
                }
            }

            var content = "";
			if(data.length == 1){
                content ="书山有路勤为径，在阅读路上，你始终与" +
					tps[0].key+"相伴，受益良多。但是不要忘了还有更加斑斓的阅读世界等着你去探索哦，" +
                    tps[1].key+"、"+tps[2].key+"、"+tps[3].key+"、"+tps[4].key+"在呼唤你去阅读呢。保持阅读兴趣，综合阅读面吧！"
			}else if(data.length > 1 && data.length < 5){
				content = "书山有路勤为径，" +
                    tps[0].key+"陪伴你走过了很长的道路，见证了你的成长瞬间。除了" +
                    tps[0].key+"，你还在" +
                    tps[1].key+"中汲取知识，获得进步。" +
					"但是不要忘了还有更加斑斓的阅读世界等着你去探索哦，" +
                    tps[2].key+"、"+tps[3].key+"、"+tps[4].key+"在呼唤你去阅读呢。保持阅读兴趣，综合阅读面吧！"
			}else if(data.length == 5){
				content = "书山有路勤为径，你有着丰富的阅读视野，在精彩的阅读世界里走过漫漫征程。" +
                    tps[0].key+"陪伴你走过了很长的道路，见证了你的成长瞬间。你对" +
                    tps[1].key+"还有着浓厚的兴趣，并在"+tps[2].key+"、"+tps[3].key+"中汲取知识，获得进步。" +
					"对于"+tps[4].key+"类型的书籍，你兴趣较低，是不是还没发现它的奥秘呢？保持阅读兴趣，在阅读中不断成长吧！"
			}

			$("#likeMsg").html(content);
			var option5 = {
				title : {
					text : '阅读兴趣分布区间图',
					show : false
				},
				legend : {
					show : false
				},
				color : [ '#d05a47' ],
				xAxis : [ {
					type : 'category',
					data : name
				} ],
				yAxis : [ {
					type : 'value'
				} ],
				dataZoom : [ {
					type : 'inside'
				} ],
				series : [ {
					name : '阅读等级',
					type : 'bar',
					barMaxWidth : 10,
					data : num
				} ],
				animationDelay : 1000,
				animationDuration : 3000
			};
			readingInterest.setOption(option5);
		},
		error : function() {
			alert("阅读兴趣分布区间图")
		}
	})
}
function drawReadingDimension(userId) {
	$.ajax({
				url : ctx + "/front/stuReport/drawReadingDimension/" + userId,
				type : "GET",
				success : function(obj) {
					var data = obj.data.readingDimension;
					// 阅读的维度分部
					var readingDimension = echarts.init(document
							.getElementById('chartsRadar'));
					var count = [ 0, 0, 0, 0, 0 ];
					// 与下面的indicator对应 1-字词掌握 2-信息处理 3-归纳推理 4-情感理解 5-拓展应用
					var abits =[{'key':'字词掌握','value':0},{'key':'信息处理','value':0},{'key':'归纳推理','value':0},{'key':'情感理解','value':0},{'key':'拓展应用','value':0}];

					var topFlag = 0;
					for (var i = 0; i < data.length; i++) {
						var tlv = parseInt((data[i].rightNumber / data[i].questionNumber) * 100);
                        if(tlv  >= 80){
                            topFlag ++;
                        }
						if (data[i].id == 1) {
							count[0] = tlv;
                            abits[0]={'key':'字词掌握','value':count[0]}

						} else if (data[i].id == 2) {
							count[1] = tlv;
                            abits[1]={'key':'信息处理','value':count[1]}
						} else if (data[i].id == 3) {
							count[2] = tlv;
                            abits[2]={'key':'归纳推理','value':count[2]}
						} else if (data[i].id == 4) {
							count[3] = tlv;
                            abits[3]={'key':'情感理解','value':count[3]}
						} else if (data[i].id == 5) {
							count[4] = tlv;
                            abits[4]={'key':'拓展应用','value':count[4]}
						}
					}

					for(var i = 0; i< 5 ;i ++){
						for(var j=i+1; j<5; j++){
							if(abits[i].value < abits[j].value){
								var tmp = abits[i];
								abits[i] = abits[j];
								abits[j] = tmp;
							}
						}
					}


					var content = "";
					if(topFlag >= 2){
						content = "你的"+abits[0].key+"很出色，" +
                            abits[1].key+"也超棒，老师很欣赏！" +
                            abits[2].key+"和" +
                            abits[3].key+"还有很大的进步空间，老师最想看到的是你在" +
                            abits[4].key+"上的提升，下次给我一个惊喜吧！"
					}else if (topFlag == 1){
                        content = "你的"+abits[0].key+"很棒，" +
                            abits[1].key+"也较好,继续加油吧！" +
                            abits[2].key+"和" +
                            abits[3].key+"还有很大的进步空间，老师最想看到的是你在" +
                            abits[4].key+"上的提升，下次给我一个惊喜吧！"
					}else if (topFlag == 0){
                        content = "你的"+abits[0].key+"不错，" +
                            abits[1].key+"也较好,继续加油吧！" +
                            abits[2].key+"和" +
                            abits[3].key+"还有很大的进步空间，老师最想看到的是你在" +
                            abits[4].key+"上的提升，下次给我一个惊喜吧！"
					}


					$("#abilityMsg").html(content)
					var option2 = {
						title : {
							text : '平均阅读能力图',
							show : false
						},
						legend : {
							show : false
						},
//						tooltip : {
//							trigger : 'item'
//						},
						radar : {
							indicator : [ {
								name : '字词掌握',
								max : 100
							}, {
								name : '信息处理',
								max : 100
							}, {
								name : '归纳推理',
								max : 100
							}, {
								name : '情感理解',
								max : 100
							}, {
								name : '拓展应用',
								max : 100
							} ],
							radius : 120,
							shape : 'circle',
							name : {
								textStyle : {
									color : '#505050',
									fontSize : 14
								}
							},
							nameGap : 15,
							splitLine : {
								lineStyle : {
									color : [ '#dfe7eb', '#ffffff', '#ffffff',
											'#ffffff', '#ffffff' ]
								}
							},
							splitArea : {
								show : false
							},
							axisLine : {
								lineStyle : {
									color : '#c2dff2'
								}
							}
						},
						series : [ {
							name : '阅读能力',
							type : 'radar',
							symbol : 'circle',
							symbolSize : 6,
							label : {
								normal : {
									// 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用
									// \n
									// 换行。
									formatter : '{a}: {b}: {c}'
								}
							},
							data : [ {
								value : count,
								name : '阅读能力',
								itemStyle : {
									normal : {
										color : '#589aeb'
									}
								},
								areaStyle : {
									normal : {
										opacity : 0.5
									}
								},
								lineStyle : {
									normal : {
										width : 2
									}
								}
							} ],
							animationDelay : 1000,
							animationDuration : 3000
						} ],
					};
					readingDimension.setOption(option2);
				},
				error : function() {
					alert("获取平均阅读能力图出错")
				}
			})
}

function gotop() {
	// toTop('top', false);
}
addLoadEvent(gotop);