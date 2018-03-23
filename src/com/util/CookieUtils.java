package com.util;

import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLDecoder;

/**
 * by leolin on 19/01/2018.
 * description :
 * version v1.0
 */
public class CookieUtils {


    /**
     * 清理fid uid 对应到的cookie信息
     * @param request
     */
    public static void cleanFidUid(HttpServletRequest request, HttpServletResponse response){
        try {
            Cookie[] cookies = request.getCookies();
            String UID = "uid";
            String FID = "fid";

            if (cookies != null) {
                for (Cookie c : cookies) {
                    if (UID.equals(c.getName().toLowerCase())) {
                        c.setMaxAge(0);
                        c.setPath("/");
                        c.setValue("");

                    }
                    if (FID.equals(c.getName().toLowerCase())) {
                        c.setMaxAge(0);
                        c.setPath("/");
                        c.setValue("");
                    }
                    response.addCookie(c);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        String userId = "";
        String fid = "";
        String uname = "";
        String realname = "";

        try {
            Cookie[] cookies = request.getCookies();
            String UID = "uid";
            String FID = "fid";

            if (cookies != null) {
                for (Cookie c : cookies) {
                    if (UID.equals(c.getName().toLowerCase())) {
                        userId = URLDecoder.decode(c.getValue(), "utf-8");
                    }
                    if (FID.equals(c.getName().toLowerCase())) {
                        fid = URLDecoder.decode(c.getValue(), "utf-8");
                    }

                    if (StringUtils.equals("uname", c.getName())) {
                        uname = URLDecoder.decode(c.getValue(), "utf-8");
                    }

                    if (StringUtils.equals("realname", c.getName())) {
                        realname = URLDecoder.decode(c.getValue(), "utf-8");
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println(userId + " -- " + fid);
    }
}
