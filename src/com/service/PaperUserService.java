package com.service;

import com.model.PaperUser;
import org.springframework.stereotype.Service;

/**
 * Created with IntelliJ IDEA.
 * User: leolin
 * Date: 2017/3/23  _ 16:21
 * version:
 * description:
 */
@Service
public class PaperUserService extends BaseService<PaperUser> {
    @Override
    public String getClassName() {
        return PaperUser.class.getSimpleName();
    }

}
