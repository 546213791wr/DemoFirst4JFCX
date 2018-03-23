package com.service;

import com.model.*;
import com.util.JiFenConstants;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.text.DecimalFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class JiFenStarRecordService extends BaseService<JiFenStarRecord> {
    @Resource
    private FanyaUserDetailService fanyaUserDetailService;
    @Resource
    private UserSignDetailService userSignDetailService;
    @Resource
    private PaperUserService paperUserService;
    @Resource
    private UserResEvaluateStarService userResEvaluateStarService;
    @Resource
    private UserResReadReportJiFenService userResReadReportJiFenService;
    @Resource
    private ReadReportService readReportService;


    @Override
    public String getClassName() {
        return JiFenStarRecord.class.getSimpleName();
    }

    /**
     * 登录获取积分、星币
     * 规则：1、每日签到获取5积分
     * 2、连续签到3天随机获取1-5星币
     * 3、连续签到3天随机获取6-10星币
     *
     * @param uid
     * @return
     */
    @Transactional
    public Map<String, String> gainJiFenStar4Sign(String uid) {
        Map<String, String> userJiFenStarMap = new HashMap<>();
        FanyaUserDetail fanyaUserDetail = fanyaUserDetailService.getByUid(uid);
        if (fanyaUserDetail == null) {
            userJiFenStarMap.put("uid", uid);
            userJiFenStarMap.put("beforeJiFen", "0");
            userJiFenStarMap.put("beforeStar", "0");
            userJiFenStarMap.put("nowJiFen", "0");
            userJiFenStarMap.put("nowStar", "0");
            userJiFenStarMap.put("signDays", "0");
            userJiFenStarMap.put("status", "fail");
            userJiFenStarMap.put("msg", "用户不存在！");
        } else {
            int beforeJiFen = fanyaUserDetail.getIntegral() == null ? 0 : fanyaUserDetail.getIntegral(); //之前积分
            int beforeStar = fanyaUserDetail.getStar() == null ? 0 : fanyaUserDetail.getStar(); //之前积分
            userJiFenStarMap.put("uid", uid);
            userJiFenStarMap.put("beforeJiFen", String.valueOf(beforeJiFen));
            boolean isTodaySign = isTodayGainJiFen4Sign(uid);
            if (isTodaySign) { //今天已签到过(一天只能签到一次),不再处理
                userJiFenStarMap.put("nowJiFen", String.valueOf(beforeJiFen));
                userJiFenStarMap.put("status", "signed");
                userJiFenStarMap.put("msg", "用户今天已签到过！");
            } else { //当天未签到-签到记录、用户积分奖励
                userSignDetailService.sign(uid); //签到记录
                //添加签到积分奖励记录
                JiFenStarRecord jiFenStarRecord = new JiFenStarRecord();
                jiFenStarRecord.setUid(uid);
                jiFenStarRecord.setOriginType(JiFenConstants.ORIGIN_TYPE_OF_SIGN); //签到
                jiFenStarRecord.setCoinType(JiFenConstants.COIN_TYPE_OF_JIFEN); //积分
                jiFenStarRecord.setScore(JiFenConstants.JIFEN_OF_SIGN);
                jiFenStarRecord.setCreateTime(new Date());
                add(jiFenStarRecord);
                userJiFenStarMap.put("nowJiFen", String.valueOf(beforeJiFen + JiFenConstants.JIFEN_OF_SIGN));
                //用户积分奖励
                fanyaUserDetail.setIntegral(beforeJiFen + JiFenConstants.JIFEN_OF_SIGN);
                fanyaUserDetailService.update(fanyaUserDetail);
                userJiFenStarMap.put("status", "success");
                userJiFenStarMap.put("msg", "签到积分星币获取成功！");
            }
            UserSignDetail userSignDetail = userSignDetailService.getLastSignByUid(uid);
            int signDays = userSignDetail == null ? 0 : userSignDetail.getContinuumDays() == null ? 0 : userSignDetail.getContinuumDays();
            int addStar = 0;
            if (signDays == 3 && !isTodaySign) { //连续签到3天(不可重复签)
                addStar = JiFenConstants.STAR_OF_SIGN_3_DAY_MIN + new Random().nextInt(JiFenConstants.STAR_OF_SIGN_3_DAY_MAX - JiFenConstants.STAR_OF_SIGN_3_DAY_MIN + 1);
            }
            if (signDays == 5 && !isTodaySign) { //连续签到5天(不可重复签)
                addStar = JiFenConstants.STAR_OF_SIGN_5_DAY_MIN + new Random().nextInt(JiFenConstants.STAR_OF_SIGN_5_DAY_MAX - JiFenConstants.STAR_OF_SIGN_5_DAY_MIN + 1);
            }
            if (addStar != 0 && signDays != 0 && !isTodaySign) {
                JiFenStarRecord jiFenStarRecord = new JiFenStarRecord();
                jiFenStarRecord.setUid(uid);
                jiFenStarRecord.setOriginType(JiFenConstants.ORIGIN_TYPE_OF_SIGN);
                jiFenStarRecord.setCoinType(JiFenConstants.COIN_TYPE_OF_STAR);
                jiFenStarRecord.setScore(addStar);
                jiFenStarRecord.setCreateTime(new Date());
                add(jiFenStarRecord);
                fanyaUserDetail.setStar(beforeStar + addStar);
                fanyaUserDetailService.update(fanyaUserDetail);
            }
            userJiFenStarMap.put("beforeStar", String.valueOf(beforeStar));
            userJiFenStarMap.put("nowStar", String.valueOf(beforeStar + addStar));
            userJiFenStarMap.put("signDays", String.valueOf(signDays));
        }
        return userJiFenStarMap;
    }

    /**
     * 判断用户今天是否已通过签到获取过积分
     *
     * @param uid
     * @return
     */
    public boolean isTodayGainJiFen4Sign(String uid) {
        return userSignDetailService.isSignToday(uid) == null ? false : true;
    }

    /**
     * 测评获取积分、星币
     * 规则：1、不限制测评次数，正确率60%以下获得10积分，正确率60%以上获得20积分
     * 2、首次测评，正确率60-79%，获得20星币
     * 首次测评，正确率80-99%，获得40星币
     * 首次测评，正确率100%，获得50星币
     *
     * @param uid
     * @param paperUserId
     * @return
     */
    @Transactional
    public Map<String, String> gainJiFenStar4Evaluate(String uid, Integer paperUserId) {
        Map<String, String> userJiFenStarMap = new HashMap<>();
        PaperUser paperUser = paperUserService.get(paperUserId);
        FanyaUserDetail fanyaUserDetail = fanyaUserDetailService.getByUid(uid);
        //用户存在
        if (fanyaUserDetail != null) {
            int beforeJiFen = fanyaUserDetail.getIntegral() == null ? 0 : fanyaUserDetail.getIntegral();
            int beforeStar = fanyaUserDetail.getStar() == null ? 0 : fanyaUserDetail.getStar();
            if (paperUser != null) {
                float rightLv = paperUser.getRightLv() == null ? 0.00f : paperUser.getRightLv();
                int addJiFen = gainJiFenByRightLv(rightLv);
                int addStar = 0;
                //添加测评积分奖励记录(积分奖励不限制次数)
                JiFenStarRecord jiFenStarRecord = new JiFenStarRecord();
                jiFenStarRecord.setUid(uid);
                jiFenStarRecord.setOriginType(JiFenConstants.ORIGIN_TYPE_OF_EVALUATE); //测评
                jiFenStarRecord.setCoinType(JiFenConstants.COIN_TYPE_OF_JIFEN); //积分
                jiFenStarRecord.setScore(addJiFen); //奖励积分值
                jiFenStarRecord.setCreateTime(new Date());
                add(jiFenStarRecord);//新增积分奖励记录

                fanyaUserDetail.setIntegral(beforeJiFen + addJiFen);
                fanyaUserDetailService.update(fanyaUserDetail);//更新用户积分

                String resId = String.valueOf(paperUser.getResId());
                boolean hasUserResStarRecord = userResEvaluateStarService.hasUserResEvaluateStarRecord(uid, resId);
                //首次测评时会根据正确率添加测评星币奖励记录
                if (!hasUserResStarRecord) {
                    addStar = gainStarByRightLv(rightLv);
                    if (addStar > 0) {
                        JiFenStarRecord jiFenStarRecord1 = new JiFenStarRecord();
                        jiFenStarRecord1.setUid(uid);
                        jiFenStarRecord1.setOriginType(JiFenConstants.ORIGIN_TYPE_OF_EVALUATE); //测评
                        jiFenStarRecord1.setCoinType(JiFenConstants.COIN_TYPE_OF_STAR); //积分
                        jiFenStarRecord1.setScore(addStar); //奖励星币值
                        jiFenStarRecord1.setCreateTime(new Date());
                        add(jiFenStarRecord1); //新增星币奖励记录

                        //测评星币奖励详情记录
                        UserResEvaluateStar userResStar = new UserResEvaluateStar();
                        userResStar.setResId(resId);
                        userResStar.setUid(uid);
                        userResStar.setStarScore(addStar);
                        userResStar.setCreateTime(new Date());
                        userResEvaluateStarService.add(userResStar);

                        fanyaUserDetail.setStar(beforeStar + addStar);
                        fanyaUserDetailService.update(fanyaUserDetail);//更新用户星币
                    }
                }
                userJiFenStarMap.put("uid", uid);
                userJiFenStarMap.put("paperUserId", String.valueOf(paperUserId));
                userJiFenStarMap.put("status", "success");
                userJiFenStarMap.put("msg", "测评积分星币获取成功！");
                userJiFenStarMap.put("beforeJiFen", String.valueOf(beforeJiFen));
                userJiFenStarMap.put("beforeStar", String.valueOf(beforeStar));
                userJiFenStarMap.put("nowJiFen", String.valueOf(beforeJiFen + addJiFen));
                userJiFenStarMap.put("nowStar", String.valueOf(beforeStar + addStar));
                userJiFenStarMap.put("rightLv", String.valueOf(new DecimalFormat("##0").format(rightLv * 100)) + "%");
            } else {
                userJiFenStarMap.put("uid", uid);
                userJiFenStarMap.put("paperUserId", String.valueOf(paperUserId));
                userJiFenStarMap.put("status", "fail");
                userJiFenStarMap.put("msg", "用户试卷不存在！");
                userJiFenStarMap.put("beforeJiFen", String.valueOf(beforeJiFen));
                userJiFenStarMap.put("beforeStar", String.valueOf(beforeStar));
                userJiFenStarMap.put("nowJiFen", String.valueOf(beforeJiFen));
                userJiFenStarMap.put("nowStar", String.valueOf(beforeStar));
                userJiFenStarMap.put("rightLv", "0%");
            }
        } else {
            userJiFenStarMap.put("uid", uid);
            userJiFenStarMap.put("paperUserId", String.valueOf(paperUserId));
            userJiFenStarMap.put("status", "fail");
            userJiFenStarMap.put("msg", "用户不存在！");
            userJiFenStarMap.put("beforeJiFen", "0");
            userJiFenStarMap.put("beforeStar", "0");
            userJiFenStarMap.put("nowJiFen", "0");
            userJiFenStarMap.put("nowStar", "0");
            userJiFenStarMap.put("rightLv", "0%");
        }
        return userJiFenStarMap;
    }

    /**
     * 根据正确率获取积分
     *
     * @param rightLv
     * @return
     */
    public int gainJiFenByRightLv(float rightLv) {
        if (rightLv < 0.6) {
            return JiFenConstants.JIFEN_OF_EVALUATE_FAIl;
        } else {
            return JiFenConstants.JIFEN_OF_EVALUATE_PASS;
        }
    }

    /**
     * 根据正确率获取星币
     *
     * @param rightLv
     * @return
     */
    public int gainStarByRightLv(float rightLv) {
        if (rightLv >= 0.6 && rightLv <= 0.79) {
            return JiFenConstants.STAR_OF_EVALUATE_60_79_RL;
        } else if (rightLv >= 0.8 && rightLv < 0.99) {
            return JiFenConstants.STAR_OF_EVALUATE_80_99_RL;
        } else if (rightLv == 1) {
            return JiFenConstants.STAR_OF_EVALUATE_100_RL;
        } else {
            return 0;
        }
    }

    /**
     * 资源首个读后感提交获取积分星币
     * 规则：1、读后感首次提交获取20个积分奖励
     *
     * @param uid
     * @param resId
     * @return
     */
    @Transactional
    public Map<String, String> gainJiFenStar4ReadReportCommit(String uid, Integer resId) {
        Map<String, String> userJiFenStarMap = new HashMap<>();
        FanyaUserDetail fanyaUserDetail = fanyaUserDetailService.getByUid(uid);
        if (fanyaUserDetail == null) {
            userJiFenStarMap.put("uid", uid);
            userJiFenStarMap.put("beforeJiFen", "0");
            userJiFenStarMap.put("beforeStar", "0");
            userJiFenStarMap.put("nowJiFen", "0");
            userJiFenStarMap.put("nowStar", "0");
            userJiFenStarMap.put("status", "fail");
            userJiFenStarMap.put("msg", "用户不存在！");
        } else {
            int beforeJiFen = fanyaUserDetail.getIntegral() == null ? 0 : fanyaUserDetail.getIntegral(); //之前积分
            int beforeStar = fanyaUserDetail.getStar() == null ? 0 : fanyaUserDetail.getStar(); //之前积分
            int addJiFen = 0;
            int addStar = 0;
            //用户对资源首次写读后感才会有积分奖励
            boolean hasUserResReadReportJiFenRecord = userResReadReportJiFenService.hasUserResReadReportJiFenRecord(uid, String.valueOf(resId));
            if (hasUserResReadReportJiFenRecord) {
                userJiFenStarMap.put("uid", uid);
                userJiFenStarMap.put("status", "gained");
                userJiFenStarMap.put("msg", "已获取过资源首个读后感奖励积分！");
            } else {
                addJiFen = JiFenConstants.JIFEN_OF_1ST_READ_REPORT_COMMIT;
                fanyaUserDetail.setIntegral(beforeJiFen + addJiFen);
                fanyaUserDetailService.update(fanyaUserDetail); //更新用户积分

                //添加资源首个读后感提交积分奖励记录
                JiFenStarRecord jiFenStarRecord = new JiFenStarRecord();
                jiFenStarRecord.setUid(uid);
                jiFenStarRecord.setOriginType(JiFenConstants.ORIGIN_TYPE_OF_SUBMIT_READ_REPORT); //提交读后感
                jiFenStarRecord.setCoinType(JiFenConstants.COIN_TYPE_OF_JIFEN); //积分
                jiFenStarRecord.setScore(addJiFen);
                jiFenStarRecord.setCreateTime(new Date());
                add(jiFenStarRecord);

                //资源首个读后感提交奖励详情记录
                UserResReadReportJiFen userResReadReportJiFen = new UserResReadReportJiFen();
                userResReadReportJiFen.setUid(uid);
                userResReadReportJiFen.setResId(String.valueOf(resId));
                userResReadReportJiFen.setJiFenScore(addJiFen);
                userResReadReportJiFen.setCreateTime(new Date());
                userResReadReportJiFenService.add(userResReadReportJiFen);

                userJiFenStarMap.put("uid", uid);
                userJiFenStarMap.put("status", "success");
                userJiFenStarMap.put("msg", "资源首个读后感奖励积分获取成功！");
            }
            userJiFenStarMap.put("beforeJiFen", String.valueOf(beforeJiFen));
            userJiFenStarMap.put("beforeStar", String.valueOf(beforeStar));
            userJiFenStarMap.put("nowJiFen", String.valueOf(beforeJiFen + addJiFen));
            userJiFenStarMap.put("nowStar", String.valueOf(beforeStar + addStar));
        }
        return userJiFenStarMap;
    }

    /**
     * 读后感评优获取积分星币
     * 规则：1、读后感评优后奖励20星币
     *
     * @param reportId
     * @return
     */
    @Transactional
    public Map<String, String> gainJiFenStar4ReadReportExcellent(Integer reportId) {
        Map<String, String> userJiFenStarMap = new HashMap<>();
        ReadReport readReport = readReportService.get(reportId);
        if (readReport == null) {
            userJiFenStarMap.put("beforeJiFen", "0");
            userJiFenStarMap.put("beforeStar", "0");
            userJiFenStarMap.put("nowJiFen", "0");
            userJiFenStarMap.put("nowStar", "0");
            userJiFenStarMap.put("status", "fail");
            userJiFenStarMap.put("msg", "读后感不存在！");
        } else {
            String uid = readReport.getUid();
            FanyaUserDetail fanyaUserDetail = fanyaUserDetailService.getByUid(uid);
            if (fanyaUserDetail != null) {
                int beforeJiFen = fanyaUserDetail.getIntegral() == null ? 0 : fanyaUserDetail.getIntegral(); //之前积分
                int beforeStar = fanyaUserDetail.getStar() == null ? 0 : fanyaUserDetail.getStar(); //之前积分
                int addStar = JiFenConstants.STAR_OF_READ_REPORT_EXCELLENT;

                //读后感评优奖励详情记录
                JiFenStarRecord jiFenStarRecord = new JiFenStarRecord();
                jiFenStarRecord.setUid(uid);
                jiFenStarRecord.setOriginType(JiFenConstants.ORIGIN_TYPE_OF_EXCELLENT_READ_REPORT); //读后感评优
                jiFenStarRecord.setCoinType(JiFenConstants.COIN_TYPE_OF_STAR); //星币
                jiFenStarRecord.setScore(addStar);
                jiFenStarRecord.setCreateTime(new Date());
                add(jiFenStarRecord);

                fanyaUserDetail.setStar(beforeStar + addStar);
                fanyaUserDetailService.update(fanyaUserDetail); //更新星币

                userJiFenStarMap.put("reportId", String.valueOf(reportId));
                userJiFenStarMap.put("uid", uid);
                userJiFenStarMap.put("beforeJiFen", String.valueOf(beforeJiFen));
                userJiFenStarMap.put("beforeStar", String.valueOf(beforeStar));
                userJiFenStarMap.put("nowJiFen", String.valueOf(beforeJiFen));
                userJiFenStarMap.put("nowStar", String.valueOf(beforeStar + addStar));
                userJiFenStarMap.put("status", "success");
                userJiFenStarMap.put("msg", "读后感评优奖励星币获取成功！");
            } else {
                userJiFenStarMap.put("reportId", String.valueOf(reportId));
                userJiFenStarMap.put("beforeJiFen", "0");
                userJiFenStarMap.put("beforeStar", "0");
                userJiFenStarMap.put("nowJiFen", "0");
                userJiFenStarMap.put("nowStar", "0");
                userJiFenStarMap.put("status", "fail");
                userJiFenStarMap.put("msg", "读后感的作者不存在！");
            }
        }

        return userJiFenStarMap;
    }

    /**
     * 读后感点赞获取积分星币
     * 规则：读后感前20次点赞，每次获取1个星币奖励
     *
     * @param reportId
     * @return
     */
    @Transactional
    public Map<String, String> gainJiFenStar4ReadReportPraise(Integer reportId) {
        Map<String, String> userJiFenStarMap = new HashMap<>();
        ReadReport readReport = readReportService.get(reportId);
        if (readReport == null) {
            userJiFenStarMap.put("beforeJiFen", "0");
            userJiFenStarMap.put("beforeStar", "0");
            userJiFenStarMap.put("nowJiFen", "0");
            userJiFenStarMap.put("nowStar", "0");
            userJiFenStarMap.put("status", "fail");
            userJiFenStarMap.put("msg", "读后感不存在！");
        } else {
            String uid = readReport.getUid();
            FanyaUserDetail fanyaUserDetail = fanyaUserDetailService.getByUid(uid);
            if (fanyaUserDetail != null) {
                int praiseCount = readReport.getAgreeCount() == null ? 0 : readReport.getAgreeCount();
                int beforeJiFen = fanyaUserDetail.getIntegral() == null ? 0 : fanyaUserDetail.getIntegral(); //之前积分
                int beforeStar = fanyaUserDetail.getStar() == null ? 0 : fanyaUserDetail.getStar(); //之前积分
                int addStar = 0;

                //读后感只有前20次点赞才会获得星币奖励
                if (praiseCount <= 20) {
                    addStar = JiFenConstants.STAR_OF_READ_REPORT_PRAISE;
                    userJiFenStarMap.put("status", "success");
                    userJiFenStarMap.put("msg", "读后感点赞奖励星币获取成功！");
                } else {
                    userJiFenStarMap.put("status", "fail");
                    userJiFenStarMap.put("msg", "读后感点赞次数超过20次后就不再获取星币奖励！");
                }
                //读后感评优奖励详情记录
                JiFenStarRecord jiFenStarRecord = new JiFenStarRecord();
                jiFenStarRecord.setUid(uid);
                jiFenStarRecord.setOriginType(JiFenConstants.ORIGIN_TYPE_OF_PRAISE_READ_REPORT); //读后感点赞
                jiFenStarRecord.setCoinType(JiFenConstants.COIN_TYPE_OF_STAR); //星币
                jiFenStarRecord.setScore(addStar);
                jiFenStarRecord.setCreateTime(new Date());
                add(jiFenStarRecord);

                fanyaUserDetail.setStar(beforeStar + addStar);
                fanyaUserDetailService.update(fanyaUserDetail); //更新星币

                userJiFenStarMap.put("reportId", String.valueOf(reportId));
                userJiFenStarMap.put("uid", uid);
                userJiFenStarMap.put("beforeJiFen", String.valueOf(beforeJiFen));
                userJiFenStarMap.put("beforeStar", String.valueOf(beforeStar));
                userJiFenStarMap.put("nowJiFen", String.valueOf(beforeJiFen));
                userJiFenStarMap.put("nowStar", String.valueOf(beforeStar + addStar));

            } else {
                userJiFenStarMap.put("reportId", String.valueOf(reportId));
                userJiFenStarMap.put("beforeJiFen", "0");
                userJiFenStarMap.put("beforeStar", "0");
                userJiFenStarMap.put("nowJiFen", "0");
                userJiFenStarMap.put("nowStar", "0");
                userJiFenStarMap.put("status", "fail");
                userJiFenStarMap.put("msg", "读后感的作者不存在！");
            }
        }

        return userJiFenStarMap;
    }
}
