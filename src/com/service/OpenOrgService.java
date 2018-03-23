package com.service;

import com.model.OpenOrg;
import com.util.Constants;
import com.util.GetPinyin;
import com.util.Pager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: leolin
 * Date: 2017/6/28_17:39
 * version:
 * description:
 */
@Service
public class OpenOrgService extends BaseService<OpenOrg> {
    @Override
    public String getClassName() {
        return OpenOrg.class.getSimpleName();
    }

    /**
     * 根据FID获取唯一机构信息
     * @param fid
     * @return
     */
    public OpenOrg getByFid(String fid) {
        return (OpenOrg) sqlMapClientTemplate.queryForObject("OpenOrg.getByFid",fid);
    }

    /**
     * 查询状态正常的机构
     * @param fid
     * @return
     */
    @Cacheable(value = Constants.FRONT_CACHE_NAME, key = "(#root.target.getClassName()).concat(':').concat(#root.method.name).concat(':').concat(#fid)")
    public OpenOrg getByFidAndStatus(String fid) {
        return (OpenOrg) sqlMapClientTemplate.queryForObject("OpenOrg.getByFidAndStatus",fid);
    }

    public List<OpenOrg> queryStr(String query) {
        return sqlMapClientTemplate.queryForList("OpenOrg.queryStr",query);
    }

    /**
     * 根据域名信息，查找机构
     * @param domain
     * @return
     */
    public OpenOrg getByDomain(String domain) {
        return (OpenOrg) sqlMapClientTemplate.queryForObject("OpenOrg.getByDomain",domain);
    }

    /**
     * 根据域名信息，查找机构
     * @param orgName
     * @return
     */
    public OpenOrg getByOrgName(String orgName) {
        return (OpenOrg) sqlMapClientTemplate.queryForObject("OpenOrg.getByOrgName",orgName);
    }

    /**
     * 根据域名信息，查找状态正常的机构
     * @param domain
     * @return
     */
    @Cacheable(value = Constants.FRONT_CACHE_NAME, key = "(#root.target.getClassName()).concat(':').concat(#root.method.name).concat(':').concat(#domain)")
    public OpenOrg getByDomainAndStatus(String domain) {
        return (OpenOrg) sqlMapClientTemplate.queryForObject("OpenOrg.getByDomainAndStatus",domain);
    }

    /**
     * 根据请求的request 从中获取域名，查找该域名对应的机构信息。
     * @param request
     * @return
     */
    public OpenOrg getFromDomain(HttpServletRequest request){
        String host[] = request.getHeader("Host").split("\\.");
        if (host.length == 4) {
            String domain = host[0];
            OpenOrg openOrg = getByDomainAndStatus(domain);
            return openOrg;
        }else{
            return null;
        }
    }

    /**
     * 验证域名是否有重复
     * @param domain
     * @return
     */
    public Integer getByDomain2(String domain) {
        return  (Integer) sqlMapClientTemplate.queryForObject("OpenOrg.getByDomain2",domain);
    }

    /**
     * 得到一级模块
     * @param pager
     * @return
     */
    public Pager<Map> getModulesList(Pager<Map> pager) {
        int totalRecords = (Integer) sqlMapClientTemplate.queryForObject("OpenOrg.getModules.count", pager);
        pager.setTotalRecords(totalRecords);
        // MySQL的limit分页索引从0开始的
        pager.setStartNumber(pager.getStartNumber() - 1);
        List<Map> resultList = sqlMapClientTemplate.queryForList( "OpenOrg.getModules", pager);
        pager.setResultList(resultList);
        return pager;
    }

    /**
     * 得到阅读一级模块
     * @param pager
     * @return
     */
    public Pager<Map> getReadModulesList(Pager<Map> pager) {
        int totalRecords = (Integer) sqlMapClientTemplate.queryForObject("OpenOrg.getReadModules.count", pager);
        pager.setTotalRecords(totalRecords);
        // MySQL的limit分页索引从0开始的
        pager.setStartNumber(pager.getStartNumber() - 1);
        List<Map> resultList = sqlMapClientTemplate.queryForList( "OpenOrg.getReadModules", pager);
        pager.setResultList(resultList);
        return pager;
    }

    /**获取所有开通机构
     * @return
     */
    @SuppressWarnings("unchecked")
	public List<OpenOrg> getAll (){
		return sqlMapClientTemplate.queryForList("OpenOrg.getAll");
    	
    }

    public List<OpenOrg> getOrgByActivityId (){
        return sqlMapClientTemplate.queryForList("OpenOrg.getOrgByActivityId");

    }
    /**
     * 根据机构组id删除机构
     * @param gid
     */
    public void deleteByGid(Integer gid){
	    sqlMapClientTemplate.delete(this.getClassName()+".deleteByGid",gid);
    }

    /**
     * 根据机构组id查询机构
     * @param gid
     * @return
     */
    public List<OpenOrg> getByGid(Integer gid) {
        return sqlMapClientTemplate.queryForList("OpenOrg.getByGid",gid);
    }

    public List<OpenOrg> getByFids(String strFids) {

        return sqlMapClientTemplate.queryForList("OpenOrg.getByFids",strFids);
    }

    /**
     * 查询没有加入机构组的机构
     * @return
     */
    public List<OpenOrg> getListNoGroup() {
        return sqlMapClientTemplate.queryForList("OpenOrg.getListNoGroup");
    }

    public List<OpenOrg> getNullUrlOpenOrgList(){ return sqlMapClientTemplate.queryForList("OpenOrg.getListNoUrl");}

    public Integer relevanceModule(String fid,Integer ageGroupId,Integer userTypeId){
        Map<String,Object>map=new HashMap<String,Object>();
        map.put("fid",fid);
        map.put("ageGroupId",ageGroupId);
        map.put("userTypeId",userTypeId);

        return (Integer) sqlMapClientTemplate.queryForObject("OpenOrg.relevanceModule",map);
    }


    public List<OpenOrg> getListNoCity(OpenOrg openOrg) {
        return sqlMapClientTemplate.queryForList("OpenOrg.getListNoCity",openOrg);
    }

    public  List<OpenOrg> getOrgsByOrgName(String orgName) {
        return sqlMapClientTemplate.queryForList("OpenOrg.getOrgsByOrgName",orgName);
    }

    public List<OpenOrg> getCityOrg(String cityCode) {
        return sqlMapClientTemplate.queryForList("OpenOrg.getCityOrg",cityCode);
    }

}