package com.util;

import java.io.Serializable;

/**
 * 积分系统常量
 */
public final class JiFenConstants implements Serializable{
	/**
	 * 积分、星币来源
	 */
	public static final int ORIGIN_TYPE_OF_SIGN = 1; //签到
	public static final int ORIGIN_TYPE_OF_EVALUATE = 2; //测评
	public static final int ORIGIN_TYPE_OF_SUBMIT_READ_REPORT = 3; //提交读后感
	public static final int ORIGIN_TYPE_OF_EXCELLENT_READ_REPORT = 4; //读后感评优
	public static final int ORIGIN_TYPE_OF_PRAISE_READ_REPORT = 5; //读后感点赞
		public static final int ORIGIN_TYPE_OF_READ_UPLEVEL = 6; //用户升级

	/**
	 * 积分星币记录货币类型
	 */
	public static final int COIN_TYPE_OF_JIFEN = 1; //积分
	public static final int COIN_TYPE_OF_STAR = 2; //星币

	/**
	 * 签到获取积分
	 */
	public static final int JIFEN_OF_SIGN = 5; //签到获取积分

	/**
	 * 测评获取的积分
	 */
	public static final int JIFEN_OF_EVALUATE_FAIl = 10; //测评未通过获取积分
	public static final int JIFEN_OF_EVALUATE_PASS = 20; //测评通过获取积分

	/**
	 * 阅读时长获取的积分
	 */
	public static final int JIFEN_OF_READ_TIME_1_15_MIN = 5; //阅读时长1-15分钟获取积分
	public static final int JIFEN_OF_READ_TIME_16_30_MIN = 10; //阅读时长16-30分钟获取积分
	public static final int JIFEN_OF_READ_TIME_31_60_MIN = 30; //阅读时长31-60分钟获取积分
	public static final int JIFEN_OF_READ_TIME_GT_60_MIN = 50; //阅读时长>60分钟获取积分

	/**
	 * 读后感获取的积分
	 */
	public static final int JIFEN_OF_1ST_READ_REPORT_COMMIT = 20; //首个读后感提交获取积分

	/**
	 * 签到获取星币（一个范围）
	 */
	public static final int STAR_OF_SIGN_3_DAY_MIN = 1; //连续签到3天获取星币最小值
	public static final int STAR_OF_SIGN_3_DAY_MAX = 5; //连续签到3天获取星币最大值
	public static final int STAR_OF_SIGN_5_DAY_MIN = 6; //连续签到5天获取星币最小值
	public static final int STAR_OF_SIGN_5_DAY_MAX = 10; //连续签到5天获取星币最大值

	/**
	 * 测评获取星币(不同正确率星不一样)
	 */
	public static final int STAR_OF_EVALUATE_60_79_RL = 20; //测评正确率60-79%获取星币
	public static final int STAR_OF_EVALUATE_80_99_RL = 40; //测评正确率80-99%获取星币
	public static final int STAR_OF_EVALUATE_100_RL = 50; //测评正确率100%获取星币

	/**
	 * 阅读时长获取的星币
	 */
	public static final int STAR_OF_READ_TIME_1_15_MIN = 5; //阅读时长1-15分钟获取星币
	public static final int STAR_OF_READ_TIME_16_30_MIN = 10; //阅读时长16-30分钟获取星币
	public static final int STAR_OF_READ_TIME_31_60_MIN = 30; //阅读时长31-60分钟获取星币
	public static final int STAR_OF_READ_TIME_GT_60_MIN = 50; //阅读时长>60分钟获取星币

	/**
	 * 读后感获取的星币
	 */
	public static final int STAR_OF_READ_REPORT_EXCELLENT = 20; //读后感评优获取星币
	public static final int STAR_OF_READ_REPORT_PRAISE = 1; //读后感点赞获取星币

	public static final int MAX_NUM_OF_GAIN_STAR_FOR_PRAISE = 20; //读后感点赞获取星币的最大次数

}

