package com.hc.modules.user.service;



import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.IService;
import com.hc.modules.user.entity.UserEntity;

import java.util.List;


/**
 * 用户表
 *
 * @author fenghuang
 * @email 
 * @date 2020-01-11 19:16:46
 */
public interface UserService extends IService<UserEntity> {

    public List<UserEntity> getUserList();

    public void insertUser(UserEntity userEntity);

    public UserEntity getUserById(Integer userId);

    public void removeUserById(Integer userId);

    public void updateUser(UserEntity userEntity);

}

