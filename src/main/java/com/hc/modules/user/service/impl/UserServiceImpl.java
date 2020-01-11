package com.hc.modules.user.service.impl;

import com.hc.common.exception.JcException;
import com.hc.modules.user.mapper.UserMapper;
import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;

import com.hc.modules.user.entity.UserEntity;
import com.hc.modules.user.service.UserService;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, UserEntity> implements UserService {

    @Resource
    private UserMapper userMapper;

    


    @Override
    public List<UserEntity> getUserList(){
        List<UserEntity> userEntityList = userMapper.getUserList();
        return userEntityList;
    }

    @Override
    public void insertUser(UserEntity userEntity){
        Integer result = userMapper.insertUser(userEntity);
        if(result == null || result == 0){
            throw new JcException("");
        }
    }

    @Override
    public UserEntity getUserById(Integer userId){
        UserEntity userEntity = userMapper.getUserById(userId);
        return userEntity;
    }

    @Override
    public void removeUserById(Integer userId){
        Integer result =  userMapper.removeUserById(userId);
        if(result == null || result == 0){
            throw new JcException("");
        }
    }

    @Override
    public void updateUser(UserEntity userEntity){
        Integer result = userMapper.updateById(userEntity);
        if(result == null || result == 0){
            throw new JcException("");
        }
    }
}
