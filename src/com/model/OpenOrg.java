/*
 * 类说明：
 */
package com.model;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.io.Serializable;

public class OpenOrg implements Serializable{

    private static final long serialVersionUID = -1;
    //alias
    public static final String TABLE_ALIAS = "OpenOrg";
    public static final String ALIAS_ID = "id";
    public static final String ALIAS_FID = "fid";
    public static final String ALIAS_ORG_NAME = "orgName";
    public static final String ALIAS_DOMAIN_URL = "domainUrl";
    public static final String ALIAS_OPEN_TIME = "openTime";

    //columns START
    /**
     * id   db_column: id
     */
    private Integer id;
    /**
     * fid   db_column: fid
     */
    private String fid;
    /**
     * orgName   db_column: org_name
     */
    private String orgName;
    /**
     * domainUrl   db_column: domain_url
     */
    private String domainUrl;
    /**
     * openTime   db_column: open_time
     */
    private java.util.Date openTime;
    private String logoUrl;
    //columns END
//----------wr增加字段---------------
    /**
     * 禁用状态
     */
    private Integer status;
    /**
     * 发布状态
     */
    private Integer publish;
    /**
     * 机构组
     */
    private Integer gid;

    private Integer unique;


    public OpenOrg() {
    }

    public OpenOrg(
            Integer id
    ) {
        this.id = id;
    }

    public void setId(Integer value) {
        this.id = value;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public Integer getId() {
        return this.id;
    }

    public void setStatus(Integer value) {
        this.status = value;
    }

    public Integer getStatus() {
        return this.status;
    }

    public void setPublish(Integer value) {
        this.publish = value;
    }

    public Integer getPublish() {
        return this.publish;
    }

    public void setFid(String value) {
        this.fid = value;
    }

    public String getFid() {
        return this.fid;
    }

    public void setOrgName(String value) {
        this.orgName = value;
    }

    public String getOrgName() {
        return this.orgName;
    }

    public void setDomainUrl(String value) {
        this.domainUrl = value;
    }

    public String getDomainUrl() {
        return this.domainUrl;
    }

    public void setOpenTime(java.util.Date value) {
        this.openTime = value;
    }

    public java.util.Date getOpenTime() {
        return this.openTime;
    }

    public Integer getGid() {
        return gid;
    }

    public void setGid(Integer gid) {
        this.gid = gid;
    }

    public Integer getUnique() {
        return unique;
    }

    public void setUnique(Integer unique) {
        this.unique = unique;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
                .append("Id", getId())
                .append("Fid", getFid())
                .append("OrgName", getOrgName())
                .append("DomainUrl", getDomainUrl())
                .append("OpenTime", getOpenTime())
                .append("status", getStatus())
                .append("Publish", getPublish())
                .toString();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(getId())
                .toHashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof OpenOrg == false) {
            return false;
        }
        if (this == obj) {
            return true;
        }
        OpenOrg other = (OpenOrg) obj;
        return new EqualsBuilder()
                .append(getId(), other.getId())
                .isEquals();
    }
}

