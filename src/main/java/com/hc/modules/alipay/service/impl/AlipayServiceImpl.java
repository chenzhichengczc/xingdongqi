package com.hc.modules.alipay.service.impl;

import com.alipay.api.AlipayApiException;
import com.alipay.api.CertAlipayRequest;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.domain.AlipayTradePagePayModel;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.alipay.api.response.AlipayTradePagePayResponse;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.hc.common.exception.JcException;
import com.hc.conifig.AlipayConfig;
import com.hc.modules.alipay.entity.ResponseEntity;
import com.hc.modules.alipay.mapper.AlipayMapper;
import com.hc.modules.alipay.service.AlipayService;
import com.hc.modules.postApplication.entity.PostApplicationEntity;
import com.hc.modules.postApplication.mapper.PostApplicationMapper;
import com.hc.modules.userapplication.entity.UserApplicationEntity;
import com.hc.modules.userapplication.mapper.UserApplicationMapper;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.FileNotFoundException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

@Service
public class AlipayServiceImpl extends ServiceImpl<AlipayMapper, ResponseEntity> implements AlipayService {

    private String app_cert_path;

    private String alipay_cert_path;

    private String alipay_root_cert_path;

    @Resource
    private AlipayMapper alipayMapper;

    @Resource
    private UserApplicationMapper userApplicationMapper;

    @Override
    public String goAliPay(Integer useApplicationId) throws AlipayApiException, FileNotFoundException {
//        app_cert_path = ResourceUtils.getFile("classpath:static/CRT/appCertPublicKey_2021001107684815.crt").getPath();
//        alipay_root_cert_path = ResourceUtils.getFile("classpath:static/CRT/alipayRootCert.crt").getPath();
//        alipay_cert_path = ResourceUtils.getFile("classpath:static/CRT/alipayCertPublicKey_RSA2.crt").getPath();
        this.findPayStatus(useApplicationId);
        app_cert_path = "/usr/local/application/crt/appCertPublicKey_2021001107684815.crt";
        alipay_cert_path = "/usr/local/application/crt/alipayCertPublicKey_RSA2.crt";
        alipay_root_cert_path = "/usr/local/application/crt/alipayRootCert.crt";

        CertAlipayRequest certAlipayRequest = new CertAlipayRequest();
        certAlipayRequest.setServerUrl(AlipayConfig.gatewayUrl);
        certAlipayRequest.setAppId(AlipayConfig.app_id);
        certAlipayRequest.setPrivateKey(AlipayConfig.merchant_private_key);
        certAlipayRequest.setFormat("json");
        certAlipayRequest.setCharset(AlipayConfig.charset);
        certAlipayRequest.setSignType(AlipayConfig.sign_type);
        certAlipayRequest.setCertPath(app_cert_path);
        certAlipayRequest.setAlipayPublicCertPath(alipay_cert_path);
        certAlipayRequest.setRootCertPath(alipay_root_cert_path);
        DefaultAlipayClient alipayClient = new DefaultAlipayClient(certAlipayRequest);

        String order = getOrder();

        AlipayTradePagePayRequest request = new AlipayTradePagePayRequest();
//SDK已经封装掉了公共参数，这里只需要传入业务参数。以下方法为sdk的model入参方式(model和biz_content同时存在的情况下取biz_content)。
        AlipayTradePagePayModel model = new AlipayTradePagePayModel();
        model.setBody(useApplicationId+"");
        model.setSubject("岗位申请服务费");
        model.setOutTradeNo(getOrder());
        model.setTimeoutExpress("30m");
        model.setTotalAmount("20.00");
        model.setProductCode("FAST_INSTANT_TRADE_PAY");
        request.setBizModel(model);
        request.setNotifyUrl(AlipayConfig.notify_url);
        request.setReturnUrl(AlipayConfig.return_url);

        AlipayTradePagePayResponse response = alipayClient.pageExecute(request,"GET");

        return response.getBody();
    }

    @Override
    public void notifyUrl(ResponseEntity responseEntity) {

        Integer id = alipayMapper.insertAlipayResponseEntity(responseEntity);

        if(id != 1){
            throw new JcException("插入失败!");
        }

        UserApplicationEntity userApplicationEntity = new UserApplicationEntity();
        userApplicationEntity.setAlipayId(responseEntity.getId());
        userApplicationEntity.setPaymentStatus(1);

        userApplicationMapper.update(userApplicationEntity,new EntityWrapper<UserApplicationEntity>().eq("id",Integer.parseInt(responseEntity.getBody())));

    }

    @Override
    public void findPayStatus(Integer useApplicationId) {
        UserApplicationEntity userApplicationEntity = userApplicationMapper.selectById(useApplicationId);

        if(userApplicationEntity.getPaymentStatus() == 1 || userApplicationEntity.getAlipayId()!= null || userApplicationEntity.getWechatPayId() != null){
            throw new JcException(502, "此订单已经支付，请勿再次支付!");
        }

    }

    private synchronized String getOrder(){

        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");

        String format = simpleDateFormat.format(date);

        return format + getRandomString(4);
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
}
