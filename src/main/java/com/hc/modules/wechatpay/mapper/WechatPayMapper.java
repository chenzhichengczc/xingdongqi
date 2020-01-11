package com.hc.modules.wechatpay.mapper;

import com.hc.modules.wechatpay.entity.WechatPayEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
/**
 * 微信支付信息表
 *
 * @author fenghuang
 * @email
 * @date 2020-01-11 19:34:04
 */
public interface WechatPayMapper extends BaseMapper<WechatPayEntity> {

    public List<WechatPayEntity> getWechatPayList();


    public Integer insertWechatPay(WechatPayEntity wechatPayEntity);


    public WechatPayEntity getWechatPayById(@Param(value = "wechatPayId") Integer wechatPayId);

    public Integer removeWechatPayById(@Param(value = "wechatPayId") Integer wechatPayId);

}
