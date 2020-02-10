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
import java.util.HashSet;
import java.util.UUID;

/**
 * 令牌过滤器
 * 继承HttpFilter以过滤http请求与响应
 * @author panjie
 */
@WebFilter
public class TokenFilter extends HttpFilter {
    private final static Logger logger = LoggerFactory.getLogger(TokenFilter.class);
    private String TOKEN_KEY = "auth-token";
    /** 存储已分发过的令牌 */
    private HashSet<String> tokens = new HashSet<>();

    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        // 获取 header中的token
        String token = request.getHeader(this.TOKEN_KEY);
        logger.info("获取到的token为" + token);

        // 有效性判断
        if (!this.validateToken(token)) {
            // 如果无效则分发送的token
            token = this.makeToken();
            logger.info("原token无效，发布的新的token为" + token);
        }

        logger.info("在控制器被调用以前执行");

        // 转发数据。spring开始调用控制器中的特定方法
        chain.doFilter(request, response);

        logger.info("在控制器被调用以后执行");

        // 为http响应加入新token后返回
    }

    /**
     * 生成token
     * 将生成的token存入已分发的tokens中
     * @return token
     */
    private String makeToken() {
        String token = UUID.randomUUID().toString();
        this.tokens.add(token);
        return token;
    }

    /**
     * 验证token的有效性
     * @param token token
     * @return
     */
    private boolean validateToken(String token) {
        if (token == null) {
            return false;
        }

        return this.tokens.contains(token);
    }
}
