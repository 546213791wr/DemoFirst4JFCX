package com.aop;

import com.model.*;
import com.service.FanyaUserDetailService;
import com.service.JiFenStarRecordService;
import com.service.ReadReportService;
import com.service.UserLevelService;
import com.util.JiFenConstants;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Aspect
public class UserLevelAspect {
    @Resource
    private FanyaUserDetailService fanyaUserDetailService;
    @Resource
    private UserLevelService userLevelService;
    @Resource
    private JiFenStarRecordService jiFenStarRecordService;
    @Resource
    private ReadReportService readReportService;

    @Pointcut("execution(* com.service.JiFenStarRecordService.gainJiFenStar*(..))")
    public void userLevelCheckJoinPoint(){}

    @Around(value = "userLevelCheckJoinPoint()")
    public Object userLevelCheck(ProceedingJoinPoint jp) throws Throwable {
        Object[] args = jp.getArgs();
        Map<String,String> targetMethResult = (Map<String, String>) jp.proceed(args);
        String uid = null;
        if(args[0] instanceof String){ //第一个参数是String的话，就是uid
            uid = (String) args[0];
        }
        if(args[0] instanceof Integer){ //第一个参数是Integer的话，就是reportId
            ReadReport readReport = readReportService.get((Integer) args[0]);
            uid = readReport.getUid();
        }
        Map<String,String> updateUserLevelResult = updateUserLevel(uid);
        if("update".equals(updateUserLevelResult.get("status"))){
            targetMethResult.put("nowStar",updateUserLevelResult.get("nowStar"));
            targetMethResult.put("extendMsg",updateUserLevelResult.get("beforeLevel")+"升至"+updateUserLevelResult.get("nowLevel")+"额外奖励星币"+updateUserLevelResult.get("prizeStar"));
        }
        return targetMethResult;
    }

    /**
     * 用户升级
     * @param uid
     */
    @Transactional
    public Map<String,String> updateUserLevel(String uid){
        Map<String,String> result = new HashMap<>();
        FanyaUserDetail fanyaUserDetail = fanyaUserDetailService.getByUid(uid);
        int jifen = fanyaUserDetail.getIntegral() == null ? 0 : fanyaUserDetail.getIntegral(); //积分
        int star = fanyaUserDetail.getStar() == null ? 0 : fanyaUserDetail.getStar(); //星币
        String level = fanyaUserDetail.getLevel(); //当前等级

        //根据用户积分查找与之匹配的用户等级
        UserLevel userLevel = userLevelService.getLevelByUserJiFen(jifen);
        String upLevel = userLevel.getLevel();
        int prizeStar = userLevel.getPrizeStar();
        if (userLevel != null) {
            //判断用户到达对应等级后，用户等级是否修改
            if (!upLevel.equals(level)) {
                fanyaUserDetail.setLevel(upLevel); //用户等级修改
                fanyaUserDetail.setStar(star+prizeStar); //用户获取对应等级的奖励星币
                fanyaUserDetailService.update(fanyaUserDetail);

                //记录星币奖励记录
                JiFenStarRecord jiFenStarRecord = new JiFenStarRecord();
                jiFenStarRecord.setUid(fanyaUserDetail.getUid());
                jiFenStarRecord.setOriginType(JiFenConstants.ORIGIN_TYPE_OF_READ_UPLEVEL);
                jiFenStarRecord.setCoinType(JiFenConstants.COIN_TYPE_OF_STAR);
                jiFenStarRecord.setScore(prizeStar);
                jiFenStarRecord.setCreateTime(new Date());
                jiFenStarRecordService.add(jiFenStarRecord);

                result.put("status","update");
                result.put("beforeLevel",level);
                result.put("nowLevel",fanyaUserDetail.getLevel());
                result.put("nowStar",String.valueOf(fanyaUserDetail.getStar()));
                result.put("prizeStar",String.valueOf(prizeStar));
            }
        }
        return result;
    }
}
