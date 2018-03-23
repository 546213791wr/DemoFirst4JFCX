package com.interceptor;

import com.alibaba.druid.util.StringUtils;
import com.model.*;
import com.service.*;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MyInterceptor implements HandlerInterceptor {
	private Logger logger = Logger.getLogger(MyInterceptor.class);

	@Resource private FanyaUserDetailService fanyaUserDetailService;
	@Resource private OpenOrgService openOrgService;

	@Override
	public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
		return true;
	}
	@Override
	public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
		FanyaUserDetail user = fanyaUserDetailService.getCurrentUser(httpServletRequest);
		if(user!=null){
			modelAndView.addObject("userRightSTM", user);
			String fid = user.getFid();
			if (!StringUtils.isEmpty(fid)) {
				OpenOrg openOrg = openOrgService.getByFidAndStatus(fid);
				if (openOrg != null) {
					modelAndView.addObject("openOrg", openOrg);
				}
			}
		}
	}
	@Override
	public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

	}
}

