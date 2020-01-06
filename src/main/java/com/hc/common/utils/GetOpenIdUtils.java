package com.hc.common.utils;

import com.hc.common.exception.JcException;
import com.hc.conifig.JwtConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

/**
 * @author ：fenghuang
 * @date ：Created in 2019/8/16 20:22
 * @description：
 * @modified By：
 * @version:
 */

@Component
public  class GetOpenIdUtils {

    @Autowired
    private JwtConfig jwtConfig;

    public String getOpenIdByToken(HttpServletRequest httpServletRequest){
        String token = httpServletRequest.getHeader("token");

        String openId = jwtConfig.getWxOpenIdByToken(token);
        if(openId == null){
            throw new JcException("获取openId为空");
        }
        return openId;



    }

}
