/*
package com.hc.conifig;

import com.alibaba.fastjson.JSON;
import com.hc.basic.ResponseBase;
import com.hc.common.exception.JcException;
import com.hc.common.exception.JcExceptionHandler;
import com.hc.common.utils.ResponseUtil;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

*/
/**
 * @author ：fenghuang
 * @date ：Created in 2019/8/16 16:42
 * @description：自定义过滤器
 * @modified By：
 * @version:
 *//*

@Component
public class AuthenFilter implements Filter {

    @Resource
    private JwtConfig jwtConfig;

    private static final Logger logger = LoggerFactory.getLogger(AuthenFilter.class);

    ResponseUtil responseUtil;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {


        */
/*HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;


        //过滤不是post的请求
        *//*
*/
/*if(!request.getMethod().equalsIgnoreCase("post")){
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }*//*
*/
/*

        String token = request.getHeader("token");
        //请求头token为空返回
        if (StringUtils.isEmpty(token)) {
            logger.info("无token");
            throw new JcException("当前访问拒绝");
        }
        //token验证

        boolean result = jwtConfig.verifyToken(token);
        if (!result) {
            logger.info("token已过期,请重新登陆");
            System.out.println("result = " + result);
            throw new JcException("token已过期,请重新登陆");
        }*//*

        filterChain.doFilter(servletRequest, servletResponse);


    }

}
*/
