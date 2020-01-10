package com.hc.modules.postApplication.mapper;

import com.hc.modules.postApplication.entity.PostApplicationEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
/**
 * 申请岗位表
 *
 * @author fenghuang
 * @email
 * @date 2020-01-09 19:05:56
 */
public interface PostApplicationMapper extends BaseMapper<PostApplicationEntity> {

    public List<PostApplicationEntity> getPostApplicationList();


    public Integer insertPostApplication(PostApplicationEntity postApplicationEntity);


    public PostApplicationEntity getPostApplicationById(@Param(value = "postApplicationId") Integer postApplicationId);

    public Integer removePostApplicationById(@Param(value = "postApplicationId") Integer postApplicationId);

}
