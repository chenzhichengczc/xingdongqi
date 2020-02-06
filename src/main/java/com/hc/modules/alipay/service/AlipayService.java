package com.hc.modules.alipay.service;


import com.alipay.api.AlipayApiException;
import com.alipay.api.CertAlipayRequest;
import com.baomidou.mybatisplus.service.IService;
import com.hc.modules.alipay.entity.ResponseEntity;
import com.hc.modules.userapplication.entity.UserApplicationEntity;
import com.hc.modules.userapplication.entity.UserApplicationPO;

import java.io.FileNotFoundException;
import java.util.List;


/**
 * 用户岗位申请表
 *
 * @author fenghuang
 * @email 
 * @date 2020-01-11 19:46:44
 */
public interface AlipayService extends IService<ResponseEntity> {

     public String goAliPay(Integer useApplicationId) throws AlipayApiException, FileNotFoundException;

     public void notifyUrl(ResponseEntity responseEntity);

     public void findPayStatus(Integer useApplicationId);
}

