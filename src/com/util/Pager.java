package com.util;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/** 分页工具 */
public class Pager<T> {

	/**
	 * @Fields pageNumber : 当前页, 默认当前第1页
	 * @Fields pageSize : 每页显示记录数, 默认每页显示20条记录
	 * @Fields totalRecords : 总记录数
	 * @Fields totalPages : 总页数
	 * @Fields startNumber : 起始记录序号
	 * @Fields endNumber : 终止记录序号
	 * @Fields sort : 排序, 赋值形如 "ORDER BY ID ASC"
	 */
	private int pageNumber = 1;
	private int pageSize = 12;
	private int totalRecords = 0;
	private int totalPages = 0;
	private int startNumber = 0;
	private int endNumber = 0;


	/** 默认以主键升序 */
	private String sortString = "ORDER BY ID DESC";
	/** 对象查询条件对象 */
	private T query;
	/** 其他查询条件 */
	private Map<String, Object> condition;
	/** 结果集 */
	private List<T> resultList;
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}

	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getTotalRecords() {
		return totalRecords;
	}
	public void setTotalRecords(int totalRecords) {
		this.totalRecords = totalRecords;
		// 如果总记录数改变, 则更新数据
		update();
	}
	
	private void update() {
		totalPages = ((totalRecords - 1) / pageSize) + 1;
//		if (pageNumber >= totalPages) {
//			pageNumber = totalPages;
//		}
		if (pageNumber <= 0) {
			pageNumber = 1;
		}
		
		this.startNumber = (pageNumber - 1) * pageSize + 1;
		
		this.endNumber = (pageNumber - 1) * pageSize + pageSize;
		if (endNumber > totalRecords) {
			endNumber = totalRecords;
		}
	}
	
	public int getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}
	public int getStartNumber() {
		return startNumber;
	}
	public void setStartNumber(int startNumber) {
		this.startNumber = startNumber;
	}
	public int getEndNumber() {
		return endNumber;
	}
	public void setEndNumber(int endNumber) {
		this.endNumber = endNumber;
	}
	public int getPageNumber() {
		return pageNumber;
	}
	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public String getSortString() {
		return sortString;
	}
	public void setSortString(String sortString) {
		this.sortString = sortString;
	}
	public T getQuery() {
		return query;
	}
	public void setQuery(T query) {
		this.query = query;
	}
	public List<T> getResultList() {
		return resultList;
	}
	public void setResultList(List<T> resultList) {
		this.resultList = resultList;
	}
	public Map<String, Object> getCondition() {
		return condition;
	}
	public void setCondition(Map<String, Object> condition) {
		this.condition = condition;
	}
}
