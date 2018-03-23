package com.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class DateUtils {
	//文件日志
	private final static Log log  = LogFactory.getLog(DateUtils.class);
	public static final String FORMATSTR = "yyyy-MM-dd";
	
	public static final String FORMATSTRYMD = "yyyyMMdd";
	
	public static final String FORMATSTRYM = "yyyy-MM";
	
	public static final String FORMATTZ = "yyyy-MM-dd'T'hh:mm:ss'Z'";
	public static final String FORMATT = "yyyy-MM-dd'T'hh:mm:ss";
	
	public static final String FORMATHH = "yyyy-MM-dd HH:mm:ss";

    public static final String FORMATHM = "yyyy-MM-dd HH:mm";
	
	public static final String FORMSTAMP = "yyyyMMddHHmmss";
	public static SimpleDateFormat getSimpleDateFormate(String str){
		return new SimpleDateFormat(str);
	}
	
	public static String date2String(Date date,String formatStr){
		return getSimpleDateFormate(formatStr).format(date);
	}
	
	public static Date string2Date(String dateStr,String formatStr) throws ParseException{
		if(formatStr == null){
			return getSimpleDateFormate(FORMATSTR).parse(dateStr);
		}
		return getSimpleDateFormate(formatStr).parse(dateStr);
	}
	
	public static Date string2DateTZ(String dateStr) throws ParseException{
//		dateStr = dateStr.replace("T", " ");
//		dateStr = dateStr.replace("Z", "");

		Date d = null;
		try{
			d = getSimpleDateFormate(FORMATTZ).parse(dateStr);
		}catch(Exception e){
			d = getSimpleDateFormate(FORMATT).parse(dateStr);
		}
		return d;
	}
	
	/**
	 * 得到年月的 时间格式
	 * @param dateStr
	 * @return
	 * @throws ParseException
	 */
	public static Date string2DateYM(String dateStr) throws ParseException{
		return getSimpleDateFormate(FORMATSTRYM).parse(dateStr);
	}
	public static Date string2DateYMD(String dateStr) throws ParseException{
		return getSimpleDateFormate(FORMATSTRYM).parse(dateStr);
	}
	
	public static Date getNowDate(){
		Date date = null;
		SimpleDateFormat sdf = new SimpleDateFormat(FORMATHH);
		try {
			date = string2Date(sdf.format(Calendar.getInstance().getTime()),FORMATHH);
		} catch (ParseException e) {
			log.error("系统时间转换失败!");
		}
		return date;
		
	}
	public static Long  getTimeDifference(Date date1,Date date2){
		long l1 = Long.valueOf(date2String(date1, FORMSTAMP));
		long l2 = Long.valueOf(date2String(date2, FORMSTAMP));
		return Math.abs(l1-l2);
	}
	
	/**
     * 获取当前时间和1970-01-01之间的总分钟数
     * 
     * @return
     */
    public static long getTimeDiff() {
        String start = "1970-01-01";
        SimpleDateFormat sdf = new SimpleDateFormat(FORMATSTR);
        try {
            Date d = sdf.parse(start);
            Date dt = new Date();
            long diff = dt.getTime() - d.getTime();
            return diff / (1000 * 60);
        } catch (ParseException e) {
        }
        return 0;
    }

	/**
	 * 计算月数
	 * @param date1 <String>
	 * @param date2 <String>
	 * @return int
	 * @throws ParseException
	 */
	public static int getMonthsByStr(String date1, String date2)
			throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
		 return getMonths(sdf.parse(date1), sdf.parse(date2));
	}
	/**
	 * 计算月数
	 * @return int
	 * @throws ParseException
	 */
	public static int getMonths(Date beginDate, Date endDate) {

        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();
        c1.setTime(beginDate);

        c2.setTime(endDate);
        int elapsed = 0;
        if (c1.after(c2)) {
        	Calendar c3;
        	c3 = c2;
            c2 = c1;
            c1 = c3;
        }
        c1.clear(Calendar.MILLISECOND);
        c1.clear(Calendar.SECOND);
        c1.clear(Calendar.MINUTE);
        c1.clear(Calendar.HOUR_OF_DAY);
        c1.clear(Calendar.DATE);
        c2.clear(Calendar.MILLISECOND);
        c2.clear(Calendar.SECOND);
        c2.clear(Calendar.MINUTE);
        c2.clear(Calendar.HOUR_OF_DAY);
        c2.clear(Calendar.DATE);
        while (c1.before(c2)||c1.equals(c2)) {
            c1.add(Calendar.MONTH, 1);
            elapsed++;
        }
        return elapsed;
    }

    /**
     * 得到当月的第一天 0时0分0秒
     * @return
     */
    public static Date getFirstDayOfMonth(){
        Calendar cal_1=Calendar.getInstance();//获取当前日期
//        cal_1.add(Calendar.MONTH, -1);
        cal_1.set(Calendar.DAY_OF_MONTH,1);//设置为1号,当前日期既为本月第一天 0点0分第一秒开始的。
        cal_1.set(Calendar.HOUR_OF_DAY,0);
        cal_1.set(Calendar.MINUTE,0);
        cal_1.set(Calendar.SECOND,1);
        Date date = cal_1.getTime();
        return date;
    }

    public static void main(String[] args) {
        Date date = DateUtils.getFirstDayOfMonth();
        System.out.println(date);
    }
}
