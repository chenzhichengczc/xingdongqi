package com.hc.modules.userapplication.entity;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import java.io.Serializable;
import lombok.Data;
import java.util.Date;
/**
 * 用户岗位申请表
 *
 * @author fenghuang
 * @email
 * @date 2020-01-17 18:02:21
 */
@TableName("user_application")
@Data
public class UserApplicationEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 主键id
	 */
	@TableId(type = IdType.AUTO)
	private Integer id;
	/**
	 * 申请者id
	 */
	private Integer userId;
	/**
	 * 申请岗位id
	 */
	private Integer postApplicationId;
	/**
	 * 申请时间
	 */
	private Date applicationTime;
	/**
	 *
	 */
	private Date createTime;
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
	/**
	 * 审核意见
	 */
	private String checkReport;
	/**
	 * 姓名
	 */
	private String applicantName;
	/**
	 * 性别
	 */
	private Integer applicantGender;
	/**
	 * 出生年月
	 */
	private String applicantBirth;
	/**
	 * 政治面貌
	 */
	private String applicantPoliticalStatus;
	/**
	 * 现户籍地
	 */
	private String applicantHouseholdRegister;
	/**
	 * 婚姻状况
	 */
	private String applicantMarriageStatus;
	/**
	 * 身份证号
	 */
	private String applicantIdentityCard;
	/**
	 * 毕业时间
	 */
	private String applicantGraduatedTime;
	/**
	 * 毕业院校
	 */
	private String applicantGraduatedCollege;
	/**
	 * 学历及学位
	 */
	private String applicantEducationalBackground;
	/**
	 * 职业资格/职称
	 */
	private String applicantOccupationalQualification;
	/**
	 * 所学专业
	 */
	private String applicantMajor;
	/**
	 * 英语水平
	 */
	private String applicantEnglishLevel;
	/**
	 * 计算机等级
	 */
	private String applicantComputerLevel;
	/**
	 * 通讯地址
	 */
	private String applicantContactAddress;
	/**
	 * 联系电话
	 */
	private String applicantContactPhone;
	/**
	 * 应聘职位
	 */
	private String applicantApplicationPost;
	/**
	 * 主要学习工作经历
	 */
	private String applicantWorkExprience;
	/**
	 * 紧急联系人姓名和电话
	 */
	private String applicantErgentContactPhone;
	/**
	 * 家庭成员社会关系
	 */
	private String applicantFamilyRelationship;
	/**
	 * 申请人名字
	 */
	private String applicantSignName;
	/**
	 * 申请时间
	 */
	private String applicantSignTime;
	/**
	 * 申请人相片路径
	 */
	private String applicantPhotoSrc;
	/**
	 * 申请人身份证路径
	 */
	private String applicantIdentityCardPhoneSrc;

}
