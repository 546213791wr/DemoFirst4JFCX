package com.model.enums;


/**
 * 任务状态枚举
 */
public enum EvaluateStatus {

	// 1 进行中， 2 未通过，3 通过， 4 过期。
	ACTIVITY(1), NO_PASS(2), PASSED(3), EXPIRED(4);

	private EvaluateStatus(Integer status) {
		this.status = status;
	}

	private Integer status;

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
}


