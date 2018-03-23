package com.service;

import com.model.UserResEvaluateStar;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserResEvaluateStarService extends BaseService<UserResEvaluateStar> {

    @Override
    public String getClassName() {
        return UserResEvaluateStar.class.getSimpleName();
    }

    /**
     * 判断用户是否存在对应资源的星币奖励记录
     * @param uid
     * @param resId
     * @return
     */
    public boolean hasUserResEvaluateStarRecord(String uid, String resId) {
        Map<String,String> param = new HashMap<>();
        param.put("uid",uid);
        param.put("resId",resId);
        UserResEvaluateStar userResStar = (UserResEvaluateStar) sqlMapClientTemplate.queryForObject(getClassName()+".getByUidResId", param);
        return userResStar == null ? false : true;
    }

}
