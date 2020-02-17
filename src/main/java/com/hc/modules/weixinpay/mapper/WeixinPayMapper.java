package com.hc.modules.weixinpay.mapper;


import com.hc.modules.weixinpay.entity.PayReultEntity;
import org.apache.ibatis.annotations.Param;

/**
 * @author ：fenghuang
 * @date ：Created in 2019/7/18 15:22
 * @description：
 * @modified By：
 * @version:
 */
public interface WeixinPayMapper  {

    public Integer createPayMessage(PayReultEntity payReultEntity);

    public Integer updateOrderStatus(@Param(value = "transactionId") String transactionId,
                                     @Param(value = "outTradeNo") String outTradeNo,
                                     @Param(value = "openid") String openid);

    Integer updateApplication(@Param(value = "userApplicationId")Integer userApplicationId,
                              @Param(value = "orderOn")String orderOn);
}
