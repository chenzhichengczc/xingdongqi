package com.hc.modules.postapplication.service.impl;

import com.hc.common.exception.JcException;
import com.hc.modules.postapplication.mapper.PostApplicationMapper;
import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;

import com.hc.modules.postapplication.entity.PostApplicationEntity;
import com.hc.modules.postapplication.service.PostApplicationService;

import javax.annotation.Resource;
import java.util.List;

@Service
public class PostApplicationServiceImpl extends ServiceImpl<PostApplicationMapper, PostApplicationEntity> implements PostApplicationService {

    @Resource
    private PostApplicationMapper postApplicationMapper;




    @Override
    public List<PostApplicationEntity> getPostApplicationList(){
        List<PostApplicationEntity> postApplicationEntityList = postApplicationMapper.getPostApplicationList();
        return postApplicationEntityList;
    }

    @Override
    public void insertPostApplication(PostApplicationEntity postApplicationEntity){
        Integer result = postApplicationMapper.insertPostApplication(postApplicationEntity);
        if(result == null || result == 0){
            throw new JcException("");
        }
    }

    @Override
    public PostApplicationEntity getPostApplicationById(Integer postApplicationId){
        PostApplicationEntity postApplicationEntity = postApplicationMapper.getPostApplicationById(postApplicationId);
        return postApplicationEntity;
    }

    @Override
    public void removePostApplicationById(Integer postApplicationId){
        Integer result =  postApplicationMapper.removePostApplicationById(postApplicationId);
        if(result == null || result == 0){
            throw new JcException("");
        }
    }

    @Override
    public void updatePostApplication(PostApplicationEntity postApplicationEntity){
        Integer result = postApplicationMapper.updateById(postApplicationEntity);
        if(result == null || result == 0){
            throw new JcException("");
        }
    }
}
