package com.hc.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.util.ArrayList;
import java.util.List;


@Configuration
public class LoginInterceptorConfigurer
        implements WebMvcConfigurer {

        @Autowired
        private LoginInterceptor loginInterceptor;

        @Override
        public void addInterceptors(InterceptorRegistry registry) {
                // 拦截路径：必须登录才可以访问
                List<String> patterns = new ArrayList<>();
                patterns.add("/**");

                // 白名单：在黑名单范围内，却不需要登录就可以访问
                List<String> excludePatterns = new ArrayList<>();
                excludePatterns.add("/static/bootstrap3/**");
                excludePatterns.add("/css/**");
                excludePatterns.add("/layer/**");
                excludePatterns.add("/pager/**");
                excludePatterns.add("/res/**");
                excludePatterns.add("/jquery-validation/**");
                excludePatterns.add("/js/**");
                excludePatterns.add("/fonts/**");
                excludePatterns.add("/img/**");
                excludePatterns.add("/images/**");
                excludePatterns.add("/login");
                excludePatterns.add("/home.html");
                excludePatterns.add("/show.html");
                excludePatterns.add("/reg/user");
                excludePatterns.add("/information/list");
                excludePatterns.add("/layDate-v5.0.9/**");
                excludePatterns.add("/favicon.ico");
                excludePatterns.add("/check/status");
                excludePatterns.add("/information/getById");
                excludePatterns.add("/pay/alipay/notifyUrl/alipay/notify/back/Hmc");
                excludePatterns.add("/pay/alipay/notifyUrlPage");
                excludePatterns.add("/CRT/**");

                registry
                        .addInterceptor(loginInterceptor)
                        .addPathPatterns(patterns)
                        .excludePathPatterns(excludePatterns);
        }


}