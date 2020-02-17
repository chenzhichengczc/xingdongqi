package com.hc;

import com.hc.modules.weixinpay.entity.PayReultEntity;
import com.hc.modules.weixinpay.service.WeixinPayService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;

@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes = SmsmApplication.class)
class InterviewsystemApplicationTests {

    @Resource
    private WeixinPayService weixinPayService;

    @Test
    void contextLoads() {
        PayReultEntity payReultEntity = new PayReultEntity();
        payReultEntity.setTransactionId("1232134");
        payReultEntity.setAppid("1");
        payReultEntity.setProductId("38");
        weixinPayService.createPayMessage(payReultEntity);

    }

}
