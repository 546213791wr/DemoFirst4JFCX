package com.util;

import com.alibaba.fastjson.JSONObject;
import com.jd.open.api.sdk.DefaultJdClient;
import com.jd.open.api.sdk.JdClient;
import com.jd.open.api.sdk.request.cps.ServicePromotionAppGetcodeRequest;
import com.jd.open.api.sdk.request.cps.ServicePromotionGetcodeRequest;
import com.jd.open.api.sdk.request.cps.ServicePromotionWxsqGetCodeByUnionIdRequest;
import com.jd.open.api.sdk.response.cps.ServicePromotionAppGetcodeResponse;
import com.jd.open.api.sdk.response.cps.ServicePromotionGetcodeResponse;
import com.jd.open.api.sdk.response.cps.ServicePromotionWxsqGetCodeByUnionIdResponse;

import java.io.IOException;

public class JDSDKAPICall {
	
	private static final String SERVER_URL = "https://gw.api.360buy.com/routerjson";//
	private static  final String accessToken = "8ec3f08a-ce92-44d1-a6b1-77210b8f1827";//access_token	采用OAuth授权方式为 必填参数
	private static final String appKey = "312CF63F64E6C05F53EE874E4E1F5958";//应用的app_key(京东云控制台应用)
	private static final String appSecret = "47089850b1ce4826b6cab9b1c0ed4505";//应用的App Secret(京东云控制台应用)
	private static final String appId = "737598179";//	京东联盟CPS使用推广的appID 测试账号数据:737598179
	private static final Long unionId = 1000162683L;// 联盟ID  测试数据：1000162683
	private static final String webId = "873866612";// 网站id     测试数据：873866612
	/**
	 * 
	 * 京东联盟APP领取代码接口(单条获取)
	 * 		access_token	采用OAuth授权方式为 必填参数   测试账号数据:8ec3f08a-ce92-44d1-a6b1-77210b8f1827
			app_key	                    应用的app_key(京东云控制台应用) 必填参数  测试账号数据:312CF63F64E6C05F53EE874E4E1F5958
			app_secret		应用的App Secret(京东云控制台应用) 必填参数  测试账号数据:47089850b1ce4826b6cab9b1c0ed4505
			jdurl			需要转换的jd链接 必填参数  https://item.jd.com/11715420.html
			appId	                    京东联盟CPS使用推广的appID 测试账号数据:737598179
			subUnionId	子联盟id 非必需
			positionId	推广位ID 非必需
			ext	扩展字段 非必需
			protocol 传输协议 1为 https 其他为 http 非必需
			
	 * @throws IOException 
	 * 
	 * 
	 * */
	public static String getJDAppPromotionalLinks(String jdurl){
		JdClient client=new DefaultJdClient(SERVER_URL,accessToken,appKey,appSecret);
		com.jd.open.api.sdk.request.cps.ServicePromotionAppGetcodeRequest request=new ServicePromotionAppGetcodeRequest();

		request.setJdurl( jdurl );
		request.setAppId( appId );
		try{
		ServicePromotionAppGetcodeResponse response=client.execute(request);
		String result =  response.getQueryResult();
		String PromotionalLinks = JSONObject.parseObject(result).getString("url");
//		System.out.println(result);
//		System.out.println(PromotionalLinks);
		return PromotionalLinks;
		} catch (Exception e){
			System.err.println("错误链接:"  + jdurl);
		}
		return null;
	}

	/**
	 * jingdong.service.promotion.getcode  (PC端推广)
	 * 自定义链接转换接口(单条获取)
	 * 		access_token	采用OAuth授权方式为 必填参数   测试账号数据:8ec3f08a-ce92-44d1-a6b1-77210b8f1827
			app_key	                    应用的app_key(京东云控制台应用) 必填参数  测试账号数据:312CF63F64E6C05F53EE874E4E1F5958
			app_secret		应用的App Secret(京东云控制台应用) 必填参数  测试账号数据:47089850b1ce4826b6cab9b1c0ed4505
			sign            签名 必填参数
			timestamp		时间戳 必填参数
			
			应用级别输入参数
			名称				类型 		是否必须	描述
			promotionType 	Number 	是	 	推广类型    测试数据：7
			materialId 		String 	是	 	推广物料 就是落地页  测试数据： https://item.jd.com/11715420.html
			unionId 		Number 	是	 	联盟ID  测试数据：1000162683
			subUnionId 		String 	否	 	子联盟ID 
			siteSize 		String 	否	 	推广位尺寸 
			siteId 			String 	否	 	推广位id 
			channel 		String 	是	 	推广渠道（PC/WL） 测试数据：PC
			webId 			String 	是	 	网站id     测试数据：873866612
			extendId 		String 	否	 	扩展字段 
			ext1 			String 	否	 	扩展字段 
			adttype 		String 	是	 	推广渠道 6：cps网站 测试数据：6
			protocol 		Number 	否	 	传输协议 1为https 其他为 http 
	 * 
	 * 
	 * */
	public static String getJDPCPromotionalLinks(String materialId){
		// 基本参数
								
				String adttype = "6";
				String channel = "PC";
				Integer promotionType = 7;
								
				JdClient client=new DefaultJdClient(SERVER_URL,accessToken,appKey,appSecret);
				
				ServicePromotionGetcodeRequest request=new ServicePromotionGetcodeRequest();
				request.setPromotionType(promotionType);
				request.setMaterialId(materialId);
				request.setUnionId(unionId);
				request.setChannel(channel);
				request.setWebId(webId);
				request.setAdttype(adttype);
				
				try{
				ServicePromotionGetcodeResponse response=client.execute(request);
				String result =  response.getQueryjsResult();
				String PromotionalLinks = JSONObject.parseObject(result).getString("url");
//				System.out.println(result);
//				System.out.println(PromotionalLinks);
				return PromotionalLinks;
				} catch (Exception e){
					System.err.println("错误链接:"  + materialId);
				}
				return null;
	}
	
	/**
	 * 微信推广
	 * 系统级别输入参数
	 * 	method			String	是	API接口名称
		access_token	String	是	采用OAuth授权方式为必填参数
		app_key			String	是	应用的app_key
		sign			String	是	签名
		timestamp		String	是	时间戳，格式为yyyy-MM-dd HH:mm:ss，例如：2011-06-16 13:23:30。京东API服务端允许客户端请求时间误差为6分钟
		format			String	否	暂时只支持json
		v				String	否	API协议版本，可选值:2.0
		应用级别输入参数
		proCont 	Number 		是		1 	推广内容：1单品 
		materialIds String[] 	是		skuId，skuId... 	推广物料：单品skuId 
		unionId 	Number 		是	 	联盟ID 
		positionId 	Number 		否	 	推广位ID 
	 * */
	public static String getJDPromotionalLinksByWeiXin(String materialId){
		Integer proCont = 1;
		
		JdClient client=new DefaultJdClient(SERVER_URL,accessToken,appKey,appSecret);

		ServicePromotionWxsqGetCodeByUnionIdRequest request=new ServicePromotionWxsqGetCodeByUnionIdRequest();

		request.setProCont(proCont);
		request.setMaterialIds(materialId);
		request.setUnionId(unionId);
		try{
		ServicePromotionWxsqGetCodeByUnionIdResponse response=client.execute(request);
		String result =  response.getGetcodebysubunionidResult();
		String PromotionalLinks = JSONObject.parseObject(result).getString("url");
		System.out.println(result);
		System.out.println(PromotionalLinks);
		return PromotionalLinks;
		} catch (Exception e){
			System.err.println("错误链接:"  + materialId);
		}

		return null;
	}
	public static void main(String[] args) {
		JDSDKAPICall jd = new JDSDKAPICall();
		System.err.println(jd.getJDAppPromotionalLinks("https://item.jd.com/13206724837"));
	}
}
