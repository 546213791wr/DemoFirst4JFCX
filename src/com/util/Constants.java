package com.util;

import java.io.Serializable;
import java.util.regex.Pattern;

/** 系统常量 */
public final class Constants implements Serializable{

	public static final String MODULES_READ = "阅读";
	public static final String SYSTEM_NAME = "通用后台管理";

	public static final String SESSION_CURRENT_USER = "loginUser";
//	public static final String SESSION_CURRENT_FANYA_USER = "currentFanyaUser";
	public static final String SESSION_CURRENT_FANYA_USER_DETAIL = "currentFanyaUserDetail";
	public static final String SESSION_CURRENT_USER_FANYA_ID = "fanyaUserId";
	public static final String DEFAULT_LOGO_URL = "/f_resources/img/logo.png";
	/**
	 * 设置系统默认匿名机构
	 */
	public static final String DEFAULT_ORG_ID = "10988";

	/** 默认问题数量 */
	public static final Integer DEFAULT_QUESTION_NUMBER = 1;

	/**任务的资源类型---图书*/
	public static final String MISSION_RESOURCE_TYPE_BOOK = "book";
	/**任务的资源类型---专题*/
	public static final String MISSION_RESOURCE_TYPE_SPECIAL_TOPIC = "special_topic";
//	/** 任务的发布状态（教师）*/
//	/** 已发布 */
//	public static final String MISSION_PUBLISH_STATUS_PUBLISHED = "1";
//	public static final String MISSION_PUBLISH_STATUS_PUBLISHED_NAME = "已发布";
//	/** 已关闭 */
//	public static final String MISSION_PUBLISH_STATUS_SHUTTED = "2";
//	public static final String MISSION_PUBLISH_STATUS_SHUTTED_NAME = "已关闭";
//	/** 任务的完成状态（学生）*/
//	/** 正在进行 */
//	public static final String MISSION_STATUS_PASSING = "1";
//	public static final String MISSION_STATUS_PASSING_NAME = "正在进行";
//	/** 通过 */
//	public static final String MISSION_STATUS_PASSED = "2";
//	public static final String MISSION_STATUS_PASSED_NAME = "通过";
//	/** 未通过 */
//	public static final String MISSION_STATUS_NOT_PASS = "3";
//	public static final String MISSION_STATUS_NOT_PASS_NAME = "未通过";
	// ------ 常用配置 -------
	public static final String CODE = "code";
	public static final String CODE_SUCCESS = "1";
	public static final String CODE_FAILURE = "0";
	public static final String MESSAGE = "message";

	public static final String UID = "53052313";
	//默认usertype
	public static final Integer USER_TYPE_ID = 1;
	//默认level
	public static final String USER_LEVEL = "1";
	// 默认前端分页尺寸
	public static final int PAGE_SIZE_10 = 20;
	// 默认前端分页尺寸
	public static final int PAGE_SIZE_5 = 5;
	// 默认课程分页sizes
	public static final int PAGE_SIZE_COURSE = 16;

	public static final Double PAPER_PASS_LV = 0.6;
	
	public static final String BOOK_STUDENT_HREF = "/front/book/index?id=1000";
	public static final String BOOK_TEACHER_HREF = "/front/book/index?id=4000";
	// 移动端默认分页尺寸
	public static final int M_PAGE_SIZE = 10;

	/** 用户连续通过测评次数及可升级 */
	public static final Integer LEVEL_USER_UP_EVALUATE_NUM = 5;

	/** 机构cookie 常量 */
    public static final String ORGANIZATION_COOKIE_KEY = "ORGANIZATION_COOKIE_KEY";
	public static final String DOMAIN_NAME = "area.test.basicedu.chaoxing.com";

	/** 登录地址 */
	public static final String DOMAIN_LOGIN_URL = "/front/login";

    /** redis 默认缓存时间 120分钟 */
    public static final Integer REDIS_CACHE_TIME = 120;

    /****************************************/
	/****读书缓存名称*******************/
	/****************************************/
	public static String REDIS_USER_READER_BOOK = "xueya:user:reader:book";
	public static String REDIS_USER_READER_BOOK_TIME = "xueya:user:reader:book:time";
	/*****************签到积分******************/
	/**默认签到积分*/
	public static Integer SIGN_DEFAULT_INTEGRAL = 5;
	/**默认连续签到每日额外增加积分*/
	public static Integer SIGN_DEFAULT_EXTEND_SCORE = 1;
	/**默认连续签到天数上限*/
	public static Integer SIGN_ROILING_DAY = 7;
	/**连续签到额外积分上限*/
	public static Integer SIGN_ROILING_EXTEND_SCORE = (SIGN_ROILING_DAY - 1) * SIGN_DEFAULT_EXTEND_SCORE;
	/***********************************/
	//用户类型
	public static Integer USER_TYPE_STUDENT = 1;
	public static Integer USER_TYPE_TEACHER = 2;
	public static Integer USER_TYPE_PARENT = 3;

    //学段
	public static Integer AGE_GROUP_1 = 1;
	public static Integer AGE_GROUP_2 = 2;
	public static Integer AGE_GROUP_3 = 3;

	//用户类型(泛雅)
	public static String FANYA_USER_TYPE_STUDENT = "3";
	public static String FANYA_USER_TYPE_TEACHER = "1";


	//机构默认组织架构
	public static String DEFAULT_GRADE ="我的年级";
	public static String DEFAULT_CLASS ="我的班级";
	public static String DEFAULT_TEACHER ="teacher";
	public static String DEFAULT_STUDENT ="student";
	public static String DEFAULT_PASSWORD ="s654321";

    /** 默认缓存的主名称 跟cache.xml 中配置的相同 */
    public final static String FRONT_CACHE_NAME = "xypc_frontCache";

	/** 班级名称 */
	public static final String CLASS_NAME = "CLASS_NAME";

	/**
	 *用户登录接口
	 */
	public static final String LOGIN = "http://passport2.chaoxing.com/api/login?schoolid=%s&name=%s&pwd=%s";

	/**
	 * 标签接口
	 */
	public static final String BOOK_API_FLAG = "http://api.basicedu.chaoxing.com/sync/flag/management/searchBookByFlag.do?flagIds=";
	
	/**
	 * res资源封面接口
	 */
	public static final String BOOK_COVER = "http://mooc1-api.chaoxing.com/gas/course?fields=id,name,imageurl,state,teacherfactor,schools,clazz.fields(id,bbsid)&ids=";
	/**
	 * 期刊资源接口
	 */
//	public static final String MAGZINE = "http://qktest1.chaoxing.com:10070/openapi/search/mag?magid=";
	public static final String MAGZINE = "http://qk.chaoxing.com/openapi/search/mag?magid=";
    /**
     * 课程列表接口地址
     */
	public static final String COURSE_LIST="http://mooc1-api.chaoxing.com/gas/person?userid={userId}&fields=clazz.fields(id,bbsid,isretire,isthirdaq,course.fields(id,name,imageurl,teacherfactor)).type(2),course.fields(id,name,imageurl,teacherfactor).isteachcourse(true)&view=json";
	public static final String COURSE_DETAIL="http://fystat1.fy.chaoxing.com/gas/clazzstat?fields=pcsstat.fields(userId,endbbsscore,endvideoscore,endpvscore,endworkscore,endwork1score,endexamscore,endofflinescore,endattendscore,endactivescore,endreadtimescore,endlivetimescore,score).clazzid({clazzid}).limit({limit}).offset({offset})";
	public static final String STATUS_SUCCESS = "success";
	public static final String STATUS_FAIL = "fail";
	public static final String STATUS_ERROR = "error";
	
	 /**
     * 分享固定访问前缀
     */
	public static final String ADMIN_URL = "http://xueya.chaoxing.com/m/stu-count/";
	public static final String SHARE_URL = "http://xueya.chaoxing.com/m/share/share?shortCode=";
	public static final String SHARE_URL_SUFFIX = "/share";
	/**
	 * 可用与否
	 */
	public static final Integer BEABLE = 1;
	public static final Integer UNABLE = 0;

	//用户拉取接口分页每页数量
	public static final Integer API_PAGE_SIZE = 100;

	/**
	 * 统计用户的最近测评次数，默认20次。
	 */
	public static final Integer COUNT_MAX_EVALUATE_NUM = 20;

	/**
	 * 资源内容链接
	 * @param resId
	 * @return
	 */
	public static String getResUrlByResId(String resId){
		return "http://zhuanti.chaoxing.com/mobile/mooc/tocourse/" + resId;
	}

	/**
	 * 题目附件的地址前缀
	 */
	public static String QUESTION_ANNEX_URL = "http://cdrecharge.test.basicedu.chaoxing.com/pc2.0-img/annex/";
	//public static String QUESTION_ANNEX_URL = "http://static.basicedu.chaoxing.com/m_campusreading/upload/re/annex/";
    // 泛亚数据接口
    // 拉取GID用户组
    public static final String GET_FID_GROUP = "http://mooc1.chaoxing.com/gas/usergroup?fid=%s&gid=%s&offset=0&limit=10&fields=id,gid,groupname,sort";
    // 根据用户组拉取用户列表
    public static final String GET_GROUP_USER_LIST = "http://bigdata-ans.chaoxing.com/api/person?fid=%s&group1=%s";
    // 用户注册
    public static final String GET_USER_REGIST = "https://passport2-api.chaoxing.com/api/register?schoolId=%s&uname=%s&email=%s&phone=%s&pwd=%s&realName=%s&role=%s&enc=%s&ip=";
    // 根据用户UID，拉取用户基本信息。
    public static final String GET_USER__INFO_BY_UID = "http://mooc1-api.chaoxing.com/gas/person?userid=%S&fields=group1,schoolid,roleids,loginname,username";

	/**
	 * icon图地址
	 */
	public static final String ICON_PATH="/upload/image/icon/";
	/**
	 * banner图地址
	 */
	//pc端banner图
	public  static  final  String PC_BANNER_PATH="/upload/image/banner/pc_banner/";
	//移动端banner图
	public  static  final  String M_BANNER_PATH="/upload/image/banner/m_banner/";
	/**
	 * logo图地址
	 */
	public static  final  String LOGO_PATH="/upload/image/logo/";

	/** 获取用户的阅读时长 */
	public static final String READ_TIME_URL = "http://rec.chaoxing.com/api/stat/primary/subject?uid={uid}&cpage=1&size=500";
	public static final String LOGIN_PHONE = "http://passport2.chaoxing.com/api/login?name=%s&pwd=%s";
	/**
	 * 判断手机号匹配
	 * @param phone
	 * @return
	 */
	public static boolean matchPhone(String phone){
		String patternStr = "^1[3|4|5|7|8|9][0-9]{9}$";
		Pattern pattern = Pattern.compile(patternStr);
		// 如果匹配上了，则按手机号登录的方式进行
		if(pattern.matcher(phone).matches()) {
			return true;
		}else {
			return false;
		}
	}
}

