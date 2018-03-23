/** 
 * @fileName：LoginResultBean.java  
 * 2016年3月7日 下午4:34:21
 * @version: ver 1.0
 * Copyright Corporation 2016   
 */
package com.model;

public class LoginResultBean {
	
	/** 登录的结果 */
	private boolean result;
	private String cxid;
	private String email;
	private String realname;
	private String roleid;
	private String schoolid;
	private String uid;
	private String uname;
	private String errorMsg;
	
	//getter and setter
	public boolean isResult() {
		return result;
	}
	public void setResult(boolean result) {
		this.result = result;
	}
	public String getCxid() {
		return cxid;
	}
	public void setCxid(String cxid) {
		this.cxid = cxid;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRealname() {
		return realname;
	}
	public void setRealname(String realname) {
		this.realname = realname;
	}
	public String getRoleid() {
		return roleid;
	}
	public void setRoleid(String roleid) {
		this.roleid = roleid;
	}
	public String getSchoolid() {
		return schoolid;
	}
	public void setSchoolid(String schoolid) {
		this.schoolid = schoolid;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public String getErrorMsg() {
		return errorMsg;
	}
	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	@Override
	public String toString() {
		return "LoginResultBean{" +
				"result=" + result +
				", cxid='" + cxid + '\'' +
				", email='" + email + '\'' +
				", realname='" + realname + '\'' +
				", roleid='" + roleid + '\'' +
				", schoolid='" + schoolid + '\'' +
				", uid='" + uid + '\'' +
				", uname='" + uname + '\'' +
				", errorMsg='" + errorMsg + '\'' +
				'}';
	}
}
