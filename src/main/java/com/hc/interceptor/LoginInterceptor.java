package com.hc.interceptor;

import com.hc.common.exception.JcException;
import com.hc.common.utils.IpConfig;

import com.hc.conifig.JwtConfig;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Component
@Slf4j
public class LoginInterceptor implements HandlerInterceptor {

    @Resource
    private JwtConfig jwtConfig;

    private static final Logger logger = LoggerFactory.getLogger(LoginInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        HttpSession session = request.getSession();
        if (session.getAttribute("username") == null) {
            System.out.println("session = " + session);
            response.sendRedirect("https://www.xingdongqi.com/home.html");
            return false;
        }



        return true;
    }

}
