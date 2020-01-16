package com.hc.modules.postApplication.service;



import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.IService;
import com.hc.modules.postApplication.entity.PostApplicationEntity;

import java.util.List;


/**
 * 申请岗位表
 *
 * @author fenghuang
 * @email
 * @date 2020-01-09 19:05:56
 */
public interface PostApplicationService extends IService<PostApplicationEntity> {

    public List<PostApplicationEntity> getPostApplicationList();

    public void insertPostApplication(PostApplicationEntity postApplicationEntity);

    public PostApplicationEntity getPostApplicationById(Integer postApplicationId);

    public void removePostApplicationById(Integer postApplicationId);

    public void updatePostApplication(PostApplicationEntity postApplicationEntity);

}

