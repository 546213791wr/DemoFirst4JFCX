package com.controller.front;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.model.FanyaUserDetail;
import com.model.LoginResultBean;
import com.model.OpenOrg;
import com.service.FanyaUserDetailService;
import com.service.OpenOrgService;
import com.util.*;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.StatusLine;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: leolin
 * Date: 2017/6/7_19:58
 * version:
 * description:
 */
@Controller
@RequestMapping("login")
public class LoginController {

    Logger logger = Logger.getLogger(LoginController.class);

    @Resource
    private FanyaUserDetailService fanyaUserDetailService;

    @Resource
    private OpenOrgService openOrgService;


    /**
     * 跳转至登录页面
     * @return
     */
    @RequestMapping(value = "",method = RequestMethod.GET)
    public String login(Model model, HttpServletRequest request, HttpServletResponse response){
        request.getSession().invalidate();

//        CookieUtils.cleanFidUid(request,response);

        OpenOrg openOrg = openOrgService.getFromDomain(request);
        if (openOrg != null) {
            model.addAttribute("openOrg",openOrg);
        }
        return "login";
    }



    /**
     * 跳转至登录页面
     * @return
     */
    @RequestMapping(value = "log-out",method = RequestMethod.GET)
    @ResponseBody
    public JsonResponse logOut(Model model, HttpServletRequest request, HttpServletResponse response){
        request.getSession().invalidate();

        CookieUtils.cleanFidUid(request,response);

        // 不做服务器缓存，浏览器缓存。客户端每次请求都是打开新内容。防止动态头部内容缓存，后退再前进数据还保留问题。
        response.setHeader("Cache-Control","no-cache");
        response.setHeader("Cache-Control","no-store");
        response.setDateHeader("Expires", 0);
        response.setHeader("Pragma","no-cache");
        return new JsonResponse(JsonResponse.CODE_SUCCESS,"ok");
    }

    /**
     * 调用超星集团统一接口做用户验证
     * @param model
     * @param fid
     * @param username
     * @param password
     * @return
     */
//    @CrossOrigin
    @RequestMapping(value = "login-fid")
    @ResponseBody
    public JsonResponse loginFid(Model model, String fid, String username, String password, HttpServletResponse response, HttpServletRequest request) {
        if (StringUtils.isEmpty(fid)) {
            fid = Constants.DEFAULT_ORG_ID;
        }

        username = StringUtil.trim(username);
        password = StringUtil.trim(password);
        String loginUrl = String.format(Constants.LOGIN, fid, username, password);

        boolean phoneNum = false;
        String resultFID = get(loginUrl, true, response);
        LoginResultBean phoneBean = JSON.parseObject(resultFID, LoginResultBean.class);
        if ( ! phoneBean.isResult() && phoneBean.getErrorMsg().equals("用户不存在")) {
            if(Constants.matchPhone(username)){
                loginUrl = String.format(Constants.LOGIN_PHONE, username, password);
                phoneNum = true;
            }
        }



        String result = get(loginUrl, true, response);
        LoginResultBean loginResultBean = JSON.parseObject(result, LoginResultBean.class);

        logger.info(loginResultBean);
        if (loginResultBean.isResult()) {
            OpenOrg org = openOrgService.getByFid(fid);
            List<OpenOrg> orgList = openOrgService.getByGid(org.getGid());
            for (Iterator<OpenOrg> orgIter = orgList.iterator(); orgIter.hasNext(); ) {
                OpenOrg openOrg = orgIter.next();
                //每个机构校验下密码，密码错误从机构选择列表删除
                loginUrl = String.format(Constants.LOGIN, openOrg.getFid(), username, password);

                if(Constants.matchPhone(username) && phoneNum){
                    loginUrl = String.format(Constants.LOGIN_PHONE, username, password);
                }

                result = get(loginUrl, true, response);
                loginResultBean = JSON.parseObject(result, LoginResultBean.class);
                if (!loginResultBean.isResult()) {
                    orgIter.remove();
                }
            }
            return new JsonResponse(JsonResponse.CODE_SUCCESS,"ok").put("orgList",orgList);
        }else{
            Integer resetPwd = 0;
            FanyaUserDetail userDetail = fanyaUserDetailService.getUserByNameAndFid(username,fid);
            if (loginResultBean.getErrorMsg() != null && loginResultBean.getErrorMsg().startsWith("您的密码过于简单")) {
                resetPwd = 1;
                String uid = "";
                if(null != userDetail){
                    uid = userDetail.getUid();
                }
                return new JsonResponse(JsonResponse.CODE_FAILURE, "error").
                        put("msg", StringUtils.isEmpty(loginResultBean.getErrorMsg()) ? "登录失败" : loginResultBean.getErrorMsg())
                        .put("resetPwd", resetPwd).put("uid", uid);

            }else{
                return new JsonResponse(JsonResponse.CODE_FAILURE,"error").put("msg",loginResultBean.getErrorMsg());
            }

        }
    }

    /**
     * 根据获取的用户uid和fid情况进行内部登录
     *
     * @param username
     * @param password
     * @param fid
     * @return
     */
//    @CrossOrigin
    @RequestMapping(value = "login-in")
    @ResponseBody
    public JsonResponse loginIn(String username, String password, String fid, HttpServletResponse response, HttpServletRequest request) {

        username = StringUtil.trim(username);
        password = StringUtil.trim(password);
        String loginUrl = String.format(Constants.LOGIN, fid, username, password);

        String resultFID = get(loginUrl, true, response);
        LoginResultBean phoneBean = JSON.parseObject(resultFID, LoginResultBean.class);
        if ( ! phoneBean.isResult() && phoneBean.getErrorMsg().equals("用户不存在")) {
            if(Constants.matchPhone(username)){
                loginUrl = String.format(Constants.LOGIN_PHONE, username, password);
            }
        }


        String result = get(loginUrl, true, response);
        LoginResultBean loginResultBean = JSON.parseObject(result, LoginResultBean.class);

        if (loginResultBean.isResult()) {
            // 根据uid 拿到xy_fanya_user 数据。并且判断机构是否内部开通
            OpenOrg org = openOrgService.getByFid(fid);
            // 没有开通对应的机构，则默认访问到学雅这个机构下面。
            String url = null;
            url = "/front/pt-index";
//            if (null == org) {
//            } else {
//                // 获取到该机构实际应该跳转的地址。
//                url = org.getDomainUrl();
//
//                // 目前条默认首页。
//                url = "http://" + url + "." + Global.getConfig("DOMAIN.URL") + "/front/index";
//            }
            return new JsonResponse(JsonResponse.CODE_SUCCESS, "ok").put("url", url);
        } else {
            Integer resetPwd = 0;
            String uid = "";
            String msg = "登录出错";
            FanyaUserDetail userDetail = fanyaUserDetailService.getUserByNameAndFid(username,fid);
            if(loginResultBean.getErrorMsg().startsWith("您的密码过于简单")){
                resetPwd = 1;
            }
            if(null != userDetail){
                uid = userDetail.getUid();
            }
            return new JsonResponse(JsonResponse.CODE_FAILURE, "error").put("resetPwd", resetPwd).put("uid", uid).put("msg",msg);
        }
    }

//    @CrossOrigin
    @RequestMapping(value = "chpwd")
    @ResponseBody
    public JsonResponse changePwd(String url, HttpServletResponse response, HttpServletRequest request) {

        String responseStr = get(url, false, response);
        JSONObject jsonObject = JSON.parseObject(responseStr);
        boolean result = jsonObject.getBoolean("result");
        String mes = jsonObject.getString("mes");
        if(result) {
            return new JsonResponse(JsonResponse.CODE_SUCCESS, "ok");
        }else{
            return new JsonResponse(JsonResponse.CODE_FAILURE, mes);
        }
    }

    /**
     * 检查用户是否登录
     *
     * @return
     */
    @RequestMapping(value = "checkLogin")
    @ResponseBody
    public JsonResponse checkLogin(HttpServletRequest request) {
        FanyaUserDetail fanyaUser = fanyaUserDetailService.getCurrentUser(request);
        if(fanyaUser == null){
            return new JsonResponse(JsonResponse.CODE_FAILURE, "not login");
        } else {
            return new JsonResponse(JsonResponse.CODE_SUCCESS, "ok");
        }
    }

    /**
     * http 请求
     * @param url
     * @param setCookie
     * @param httpServletResponse
     * @return
     */
    public static String get(String url, boolean setCookie, HttpServletResponse httpServletResponse){
        CloseableHttpClient httpclient = HttpClients.createDefault();
        CloseableHttpResponse response = null;
        String result = null;
        try {
            HttpGet httpget = new HttpGet(url);
            response = httpclient.execute(httpget);
            HttpEntity entity = response.getEntity();
            StatusLine statusLine = response.getStatusLine();
            if (entity != null) {
                result = EntityUtils.toString(entity);
                if(setCookie){
                    setCookie(response, httpServletResponse);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                response.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
            try {
                httpclient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return result;
    }

    /**
     * cookie 保存
     * @param response
     * @param httpServletResponse
     */
    private static void setCookie(CloseableHttpResponse response, HttpServletResponse httpServletResponse){
        try {
            Header[] headers = response.getAllHeaders();
            for(Header header : headers){
                if("Set-Cookie".equals(header.getName())){
                    List<Cookie> cookies = new ArrayList<Cookie>();
                    String cookieValue = header.getValue();
                    String[] keyValues = cookieValue.split(";");
                    if(keyValues != null){
                        String domain = "";
                        String path = "";
                        for(String keyValue : keyValues){
                            if(keyValue.indexOf("=") < 0){
                                continue;
                            }
                            String[] cookie = keyValue.split("=");
                            String key = cookie[0];
                            String value = cookie[1];
                            if(!StringUtils.isEmpty(key) && !"Domain".equals(key.trim()) && !"Path".equals(key.trim())){
                                Cookie httpCookie;
                                try {
                                    httpCookie = new Cookie(key.trim(), StringUtils.isEmpty(value) ? "" : value.trim());
                                    cookies.add(httpCookie);
                                } catch (Exception e) {
                                }
                            }
                            if("Domain".equals(key.trim())){
                                domain = value.trim();
                            }
                            if("Path".equals(key.trim())){
                                path = value.trim();
                            }
                        }
                        for(Cookie cookie : cookies){
                            cookie.setDomain(domain);
                            cookie.setPath(path);
                            httpServletResponse.addCookie(cookie);
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
        }
    }

}
