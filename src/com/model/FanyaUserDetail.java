/*
 * 类说明：
 */
package com.model;
import org.apache.commons.lang3.builder.*;

import java.io.Serializable;
import java.util.Date;

public class FanyaUserDetail implements Serializable{

	private static final long serialVersionUID = -3996027227294009323L;
	//alias
	public static final String TABLE_ALIAS = "FanyaUserDetail";
	public static final String ALIAS_ID = "id";
	public static final String ALIAS_UID = "泛雅用户id";
	public static final String ALIAS_LOGIN_NAME = "登录名";
	public static final String ALIAS_REAL_NAME = "真实姓名";
	public static final String ALIAS_EMAIL = "email";
	public static final String ALIAS_GENDER = "性别";
	public static final String ALIAS_GRADE_ID = "年级id,用户类型未认证时使用";
	public static final String ALIAS_CLASS_ID = "班级id";
	public static final String ALIAS_AGE_GROUP_ID = "年龄段";
	public static final String ALIAS_LEVEL = "级别";
	public static final String ALIAS_READING_FACE_LEVEL = "阅读面级别";
	public static final String ALIAS_STAR = "星币";
	public static final String ALIAS_INTEGRAL = "积分";
	public static final String ALIAS_READ_TIME = "阅读时长";
	public static final String ALIAS_CREATE_TIME = "createTime";
	public static final String ALIAS_CREATE_USER_ID = "createUserId";
	public static final String ALIAS_MODIFY_TIME = "modifyTime";
	public static final String ALIAS_MODIFY_USER_ID = "modifyUserId";

	//columns START
	/** id   db_column: id */ 	
	private Integer id;
	/** 泛雅用户id   db_column: uid */ 	
	private String uid;
	/** 登录名   db_column: login_name */ 	
	private String loginName;
	/** 真实姓名   db_column: real_name */ 	
	private String realName;
	/** email   db_column: email */ 	
	private String email;
	/** 性别   db_column: gender */ 	
	private String gender;
	/** 年级id,用户类型未认证时使用   db_column: grade_id */ 	
	private Integer gradeId;
	/** 班级id   db_column: class_id */ 	
	private Integer classId;
	/** 年龄段   db_column: age_group_id */ 	
	private Integer ageGroupId;
	/** 级别   db_column: level */ 	
	private String level;
	/** 阅读面级别   db_column: reading_face_level */ 	
	private String readingFaceLevel;
	/** 星币   db_column: star */ 	
	private Integer star;
	/** 积分   db_column: integral */ 	
	private Integer integral;
	/** 阅读时长   db_column: read_time */ 	
	private Integer readTime;
	/** createTime   db_column: create_time */ 	
	private java.util.Date createTime;
	/** createUserId   db_column: create_user_id */ 	
	private Integer createUserId;
	/** modifyTime   db_column: modify_time */ 	
	private java.util.Date modifyTime;
	/** modifyUserId   db_column: modify_user_id */ 	
	private Integer modifyUserId;

	private String fid;
	private Integer aid;
	private String cityCode;

	private String code;
	private Integer userTypeId;
	// 一下三个字段无用， 默认赋值为：0 0 1
	private Integer perfectStatus;
	private Integer userTypeAuthFlag;
	private Integer status;
	//columns END

	public FanyaUserDetail(){
	}

    public FanyaUserDetail(String uid, String loginName, String realName, String email, Integer gradeId, Integer classId, Integer ageGroupId, String level, String fid, Integer aid, Integer userTypeId) {
        this.uid = uid;
        this.loginName = loginName;
        this.realName = realName;
        this.email = email;
        this.gradeId = gradeId;
        this.classId = classId;
        this.ageGroupId = ageGroupId;
        this.level = level;
        this.readingFaceLevel = level;
        this.fid = fid;
        this.aid = aid;
        this.userTypeId = userTypeId;
        this.createTime = new Date();
        this.modifyTime = new Date();
        this.star = 0;
        this.integral = 0;
        this.createUserId = 1;
        this.modifyUserId = 1;
        this.perfectStatus = 0;
		this.userTypeAuthFlag = 0;
		this.status = 1;
    }
    public FanyaUserDetail(String uid, String loginName, String realName, String email, Integer gradeId, Integer classId, Integer ageGroupId, String level, String fid, Integer userTypeId) {
        this.uid = uid;
        this.loginName = loginName;
        this.realName = realName;
        this.email = email;
        this.gradeId = gradeId;
        this.classId = classId;
        this.ageGroupId = ageGroupId;
        this.level = level;
        this.readingFaceLevel = level;
        this.fid = fid;
        this.userTypeId = userTypeId;
        this.createTime = new Date();
        this.modifyTime = new Date();
        this.star = 0;
        this.integral = 0;
        this.createUserId = 1;
        this.modifyUserId = 1;
        this.perfectStatus = 0;
		this.userTypeAuthFlag = 0;
		this.status = 1;
    }

	public Integer getAid() {
		return aid;
	}

	public void setAid(Integer aid) {
		this.aid = aid;
	}
	public FanyaUserDetail(
		Integer id
	){
		this.id = id;
	}

	public String getCityCode() {
		return cityCode;
	}

	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
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
	public void setLoginName(String value) {
		this.loginName = value;
	}
	
	public String getLoginName() {
		return this.loginName;
	}
	public void setRealName(String value) {
		this.realName = value;
	}
	
	public String getRealName() {
		return this.realName;
	}
	public void setEmail(String value) {
		this.email = value;
	}
	
	public String getEmail() {
		return this.email;
	}
	public void setGender(String value) {
		this.gender = value;
	}
	
	public String getGender() {
		return this.gender;
	}
	public void setGradeId(Integer value) {
		this.gradeId = value;
	}
	
	public Integer getGradeId() {
		return this.gradeId;
	}
	public void setClassId(Integer value) {
		this.classId = value;
	}
	
	public Integer getClassId() {
		return this.classId;
	}
	public void setAgeGroupId(Integer value) {
		this.ageGroupId = value;
	}
	
	public Integer getAgeGroupId() {
		return this.ageGroupId;
	}
	public void setLevel(String value) {
		this.level = value;
	}
	
	public String getLevel() {
		return this.level;
	}
	public void setReadingFaceLevel(String value) {
		this.readingFaceLevel = value;
	}
	
	public String getReadingFaceLevel() {
		return this.readingFaceLevel;
	}
	public void setStar(Integer value) {
		this.star = value;
	}
	
	public Integer getStar() {
		return this.star;
	}
	public void setIntegral(Integer value) {
		this.integral = value;
	}
	
	public Integer getIntegral() {
		return this.integral;
	}
	public void setReadTime(Integer value) {
		this.readTime = value;
	}
	
	public Integer getReadTime() {
		return this.readTime;
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

	public String getFid() {
		return fid;
	}

	public void setFid(String fid) {
		this.fid = fid;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Integer getUserTypeId() {
		return userTypeId;
	}

	public void setUserTypeId(Integer userTypeId) {
		this.userTypeId = userTypeId;
	}

	public Integer getPerfectStatus() {
		return perfectStatus;
	}

	public void setPerfectStatus(Integer perfectStatus) {
		this.perfectStatus = perfectStatus;
	}

	public Integer getUserTypeAuthFlag() {
		return userTypeAuthFlag;
	}

	public void setUserTypeAuthFlag(Integer userTypeAuthFlag) {
		this.userTypeAuthFlag = userTypeAuthFlag;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String toString() {
		return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
			.append("Id",getId())
			.append("Uid",getUid())
			.append("LoginName",getLoginName())
			.append("RealName",getRealName())
			.append("Email",getEmail())
			.append("Gender",getGender())
			.append("GradeId",getGradeId())
			.append("ClassId",getClassId())
			.append("AgeGroupId",getAgeGroupId())
			.append("Level",getLevel())
			.append("ReadingFaceLevel",getReadingFaceLevel())
			.append("Star",getStar())
			.append("Integral",getIntegral())
			.append("ReadTime",getReadTime())
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
		if(obj instanceof FanyaUserDetail == false) return false;
		if(this == obj) return true;
		FanyaUserDetail other = (FanyaUserDetail)obj;
		return new EqualsBuilder()
			.append(getId(),other.getId())
			.isEquals();
	}

	/**
	 * 初始化用户 , 不带班级年级信息
	 * @param uid
	 * @param fid
	 * @param roleId
	 * @param uname
	 * @param realName
	 */
	public void initUser(String uid,String fid,Integer roleId,String uname,String realName){
		this.setUid(uid);
		this.setFid(fid);
		this.setUserTypeId(roleId);
		this.setLoginName(uname);
		this.setRealName(realName);
		this.setAgeGroupId(1);
		this.setLevel("1");
		this.setReadingFaceLevel("1");
		this.setStar(0);
		this.setIntegral(0);
		this.setCreateUserId(1);
		this.setModifyUserId(1);
		this.setModifyTime(new Date());
		this.setUserTypeAuthFlag(0);
		this.setPerfectStatus(0);
		this.setStatus(1);
	}
}

