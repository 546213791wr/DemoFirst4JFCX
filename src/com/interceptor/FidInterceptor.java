package com.interceptor;

import com.model.FanyaUserDetail;
import com.model.OpenOrg;
import com.service.FanyaUserDetailService;
import com.service.OpenOrgService;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 调整为 只拦截移动端的请求。 pc端通过myInterceptor进行拦截
 */
public class FidInterceptor implements HandlerInterceptor {
    @Resource
    private FanyaUserDetailService fanyaUserDetailService;
    @Resource
    private OpenOrgService openOrgService;

    private Logger logger = Logger.getLogger(FidInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        logger.info("check user fid");
        FanyaUserDetail user = fanyaUserDetailService.getCurrentUser(httpServletRequest);
        Boolean flag = true;
        if(user == null){
            flag = false;
        } else {
            String fid = user.getFid();
            if(StringUtils.isBlank(fid)){
                flag = false;
            } else {
                OpenOrg openOrg = openOrgService.getByFidAndStatus(fid);
                if(openOrg == null){
                    flag = false;
                }
            }
        }

        if(!flag){
            String url = httpServletRequest.getRequestURL().toString();
            if (StringUtils.contains(url, "/front/")) {
                httpServletResponse.sendRedirect("/front/fid-error");
            } else if (StringUtils.contains(url, "/m/")) {
                httpServletResponse.sendRedirect("/m/fid-error");
            }
        }

        return flag;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
