package com.hc.modules.wechatpay.entity;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import java.io.Serializable;
import lombok.Data;
import java.util.Date;
/**
 * 微信支付信息表
 *
 * @author fenghuang
 * @email
 * @date 2020-01-11 19:34:04
 */
@TableName("wechat_pay")
@Data
public class WechatPayEntity implements Serializable {
    private static final long serialVersionUID = 1L;

	/**
	 * 微信订单号
	 */
@TableId(type = IdType.AUTO)
	private String transactionId;
		/**
	 * 随机字符串
	 */
private String nonceStr;
		/**
	 * 付款银行
	 */
private String bankType;
		/**
	 * 用户标识
	 */
private String openid;
		/**
	 * 签名
	 */
private String sign;
		/**
	 * 标价金额
	 */
private String feeType;
		/**
	 * 商户号
	 */
private String mchId;
		/**
	 * 现金支付金额
	 */
private String cashFee;
		/**
	 * 商户订单号
	 */
private String outTradeNo;
		/**
	 * 小程序ID
	 */
private String appid;
		/**
	 * 标价金额
	 */
private String totalFee;
		/**
	 * 交易类型
	 */
private String tradeType;
		/**
	 * 业务结果
	 */
private String resultCode;
		/**
	 * 支付完成时间
	 */
private String timeEnd;
		/**
	 * 是否关注公众账号
	 */
private String isSubscribe;
		/**
	 * 返回状态码
	 */
private String returnCode;
		/**
	 * 更新时间
	 */
private Date updateTime;
		/**
	 * 创建时间
	 */
private Date createTime;

}
