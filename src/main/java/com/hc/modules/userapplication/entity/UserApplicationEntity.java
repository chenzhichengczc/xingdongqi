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
 * @date 2020-01-11 19:46:44
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

}
