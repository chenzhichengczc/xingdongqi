package com.hc.modules.userapplication.service;



import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.IService;
import com.hc.modules.userapplication.entity.UserApplicationEntity;

import java.util.List;


/**
 * 用户岗位申请表
 *
 * @author fenghuang
 * @email 
 * @date 2020-01-11 19:46:44
 */
public interface UserApplicationService extends IService<UserApplicationEntity> {

    public List<UserApplicationEntity> getUserApplicationList();

    public void insertUserApplication(UserApplicationEntity userApplicationEntity);

    public UserApplicationEntity getUserApplicationById(Integer userApplicationId);

    public void removeUserApplicationById(Integer userApplicationId);

    public void updateUserApplication(UserApplicationEntity userApplicationEntity);

}

