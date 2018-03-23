/*
 * ............................................. 
 * 
 * 				    _ooOoo_ 
 * 		  	       o8888888o 
 * 	  	  	       88" . "88 
 *                 (| -_- |) 
 *                  O\ = /O 
 *              ____/`---*\____ 
 *               . * \\| |// `. 
 *             / \\||| : |||// \ 
 *           / _||||| -:- |||||- \ 
 *             | | \\\ - /// | | 
 *            | \_| **\---/** | | 
 *           \  .-\__ `-` ___/-. / 
 *            ___`. .* /--.--\ `. . __ 
 *        ."" *< `.___\_<|>_/___.* >*"". 
 *      | | : `- \`.;`\ _ /`;.`/ - ` : | | 
 *         \ \ `-. \_ __\ /__ _/ .-` / / 
 *======`-.____`-.___\_____/___.-`____.-*====== 
 * 
 * ............................................. 
 *              佛祖保佑 永无BUG 
 *
 * 佛曰: 
 * 写字楼里写字间，写字间里程序员； 
 * 程序人员写程序，又拿程序换酒钱。 
 * 酒醒只在网上坐，酒醉还来网下眠； 
 * 酒醉酒醒日复日，网上网下年复年。 
 * 但愿老死电脑间，不愿鞠躬老板前； 
 * 奔驰宝马贵者趣，公交自行程序员。 
 * 别人笑我忒疯癫，我笑自己命太贱； 
 * 不见满街漂亮妹，哪个归得程序员？
 *
 * 北纬30.√  154518484@qq.com
 */
package com.service;

import com.model.UserSignDetail;
import com.util.Constants;
import com.util.DateUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.*;


@Service
public class UserSignDetailService extends BaseService<UserSignDetail> {

	@Resource
	private FanyaUserDetailService fanyaUserDetailService;
	
    @Override
    public String getClassName() {
        return UserSignDetail.class.getSimpleName();
    }

    public UserSignDetail sign(String uid) {
    	Map<String, String> map = new HashMap<String, String>();
    	map.put("uid", uid);
    	//查询该用户上次的签到记录
    	UserSignDetail lastSign = (UserSignDetail)sqlMapClientTemplate.queryForObject(getClassName() + ".findLastSign", map);
    	UserSignDetail newSign = new UserSignDetail();
    	if (lastSign != null) {
    		Date lastSignDate = lastSign.getSignTime();
    		Calendar calLast = Calendar.getInstance();
    		calLast.setTime(lastSignDate);
    		calLast.add(Calendar.DATE, 1);
    		String calLastStr = new SimpleDateFormat("yyyy-MM-dd").format(calLast.getTime());
    		Calendar calNow = Calendar.getInstance();
    		String calNowStr = new SimpleDateFormat("yyyy-MM-dd").format(calNow.getTime());
    		if(calLastStr.equals(calNowStr)) {
    			//连续签到
    			newSign.setUid(uid);
    			if (Integer.parseInt(lastSign.getExtendScore().toString()) == Constants.SIGN_ROILING_EXTEND_SCORE) {
    				//如果额外积分达到上限了，从0开始计分
    				newSign.setExtendScore(0);
    			} else {
    				newSign.setExtendScore(lastSign.getExtendScore() + Constants.SIGN_DEFAULT_EXTEND_SCORE);
    			}
    			if(lastSign.getContinuumDays().equals(Constants.SIGN_ROILING_DAY)){
					newSign.setContinuumDays(1);
				}else {
					newSign.setContinuumDays(lastSign.getContinuumDays() + 1);
				}
    			newSign.setIntegral(Constants.SIGN_DEFAULT_INTEGRAL);
    			newSign.setSignTime(DateUtils.getNowDate());
				this.add(newSign);
    		} else {
    			//未能连续签到
    			newSign.setUid(uid);
    			newSign.setContinuumDays(1);
    			newSign.setExtendScore(0);
    			newSign.setIntegral(Constants.SIGN_DEFAULT_INTEGRAL);
    			newSign.setSignTime(DateUtils.getNowDate());
				this.add(newSign);
    		}
    	} else {
    		//首次签到
    		newSign.setUid(uid);
    		newSign.setIntegral(Constants.SIGN_DEFAULT_INTEGRAL);
    		newSign.setExtendScore(0);
    		newSign.setContinuumDays(1);
    		newSign.setSignTime(DateUtils.getNowDate());
    		this.add(newSign);
    	}
    	//失效之前签到对用户积分的修改
		/*FanyaUserDetail fanyaUserDetail = fanyaUserDetailService.getByUid(uid);
    	Integer defaulIntegral = fanyaUserDetail.getIntegral();
    	if(null == defaulIntegral){
    		defaulIntegral = 0;
		}
		fanyaUserDetail.setIntegral(defaulIntegral + newSign.getIntegral() + newSign.getExtendScore());
    	fanyaUserDetailService.update(fanyaUserDetail);*/
    	return newSign;
    }
    
    /**
     * 查看今天是否已经签到
     * @param uid
     * @return true 今天已签到  false 今天未签到
     */
    public UserSignDetail isSignToday(String uid) {
    	if(StringUtils.isEmpty(uid)){
    		return null;
		}
    	Map<String, String> map = new HashMap<String, String>();
    	map.put("uid", uid);
    	//查询该用户上次的签到记录
    	UserSignDetail lastSign = (UserSignDetail)sqlMapClientTemplate.queryForObject(getClassName() + ".findLastSign", map);
    	if(null == lastSign){
    		return null;
		}
    	Date lastSignDate = lastSign.getSignTime();
		Calendar calLast = Calendar.getInstance();
		calLast.setTime(lastSignDate);
		String calLastStr = new SimpleDateFormat("yyyy-MM-dd").format(calLast.getTime());
		Calendar calNow = Calendar.getInstance();
		String calNowStr = new SimpleDateFormat("yyyy-MM-dd").format(calNow.getTime());
		if(calLastStr.equals(calNowStr)) {
			return lastSign;
		} else {
			return null;
		}
    }
    
    /**
     * 查看该用户签到的总分
     * @param uid
     * @return true 今天已签到  false 今天未签到
     */
    public int getScoreByUid(String uid) {
    	Map<String, String> map = new HashMap<String, String>();
    	map.put("uid", uid);
    	//查询该用户上次的签到记录
    	List<UserSignDetail> signList = (List<UserSignDetail>)sqlMapClientTemplate.queryForList(getClassName() + ".list", map);
    	int score = 0;
    	for (UserSignDetail u : signList) {
    		score += u.getExtendScore();
    		score += u.getIntegral();
    	}
    	return score;
    }

	/**
	 * 查看用户本周签到详情
	 * @param uid
	 * @return
	 */
	public List<UserSignDetail> getCurrentWeekSignDetail(String uid){
		return sqlMapClientTemplate.queryForList(getClassName() + ".getCurrentWeekSignDetail", uid);
	}

	/**
	 * 获取用户最后一次签到记录
	 * @param uid
	 * @return
	 */
	public UserSignDetail getLastSignByUid(String uid){
		Map<String,String> param = new HashMap<>();
		param.put("uid",uid);
		return (UserSignDetail)sqlMapClientTemplate.queryForObject(getClassName() + ".findLastSign", param);
	}
}


