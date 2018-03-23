package com.controller.api;

import com.service.JiFenStarRecordService;
import com.util.JsonResponse;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Map;

/**
 * 类说明：积分、星币获取对应接口
 */
@RestController
@RequestMapping("jifenStar")
public class JiFenStarApi {
    @Resource
    private JiFenStarRecordService jiFenStarRecordService;

    /**
     * 用户登录获取积分、星币
     * @param uid
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "{uid}/sign", method = RequestMethod.GET)
    public JsonResponse gainJiFenStar4Sign(@PathVariable String uid){
        Map<String,String> map = jiFenStarRecordService.gainJiFenStar4Sign(uid);
        return new JsonResponse(JsonResponse.CODE_SUCCESS, "ok").put("userJiFenStarInfo",map);
    }

    /**
     * 用户测评获取积分、星币
     * @param uid
     * @param paperUserId
     * @return
     */
    @CrossOrigin
    @RequestMapping(value ="{uid}/{paperUserId}/evaluate", method = RequestMethod.GET)
    public JsonResponse gainJiFenStar4Evaluate(@PathVariable String uid,@PathVariable Integer paperUserId){
        Map<String,String> map = jiFenStarRecordService.gainJiFenStar4Evaluate(uid,paperUserId);
        return new JsonResponse(JsonResponse.CODE_SUCCESS, "ok").put("userJiFenStarInfo",map);
    }

    /**
     * 用户提交读后感获取积分、星币
     * @param uid
     * @param resId
     * @return
     */
    @CrossOrigin
    @RequestMapping(value ="{uid}/{resId}/commit/readReport", method = RequestMethod.GET)
    public JsonResponse gainJiFenStar4ReadReportCommit(@PathVariable String uid,@PathVariable Integer resId){
        Map<String,String> map = jiFenStarRecordService.gainJiFenStar4ReadReportCommit(uid,resId);
        return new JsonResponse(JsonResponse.CODE_SUCCESS, "ok").put("userJiFenStarInfo",map);
    }

    /**
     * 用户读后感评优获取积分、星币
     * @param reportId
     * @return
     */
    @CrossOrigin
    @RequestMapping(value ="{reportId}/excellent/readReport", method = RequestMethod.GET)
    public JsonResponse gainJiFenStar4ReadReportExcellent(@PathVariable Integer reportId){
        Map<String,String> map = jiFenStarRecordService.gainJiFenStar4ReadReportExcellent(reportId);
        return new JsonResponse(JsonResponse.CODE_SUCCESS, "ok").put("userJiFenStarInfo",map);
    }

    /**
     * 用户读后感点赞获取积分、星币
     * @param reportId
     * @return
     */
    @CrossOrigin
    @RequestMapping(value ="{reportId}/praise/readReport", method = RequestMethod.GET)
    public JsonResponse gainJiFenStar4ReadReportPraise(@PathVariable Integer reportId){
        Map<String,String> map = jiFenStarRecordService.gainJiFenStar4ReadReportPraise(reportId);
        return new JsonResponse(JsonResponse.CODE_SUCCESS, "ok").put("userJiFenStarInfo",map);
    }

}
