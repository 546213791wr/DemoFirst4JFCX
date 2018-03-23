/*
 * 类说明:用户测评星币记录类
 */
package com.model;

import java.util.Date;

public class UserResEvaluateStar {
	private Integer id;
	private String uid;
	private String resId;
	private Integer starScore;
	private Date createTime;

	public UserResEvaluateStar() {
	}

	public UserResEvaluateStar(Integer id, String uid, String resId, Integer starScore, Date createTime) {
		this.id = id;
		this.uid = uid;
		this.resId = resId;
		this.starScore = starScore;
		this.createTime = createTime;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public String getResId() {
		return resId;
	}

	public void setResId(String resId) {
		this.resId = resId;
	}

	public Integer getStarScore() {
		return starScore;
	}

	public void setStarScore(Integer starScore) {
		this.starScore = starScore;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
}

