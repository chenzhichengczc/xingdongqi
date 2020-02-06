package com.hc.modules.alipay.entity;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import lombok.Data;

import java.util.Date;

@Data
@TableName("alipay")
public class ResponseEntity {

    @TableId(type = IdType.AUTO)
    private Integer id;

    private String notify_time;

    private String notify_type;

    private String notify_id;

    private String charset;

    private String version;

    private String sign_type;

    private String sign;

    private String auth_app_id;

    private String trade_no;

    private String app_id;

    private String out_trade_no;

    private String out_biz_no;

    private String buyer_id;

    private String seller_id;

    private String trade_status;

    private String total_amout;

    private String refund_fee;

    private String subject;

    private String body;

    private String gmt_create;

    private String gmt_payment;

    private String gmt_refund;

    private String gmt_close;

    private String fund_bill_list;

    private String passback_params;



}
