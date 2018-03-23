/*
 * 类说明:产品类
 */
package com.model;

import java.math.BigDecimal;
import java.math.BigInteger;

public class Product {
	private BigInteger id;
	private String name;
	private BigDecimal price; //价格
	private Integer exchangePrice; //兑换价格
	private String pictureUrl; //商品图片地址
	private String unit; //单位
	private String artNo; //货号
	private Integer store; //库存量
	private Integer saled; //销售量
	private String description; //描述
	private Integer status; //状态: 0 下架, 1 上架
	private Integer orders;

	public Product() {
	}

	public Product(BigInteger id, String name, BigDecimal price, Integer exchangePrice, String pictureUrl, String unit, String artNo, Integer store, Integer saled, String description, Integer status, Integer orders) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.exchangePrice = exchangePrice;
		this.pictureUrl = pictureUrl;
		this.unit = unit;
		this.artNo = artNo;
		this.store = store;
		this.saled = saled;
		this.description = description;
		this.status = status;
		this.orders = orders;
	}

	public BigInteger getId() {
		return id;
	}

	public void setId(BigInteger id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Integer getExchangePrice() {
		return exchangePrice;
	}

	public void setExchangePrice(Integer exchangePrice) {
		this.exchangePrice = exchangePrice;
	}

	public String getPictureUrl() {
		return pictureUrl;
	}

	public void setPictureUrl(String pictureUrl) {
		this.pictureUrl = pictureUrl;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getArtNo() {
		return artNo;
	}

	public void setArtNo(String artNo) {
		this.artNo = artNo;
	}

	public Integer getStore() {
		return store;
	}

	public void setStore(Integer store) {
		this.store = store;
	}

	public Integer getSaled() {
		return saled;
	}

	public void setSaled(Integer saled) {
		this.saled = saled;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getOrders() {
		return orders;
	}

	public void setOrders(Integer orders) {
		this.orders = orders;
	}
}

