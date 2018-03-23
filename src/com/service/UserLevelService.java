package com.service;

import com.model.UserLevel;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserLevelService extends BaseService<UserLevel> {

    @Override
    public String getClassName() {
        return UserLevel.class.getSimpleName();
    }

    /**
     * 根据用户积分获取等级
     * @param userJiFen
     * @return
     */
    public UserLevel getLevelByUserJiFen(int userJiFen){
        Map<String,Integer> param = new HashMap<>();
        param.put("startScore",userJiFen);
        return (UserLevel) sqlMapClientTemplate.queryForObject(getClassName()+".getLevelByUserJiFen",param);
    }

}
