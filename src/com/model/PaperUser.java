/*
 * 类说明：用户试卷类
 */
package com.model;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class PaperUser {
	
	//alias
	public static final String TABLE_ALIAS = "PaperUser";
	public static final String ALIAS_ID = "id";
	public static final String ALIAS_USER_ID = "uid";
	public static final String ALIAS_PAPER_ID = "paperId";
	public static final String ALIAS_ANSWER_DATE = "答题时间";
	public static final String ALIAS_RIGHT_LV = "正确率";
	public static final String ALIAS_STATUS = "状态 0 未作答，1 已做答";
	public static final String ALIAS_RIGHTS_QTS = "正确题数";
	public static final String ALIAS_ERROR_QTS = "错误题数";

	// 未作答
	public static final Integer STATUS_NO_ANSWERED = 0;

	// 已做答-未通过
	public static final Integer STATUS_HAS_ANSWERED = 1;

	//columns START
	/** id   db_column: id */ 	
	private Integer id;
	/** uid   db_column: user_id */ 	
	private String uid;
	/** paperId   db_column: paper_id */ 	
	private Integer paperId;

	/** 答题时间   db_column: answer_date */ 	
	private java.util.Date answerDate;
	/** 正确率   db_column: right_lv */ 	
	private Float rightLv;
	/** 状态 0 未作答，1 已做答   db_column: status */ 	
	private Integer status;
	/** 正确题数   db_column: rights_qts */ 	
	private Integer rightsQts;
	/** 错误题数   db_column: error_qts */ 	
	private Integer errorQts;

	/** 资源ID */
	private Integer resId;

	/** 用户任务ID */
	private Integer userMissionId;

	private Integer userEvaluateId;
	//columns END

	public PaperUser(){
	}

	public PaperUser(
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

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public void setPaperId(Integer value) {
		this.paperId = value;
	}
	
	public Integer getPaperId() {
		return this.paperId;
	}
	public void setAnswerDate(java.util.Date value) {
		this.answerDate = value;
	}
	
	public java.util.Date getAnswerDate() {
		return this.answerDate;
	}
	public void setRightLv(Float value) {
		this.rightLv = value;
	}
	
	public Float getRightLv() {
		return this.rightLv;
	}
	public void setStatus(Integer value) {
		this.status = value;
	}
	
	public Integer getStatus() {
		return this.status;
	}
	public void setRightsQts(Integer value) {
		this.rightsQts = value;
	}
	
	public Integer getRightsQts() {
		return this.rightsQts;
	}
	public void setErrorQts(Integer value) {
		this.errorQts = value;
	}
	
	public Integer getErrorQts() {
		return this.errorQts;
	}

	public Integer getUserMissionId() {
		return userMissionId;
	}

	public void setUserMissionId(Integer userMissionId) {
		this.userMissionId = userMissionId;
	}

	public String toString() {
		return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
			.append("Id",getId())
			.append("uid",getUid())
			.append("PaperId",getPaperId())
			.append("AnswerDate",getAnswerDate())
			.append("RightLv",getRightLv())
			.append("Status",getStatus())
			.append("RightsQts",getRightsQts())
			.append("ErrorQts",getErrorQts())
			.toString();
	}
	
	public int hashCode() {
		return new HashCodeBuilder()
			.append(getId())
			.toHashCode();
	}
	
	public boolean equals(Object obj) {
		if(obj instanceof PaperUser == false) return false;
		if(this == obj) return true;
		PaperUser other = (PaperUser)obj;
		return new EqualsBuilder()
			.append(getId(),other.getId())
			.isEquals();
	}

	public Integer getResId() {
		return resId;
	}

	public void setResId(Integer resId) {
		this.resId = resId;
	}

	public Integer getUserEvaluateId() {
		return userEvaluateId;
	}

	public void setUserEvaluateId(Integer userEvaluateId) {
		this.userEvaluateId = userEvaluateId;
	}
}

