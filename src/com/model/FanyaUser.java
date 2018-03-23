/*
 * 类说明：
 */
package com.model;
import org.apache.commons.lang3.builder.*;

import java.io.Serializable;

public class FanyaUser implements Serializable{
	private static final long serialVersionUID = 4333051594806425334L;
	//alias
	public static final String TABLE_ALIAS = "FanyaUser";
	public static final String ALIAS_ID = "id";
	public static final String ALIAS_UID = "泛雅用户id";
	public static final String ALIAS_FID = "泛雅机构id";
	public static final String ALIAS_PERFECT_STATUS = "0：未完善，需完善1：无需修改             备注：当用户无fid或fid未开通前，使用时选择的用户信息（年级、年龄段、阅读级别）为1385的可选范围，当用户fid确认且开通后需要让用户重新选择。";
	public static final String ALIAS_USER_TYPE_ID = "用户类型id";
	public static final String ALIAS_USER_TYPE_AUTH_FLAG = "0:未认证             1:已认证             对于已认证则不能更换用户类型与年级等,  导入的用户，都默认设置为1";
	public static final String ALIAS_STATUS = "0:无效             1:有效";
	public static final String ALIAS_CREATE_TIME = "createTime";
	public static final String ALIAS_CREATE_USER_ID = "createUserId";
	public static final String ALIAS_MODIFY_TIME = "modifyTime";
	public static final String ALIAS_MODIFY_USER_ID = "modifyUserId";

	//columns START
	/** id   db_column: id */ 	
	private Integer id;
	/** 泛雅用户id   db_column: uid */ 	
	private String uid;
	/** 泛雅机构id   db_column: fid */ 	
	private String fid;
	/** 0：未完善，需完善1：无需修改             备注：当用户无fid或fid未开通前，使用时选择的用户信息（年级、年龄段、阅读级别）为1385的可选范围，当用户fid确认且开通后需要让用户重新选择。   db_column: perfect_status */ 	
	private String perfectStatus;
	/** 用户类型id   db_column: user_type_id */ 	
	private Integer userTypeId;
	/** 0:未认证             1:已认证             对于已认证则不能更换用户类型与年级等,  导入的用户，都默认设置为1   db_column: user_type_auth_flag */ 	
	private String userTypeAuthFlag;
	/** 0:无效             1:有效   db_column: status */ 	
	private String status;
	/** createTime   db_column: create_time */ 	
	private java.util.Date createTime;
	/** createUserId   db_column: create_user_id */ 	
	private Integer createUserId;
	/** modifyTime   db_column: modify_time */ 	
	private java.util.Date modifyTime;
	/** modifyUserId   db_column: modify_user_id */ 	
	private Integer modifyUserId;
	private String code;
	//columns END

	public FanyaUser(){
	}

	public FanyaUser(String fid){
		this.fid = fid;
	}

	public FanyaUser(
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
	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getUid() {
		return this.uid;
	}
	public void setFid(String value) {
		this.fid = value;
	}
	
	public String getFid() {
		return this.fid;
	}
	public void setPerfectStatus(String value) {
		this.perfectStatus = value;
	}
	
	public String getPerfectStatus() {
		return this.perfectStatus;
	}
	public void setUserTypeId(Integer value) {
		this.userTypeId = value;
	}
	
	public Integer getUserTypeId() {
		return this.userTypeId;
	}
	public void setUserTypeAuthFlag(String value) {
		this.userTypeAuthFlag = value;
	}
	
	public String getUserTypeAuthFlag() {
		return this.userTypeAuthFlag;
	}
	public void setStatus(String value) {
		this.status = value;
	}
	
	public String getStatus() {
		return this.status;
	}
	public void setCreateTime(java.util.Date value) {
		this.createTime = value;
	}
	
	public java.util.Date getCreateTime() {
		return this.createTime;
	}
	public void setCreateUserId(Integer value) {
		this.createUserId = value;
	}
	
	public Integer getCreateUserId() {
		return this.createUserId;
	}
	public void setModifyTime(java.util.Date value) {
		this.modifyTime = value;
	}
	
	public java.util.Date getModifyTime() {
		return this.modifyTime;
	}
	public void setModifyUserId(Integer value) {
		this.modifyUserId = value;
	}
	
	public Integer getModifyUserId() {
		return this.modifyUserId;
	}

	public String toString() {
		return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
			.append("Id",getId())
			.append("Uid",getUid())
			.append("Fid",getFid())
			.append("PerfectStatus",getPerfectStatus())
			.append("UserTypeId",getUserTypeId())
			.append("UserTypeAuthFlag",getUserTypeAuthFlag())
			.append("Status",getStatus())
			.append("CreateTime",getCreateTime())
			.append("CreateUserId",getCreateUserId())
			.append("ModifyTime",getModifyTime())
			.append("ModifyUserId",getModifyUserId())
			.toString();
	}
	
	public int hashCode() {
		return new HashCodeBuilder()
			.append(getId())
			.toHashCode();
	}
	
	public boolean equals(Object obj) {
		if(obj instanceof FanyaUser == false) return false;
		if(this == obj) return true;
		FanyaUser other = (FanyaUser)obj;
		return new EqualsBuilder()
			.append(getId(),other.getId())
			.isEquals();
	}
}

