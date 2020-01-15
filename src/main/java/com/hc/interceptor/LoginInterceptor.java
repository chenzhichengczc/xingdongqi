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

        String token = request.getHeader("token");
        //请求头token为空返回
        if (StringUtils.isEmpty(token)) {
            logger.info("无token");
            throw new JcException(403, "访问错误");
        }
        //token验证
        String remoteAddr = IpConfig.getRemoteAddr(request);
        System.out.println("remoteAddr = " + remoteAddr);
        System.out.println("jwtConfig = " + jwtConfig);
        boolean result = jwtConfig.verifyToken(token, remoteAddr);
        if (!result) {
            logger.info("token已过期,请重新登陆");
            System.out.println("result = " + result);
            throw new JcException(403, "登录过期,请重新登陆");
        }
        /*HttpSession session = request.getSession();
        if (session.getAttribute("uid") == null) {
            System.out.println("session = " + session);
            response.sendRedirect("/home");
            return false;
        }*/
        return true;
    }

}
