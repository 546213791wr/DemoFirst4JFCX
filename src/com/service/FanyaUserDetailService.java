package com.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.model.*;
import com.util.Constants;
import com.util.HttpRequest;
import com.util.Pager;
import com.util.StringUtil;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.net.URLDecoder;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class FanyaUserDetailService extends BaseService<FanyaUserDetail> {
    static Logger logger = Logger.getLogger(FanyaUserDetailService.class);
    public static final int REDUCE = 0;//减少积分
    public static final int INCREASE = 1;//增加积分

    //泛亚注册接口-学生年级班级信息完整
    private final String FANYA_REGISTER_STUDENT_URL = "http://mooc1-api.chaoxing.com/user/register?schoolid=%s&uname=%s&realname=%s&pwd=%s&schooltime=%s&group1=%s&group2=%s&group3=%s&role=%d&enc=%s";
    //泛亚注册接口-学生年级班级信息不完整
    private final String FANYA_REGISTER_OTHER_URL = "http://mooc1-api.chaoxing.com/user/register?schoolid=%s&uname=%s&realname=%s&pwd=%s&schooltime=%s&group1=%s&role=%d&enc=%s";
    //泛亚注册接口-教师
    private final String FANYA_REGISTER_TEACHER_URL = "http://mooc1-api.chaoxing.com/user/register?schoolid=%s&uname=%s&realname=%s&pwd=%s&schooltime=%s&group1=%s&role=TEACHER&enc=%s";
    //泛亚注册接口key
    private final String FANYA_KEY_REGISTER = "uWwjeEKsri";

    //机构组织架构URL 参数说明：fid:机构FID  gid:父级id（机构顶级时gid=0）
    private final String ORG_STRUCTURE_URL = "http://mooc1.chaoxing.com/gas/usergroup?fid=%s&gid=%d&offset=0&limit=%d&fields=id,gid,groupname,sort";


    //添加组织机构
    private final String FANYA_ADD_DEPT_URL = "http://mooc1.chaoxing.com/group/add?fid=%s&gid=%d&name=%s&enc=%s";
    //组织机构的key
    private final String FANYA_KEY_DEPT = "F0hZ~/@-4]Pv";

    @Resource
    private OpenOrgService openOrgService;

    @Override
    public String getClassName() {
        // TODO Auto-generated method stub
        return FanyaUserDetail.class.getSimpleName();
    }


    /**
     * 获取班级下学生集合
     *
     * @param classId
     * @return
     */
//    @Cacheable(value = Constants.FRONT_CACHE_NAME, key = "(#root.target.getClassName()).concat(':').concat(#root.method.name).concat(':').concat(#classId)")
    public List<FanyaUserDetail> getStudentListByClassId(Integer classId) {
        return sqlMapClientTemplate.queryForList("FanyaUserDetail.getStudentListByClassId", classId);
    }


    /**
     * 获取班级下学生uid集合
     *
     * @param classId
     * @return
     */
    @Cacheable(value = Constants.FRONT_CACHE_NAME, key = "(#root.target.getClassName()).concat(':').concat(#root.method.name).concat(':').concat(#classId)")
    public List<Integer> getStudentUidListByClassId(Integer classId) {
        return sqlMapClientTemplate.queryForList("FanyaUserDetail.getStudentUidListByClassId", classId);
    }

    /**
     * @param uid
     * @return
     */
    @Cacheable(value = Constants.FRONT_CACHE_NAME, key = "(#root.target.getClassName()).concat(':').concat(#root.method.name).concat(':').concat(#uid)")
    public FanyaUserDetail getByUid(String uid) {
        return (FanyaUserDetail) sqlMapClientTemplate.queryForObject("FanyaUserDetail.getByUid", uid);
    }


    /**
     * 班级报告阅读等级分布区间图
     *
     * @param classId
     * @return
     */
    @Cacheable(value = Constants.FRONT_CACHE_NAME, key = "(#root.target.getClassName()).concat(':').concat(#root.method.name).concat(':').concat(#classId)")
    public List<Map<String, Object>> getClassreadingLevel(Integer classId) {
        return sqlMapClientTemplate.queryForList("FanyaUserDetail.getClassAbilityAnalysis", classId);
    }

    /**
     * 班级报告 获取班级阅读排行榜
     *
     * @param classId
     * @return map
     */
    @Cacheable(value = Constants.FRONT_CACHE_NAME, key = "(#root.target.getClassName()).concat(':').concat(#root.method.name).concat(':').concat(#classId)")
    public List getClassRanking(Integer classId) {
        return sqlMapClientTemplate.queryForList("FanyaUserDetail.getClassRanking", classId);
    }


    /**
     * 用户积分变更
     *
     * @param uid      用户id
     * @param type     变更方式（0：减少，1：增加）
     * @param integral 积分变量
     */
    public void updateIntegral(String uid, Integer type, Integer integral) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("uid", uid);
        map.put("type", type);
        map.put("integral", integral);
        sqlMapClientTemplate.update(getClassName() + ".updateIntegral", map);
    }

    public FanyaUserDetail getByLoginName(String loginName) {
        return (FanyaUserDetail) sqlMapClientTemplate.queryForObject("FanyaUserDetail.getByLoginName", loginName);
    }

    public List<FanyaUserDetail> getByUserList(Pager<FanyaUserDetail> pager) {
        return sqlMapClientTemplate.queryForList("FanyaUserDetail.getByUserList");
    }


    /**
     * 根据用户登录名称查询用户信息
     *
     * @param username
     * @return
     */
    public FanyaUserDetail getUserByName(String username) {
        return (FanyaUserDetail) sqlMapClientTemplate.queryForObject("FanyaUserDetail.getUserByName", username);
    }


    /**
     * 获取系统的当前用户
     *
     * @param request
     * @return
     */
    public FanyaUserDetail getCurrentUser(HttpServletRequest request) {

        HttpSession session = request.getSession();
        //String userId = "53051789";
        String userId = "";
        String fid = "";
        String uname = "";
        String realname = "";

        try {
            Cookie[] cookies = request.getCookies();
            String UID = "uid";
            String FID = "fid";

            if (cookies != null) {
                for (Cookie c : cookies) {
                    if (UID.equals(c.getName().toLowerCase())) {
                        userId = URLDecoder.decode(c.getValue(), "utf-8");
                    }
                    if (FID.equals(c.getName().toLowerCase())) {
                        fid = URLDecoder.decode(c.getValue(), "utf-8");
                    }

                    if (StringUtils.equals("uname", c.getName())) {
                        uname = URLDecoder.decode(c.getValue(), "utf-8");
                    }

                    if (StringUtils.equals("realname", c.getName())) {
                        realname = URLDecoder.decode(c.getValue(), "utf-8");
                    }
                }
            }
            logger.info("-------------------UID:" + userId);
        } catch (Exception e) {
            e.printStackTrace();
        }

        FanyaUserDetail user = null;
        logger.info("current_user:" + user);
        if (StringUtils.isNotBlank(userId)) {
            user = getByUid(userId);
            //判断当前user是否为专家，获取专家信息
            HashMap paramMap = new HashMap();
            paramMap.put("userId",userId);
            List<Map> dataList = sqlMapClientTemplate.queryForList("FanyaUserDetail.getUserExpert",paramMap);
            if(dataList!=null && dataList.size()>0){
                Map expert = dataList.get(0);
                user.setCityCode(expert.get("city_code")+"");
                user.setUserTypeId(5);//专家
            }
            //如果数据库不存在数据入库
            if (user == null) {
                user = new FanyaUserDetail();
                user.initUser(userId, fid, Constants.USER_TYPE_STUDENT, uname, realname);
                this.add(user);
            }
//            session.setAttribute(Constants.SESSION_CURRENT_FANYA_USER_DETAIL, user);
        }

        return user;
    }

    /**
     * 获取系统的当前用户
     *
     * @param request
     * @return
     */
    public FanyaUserDetail getParentCurrentUser(HttpServletRequest request) {

        HttpSession session = request.getSession();

        Cookie[] cookies = request.getCookies();
        String userId = "";
        String fid = "";
        try {
            String UID = "UID";
            String FID = "fid";
            if (cookies != null) {
                for (Cookie c : cookies) {
                    if (UID.equals(c.getName())) {
                        userId = URLDecoder.decode(c.getValue(), "utf-8");
                    }
                    if (FID.equals(c.getName())) {
                        fid = URLDecoder.decode(c.getValue(), "utf-8");
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        logger.info("-------------------UID:" + userId);

        FanyaUserDetail user = null;
        logger.info("current_user:" + user);
        if (StringUtils.isNotBlank(userId) && null == user) {
            user = getByUid(userId);
        }

        if (user == null) {
            FanyaUserDetail fanyaUserDetail = new FanyaUserDetail();
            fanyaUserDetail.setUid(userId);
            fanyaUserDetail.setAgeGroupId(1);
            fanyaUserDetail.setLevel("1");
            fanyaUserDetail.setReadingFaceLevel("1");
            fanyaUserDetail.setStar(0);
            fanyaUserDetail.setIntegral(0);
            fanyaUserDetail.setCreateUserId(1);
            fanyaUserDetail.setModifyUserId(1);
            fanyaUserDetail.setModifyTime(new Date());
            add(fanyaUserDetail);
            user = getByUid(userId);
//            session.setAttribute(Constants.SESSION_CURRENT_FANYA_USER_DETAIL, user);
        }
        return user;
    }


    /**
     * 模拟登陆
     *
     * @param request
     * @param uid
     */
//    public void login(HttpServletRequest request, String uid) {
//        HttpSession session = request.getSession();
//        session.setAttribute(Constants.SESSION_CURRENT_FANYA_USER_DETAIL, getByUid(uid));
//    }


    /**
     * 根据fid + username 查找用户信息
     *
     * @param username
     * @param fid
     * @return
     */
    public FanyaUserDetail getUserByNameAndFid(String username, String fid) {
        Map<String, Object> map = new HashMap<String,Object>();
        map.put("username", username);
        map.put("fid", fid);
        return (FanyaUserDetail) sqlMapClientTemplate.queryForObject(getClassName() + ".getUserByNameAndFid", map);
    }

    /**
     * 根据fid查询阅读之星
     *
     * @param fid
     * @return
     */
    @Cacheable(value = Constants.FRONT_CACHE_NAME, key = "(#root.target.getClassName()).concat(':').concat(#root.method.name).concat(':').concat(#fid)")
    public List<Map> getOrgRanking(String fid) {
        Map<String, Object> map = new HashMap<String,Object>();
        map.put("fid", fid);
        return (List<Map>) sqlMapClientTemplate.queryForList(getClassName() + ".getOrgRanking", map);
    }

    /**
     * 分页获取机构对应用户
     *
     * @param fid
     * @param userTypeId
     * @param startNum
     * @param pageSize
     * @return
     */
    public Map<String, Object> getUserByFid(String fid, String userTypeId, String startNum, String pageSize) {
        Pager<Map<String, String>> pager = new Pager();
        Map<String, String> param = new HashMap();
        param.put("fid", fid);
        param.put("userTypeId", userTypeId);
        pager.setQuery(param);
        int totalRecords = (Integer) sqlMapClientTemplate.queryForObject(getClassName() + ".getUserByFid.Count", pager);
        pager.setTotalRecords(totalRecords);
        if (!StringUtil.isEmpty(startNum) && Integer.valueOf(startNum) > 0) {
            pager.setStartNumber(Integer.valueOf(startNum));
        }

        if (!StringUtil.isEmpty(pageSize)) {
            pager.setPageSize(Integer.valueOf(pageSize));
        } else {
            pager.setPageSize(totalRecords);
        }
        // MySQL的limit分页索引从0开始的
        pager.setStartNumber((pager.getStartNumber() - 1) * pager.getPageSize());
        List<Map<String, String>> resultList = sqlMapClientTemplate.queryForList(getClassName() + ".getUserByFid", pager);
        Map<String, Object> map = new HashMap();
        map.put("count", totalRecords);
        map.put("userList", resultList);
        return map;
    }

    public String getLevelByGradename1(String gradename){
        String level = "1";


        return level;
    }


    public int getGradeLevelByGradeName(String gradeName){
        int gradeLevel = 1;



        return gradeLevel;
    }


    /**
     * 根据年级换算等级(1-9年级)
     * @param gradeLevel 年级
     */
    public String getLevelByGradeLevel(int gradeLevel){
        String level = "1";
        switch(gradeLevel){
            case 1: level = "1"; break;
            case 2: level = "2"; break;
            case 3: level = "3"; break;
            case 4: level = "3"; break;
            case 5: level = "4"; break;
            case 6: level = "4"; break;
            case 7: level = "5"; break;
            case 8: level = "5"; break;
            case 9: level = "6"; break;
            default: level = "1"; //不再1-9年级内的返回1
        }
        return level;
    }

    public List<Map<String,Object>> getStudentReadDetailByClassId(Integer classId){
        return sqlMapClientTemplate.queryForList("FanyaUserDetail.getStudentReadDetailByClassId",classId);
    }

    public Integer getStudentCountListByClassId(Integer classId){
        return (Integer)sqlMapClientTemplate.queryForObject("FanyaUserDetail.getStudentCountListByClassId",classId);
    }

    public List<FanyaUserDetail> getByFidAndUid(String fid, String uid, int pagerNum, int pageSize) {
        Map<String, String> map = new HashMap<String,String>();
        map.put("fid", fid);
        map.put("uid", uid);
        Pager<Map> pager = new Pager<Map>();
        pager.setQuery(map);
        pager.setStartNumber(pagerNum);
        pager.setPageSize(pageSize);
        return (List<FanyaUserDetail>) sqlMapClientTemplate.queryForList(getClassName() + ".getByFidAndUid", pager);
    }

    public int getCountByFidAndUid(String fid, String uid) {
        Map<String, String> map = new HashMap<String,String>();
        map.put("fid", fid);
        map.put("uid", uid);
        return sqlMapClientTemplate.queryForObject(getClassName() + ".getCountByFidAndUid", map) == null ? 0 : (Integer) (sqlMapClientTemplate.queryForObject(getClassName() + ".getCountByFidAndUid", map));

    }

    /**
     * 根据FID统计数据库里面已存入的记录条数。
     *
     * @param fid
     * @return
     */
    public Integer getCountByFid(String fid) {
        return (Integer) sqlMapClientTemplate.queryForObject(getClassName() + ".getCountByFid", fid);
    }

    public FanyaUserDetail getByFidAndLoginName(String fid, String loginName) {
        Map param = new HashMap();
        param.put("fid", fid);
        param.put("loginName", loginName);
        return (FanyaUserDetail) sqlMapClientTemplate.queryForObject(this.getClassName() + ".getUserByNameAndFid", param);
    }

    public FanyaUserDetail getByEmail(String email) {
        return (FanyaUserDetail) sqlMapClientTemplate.queryForObject(this.getClassName() + ".getByEmail", email);
    }

    public List getUserListByFidGrdeIdClassId(String fid, String gradeId, String classId, String roleType) {
        HashMap paramMap = new HashMap();
        paramMap.put("fid", fid);
        paramMap.put("gradeId", gradeId);
        paramMap.put("classId", classId);
        paramMap.put("roleType", roleType);
        return sqlMapClientTemplate.queryForList(getClassName() + ".getUserListByFidGrdeIdClassId", paramMap);
    }

    /**
     * 更新普通用户的年级和班级
     * @param userId
     * @param gradeId
     * @param classId
     */
    @CacheEvict(value = Constants.FRONT_CACHE_NAME, key = "(#root.target.getClassName()).concat(':getByUid:').concat(#userId)")
    public void upUserInfo(String userId, String gradeId, String classId) {
        HashMap paramMap = new HashMap();
        paramMap.put("userId", userId);
        paramMap.put("gradeId", gradeId);
        paramMap.put("classId", classId);
        sqlMapClientTemplate.update(getClassName() + ".upUserInfo", paramMap);
    }

    public List getUserList4APi(String fid, String uid) {
        HashMap paramMap = new HashMap();
        paramMap.put("fid", fid);
        paramMap.put("uid", uid);
        return sqlMapClientTemplate.queryForList(getClassName() + ".getUserList4APi", paramMap);
    }


    /**
     * 定时任务查询fid不为空的用户，支持分页。每次获取 100 条记录
     *
     * @return
     */
    public List<FanyaUserDetail> getListWithFidAndPage(Integer page) {
        return sqlMapClientTemplate.queryForList(getClassName() + ".getListWithFidAndPage", page * 100);
    }



    //查询学院
    public List<Map<String, Object>> checkOrgInFanya(String fid,Integer gid) {
        List<Map<String, Object>> result = new ArrayList<Map<String,Object>>();
        String orgStructureUrl = String.format(ORG_STRUCTURE_URL, fid, gid,10);
        Map<String, Object> message = new HashMap<String,Object>();
        HttpRequest httpRequest = new HttpRequest();
        message.put("hasOrgInFanya", false);
        try {
            String response = httpRequest.doGet(orgStructureUrl);
            JSONObject jsonObject = JSON.parseObject(response);
            JSONArray orgStructData = jsonObject.getJSONArray("data");

            if (orgStructData != null && orgStructData.size() > 0) {
                int count = jsonObject.getInteger("count");
                if (count > 10){
                    orgStructureUrl = String.format(ORG_STRUCTURE_URL, fid, gid,count);
                    response = httpRequest.doGet(orgStructureUrl);
                    jsonObject = JSON.parseObject(response);
                    orgStructData = jsonObject.getJSONArray("data");
                }
                for (int i = 0; i < count; i++) {
                    Map<String, Object> aca = new HashMap<String,Object>();
                    aca.put("id", orgStructData.getJSONObject(i).getIntValue("id"));
                    aca.put("acaName", orgStructData.getJSONObject(i).getString("groupname"));
                    result.add(aca);
                }
                message.put("hasOrgInFanya", true);
                message.put("msg", fid+"对应机构存在");
            }else {
                message.put("msg", fid+"对应机构不存在");
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            message.put("msg", "查询机构报错："+e.getMessage());
        }
        result.add(message);
        return result;
    }

    /**
     * 判断fid对应机构是否存在
     *
     * @param fid 机构FID
     * @return
     */
    public Map<String, Object> checkOrgInFanya(String fid) {
        Map<String, Object> result = new HashMap<String,Object>();
        String orgStructureUrl = String.format(ORG_STRUCTURE_URL, fid, 0,10);
        HttpRequest httpRequest = new HttpRequest();
        result.put("hasOrgInFanya", false);
        try {
            String response = httpRequest.doGet(orgStructureUrl);
            JSONObject jsonObject = JSON.parseObject(response);
            JSONArray orgStructData = jsonObject.getJSONArray("data");
            if (orgStructData != null && orgStructData.size() > 0) {
                int count = jsonObject.getInteger("count");
                if (count > 10){
                    orgStructureUrl = String.format(ORG_STRUCTURE_URL, fid, 0,count);
                    response = httpRequest.doGet(orgStructureUrl);
                    jsonObject = JSON.parseObject(response);
                    orgStructData = jsonObject.getJSONArray("data");
                }
                result.put("hasOrgInFanya", true);
                result.put("id", orgStructData.getJSONObject(0).getIntValue("id"));
                result.put("orgName", orgStructData.getJSONObject(0).getString("groupname"));
                result.put("msg", fid+"对应机构存在");
            }else {
                result.put("msg", fid+"对应机构不存在");
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            result.put("msg", "查询机构报错："+e.getMessage());
        }
        return result;
    }


    /**
     * @param fid fid
     * @param parentGroupId 上级组织机构id
     * @param goupName
     * @return
     */
    public Map<String, Object> hasGroupInFanya(String fid, int parentGroupId, String goupName) {
        Map<String, Object> result = new HashMap<String,Object>();
        String orgStructureUrl = String.format(ORG_STRUCTURE_URL, fid, parentGroupId,10);
        HttpRequest httpRequest = new HttpRequest();
        result.put("hasGroupInFanya", false);
        try {
            String response = httpRequest.doGet(orgStructureUrl);
            JSONObject jsonObject = JSON.parseObject(response);
            JSONArray groupStructData = jsonObject.getJSONArray("data");
            if (groupStructData != null && groupStructData.size() > 0) {
                int count = jsonObject.getInteger("count");
                if (count > 10){ //泛亚接口条数限制
                    orgStructureUrl = String.format(ORG_STRUCTURE_URL, fid, parentGroupId,count);
                    response = httpRequest.doGet(orgStructureUrl);
                    jsonObject = JSON.parseObject(response);
                    groupStructData = jsonObject.getJSONArray("data");
                }
                for (int i = 0; i < groupStructData.size(); i++) {
                    String groupName = groupStructData.getJSONObject(i).getString("groupname");
                    if (goupName.equals(groupName)) {
                        result.put("hasGroupInFanya", true);
                        result.put("id", groupStructData.getJSONObject(i).getInteger("id"));
                        return result;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 向泛亚添加组织架构
     * @param fid
     * @param parentGroupId 上级组织架构ID
     * @param groupName 组织架构名称
     */
    public Map<String,Object> addGroupIntoFanya(String fid,int parentGroupId,String groupName){
        Map<String,Object> result = new HashMap<String,Object>();
        String enc = DigestUtils.md5Hex(fid+parentGroupId+FANYA_KEY_DEPT);
        String addDeptUrl =  String.format(FANYA_ADD_DEPT_URL,fid,parentGroupId,groupName,enc);
        try {
            String returnObj = new HttpRequest().doGet(addDeptUrl);
            JSONObject addGroupResult = JSONObject.parseObject(returnObj);
            if("true".equals(addGroupResult.getString("status"))){
                result.put("status","success");
                result.put("msg",addGroupResult.getString("msg"));
                result.put("id",addGroupResult.getInteger("id"));
            } else {
                result.put("status","fail");
                result.put("msg",addGroupResult.getString("msg"));
            }
        } catch (Exception e) {
            result.put("status","fail");
            result.put("msg",e.getMessage());
        }
        return result;
    }

    public boolean checkUserTypeFormat(int data){
        boolean isRight = false;
        switch (data){
            case 1 : isRight = true; break;
            case 2 : isRight = true; break;
            default: isRight = false;
        }
        return isRight;
    }

    public boolean checkAgeGroupFormat(int data){
        boolean isRight = false;
        switch (data){
            case 1 : isRight = true; break;
            case 2 : isRight = true; break;
            case 3 : isRight = true; break;
            default: isRight = false;
        }
        return isRight;
    }

    /**
     * 显示教师关联班级的 任务 读后感 学生任务统计
     * @param uid
     * @return
     */
//    @Cacheable(value = Constants.FRONT_CACHE_NAME , key = "(#root.target.getClassName()).concat(':').concat(#root.method.name).concat(':').concat(#fid)")
    public List<Map<String,Object>> getClassMissionReportStudentNum(String uid,String fid){
        Map<String,Object>params=new HashMap<String,Object>();
        params.put("uid",uid);
        params.put("fid",fid);
        return sqlMapClientTemplate.queryForList("FanyaUserDetail.getClassMissionReportStudentNum",params);
    }

    /**
     * 学生首页阅读图书排行榜
     * @param classId
     * @retur
     */
    @Cacheable(value = Constants.FRONT_CACHE_NAME , key = "(#root.target.getClassName()).concat(':').concat(#root.method.name).concat(':').concat(#classId)")
    public List<Map<String,Object>> getClassBookRank(Integer classId){
        return sqlMapClientTemplate.queryForList("FanyaUserDetail.getClassBookRank",classId);
    }

    /**
     * 学生首页字数排行榜
     * @param classId
     * @return
     */
    @Cacheable(value = Constants.FRONT_CACHE_NAME , key = "(#root.target.getClassName()).concat(':').concat(#root.method.name).concat(':').concat(#classId)")
    public List<Map<String,Object>> getClassWordRank(Integer classId){
        return sqlMapClientTemplate.queryForList("FanyaUserDetail.getClassWordRank",classId);
    }

    /**
     * 教师首页 有效阅读图书排行榜
     * @param fid
     * @return
     */
    @Cacheable(value = Constants.FRONT_CACHE_NAME , key = "(#root.target.getClassName()).concat(':').concat(#root.method.name).concat(':').concat(#fid)")
    public List<Map<String,Object>> getGroupBookRank(String fid){
        return sqlMapClientTemplate.queryForList("FanyaUserDetail.getGroupBookRank",fid);
    }

    /**
     * 教师首页 有效阅读字数排行榜
     * @param fid
     * @return
     */
    @Cacheable(value = Constants.FRONT_CACHE_NAME , key = "(#root.target.getClassName()).concat(':').concat(#root.method.name).concat(':').concat(#fid)")
    public List<Map<String,Object>> getGroupWordRank(String fid){
        return sqlMapClientTemplate.queryForList("FanyaUserDetail.getGroupWordRank",fid);
    }
}
