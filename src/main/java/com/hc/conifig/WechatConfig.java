package com.hc.conifig;

import com.hc.common.utils.WXPayUtil;

import java.util.*;

/**
 * @author ：fenghuang
 * @date ：Created in 2019/7/12 16:35
 * @description：
 * @modified By：
 * @version:
 */
public class WechatConfig {
    //小程序appid
    public static final String appid = "ww9755ffca3e7076d0";
    //微信支付的商户id
    public static final String mch_id = "1574275411";
    //微信支付的商户密钥
    public static final String key = "14789632147896321478963214789632";
    //支付成功后的服务器回调url，这里填PayControlle里的回调函数地址
    public static final String notify_url = "https://www.xingdongqi.com/wechatPay/nativePay";
    //签名方式，固定值
    public static final String SIGNTYPE = "MD5";
    //交易类型，小程序支付的固定值为JSAPI
    public static final String TRADETYPE = "NATIVE";
    //微信统一下单接口地址
    public static final String pay_url = "https://api.mch.weixin.qq.com/pay/unifiedorder";

    //生成订单号
    public static String createOrder() {
        char charr[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".toCharArray();
        StringBuilder sb = new StringBuilder();
        Random r = new Random();
        for (int x = 0; x < 32; x++) {
            sb.append(charr[r.nextInt(charr.length)]);
        }
        return sb.toString();
    }

}
