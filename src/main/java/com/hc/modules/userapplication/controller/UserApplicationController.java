package com.hc.modules.userapplication.controller;

import java.util.Map;
import java.util.List;
import com.baomidou.mybatisplus.plugins.pagination.PageHelper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.hc.common.utils.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import com.hc.modules.userapplication.entity.UserApplicationEntity;
import com.hc.modules.userapplication.service.UserApplicationService;
import com.github.pagehelper.PageInfo;



/**
 * 用户岗位申请表
 *
 * @author fenghuang
 * @email 
 * @date 2020-01-11 19:46:44
 */
@RestController
public class UserApplicationController {

    @Autowired
    private UserApplicationService userApplicationService;

    /**
     * 列表
     */
    @RequestMapping(value = "/userApplication/list", method = RequestMethod.GET)
    public ResponseUtil getUserApplicationList(Integer pageNo, Integer pageSize){
        PageHelper.startPage(pageNo, pageSize);
        List<UserApplicationEntity> userApplicationEntities = userApplicationService.getUserApplicationList();
        PageInfo<UserApplicationEntity> pageInfo = new PageInfo<>(userApplicationEntities);
        return ResponseUtil.success(pageInfo);
    }




    /**
    * 新增
    */
    @RequestMapping(value = "/userApplication/insert", method = RequestMethod.POST)
    public ResponseUtil insertUserApplication(UserApplicationEntity userApplicationEntity){
        userApplicationService.insertUserApplication(userApplicationEntity);
        return ResponseUtil.success();
    }

    /**
    *  获取
    */
    @RequestMapping(value = "/userApplication/getById", method = RequestMethod.GET)
    public ResponseUtil getUserApplicationById(Integer userApplicationId){
        UserApplicationEntity userApplicationEntity = userApplicationService.getUserApplicationById(userApplicationId);
        return ResponseUtil.success(userApplicationEntity);
    }

    /**
    * 删除
    */
    @RequestMapping(value = "/userApplication/delete", method = RequestMethod.POST)
    public ResponseUtil removeUserApplicationById(Integer userApplicationId){
        userApplicationService.removeUserApplicationById(userApplicationId);
        return ResponseUtil.success();
    }

    /**
    * 更新
    */
    @RequestMapping(value = "/userApplication/update", method = RequestMethod.POST)
    public ResponseUtil updateUserApplication(UserApplicationEntity userApplicationEntity){
        userApplicationService.updateUserApplication(userApplicationEntity);
        return ResponseUtil.success();
    }

}
