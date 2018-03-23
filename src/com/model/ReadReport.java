/*
 * 类说明：
 */
package com.model;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.util.Date;

public class ReadReport {

    //alias
    public static final String TABLE_ALIAS = "ReadReport";
    public static final String ALIAS_ID = "id";
    public static final String ALIAS_RES_ID = "资源ID";
    public static final String ALIAS_RES_PIC = "资源封面";
    public static final String ALIAS_UID = "UID";
    public static final String ALIAS_TITLE = "title";
    public static final String ALIAS_CONTENT = "content";
    public static final String ALIAS_CREATE_TIME = "createTime";
    public static final String ALIAS_AGREE_COUNT = "点赞数量";
    public static final String ALIAS_IS_PERFECT = "是否加优 1 是  0 否";

    //columns START
    /**
     * id   db_column: id
     */
    private Integer id;
    /**
     * 资源ID   db_column: res_id
     */
    private Integer resId;
    /**
     * 资源封面   db_column: res_pic
     */
    private String resPic;
    /**
     * UID   db_column: uid
     */
    private String uid;
    /**
     * title   db_column: title
     */
    private String title;
    /**
     * content   db_column: content
     */
    private String content;
    /**
     * createTime   db_column: create_time
     */
    private Date createTime;
    /**
     * 点赞数量   db_column: agree_count
     */
    private Integer agreeCount;
    /**
     * 是否加优 1 是  0 否   db_column: is_perfect
     */
    private Integer isPerfect;
    //fanya名
    private String fanyaName;
    //机构名
    private String orgName;
    //记录标志
    private String record_flag;
    //学生名
    private String studentName;
    //班级名
    private String className;
    //读后感对应书籍名
    private String bookTitle;
    //columns END
    private String createTimeStr;

    /**
     * 用户点赞标识
     */
    private String likeFlag;
    /**
     * 教师评优uid
     */
    private String perfectUid;
    private String opTeaUid;
    private Date opTime;

    public String getOpTeaUid() {
        return opTeaUid;
    }

    public void setOpTeaUid(String opTeaUid) {
        this.opTeaUid = opTeaUid;
    }

    public Date getOpTime() {
        return opTime;
    }

    public void setOpTime(Date opTime) {
        this.opTime = opTime;
    }

    public ReadReport() {
    }

    public ReadReport(
            Integer id
    ) {
        this.id = id;
    }



    public String getPerfectUid() {
        return perfectUid;
    }

    public void setPerfectUid(String perfectUid) {
        this.perfectUid = perfectUid;
    }

    public void setId(Integer value) {
        this.id = value;
    }

    public Integer getId() {
        return this.id;
    }

    public void setResId(Integer value) {
        this.resId = value;
    }

    public Integer getResId() {
        return this.resId;
    }

    public void setResPic(String value) {
        this.resPic = value;
    }

    public String getResPic() {
        return this.resPic;
    }

    public void setUid(String value) {
        this.uid = value;
    }

    public String getUid() {
        return this.uid;
    }

    public void setTitle(String value) {
        this.title = value;
    }

    public String getTitle() {
        return this.title;
    }

    public void setContent(String value) {
        this.content = value;
    }

    public String getContent() {
        return this.content;
    }

    public void setCreateTime(Date value) {
        this.createTime = value;
    }

    public Date getCreateTime() {
        return this.createTime;
    }

    public void setAgreeCount(Integer value) {
        this.agreeCount = value;
    }

    public Integer getAgreeCount() {
        return this.agreeCount;
    }

    public void setIsPerfect(Integer value) {
        this.isPerfect = value;
    }

    public Integer getIsPerfect() {
        return this.isPerfect;
    }

    public String getFanyaName() {
        return fanyaName;
    }

    public void setFanyaName(String fanyaName) {
        this.fanyaName = fanyaName;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getRecord_flag() {
        return record_flag;
    }

    public void setRecord_flag(String record_flag) {
        this.record_flag = record_flag;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getCreateTimeStr() {
        return createTimeStr;
    }

    public void setCreateTimeStr(String createTimeStr) {
        this.createTimeStr = createTimeStr;
    }

    public String getLikeFlag() {
        return likeFlag;
    }

    public void setLikeFlag(String likeFlag) {
        this.likeFlag = likeFlag;
    }

    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
                .append("Id", getId())
                .append("ResId", getResId())
                .append("ResPic", getResPic())
                .append("Uid", getUid())
                .append("Title", getTitle())
                .append("Content", getContent())
                .append("CreateTime", getCreateTime())
                .append("AgreeCount", getAgreeCount())
                .append("IsPerfect", getIsPerfect())
                .toString();
    }

    public int hashCode() {
        return new HashCodeBuilder()
                .append(getId())
                .toHashCode();
    }

    public boolean equals(Object obj) {
        if (obj instanceof ReadReport == false) return false;
        if (this == obj) return true;
        ReadReport other = (ReadReport) obj;
        return new EqualsBuilder()
                .append(getId(), other.getId())
                .isEquals();
    }
}

