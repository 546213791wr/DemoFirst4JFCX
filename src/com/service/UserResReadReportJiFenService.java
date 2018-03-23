package com.service;

import com.model.UserResReadReportJiFen;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserResReadReportJiFenService extends BaseService<UserResReadReportJiFen> {

    @Override
    public String getClassName() {
        return UserResReadReportJiFen.class.getSimpleName();
    }

    /**
     * 判断用户是否存在对应资源的积分奖励记录
     * @param uid
     * @param resId
     * @return
     */
    public boolean hasUserResReadReportJiFenRecord(String uid, String resId) {
        Map<String,String> param = new HashMap<>();
        param.put("uid",uid);
        param.put("resId",resId);
        UserResReadReportJiFen userResReadReportJiFen = (UserResReadReportJiFen) sqlMapClientTemplate.queryForObject(getClassName()+".getByUidResId", param);
        return userResReadReportJiFen == null ? false : true;
    }

}
