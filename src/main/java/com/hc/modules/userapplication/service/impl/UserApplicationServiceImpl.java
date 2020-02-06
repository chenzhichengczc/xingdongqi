package com.hc.modules.userapplication.service.impl;

import com.hc.common.exception.JcException;
import com.hc.modules.postApplication.mapper.PostApplicationMapper;
import com.hc.modules.userapplication.entity.UserApplicationEntity;
import com.hc.modules.userapplication.entity.UserApplicationPO;
import com.hc.modules.userapplication.mapper.UserApplicationMapper;
import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;

import com.hc.modules.userapplication.service.UserApplicationService;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserApplicationServiceImpl extends ServiceImpl<UserApplicationMapper, UserApplicationEntity> implements UserApplicationService {

    @Resource
    private UserApplicationMapper userApplicationMapper;

    @Resource
    private PostApplicationMapper postApplicationMapper;


    @Override
    public List<UserApplicationEntity> getUserApplicationList(){
        List<UserApplicationEntity> userApplicationEntityList = userApplicationMapper.getUserApplicationList();
        return userApplicationEntityList;
    }

    @Override
    public Integer insertUserApplication(UserApplicationEntity userApplicationEntity){
        if(userApplicationEntity.getPaymentStatus() == null){
            userApplicationEntity.setPaymentStatus(0);
        }

        if(userApplicationEntity.getCheckResult() == null){
            userApplicationEntity.setCheckResult(0);
        }

        Integer insert = userApplicationMapper.insertUserApplication(userApplicationEntity);

        if(insert == null || insert == 0){
            throw new JcException("新增失败");
        }
        return userApplicationEntity.getId();
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

    @Override
    public List<UserApplicationPO> getUserApplication(Integer id) {

        List<UserApplicationPO> list = userApplicationMapper.getUserApplication(id);
        return list;
    }

    @Override
    public UserApplicationPO getApplication(Integer id) {
        UserApplicationPO userApplicationPO = userApplicationMapper.getApplication(id);
        return userApplicationPO;
    }

    @Override
    public void updateApplication(UserApplicationEntity userApplicationEntity) {

        userApplicationEntity.setCheckResult(0);
        userApplicationEntity.setCheckReport("");

        Integer row = userApplicationMapper.update(userApplicationEntity,new EntityWrapper<UserApplicationEntity>().eq("id",userApplicationEntity.getId()));

        if( row != 1){
            throw  new JcException("提交失败");
        }
    }
}
