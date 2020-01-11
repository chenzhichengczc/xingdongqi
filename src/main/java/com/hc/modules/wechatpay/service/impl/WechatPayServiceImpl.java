package com.hc.modules.wechatpay.service.impl;

import com.hc.common.exception.JcException;
import com.hc.modules.wechatpay.mapper.WechatPayMapper;
import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;

import com.hc.modules.wechatpay.entity.WechatPayEntity;
import com.hc.modules.wechatpay.service.WechatPayService;

import javax.annotation.Resource;
import java.util.List;

@Service
public class WechatPayServiceImpl extends ServiceImpl<WechatPayMapper, WechatPayEntity> implements WechatPayService {

    @Resource
    private WechatPayMapper wechatPayMapper;




    @Override
    public List<WechatPayEntity> getWechatPayList(){
        List<WechatPayEntity> wechatPayEntityList = wechatPayMapper.getWechatPayList();
        return wechatPayEntityList;
    }

    @Override
    public void insertWechatPay(WechatPayEntity wechatPayEntity){
        Integer result = wechatPayMapper.insertWechatPay(wechatPayEntity);
        if(result == null || result == 0){
            throw new JcException("");
        }
    }

    @Override
    public WechatPayEntity getWechatPayById(Integer wechatPayId){
        WechatPayEntity wechatPayEntity = wechatPayMapper.getWechatPayById(wechatPayId);
        return wechatPayEntity;
    }

    @Override
    public void removeWechatPayById(Integer wechatPayId){
        Integer result =  wechatPayMapper.removeWechatPayById(wechatPayId);
        if(result == null || result == 0){
            throw new JcException("");
        }
    }

    @Override
    public void updateWechatPay(WechatPayEntity wechatPayEntity){
        Integer result = wechatPayMapper.updateById(wechatPayEntity);
        if(result == null || result == 0){
            throw new JcException("");
        }
    }
}
