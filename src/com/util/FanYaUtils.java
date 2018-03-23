package com.util;

import java.util.Date;

import com.alibaba.fastjson.JSONObject;
import org.apache.commons.codec.digest.DigestUtils;

/**
 * 泛雅接口调用工具类
 */
public class FanYaUtils {

    /**
     * 泛雅用户注册
     *
     * @param fid
     * @param loginName
     * @param password
     * @param realName
     * @param email
     * @param phone
     * @param role
     * @return
     */
    public static JSONObject userRegist(String fid, String loginName, String password, String realName, String email,
                                        String phone, String role) {
        String enc = DigestUtils.md5Hex(loginName + email + phone + DateUtils.date2String(new Date(), "yyyy-MM-dd") +
                "uWwjeEKsri").toUpperCase();
        String registUrl = String.format(Constants.GET_USER_REGIST, fid, loginName, email, phone, password, realName,
                role, enc);
        HttpRequest httpRequest = new HttpRequest();
        String result = "";
        try {
            result = httpRequest.doGet(registUrl);
            JSONObject jsonResult = JSONObject.parseObject(result);
            return jsonResult;
        } catch (Exception e) {
            return null;
        }
    }
}
