/** 
 * @fileName：AjaxBean.java  
 * 2017年7月5日 下午5:35:57
 * @version: ver 1.0
 * Copyright Corporation 2017   
 */
package com.util;

import java.io.Serializable;
import java.util.Map;

/** 
 * @className: AjaxBean 
 * @Description:  
 * @author: 王文彬 
 * @date:2017年7月5日 下午5:35:57 
 * @version: ver 1.0
 */
public class AjaxBean implements Serializable {

	/** 
	 * @since Ver 1.0  
	 */
	private static final long serialVersionUID = 1L;
	
	/** 相应结果 */
	private boolean success;
	/** 返回信息 */
	protected String msg;
	/** 返回的附加信息 */
	private Map<String, Object> map;
	
	public AjaxBean() {
		super();
	}

	public AjaxBean(boolean success, String msg){
		this.success = success;
		this.msg = msg;
	}
	
	public AjaxBean(boolean success, String msg, Map<String, Object> map){
		this.success = success;
		this.msg = msg;
		this.map = map;
	}
	
	//getter and setter
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public Map<String, Object> getMap() {
		return map;
	}
	public void setMap(Map<String, Object> map) {
		this.map = map;
	}
	
}
