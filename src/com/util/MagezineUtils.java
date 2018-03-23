package com.util;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;

/**
 * by leolin on 08/01/2018.
 * description :
 * version v1.0
 */


public final class MagezineUtils {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 获取授权访问地址
     * @param url
     * @return
     */
    public static String getAuthorizeUrl(String url) {

        String time = DateFormatUtils.format(new Date(), "yyyy-MM-ddHH");
        String token = DigestUtils.md5Hex("127.0.0.1" + time + "E43B787AB2CB2C40F8DA15335D55F759" + "cdydzxddrz" + "test" + "[33766]").toUpperCase();
        String authorizeUrl = "http://fxlogin.chaoxing.com/searchdsr.jsp?userform=cdydzxddrz&account=test&type=lib&enc=" + token + "&mirror=1&sunitid=33766&successurl=";
        return authorizeUrl + url;
    }

    /** demo */
    public static void main(String[] args) {

        String time = DateFormatUtils.format(new Date(), "yyyy-MM-ddHH");
        System.err.println(time);
        String t = DigestUtils.md5Hex("127.0.0.1" + time + "E43B787AB2CB2C40F8DA15335D55F759"
                + "cdydzxddrz" + "test" + "[33766]").toUpperCase();


        System.out.println("http://fxlogin.chaoxing.com/searchdsr.jsp?userform=cdydzxddrz&" +
                "account=test" +
                "&type=lib&enc="
                + t + "&mirror=1&sunitid=33766" +
                "&successurl=http://qikan.chaoxing.com/mag/infos?mags=f060de13d3de0a368aa15952ff164957");

    }

}

/*
http://qikan.chaoxing.com/mag/infos?mags=f060de13d3de0a368aa15952ff164957
http://m.chaoxing.com/mqk/list?sw=&mags=c5aa19d5a97868b37e702e4d0702d794&from=space
 */
