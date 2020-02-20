package com.mengyunzhi.springbootstudy.interceptor;

import com.mengyunzhi.springbootstudy.entity.Teacher;
import com.mengyunzhi.springbootstudy.filter.TokenFilter;
import com.mengyunzhi.springbootstudy.service.TeacherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import sun.net.httpserver.AuthFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author panjie
 */
@Component
public class AuthInterceptor extends HandlerInterceptorAdapter {
    private static final Logger logger = LoggerFactory.getLogger(AuthInterceptor.class);
    private TeacherService teacherService;

    @Autowired
    public AuthInterceptor(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        // 获取请求地址及请求方法
        String url = request.getRequestURI();
        String method = request.getMethod();
        System.out.println("请求的地址为" + url + "请求的方法为：" + method);

        if( "OPTIONS".equals(method)) {
            // 请求方法为OPTIONS，不拦截
            return true;
        }

        // 判断请求地址、方法是否与用户登录相同
        if ("/Teacher/login".equals(url) && "POST".equals(method)) {
            System.out.println("请求地址方法匹配到登录地址，不拦截");
            return true;
        }

        // auth-token是否绑定了用户
        String authToken = request.getHeader(TokenFilter.TOKEN_KEY);
        if (this.teacherService.isLogin(authToken)) {
            System.out.println("当前token已绑定登录用户，不拦截");
            return true;
        }

        System.out.println("当前token未绑定登录用户，返回401");
        // 为响应加入提示：用户未登录
        response.setStatus(401);
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           @Nullable ModelAndView modelAndView) throws Exception {
        logger.info("执行拦截器postHandle");
    }

}
