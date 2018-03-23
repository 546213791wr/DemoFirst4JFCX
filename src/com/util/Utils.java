package com.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class Utils {
	
	public static final Logger LOGGER = LoggerFactory.getLogger(Utils.class);
	
	
	
	/** 是否是Ajax异步请求 */
	public static boolean isAjaxRequest(HttpServletRequest request){
		
		String accept = request.getHeader("accept");
		String xRequestedWith = request.getHeader("X-Requested-With");

		// 如果是异步请求或是手机端，则直接返回信息
		return ((accept != null && accept.indexOf("application/json") != -1 
			|| (xRequestedWith != null && xRequestedWith.indexOf("XMLHttpRequest") != -1)));
	}
	
	/** 判断访问URI是否是静态文件请求 */
	private static final String[] staticFiles = StringUtils.split(Global.getConfig("web.static.file"), ","); // 静态文件后缀
    public static boolean isStaticFile(String uri){
		if (staticFiles == null){
			throw new RuntimeException("检测到“app.properties”中没有配置“web.staticFile”属性。配置示例：\n#静态文件后缀\n"
					+"web.static.file = .css,.js,.png,.jpg,.gif,.jpeg,.bmp,.ico,.swf,.woff,.psd,.htc,.htm,.html,.crx,.xpi,.exe,.ipa,.apk");
		}
		
		if (StringUtils.startsWith(uri, "/static/") 
				|| StringUtils.startsWith(uri, "/resources/") 
				|| StringUtils.startsWith(uri, "/resource/") 
				|| StringUtils.startsWith(uri, "/upload/") 
				|| StringUtils.endsWithAny(uri, staticFiles)){
			return true;
		}
		return false;
    }

	public static String getFileMd5(String filePath) {
		File file = new File(filePath);
		return getFileMd5(file);
	}
	public static String getFileMd5(File file) {
		String md5 = null;
		if (file.exists()) {
			try {
				InputStream inputStream = new FileInputStream(file);
				md5 = DigestUtils.md5Hex(inputStream);
				LOGGER.trace(file.getAbsolutePath() + " md5: " + md5);
			} catch (Exception e) {
				throw new RuntimeException("get file md5 failure!");
			}
		}
		return md5;
	}
	
	
	public static String printStackTraceToString(Throwable throwable) {
	    StringWriter stringWriter = new StringWriter();
	    throwable.printStackTrace(new PrintWriter(stringWriter, true));
	    return stringWriter.getBuffer().toString();
	}
	
	public static final String getRequestIp(HttpServletRequest request) {
		
		String ip = request.getHeader("X-Real-IP");
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	    	ip = request.getHeader("x-forwarded-for");
	    }
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	        ip = request.getHeader("Proxy-Client-IP");
	    }
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	        ip = request.getHeader("WL-Proxy-Client-IP");
	    }
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	        ip = request.getRemoteAddr();
	    }
	    return ip;
	}
}
