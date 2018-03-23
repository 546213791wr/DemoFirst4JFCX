/**
 * 
 */
package com.util;

import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.conn.params.ConnRoutePNames;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * @author Administrator
 * 
 */
public class HttpWebClient {
    static final String ENCODE = "UTF-8";

    private HttpClient httpclient;

    /**
     * 默认构造
     */
    public HttpWebClient() {
        httpclient = new DefaultHttpClient();
        httpclient.getConnectionManager().closeIdleConnections(30, TimeUnit.SECONDS);
    }

    /**
     * 使用代理，ip和端口
     * 
     * @param ip
     * @param port
     */
    public HttpWebClient(String ip, int port) {
        this();
        HttpHost proxy = new HttpHost(ip, port);
        httpclient.getParams().setParameter(ConnRoutePNames.DEFAULT_PROXY, proxy);
    }

    /**
     * 发送http的get方式请求
     * 
     * @param url
     *            接口地址
     * @return
     * @throws IOException
     */
    public String httpget(String url) throws IOException {
        return httpget(url, null);
    }

    /**
     * 发送带header的http的get方式请求
     * 
     * @param url
     * @param headers
     * @return
     * @throws IOException
     */
    public String httpget(String url, Map<String, String> headers) throws IOException {
        HttpGet get = new HttpGet(url);
        setHttpHeader(get, headers);
        return httpget(get);
    }

    private void setHttpHeader(HttpUriRequest request, Map<String, String> headers) {
        if (headers != null && !headers.isEmpty()) {
            for (Map.Entry<String, String> entry : headers.entrySet()) {
                request.addHeader(entry.getKey(), entry.getValue());
            }
        }
    }

    /**
     * 发送http的get方式请求
     * 
     * @param get
     * @return
     * @throws IOException
     */
    public String httpget(HttpGet get) throws IOException {
        HttpResponse response = httpclient.execute(get);
        return getResponseBodyAsString(response);
    }

    /**
     * 
     * 【功能描述：获取http请求的返回信息】
     * 
     * @see 【类、类#方法、类#成员】
     * @param response
     * @return
     * @throws IOException
     */
    private String getResponseBodyAsString(HttpResponse response) throws IOException {
        if (response.getStatusLine().getStatusCode() != 200) {
            return "";
        }
        HttpEntity httpEntity = response.getEntity();
        String html = null;
        if (httpEntity != null) {
            html = EntityUtils.toString(httpEntity, ENCODE);
            EntityUtils.consume(httpEntity);
        }
        return html;
    }

    /**
     * 发送http的post方式请求，直接post字符串
     * 
     * @param url
     * @param content
     *            post字符串
     * @return
     * @throws IOException
     */
    public String httppost(String url, String content) throws IOException {
        return httppost(url, null, content);
    }

    /**
     * 发送带header的http的post方式请求，直接post字符串
     * 
     * @param url
     * @param headers
     * @param content
     *            post字符串
     * @return
     * @throws IOException
     */
    public String httppost(String url, Map<String, String> headers, String content) throws IOException {
        HttpPost httpPost = new HttpPost(url);
        setHttpHeader(httpPost, headers);
        return httppost(httpPost, content);
    }

    /**
     * 发送带header的http的post方式请求，以NameValuePair方式post
     * 
     * @param url
     * @param headers
     * @param params
     *            NameValuePair
     * @return
     * @throws IOException
     */
    public String httppost(String url, Map<String, String> headers, Map<String, String> params) throws IOException {
        HttpPost httpPost = new HttpPost(url);
        setHttpHeader(httpPost, headers);
        setHttpParams(httpPost, params);
        return httppost(httpPost);
    }

    private void setHttpParams(HttpPost httpPost, Map<String, String> params) throws UnsupportedEncodingException {
        ArrayList<NameValuePair> nvps = new ArrayList<NameValuePair>();
        if (params != null && !params.isEmpty()) {
            for (Map.Entry<String, String> entry : params.entrySet()) {
                nvps.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
            }
        }
        httpPost.setEntity(new UrlEncodedFormEntity(nvps, ENCODE));
    }

    /**
     * 发送http的post方式请求，直接发送字符串
     * 
     * @param post
     * @param content
     * @return
     * @throws IOException
     */
    public String httppost(HttpPost post, String content) throws IOException {
        StringEntity reqEntity = new StringEntity(content, ENCODE);
        post.setEntity(reqEntity);
        return httppost(post);
    }

    /**
     * 发送http的post方式请求
     * 
     * @param post
     * @return
     * @throws IOException
     */
    public String httppost(HttpPost post) throws IOException {
        HttpResponse response = httpclient.execute(post);
        return getResponseBodyAsString(response);
    }

    /**
     * http连接不用后需要关闭
     */
    public void close() {
        httpclient.getConnectionManager().shutdown();
    }

    /**
     * 
     * @return
     */
    public HttpClient getHttpclient() {
        return httpclient;
    }
    
    public static String urlEncode(String content, String charset) {
		if (content == null)
			return null;
		try{
			return URLEncoder.encode(content, (charset != null) ? charset : HTTP.DEF_CONTENT_CHARSET.name());
		}
		catch (UnsupportedEncodingException ex) {
			throw new IllegalArgumentException(ex);
			}
		}

    /**
     * post content 全部UTF8方式。
     * @param url
     * @param content
     * @return
     */
    public String postContent(String url,String content){
        BufferedReader in = null;
        String result = "";
        try {
            // 实例化HTTP方法
            HttpPost request = new HttpPost(url);

            StringEntity entity = new StringEntity(content);
            request.setEntity(entity);
            // 执行请求
            HttpResponse response = httpclient.execute(request);

            in = new BufferedReader(new InputStreamReader(response.getEntity()
                    .getContent(),"UTF-8"));
            StringBuffer sb = new StringBuffer("");
            String line = "";
            String NL = System.getProperty("line.separator");
            while ((line = in.readLine()) != null) {
                sb.append(line + NL);
            }
            in.close();
            result = sb.toString();
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }
}
