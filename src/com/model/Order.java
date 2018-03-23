/*
 * 类说明:订单类
 */
package com.model;


import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;

public class Order {
	private BigInteger id;
	private Integer productId; //产品编号
	private BigDecimal totalPrice; //总价格
	private Integer totalExchagnePrice; //兑换总价格
	private Integer createUserId; //创建人ID
	private String createUserName; //订单创建人
	private String orderNo; //订单号
	private String cityCode; //城市编码
	private String address; //详细地址
	private String contactName; //联系人
	private String contactPhone; //联系电话
	private String expressNumber; //物流编号
	private Date createTime;
	private Date updateTime;
	private Integer status; //订单状态 1已提交，5已完成

	public Order() {
	}

	public Order(BigInteger id, Integer productId, BigDecimal totalPrice, Integer totalExchagnePrice, Integer createUserId, String createUserName, String orderNo, String cityCode, String address, String contactName, String contactPhone, String expressNumber, Date createTime, Date updateTime, Integer status) {
		this.id = id;
		this.productId = productId;
		this.totalPrice = totalPrice;
		this.totalExchagnePrice = totalExchagnePrice;
		this.createUserId = createUserId;
		this.createUserName = createUserName;
		this.orderNo = orderNo;
		this.cityCode = cityCode;
		this.address = address;
		this.contactName = contactName;
		this.contactPhone = contactPhone;
		this.expressNumber = expressNumber;
		this.createTime = createTime;
		this.updateTime = updateTime;
		this.status = status;
	}

	public BigInteger getId() {
		return id;
	}

	public void setId(BigInteger id) {
		this.id = id;
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public BigDecimal getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}

	public Integer getTotalExchagnePrice() {
		return totalExchagnePrice;
	}

	public void setTotalExchagnePrice(Integer totalExchagnePrice) {
		this.totalExchagnePrice = totalExchagnePrice;
	}

	public Integer getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(Integer createUserId) {
		this.createUserId = createUserId;
	}

	public String getCreateUserName() {
		return createUserName;
	}

	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getCityCode() {
		return cityCode;
	}

	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getContactName() {
		return contactName;
	}

	public void setContactName(String contactName) {
		this.contactName = contactName;
	}

	public String getContactPhone() {
		return contactPhone;
	}

	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}

	public String getExpressNumber() {
		return expressNumber;
	}

	public void setExpressNumber(String expressNumber) {
		this.expressNumber = expressNumber;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
}

