package com.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.orm.ibatis.SqlMapClientTemplate;

import com.util.Pager;

public abstract class BaseService<T> {
	
	@Resource protected SqlMapClientTemplate sqlMapClientTemplate;
	
	/** 添加 */
	public T add(T t) {
		sqlMapClientTemplate.insert(getClassName() + ".insert", t);
		return t;
	}
	
	/** 删除 */
	public int delete(int id) {
		sqlMapClientTemplate.delete(getClassName() + ".delete", id);
		return id;
	}
	
	/** 修改 */
	public T update(T t) {
		sqlMapClientTemplate.update(getClassName() + ".update", t);
		return t;
	}
	
	/** 查看 */
	@SuppressWarnings("unchecked")
	public T get(int id) {
		T t = (T) sqlMapClientTemplate.queryForObject(getClassName() + ".getById", id);
		return t;
	}
	
	/** 查询所有记录, 慎用 */
	public List<T> getList() {
		return getList(null);
	}
	
	/** 查询所有记录, 慎用 */
	@SuppressWarnings("unchecked")
	public List<T> getList(Pager<T> pager) {
		List<T> resultList = sqlMapClientTemplate.queryForList(getClassName() + ".list", pager);
		return resultList;
	}
	
	/** 查询分页总记录数 */
	public Pager<T> getPageCount(Pager<T> pager) {
		int totalRecords = (Integer) sqlMapClientTemplate.queryForObject(getClassName() + ".findPage.count", pager);
		pager.setTotalRecords(totalRecords);
		return pager;
	}
	
	/** 查询分页 */
	@SuppressWarnings("unchecked")
	public Pager<T> getPageList(Pager<T> pager) {
		pager = getPageCount(pager);
		
		// MySQL的limit分页索引从0开始的
		pager.setStartNumber(pager.getStartNumber() - 1);
		
		List<T> resultList = sqlMapClientTemplate.queryForList(getClassName() + ".findPage", pager);
		pager.setResultList(resultList);
		return pager;
	}
	
	
	/** 查询指定方法分页总记录数 */
	public Pager<T> getPageCount(Pager<T> pager, String functionName) {
		int totalRecords = (Integer) sqlMapClientTemplate.queryForObject(getClassName() +"."+  functionName, pager);
		pager.setTotalRecords(totalRecords);
		return pager;
	}
	
	/** 查询指定方法分页 */
	@SuppressWarnings("unchecked")
	public Pager<T> getPageList(Pager<T> pager, String functionConutName, String functionName) {
		pager = getPageCount(pager, functionConutName);
		
		// MySQL的limit分页索引从0开始的
		pager.setStartNumber(pager.getStartNumber() - 1);
		
		List<T> resultList = sqlMapClientTemplate.queryForList(getClassName() +"."+ functionName, pager);
		pager.setResultList(resultList);
		return pager;
	}
	
	/** 子类需实现类名反射 */
	public abstract String getClassName();

}
