package com.xingdongqi;

import com.hc.SmsmApplication;
import com.hc.modules.information.entity.InformationEntity;
import com.hc.modules.information.service.InformationService;
import com.hc.modules.postapplication.entity.PostApplicationEntity;
import com.hc.modules.postapplication.service.PostApplicationService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.util.List;


@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes = SmsmApplication.class)
class SmsmApplicationTests {

    @Resource
    private InformationService informationService;

    @Resource
    private PostApplicationService postApplicationService;

    @Test
    void contextLoads() {
    }

    @Test
    void t1(){
        List<InformationEntity> informationList = informationService.getInformationList();
        System.out.println("informationList = " + informationList);
    }

    @Test
    void t2(){
        List<PostApplicationEntity> postApplicationList = postApplicationService.getPostApplicationList();

        System.out.println("postApplicationList = " + postApplicationList);
    }

}
