package com.hc.modules.userapplication.service.impl;

import com.hc.common.exception.JcException;
import com.hc.modules.userapplication.mapper.UserApplicationMapper;
import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;

import com.hc.modules.userapplication.entity.UserApplicationEntity;
import com.hc.modules.userapplication.service.UserApplicationService;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserApplicationServiceImpl extends ServiceImpl<UserApplicationMapper, UserApplicationEntity> implements UserApplicationService {

    @Resource
    private UserApplicationMapper userApplicationMapper;

    


    @Override
    public List<UserApplicationEntity> getUserApplicationList(){
        List<UserApplicationEntity> userApplicationEntityList = userApplicationMapper.getUserApplicationList();
        return userApplicationEntityList;
    }

    @Override
    public void insertUserApplication(UserApplicationEntity userApplicationEntity){
        Integer result = userApplicationMapper.insertUserApplication(userApplicationEntity);
        if(result == null || result == 0){
            throw new JcException("");
        }
    }

    @Override
    public UserApplicationEntity getUserApplicationById(Integer userApplicationId){
        UserApplicationEntity userApplicationEntity = userApplicationMapper.getUserApplicationById(userApplicationId);
        return userApplicationEntity;
    }

    @Override
    public void removeUserApplicationById(Integer userApplicationId){
        Integer result =  userApplicationMapper.removeUserApplicationById(userApplicationId);
        if(result == null || result == 0){
            throw new JcException("");
        }
    }

    @Override
    public void updateUserApplication(UserApplicationEntity userApplicationEntity){
        Integer result = userApplicationMapper.updateById(userApplicationEntity);
        if(result == null || result == 0){
            throw new JcException("");
        }
    }
}
