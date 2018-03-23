/*
 * 类说明：
 */
package com.model;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class UserSignDetail {
	
	//alias
	public static final String TABLE_ALIAS = "UserSignDetail";
	public static final String ALIAS_ID = "id";
	public static final String ALIAS_UID = "uid";
	public static final String ALIAS_INTEGRAL = "本次获取积分";
	public static final String ALIAS_EXTEND_SCORE = "额外积分";
	public static final String ALIAS_CONTINUUM_DAYS = "连续签到次数";
	public static final String ALIAS_SIGN_TIME = "signTime";

	//columns START
	/** id   db_column: id */ 	
	private Integer id;
	/** uid   db_column: uid */ 	
	private String uid;
	/** 本次获取积分   db_column: integral */ 	
	private Integer integral;
	/** 额外积分   db_column: extend_score */ 	
	private Integer extendScore;
	/** 连续签到次数   db_column: continuum_days */ 	
	private Integer continuumDays;
	/** signTime   db_column: sign_time */ 	
	private java.util.Date signTime;
	//columns END

	public UserSignDetail(){
	}

	public UserSignDetail(
		Integer id
	){
		this.id = id;
	}

	public void setId(Integer value) {
		this.id = value;
	}
	
	public Integer getId() {
		return this.id;
	}
	public void setUid(String value) {
		this.uid = value;
	}
	
	public String getUid() {
		return this.uid;
	}
	public void setIntegral(Integer value) {
		this.integral = value;
	}
	
	public Integer getIntegral() {
		return this.integral;
	}
	public void setExtendScore(Integer value) {
		this.extendScore = value;
	}
	
	public Integer getExtendScore() {
		return this.extendScore;
	}
	public void setContinuumDays(Integer value) {
		this.continuumDays = value;
	}
	
	public Integer getContinuumDays() {
		return this.continuumDays;
	}
	public void setSignTime(java.util.Date value) {
		this.signTime = value;
	}
	
	public java.util.Date getSignTime() {
		return this.signTime;
	}

	public String toString() {
		return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
			.append("Id",getId())
			.append("Uid",getUid())
			.append("Integral",getIntegral())
			.append("ExtendScore",getExtendScore())
			.append("ContinuumDays",getContinuumDays())
			.append("SignTime",getSignTime())
			.toString();
	}
	
	public int hashCode() {
		return new HashCodeBuilder()
			.append(getId())
			.toHashCode();
	}
	
	public boolean equals(Object obj) {
		if(obj instanceof UserSignDetail == false) return false;
		if(this == obj) return true;
		UserSignDetail other = (UserSignDetail)obj;
		return new EqualsBuilder()
			.append(getId(),other.getId())
			.isEquals();
	}
}

