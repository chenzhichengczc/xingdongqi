package com.hc.modules.userapplication.entity;

import com.hc.modules.postApplication.entity.PostApplicationEntity;
import lombok.Data;

import java.util.Date;

@Data
public class UserApplicationPO {

    //指userApplication表的id
    private  Integer id;

    private Integer userId;
    /**
     * 申请岗位id
     */
    private Integer postApplicationId;
    /**
     * 支付状态 0.未支付 1.已支付
     */
    private Integer paymentStatus;
    /**
     * 支付id
     */
    private Integer payId;
    /**
     * 审批结果 0.审批中 1.审批通过 2.审批不通过
     */
    private Integer checkResult;

    private String checkReport;

    private String postCode;
    /**
     * 岗位名字
     */
    private String postName;
    /**
     * 招聘单位
     */
    private String hireDepartment;
    /**
     * 截止时间
     */
    private Date applicationDeadline;
    /**
     * 岗位职责
     */
    private String postDuty;
    /**
     * 招聘条件
     */
    private String applicationQualifications;
    /**
     * 招聘人数
     */
    private Integer hireAmount;
    /**
     * 专业
     */
    private String major;
    /**
     * 学历要求
     */
    private String educationRequirement;
    /**
     * 年龄
     */
    private String ageRange;
    /**
     * 其他要求
     */
    private String otherRequirement;
    /**
     * 招聘对象
     */
    private String recruitment;

}
