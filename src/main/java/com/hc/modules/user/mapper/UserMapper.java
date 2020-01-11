package com.hc.modules.user.mapper;

import com.hc.modules.user.entity.UserEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
/**
 * 用户表
 *
 * @author fenghuang
 * @email 
 * @date 2020-01-11 19:16:46
 */
public interface UserMapper extends BaseMapper<UserEntity> {

    public List<UserEntity> getUserList();


    public Integer insertUser(UserEntity userEntity);


    public UserEntity getUserById(@Param(value = "userId") Integer userId);

    public Integer removeUserById(@Param(value = "userId") Integer userId);

}
