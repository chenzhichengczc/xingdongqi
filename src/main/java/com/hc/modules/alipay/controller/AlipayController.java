package com.hc.modules.alipay.controller;

import com.alipay.api.AlipayClient;
import com.alipay.api.AlipayRequest;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.alipay.api.request.AlipayTradeQueryRequest;
import com.alipay.api.response.AlipayTradePagePayResponse;
import com.alipay.api.response.AlipayTradeQueryResponse;
import com.hc.common.utils.ResponseUtil;
import com.hc.conifig.AlipayConfig;
import com.hc.modules.alipay.entity.ResponseEntity;
import com.hc.modules.alipay.service.AlipayService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;


@Controller
public class AlipayController {


    @Resource
    private AlipayService alipayService;

    /**
     * 对应官方例子   alipay.trade.page.pay.jsp
     *
     * @Description: 前往支付宝第三方网关进行支付
     * Copyright: Copyright (c) 2019
     * @Classname AlipayController
     * @Description notify_url 和 return_url 需要外网可以访问，建议内网穿透
     * @Date 2019/6/18 20:40
     * @Created by 张哈哈
     */
    @PostMapping("/alipay/goAlipay")
    @ResponseBody
    public ResponseUtil goAlipay(Integer useApplicationId) throws Exception {

        String page = alipayService.goAliPay(useApplicationId);

        return ResponseUtil.success(page);
    }

    /**
     * 接收回调通知页面
     * @return
     */
    @GetMapping("/pay/alipay/notifyUrlPage")
    public String notifyMessage(){
        return "redirect:https://www.xingdongqi.com/home.html";
    }

    @PostMapping("/pay/alipay/notifyUrl")
    @ResponseBody
    public void notifyUrl(ResponseEntity responseEntity){
        alipayService.notifyUrl(responseEntity);
    }




}