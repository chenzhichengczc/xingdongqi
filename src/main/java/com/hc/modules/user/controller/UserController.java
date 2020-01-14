package com.hc.modules.user.controller;

import java.util.Map;
import java.util.List;
import com.baomidou.mybatisplus.plugins.pagination.PageHelper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.hc.common.utils.ResponseUtil;
import com.hc.conifig.JwtConfig;
import com.hc.modules.user.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import com.hc.modules.user.entity.UserEntity;
import com.hc.modules.user.service.UserService;
import com.github.pagehelper.PageInfo;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;


/**
 * 用户表
 *
 * @author fenghuang
 * @email
 * @date 2020-01-11 19:16:46
 */
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtConfig jwtConfig;


    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseUtil login(@RequestParam(value = "username") String username,
                           @RequestParam(value = "password") String password,
                           HttpServletRequest request) {

        String realPassword = userService.getPassword(username);
        if (realPassword == null) {
            return ResponseUtil.success(401, "用户名不存在或者密码错误");
        } else if (!realPassword.equals(password)) {
            return ResponseUtil.success(401, "用户名不存在或者密码错误");
        } else {
            String token = jwtConfig.createToken(username);
            request.getSession().setAttribute("uid", 1);
            return ResponseUtil.success(token);
        }
    }

    @RequestMapping(value = "/reg/user", method = RequestMethod.POST)
    public ResponseUtil regUser(UserEntity userEntity) {
        System.out.println(userEntity);
        userService.regUser(userEntity);
        return ResponseUtil.success();
    }



/*    *//**
     * 列表
     *//*
    @RequestMapping(value = "/user/list", method = RequestMethod.GET)
    public ResponseUtil getUserList(Integer pageNo, Integer pageSize){
        PageHelper.startPage(pageNo, pageSize);
        List<UserEntity> userEntities = userService.getUserList();
        PageInfo<UserEntity> pageInfo = new PageInfo<>(userEntities);
        return ResponseUtil.success(pageInfo);
    }




    *//**
    * 新增
    *//*
    @RequestMapping(value = "/user/insert", method = RequestMethod.POST)
    public ResponseUtil insertUser(UserEntity userEntity){
        userService.insertUser(userEntity);
        return ResponseUtil.success();
    }

    *//**
    *  获取
    *//*
    @RequestMapping(value = "/user/getById", method = RequestMethod.GET)
    public ResponseUtil getUserById(Integer userId){
        UserEntity userEntity = userService.getUserById(userId);
        return ResponseUtil.success(userEntity);
    }

    *//**
    * 删除
    *//*
    @RequestMapping(value = "/user/delete", method = RequestMethod.POST)
    public ResponseUtil removeUserById(Integer userId){
        userService.removeUserById(userId);
        return ResponseUtil.success();
    }

    *//**
    * 更新
    *//*
    @RequestMapping(value = "/user/update", method = RequestMethod.POST)
    public ResponseUtil updateUser(UserEntity userEntity){
        userService.updateUser(userEntity);
        return ResponseUtil.success();
    }*/

}
