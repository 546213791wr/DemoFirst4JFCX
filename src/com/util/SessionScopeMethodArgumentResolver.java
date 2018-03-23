package com.util;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

/** 解析SessionScope注解并赋值 */
public class SessionScopeMethodArgumentResolver implements HandlerMethodArgumentResolver {

    public SessionScopeMethodArgumentResolver() {
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        if (parameter.hasParameterAnnotation(SessionScope.class) || parameter.getMethodAnnotation(SessionScope.class) != null) {
            return true;
        }
        return false;
    }
    
    /** 解析参数, 返回参数值 */
    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        
    	//从session中取SessionScope注解里的value属性值的key的value
        String annotationValue = parameter.getParameterAnnotation(SessionScope.class).value();
        if (StringUtils.isEmpty(annotationValue)) {
			annotationValue = parameter.getMethodAnnotation(SessionScope.class).value();
		}
        
        if (StringUtils.isEmpty(annotationValue)) {
			throw new IllegalStateException("SessionScope Annotation must have a value.");
		}
        
        return webRequest.getAttribute(annotationValue, NativeWebRequest.SCOPE_SESSION);
    }
}

