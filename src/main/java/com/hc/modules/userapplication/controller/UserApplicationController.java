package com.hc.modules.userapplication.controller;

import java.util.List;
import java.util.Map;

import com.github.pagehelper.PageHelper;
import com.hc.common.exception.JcException;
import com.hc.common.utils.FileUploadUtils;
import com.hc.common.utils.ResponseUtil;
import com.hc.modules.userapplication.entity.UserApplicationEntity;
import com.hc.modules.userapplication.entity.UserApplicationPO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import com.hc.modules.userapplication.service.UserApplicationService;
import com.github.pagehelper.PageInfo;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


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
    @RequestMapping(value = "/api/userApplication/list", method = RequestMethod.GET)
    public ResponseUtil getUserApplicationList(Integer pageNo, Integer pageSize) {
        PageHelper.startPage(pageNo, pageSize);
        List<UserApplicationEntity> userApplicationEntities = userApplicationService.getUserApplicationList();
        PageInfo<UserApplicationEntity> pageInfo = new PageInfo<>(userApplicationEntities);
        return ResponseUtil.success(pageInfo);
    }


    /**
     * 新增
     *//*
    @RequestMapping(value = "/api/userApplication/insert", method = RequestMethod.POST)
    public ResponseUtil insertUserApplication(UserApplicationEntity userApplicationEntity){
        userApplicationService.insertUserApplication(userApplicationEntity);
        return ResponseUtil.success();
    }*/

    /**
     * 获取
     */
    @RequestMapping(value = "/api/userApplication/getById", method = RequestMethod.GET)
    public ResponseUtil getUserApplicationById(Integer userApplicationId) {
        UserApplicationEntity userApplicationEntity = userApplicationService.getUserApplicationById(userApplicationId);
        return ResponseUtil.success(userApplicationEntity);
    }

    /*    *//**
     * 删除
     *//*
    @RequestMapping(value = "/api/userApplication/delete", method = RequestMethod.POST)
    public ResponseUtil removeUserApplicationById(Integer userApplicationId){
        userApplicationService.removeUserApplicationById(userApplicationId);
        return ResponseUtil.success();
    }*/

    /**
     * 更新
     *//*
    @RequestMapping(value = "/api/userApplication/update", method = RequestMethod.POST)
    public ResponseUtil updateUserApplication(UserApplicationEntity userApplicationEntity){
        userApplicationService.updateUserApplication(userApplicationEntity);
        return ResponseUtil.success();
    }*/

    /**
     * 根据个人id查询对应的工作投递情况
     */

    @RequestMapping(value = "/api/userApplication/getUserApplication", method = RequestMethod.GET)
    public ResponseUtil getUserApplication(Integer pageNo, Integer pageSize, Integer id) {
        PageHelper.startPage(pageNo, pageSize);
        List<UserApplicationPO> userApplication = userApplicationService.getUserApplication(id);
        PageInfo<UserApplicationPO> pageInfo = new PageInfo<>(userApplication);
        return ResponseUtil.success(pageInfo);
    }

    /**
     * 图片上传
     */
    @RequestMapping(value = "/api/api/file/userApplication/uploadFile", method = RequestMethod.POST)
    public ResponseUtil uploadFile(MultipartFile uploadFile, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> map = (Map<String, Object>) FileUploadUtils.uploadApk(uploadFile, request, response);
        return ResponseUtil.success(map);
    }

    /**
     * 保存信息
     */
    @RequestMapping(value = "/api/userApplication/insertUserApplication", method = RequestMethod.POST)
    public ResponseUtil insertUserApplication(UserApplicationEntity userApplicationEntity) {

        Integer id = userApplicationService.insertUserApplication(userApplicationEntity);

        return ResponseUtil.success(userApplicationEntity.getId());
    }

    /**
     * 保存信息
     */
    @RequestMapping(value = "/api/userApplication/updateApplication", method = RequestMethod.POST)
    public ResponseUtil updateApplication(UserApplicationEntity userApplicationEntity) {

        userApplicationService.updateApplication(userApplicationEntity);

        return ResponseUtil.success();
    }


    /**
     * 保存信息
     */
    @RequestMapping(value = "/api/userApplication/getApplication", method = RequestMethod.POST)
    public ResponseUtil getApplication(Integer id) {

        UserApplicationPO userApplicationPO = userApplicationService.getApplication(id);

        return ResponseUtil.success(userApplicationPO);
    }

}
