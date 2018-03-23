package com.util;

import com.model.FanyaUser;
import com.service.OpenOrgService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.annotation.Resource;

/**
 * <p>自定义方法参数解析器
 */
public class CurrentUserMethodArgumentResolver implements HandlerMethodArgumentResolver {

   // @Resource private UserService userService;

    @Resource
    private OpenOrgService openOrgService;

    public CurrentUserMethodArgumentResolver() {
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        if (parameter.hasParameterAnnotation(CurrentUser.class) || parameter.getMethodAnnotation(CurrentUser.class) != null) {
            return true;
        }
        return false;
    }

    /** 解析参数, 返回参数值 */
    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

        Object user = null;

        // 拿到域名和机构
//        String host = webRequest.getHeader("Host");
//        String fid = host.substring(0,host.indexOf("."));
//        OpenOrg org = openOrgService.getByFid(fid);
//
//        // 没有对应机构，则直接返回为null
//        if(null == org){
//            throw new IllegalStateException("该域名没有开通访问!,请联系管理员");
//        }

        // cookie方式解析
        CurrentUser currentUserAnnotation = parameter.getParameterAnnotation(CurrentUser.class);
        //从session的scope里取CurrentUser注解里的value属性值的key的value
        user = webRequest.getAttribute(currentUserAnnotation.value(), NativeWebRequest.SCOPE_SESSION);
        if (user == null) {
            Subject subject = SecurityUtils.getSubject();
            if (subject.isAuthenticated()) {
                user = subject.getSession().getAttribute(Constants.SESSION_CURRENT_USER);
                if (user == null) {
                    Session session = subject.getSession();
                    String username = (String) subject.getPrincipal();
                    //user = userService.getByUsername(username);
                    session.setAttribute(Constants.SESSION_CURRENT_USER, user);
                }
            } else {
//                // 模拟一个匿名用户
//                user = new FanyaUser(Constants.DEFAULT_ORG_ID);
            }


        }
        return user;
    }

}

