package com.hc.modules.weixinpay.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.hc.common.exception.JcException;
import com.hc.common.utils.HttpRequest;
import com.hc.common.utils.PayUtil;
import com.hc.common.utils.UUIDUtils;
import com.hc.common.utils.WXPayXmlUtil;
import com.hc.conifig.WechatConfig;
import com.hc.modules.userapplication.entity.UserApplicationEntity;
import com.hc.modules.userapplication.mapper.UserApplicationMapper;
import com.hc.modules.weixinpay.entity.PayReultEntity;
import com.hc.modules.weixinpay.mapper.WeixinPayMapper;
import com.hc.modules.weixinpay.service.WeixinPayService;
import com.hc.modules.weixinpay.weixinPayController.WeixinPayController;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ConnectTimeoutException;
import org.apache.http.conn.ConnectionPoolTimeoutException;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.SocketTimeoutException;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class WeixinPayServiceImpl implements WeixinPayService {

    private static final Logger log = LoggerFactory.getLogger(WeixinPayServiceImpl.class);

    @Resource
    private WeixinPayMapper weixinPayMapper;

    @Resource
    private UserApplicationMapper userApplicationMapper;

    @Override
    public void createPayMessage(PayReultEntity payReultEntity) {
        //插入微信支付订单
        Integer payMessage = weixinPayMapper.createPayMessage(payReultEntity);



        UserApplicationEntity userApplicationEntity = new UserApplicationEntity();
        userApplicationEntity.setWechatPayId(payReultEntity.getTransactionId());
        userApplicationEntity.setPaymentStatus(1);

        Integer result = userApplicationMapper.update(userApplicationEntity,new EntityWrapper<UserApplicationEntity>().eq("order_on",payReultEntity.getOutTradeNo()));

    }

    @Override
    public Map<String, Object> getImageUrl(HttpServletRequest httpServletRequest, Integer userApplicationId) {




        //获取订单号
        String orderOn = getOrder();



        Map<String, String> paramMap = new HashMap<String, String>();
        paramMap.put("appid", WechatConfig.appid); //appid：每个公众号都有一个appid
        paramMap.put("body", "岗位申请服务费"); //商品描述
        paramMap.put("mch_id", WechatConfig.mch_id); //商户号：开通微信支付后分配
        paramMap.put("nonce_str", UUIDUtils.getRandomStringByLength(32));  // 随机字符串
        paramMap.put("notify_url", WechatConfig.notify_url); //支付成功后，回调地址
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        Calendar afterTime = Calendar.getInstance();
        afterTime.add(Calendar.MINUTE, 30); //当前分钟+30
        Date afterDate = afterTime.getTime();
        String timeStart = simpleDateFormat.format(date);
        String timeExpire = simpleDateFormat.format(afterDate);
        paramMap.put("time_start", timeStart);
        paramMap.put("time_expire", timeExpire);
        paramMap.put("out_trade_no",  orderOn);  //商户订单号
        paramMap.put("product_id", orderOn); // 商户根据自己业务传递的参数 当trade_type=NATIVE时必填
        paramMap.put("spbill_create_ip", HttpRequest.getIpAddr(httpServletRequest)); //本机的Ip
        paramMap.put("total_fee", "1"); //金额必须为整数  单位为分
        paramMap.put("trade_type", WechatConfig.TRADETYPE); //交易类型

        String prestr = PayUtil.createLinkString(paramMap); // 把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
        String mysign = PayUtil.sign(prestr, WechatConfig.key, "utf-8").toUpperCase();
        paramMap.put("sign", mysign);//根据微信签名规则，生成签名。随机参数可以在商户后台管理系统中进行设置。
        String xmlData = WXPayXmlUtil.map2xmlBody(paramMap,"xml");//把参数转换成XML数据格式
        String codeUrl = getCodeUrl(WechatConfig.pay_url, xmlData);   //获取二维码链接
        Map<String, Object> map = new HashMap<>();
        map.put("orderOn", orderOn);
        map.put("codeUrl", codeUrl);
        Integer result = weixinPayMapper.updateApplication(userApplicationId, orderOn);
        if(result != 1){
            throw new JcException(502, "服务器端异常,请联系工作人员");
        }
        return map;
    }

    @Override
    public Boolean checkOrder(HttpServletRequest httpServletRequest, String orderOn) {

        Map<String, String> paramMap = new HashMap<String, String>();
        paramMap.put("appid", WechatConfig.appid); //appid：每个公众号都有一个appid
        paramMap.put("mch_id", WechatConfig.mch_id); //商户号：开通微信支付后分配
        paramMap.put("nonce_str", UUIDUtils.getRandomStringByLength(32));  // 随机字符串
        paramMap.put("out_trade_no",  orderOn);
        String prestr = PayUtil.createLinkString(paramMap); // 把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
        String mysign = PayUtil.sign(prestr, WechatConfig.key, "utf-8").toUpperCase();
        paramMap.put("sign", mysign);//根据微信签名规则，生成签名。随机参数可以在商户后台管理系统中进行设置。
        String xmlData = WXPayXmlUtil.map2xmlBody(paramMap,"xml");//把参数转换成XML数据格式
        Boolean result = checkOrderStatus(WechatConfig.query_url, xmlData);
        return result;
    }

    private synchronized String getOrder(){

        //Date date = new Date();
        //SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        long time = System.currentTimeMillis();
        String format = String.valueOf(time);

        return format + getRandomString(6);
    }

    private static String getRandomString(int length) { // length表示生成字符串的长度
        String base = "0123456789";
        Random random = new Random();
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < length; i++) {
            int number = random.nextInt(base.length());
            sb.append(base.charAt(number));
        }
        return sb.toString().toUpperCase();
    }

    /**
     * 查询订单是否成功
     */
    private Boolean checkOrderStatus(String url, String xmlData) {
        String resXml = null;
        try {
            resXml = this.sendPost(url, xmlData);
        } catch (UnrecoverableKeyException e1) {
            log.error(e1.getMessage());
        } catch (KeyManagementException e1) {
            log.error(e1.getMessage());
        } catch (KeyStoreException e1) {
            log.error(e1.getMessage());
        } catch (NoSuchAlgorithmException e1) {
            log.error(e1.getMessage());
        } catch (IOException e1) {
            log.error(e1.getMessage());
        }

        Boolean result = false;
        Map<String, String> map;
        try {
            map = PayUtil.doXMLParse(resXml);
            Object returnCode = map.get("return_code");
            System.out.println("returnCode = " + returnCode);
            if("SUCCESS".equals(returnCode)) {
                Object resultCode = map.get("result_code");
                if("SUCCESS".equals(resultCode)) {
                    Object tradeState = map.get("trade_state");
                    if("SUCCESS".equals(tradeState)){
                        return true;
                    }
                }
            }else {
                return false;
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            return false;
        }
        return result;
    }

    /**
     * 获取二维码链接
     * @param xmlData
     * @return
     */
    private String getCodeUrl(String url, String xmlData) {
        String resXml = null;
        try {
            resXml = this.sendPost(url, xmlData);
        } catch (UnrecoverableKeyException e1) {
            log.error(e1.getMessage());
        } catch (KeyManagementException e1) {
            log.error(e1.getMessage());
        } catch (KeyStoreException e1) {
            log.error(e1.getMessage());
        } catch (NoSuchAlgorithmException e1) {
            log.error(e1.getMessage());
        } catch (IOException e1) {
            log.error(e1.getMessage());
        }

        String code_url = "";
        Map<String, String> map;
        try {
            map = PayUtil.doXMLParse(resXml);
            Object returnCode = map.get("return_code");
            System.out.println("returnCode = " + returnCode);
            if("SUCCESS".equals(returnCode)) {
                Object resultCode = map.get("result_code");
                if("SUCCESS".equals(resultCode)) {
                    code_url = map.get("code_url").toString();
                }
            }else {
                throw new JcException(502, "服务器端异常,请联系工作人员");
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            return "";
        }
        return code_url;
    }

    //将xml数据发送给微信
    @SuppressWarnings({ "resource" })
    public static String sendPost(String url, String postDataXML)
            throws IOException, KeyStoreException, UnrecoverableKeyException,
            NoSuchAlgorithmException, KeyManagementException {

        String result = null;

        HttpPost httpPost = new HttpPost(url);
        HttpClient client = new DefaultHttpClient();

        // 得指明使用UTF-8编码，否则到API服务器XML的中文不能被成功识别

        StringEntity postEntity = new StringEntity(postDataXML, "UTF-8");

        httpPost.addHeader("Content-Type", "text/xml");

        httpPost.setEntity(postEntity);

        try {

            HttpResponse response = client.execute(httpPost);

            HttpEntity entity = response.getEntity();

            result = EntityUtils.toString(entity, "UTF-8");

        } catch (ConnectionPoolTimeoutException e) {

            // LOG.debug("http get throw ConnectionPoolTimeoutException(wait time out)");

        } catch (ConnectTimeoutException e) {

            // LOG.debug("http get throw ConnectTimeoutException");

        } catch (SocketTimeoutException e) {

            // LOG.debug("http get throw SocketTimeoutException");

        } catch (Exception e) {

            e.printStackTrace();

            // LOG.debug("http get throw Exception" );

        } finally {
            httpPost.abort();
        }

        System.out.println(result);

        return result;

    }
}
