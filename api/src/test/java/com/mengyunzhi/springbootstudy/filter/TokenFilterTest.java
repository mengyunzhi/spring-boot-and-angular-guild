package com.mengyunzhi.springbootstudy.filter;

import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.Test;

import static org.junit.Assert.*;

public class TokenFilterTest {

    @Test
    public void doFilter() {
        String authToken = new RandomString(6).nextString();
        System.out.println("authToken传入值为" + authToken);
        Request request = new Request();
        RequestWrapper requestWrapper = new RequestWrapper(request, authToken);
        this.getAuthUser(requestWrapper);
    }

    /** 在此获取auth-token的值 */
    void getAuthUser(Request request) {
        // 获取auth-token
        System.out.println("获取到的auth-token值为：" + request.getHeader("auth-token"));

        // 根据auth-token获取当前登录用户
    }
}

class Request {
    private String authToken = "123456";
    String getHeader(String key) {
        System.out.println("调用了Request中的getHeader方法");
        if ("auth-token".equals(key)) {
            return this.authToken;
        }
        // 其它的IF条件

        return null;
    }
}

/**
 * Request傀儡
 */
class RequestWrapper extends Request {
    Request request;
    String token;
    private RequestWrapper() {
    }

    private RequestWrapper(Request request) {
        this.request = request;
    }

    public RequestWrapper(Request request, String token) {
        this(request);
        this.token = token;
    }

    @Override
    String getHeader(String key) {
        System.out.println("调用了RequestWrapper中的getHeader方法");
        if ("auth-token".equals(key)) {
            return this.token;
        }
        return this.request.getHeader(key);
    }
}