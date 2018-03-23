/*
 * 类说明:用户测评星币记录类
 */
package com.model;

import java.util.Date;

public class UserResReadReportJiFen {
	private Integer id;
	private String uid;
	private String resId;
	private Integer jiFenScore;
	private Date createTime;

	public UserResReadReportJiFen() {
	}

	public UserResReadReportJiFen(Integer id, String uid, String resId, Integer jiFenScore, Date createTime) {
		this.id = id;
		this.uid = uid;
		this.resId = resId;
		this.jiFenScore = jiFenScore;
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

	public Integer getJiFenScore() {
		return jiFenScore;
	}

	public void setJiFenScore(Integer jiFenScore) {
		this.jiFenScore = jiFenScore;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
}

