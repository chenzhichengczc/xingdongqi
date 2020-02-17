package com.hc.modules.weixinpay.service;


import com.hc.modules.weixinpay.entity.PayReultEntity;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @author ：fenghuang
 * @date ：Created in 2019/7/16 18:00
 * @description：
 * @modified By：
 * @version:
 */
public interface WeixinPayService {

    public void createPayMessage(PayReultEntity payReultEntity);

    public Map<String, Object> getImageUrl(HttpServletRequest httpServletRequest, Integer userApplicationId);

    Boolean checkOrder(HttpServletRequest httpServletRequest, String orderOn);
}
