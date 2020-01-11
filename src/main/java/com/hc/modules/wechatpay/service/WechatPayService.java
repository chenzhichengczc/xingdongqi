package com.hc.modules.wechatpay.service;



import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.IService;
import com.hc.modules.wechatpay.entity.WechatPayEntity;

import java.util.List;


/**
 * 微信支付信息表
 *
 * @author fenghuang
 * @email
 * @date 2020-01-11 19:34:04
 */
public interface WechatPayService extends IService<WechatPayEntity> {

    public List<WechatPayEntity> getWechatPayList();

    public void insertWechatPay(WechatPayEntity wechatPayEntity);

    public WechatPayEntity getWechatPayById(Integer wechatPayId);

    public void removeWechatPayById(Integer wechatPayId);

    public void updateWechatPay(WechatPayEntity wechatPayEntity);

}

