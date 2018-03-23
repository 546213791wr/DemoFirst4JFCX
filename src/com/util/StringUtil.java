package com.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtil {

	public static String returnSpaceIfNull(Object object) {
		return object == null ? "" : object.toString();
	}
	public static Integer getInteger(Object object){
		if(object == null){
			return null;
		}
		String integerValue = object.toString();
		if("".equals(integerValue.trim())){
			return null;
		}
		return Integer.valueOf(integerValue);
	}
	public static String getString(Object object){
		return returnSpaceIfNull(object);
	}
	/** 是否为空字符串
	 * @Description: 
	 * @version: 2015年12月3日 下午8:10:36
	 * @param str
	 * @return boolean
	 */
	public static boolean isEmpty(String str) {
		return (str == null || "".equals(str.trim()));
	}
	/** 是否为空字符串
	 * @Description: 
	 * @version: 2015年12月3日 下午8:10:36
	 * @param str
	 * @return boolean
	 */
	public static boolean isEmpty(Object str) {
		return (str == null || "".equals(str.toString().trim()));
	}

	public static String trim(String str) {
		if(isEmpty(str)){
			return str;
		} else {
			return str.trim();
		}
	}


	/**
	 * 根据名称获取年级年份
	 * @param name
	 * @return
	 */
	public static String getYear(String name){
		Pattern pattern = Pattern.compile("\\d{4}");
		Matcher matcher = pattern.matcher(name);
		if (matcher.find()) {
			return matcher.group();
		}
		return null;
	}

	/**
	 * 根据str获取数字
	 * @param str
	 * @return
	 */
	public static String getNum(String str){
		Pattern pattern = Pattern.compile("\\d{1,}");
		Matcher matcher = pattern.matcher(str);
		if (matcher.find()) {
			return matcher.group();
		}
		return null;
	}
}
