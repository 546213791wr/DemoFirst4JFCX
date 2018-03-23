/*
 * 类说明:积分星币获取记录类
 */
package com.model;

import java.util.Date;

public class JiFenStarRecord{
	private Integer id;
	private String uid;
	private Integer originType; //来源类型: 1 签到, 2 做测评, 3 写读后感
	private Integer coinType; //货币类型: 1 积分, 2 星币
	private Integer score; //获取积分分数/星币数
	private Date createTime;

	public JiFenStarRecord() {
	}

	public JiFenStarRecord(Integer id, String uid, Integer originType, Integer coinType, Integer score, Date createTime) {
		this.id = id;
		this.uid = uid;
		this.originType = originType;
		this.coinType = coinType;
		this.score = score;
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

	public Integer getOriginType() {
		return originType;
	}

	public void setOriginType(Integer originType) {
		this.originType = originType;
	}

	public Integer getCoinType() {
		return coinType;
	}

	public void setCoinType(Integer coinType) {
		this.coinType = coinType;
	}

	public Integer getScore() {
		return score;
	}

	public void setScore(Integer score) {
		this.score = score;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
}

