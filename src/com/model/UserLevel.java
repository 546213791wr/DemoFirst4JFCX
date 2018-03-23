/*
 * 类说明:用户等级字典类
 */
package com.model;

public class UserLevel {
	private Integer id;
	private String level;
	private String levelName;
	private Integer startScore; //起始分数 左边封闭
	private Integer endScore; //结束分数 右边开放
	private Integer status; //状态 0 失效, 1 有效
	private Integer prizeStar; //奖励星币

	public UserLevel() {
	}

	public UserLevel(Integer id, String level, String levelName, Integer startScore, Integer endScore, Integer status, Integer prizeStar) {
		this.id = id;
		this.level = level;
		this.levelName = levelName;
		this.startScore = startScore;
		this.endScore = endScore;
		this.status = status;
		this.prizeStar = prizeStar;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getLevelName() {
		return levelName;
	}

	public void setLevelName(String levelName) {
		this.levelName = levelName;
	}

	public Integer getStartScore() {
		return startScore;
	}

	public void setStartScore(Integer startScore) {
		this.startScore = startScore;
	}

	public Integer getEndScore() {
		return endScore;
	}

	public void setEndScore(Integer endScore) {
		this.endScore = endScore;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getPrizeStar() {
		return prizeStar;
	}

	public void setPrizeStar(Integer prizeStar) {
		this.prizeStar = prizeStar;
	}
}

