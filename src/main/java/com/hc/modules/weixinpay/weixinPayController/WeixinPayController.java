package com.hc.modules.weixinpay.weixinPayController;

import com.alipay.api.internal.util.XmlUtils;
import com.hc.common.exception.JcExceptionHandler;
import com.hc.common.utils.*;
import com.hc.conifig.WechatConfig;
import com.hc.modules.weixinpay.entity.PayReultEntity;
import com.hc.modules.weixinpay.service.WeixinPayService;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ConnectTimeoutException;
import org.apache.http.conn.ConnectionPoolTimeoutException;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.bouncycastle.jcajce.provider.digest.MD5;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.SocketTimeoutException;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
public class WeixinPayController {



    @Resource
    private WeixinPayService weixinPayService;

    @RequestMapping(value = "/api/wx/pay", method = RequestMethod.POST)
    public ResponseUtil getImageUrl(HttpServletRequest httpServletRequest,Integer userApplicationId) throws Exception{

        Map<String, Object> map = weixinPayService.getImageUrl(httpServletRequest, userApplicationId);

        return ResponseUtil.success(map);
    }

    @RequestMapping(value = "/api/wx/pay/orderquery'", method = RequestMethod.POST)
    public ResponseUtil checkOrder(HttpServletRequest httpServletRequest,String orderOn) throws Exception{

        Boolean result =  weixinPayService.checkOrder(httpServletRequest, orderOn);

        return ResponseUtil.success(result);
    }


    //这里是支付回调接口，微信支付成功后会自动调用
    @RequestMapping(value = "/wechatPay/nativePay/notifyPay", method = RequestMethod.POST)
    public void wxNotify(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println(new Date());
        BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
        String line = null;
        StringBuilder sb = new StringBuilder();
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }
        br.close();
        //sb为微信返回的xml
        String notityXml = sb.toString();
        String resXml = "";

        Map<String, String> map = PayUtil.doXMLParse(notityXml);
        String returnCode = (String) map.get("return_code");

        if ("SUCCESS".equals(returnCode)) {
            System.out.println("进来了");
            //验证签名是否正确
            Map<String, String> validParams = PayUtil.paraFilter(map);  //回调验签时需要去除sign和空值参数
            String prestr = PayUtil.createLinkString(validParams);
            System.out.println("prestr = " + prestr);
            //根据微信官网的介绍，此处不仅对回调的参数进行验签，还需要对返回的金额与系统订单的金额进行比对等
            /**if (PayUtil.verify(prestr, (String) map.get("sign"), WechatConfig.key, "utf-8")) {
             //**此处添加自己的业务逻辑代码start**//*
                System.out.println("验证成功了 = ");
                //注意要判断微信支付重复回调，支付成功后微信会重复的进行回调

                //**此处添加自己的业务逻辑代码end**//*
                //通知微信服务器已经支付成功
                resXml = "<xml>" + "<return_code><![CDATA[SUCCESS]]></return_code>"
                        + "<return_msg><![CDATA[OK]]></return_msg>" + "</xml> ";
            }**/
            if (WXPayUtil.isSignatureValid(notityXml, WechatConfig.key) ) {
                /**此处添加自己的业
                 * 至于返回结果可自己看着判断返回
                 * 至于支付成功会返回什么结果去下面去看
                 * https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_7&index=8
                 * 	Map map =  WXPayUtil.xmlToMap(notityXml);
                 map即为返回结果的转换封装xml
                 *
                 *
                 * 务逻辑代码start**/
                //插入支付订单
                PayReultEntity payReultEntity = new PayReultEntity();
                payReultEntity.setTransactionId(map.get("transaction_id"));
                payReultEntity.setNonceStr(map.get("nonce_str"));
                payReultEntity.setBankType(map.get("bank_type"));
                payReultEntity.setOpenid(map.get("openid"));
                payReultEntity.setSign(map.get("sign"));
                payReultEntity.setFeeType(map.get("fee_type"));
                payReultEntity.setMchId(map.get("mch_id"));
                payReultEntity.setCashFee(map.get("cash_fee"));
                payReultEntity.setOutTradeNo(map.get("out_trade_no"));
                payReultEntity.setAppid(map.get("appid"));
                payReultEntity.setTotalFee(map.get("total_fee"));
                payReultEntity.setTradeType(map.get("trade_type"));
                payReultEntity.setResultCode(map.get("result_code"));
                payReultEntity.setTimeEnd(map.get("time_end"));
                payReultEntity.setIsSubscribe(map.get("is_subscribe"));
                payReultEntity.setReturnCode(map.get("return_code"));
                weixinPayService.createPayMessage(payReultEntity);
                System.out.println("生成订单啦");

                resXml = "<xml>" + "<return_code><![CDATA[SUCCESS]]></return_code>"
                        + "<return_msg><![CDATA[OK]]></return_msg>" + "</xml> ";

            }
        } else {
            resXml = "<xml>" + "<return_code><![CDATA[FAIL]]></return_code>"
                    + "<return_msg><![CDATA[报文为空]]></return_msg>" + "</xml> ";
        }

        BufferedOutputStream out = new BufferedOutputStream(
                response.getOutputStream());
        out.write(resXml.getBytes());
        out.flush();
        out.close();
    }

}
