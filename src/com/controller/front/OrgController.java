package com.controller.front;

import com.model.OpenOrg;
import com.service.OpenOrgService;
import com.util.JsonResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: leolin
 * Date: 2017/6/12_11:45
 * version:
 * description:
 */
@RestController
@RequestMapping("org")
public class OrgController  {

    @Resource
    private OpenOrgService orgService;

    @RequestMapping("query")
    public JsonResponse queryOrg(String query){
        List<OpenOrg> list = orgService.queryStr(query);
        return new JsonResponse(JsonResponse.CODE_SUCCESS,"ok").put("list",list);
    }
}
