package com.service;

import com.util.Constants;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StatisticsService extends BaseService<Map> {

    @Override
    public String getClassName() {
        return null;
    }

    /**
     * @param cityCode 区域编码
     * @return
     */
    @Cacheable(value = Constants.FRONT_CACHE_NAME, key = "(#root.target.getClassName()).concat(':').concat(#root.method.name).concat(':').concat(#cityCode)")
    public Map<String,Integer> getStatistics(String cityCode) {
        Map<String,Integer> map = new HashMap();
        //区域机构数
        Integer schoolNum = (Integer) sqlMapClientTemplate.queryForObject("Statistics.getSchoolNum", cityCode);
        map.put("schoolNum",schoolNum);
        //学生数
        Integer studentNum = (Integer) sqlMapClientTemplate.queryForObject("Statistics.getStudentNum", cityCode);
        map.put("studentNum",studentNum);
        //区域数
        Integer areaNum = (Integer) sqlMapClientTemplate.queryForObject("Statistics.getAreaNum", cityCode);
        map.put("areaNum",areaNum-1);
        //老师数
        Integer teacherNum = (Integer) sqlMapClientTemplate.queryForObject("Statistics.getTeacherNum", cityCode);
        map.put("teacherNum",teacherNum);
        //题库数-教师出题部分
        Integer questionNum = (Integer) sqlMapClientTemplate.queryForObject("Statistics.getQuestionNum", cityCode);
        map.put("questionNum",questionNum);
        //题库数-教师出题部分
        Integer pubQuestionNum = (Integer) sqlMapClientTemplate.queryForObject("Statistics.getPubQuestionNum");
        map.put("pubQuestionNum",pubQuestionNum);
        //资源数
        map.put("bookNum",5345);
        return map;
    }


}
