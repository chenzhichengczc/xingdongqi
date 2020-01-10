package com.hc.modules.postApplication.controller;

import java.util.Map;
import java.util.List;
import com.baomidou.mybatisplus.plugins.pagination.PageHelper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.github.pagehelper.PageInfo;
import com.hc.common.utils.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import com.hc.modules.postApplication.entity.PostApplicationEntity;
import com.hc.modules.postApplication.service.PostApplicationService;




/**
 * 申请岗位表
 *
 * @author fenghuang
 * @email
 * @date 2020-01-09 19:05:56
 */
@RestController
public class PostApplicationController {

    @Autowired
    private PostApplicationService postApplicationService;

    /**
     * 列表
     */
    @RequestMapping(value = "/postApplication/list", method = RequestMethod.GET)
    public ResponseUtil getPostApplicationList(Integer pageNo, Integer pageSize){
        PageHelper.startPage(pageNo, pageSize);
        List<PostApplicationEntity> postApplicationEntities = postApplicationService.getPostApplicationList();
        PageInfo<PostApplicationEntity> pageInfo = new PageInfo<>(postApplicationEntities);
        return ResponseUtil.success(pageInfo);
    }




    /**
    * 新增
    */
    @RequestMapping(value = "/postApplication/insert", method = RequestMethod.POST)
    public ResponseUtil insertPostApplication(PostApplicationEntity postApplicationEntity){
        postApplicationService.insertPostApplication(postApplicationEntity);
        return ResponseUtil.success();
    }

    /**
    *  获取
    */
    @RequestMapping(value = "/postApplication/getById", method = RequestMethod.GET)
    public ResponseUtil getPostApplicationById(Integer postApplicationId){
        PostApplicationEntity postApplicationEntity = postApplicationService.getPostApplicationById(postApplicationId);
        return ResponseUtil.success(postApplicationEntity);
    }

    /**
    * 删除
    */
    @RequestMapping(value = "/postApplication/delete", method = RequestMethod.POST)
    public ResponseUtil removePostApplicationById(Integer postApplicationId){
        postApplicationService.removePostApplicationById(postApplicationId);
        return ResponseUtil.success();
    }

    /**
    * 更新
    */
    @RequestMapping(value = "/postApplication/update", method = RequestMethod.POST)
    public ResponseUtil updatePostApplication(PostApplicationEntity postApplicationEntity){
        postApplicationService.updatePostApplication(postApplicationEntity);
        return ResponseUtil.success();
    }

}
