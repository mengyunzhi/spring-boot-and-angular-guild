package com.mengyunzhi.springbootstudy.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 令牌过滤器
 * 继承HttpFilter以过滤http请求与响应
 * @author panjie
 */
@WebFilter
public class TokenFilter extends HttpFilter {
    private final static Logger logger = LoggerFactory.getLogger(TokenFilter.class);

    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        // 获取 header中的token并做有效性验证
        // 如果无效则分发送的token

        logger.info("在控制器被调用以前执行");

        // 转发数据。spring开始调用控制器中的特定方法
        chain.doFilter(request, response);

        logger.info("在控制器被调用以后执行");

        // 为http响应加入新token后返回
    }
}
