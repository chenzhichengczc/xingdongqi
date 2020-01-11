package com.hc.modules.wechatpay.controller;

import java.util.Map;
import java.util.List;
import com.baomidou.mybatisplus.plugins.pagination.PageHelper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.hc.common.utils.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import com.hc.modules.wechatpay.entity.WechatPayEntity;
import com.hc.modules.wechatpay.service.WechatPayService;
import com.github.pagehelper.PageInfo;



/**
 * 微信支付信息表
 *
 * @author fenghuang
 * @email
 * @date 2020-01-11 19:34:04
 */
@RestController
public class WechatPayController {

    @Autowired
    private WechatPayService wechatPayService;

    /**
     * 列表
     */
    @RequestMapping(value = "/wechatPay/list", method = RequestMethod.GET)
    public ResponseUtil getWechatPayList(Integer pageNo, Integer pageSize){
        PageHelper.startPage(pageNo, pageSize);
        List<WechatPayEntity> wechatPayEntities = wechatPayService.getWechatPayList();
        PageInfo<WechatPayEntity> pageInfo = new PageInfo<>(wechatPayEntities);
        return ResponseUtil.success(pageInfo);
    }




    /**
    * 新增
    */
    @RequestMapping(value = "/wechatPay/insert", method = RequestMethod.POST)
    public ResponseUtil insertWechatPay(WechatPayEntity wechatPayEntity){
        wechatPayService.insertWechatPay(wechatPayEntity);
        return ResponseUtil.success();
    }

    /**
    *  获取
    */
    @RequestMapping(value = "/wechatPay/getById", method = RequestMethod.GET)
    public ResponseUtil getWechatPayById(Integer wechatPayId){
        WechatPayEntity wechatPayEntity = wechatPayService.getWechatPayById(wechatPayId);
        return ResponseUtil.success(wechatPayEntity);
    }

    /**
    * 删除
    */
    @RequestMapping(value = "/wechatPay/delete", method = RequestMethod.POST)
    public ResponseUtil removeWechatPayById(Integer wechatPayId){
        wechatPayService.removeWechatPayById(wechatPayId);
        return ResponseUtil.success();
    }

    /**
    * 更新
    */
    @RequestMapping(value = "/wechatPay/update", method = RequestMethod.POST)
    public ResponseUtil updateWechatPay(WechatPayEntity wechatPayEntity){
        wechatPayService.updateWechatPay(wechatPayEntity);
        return ResponseUtil.success();
    }

}
