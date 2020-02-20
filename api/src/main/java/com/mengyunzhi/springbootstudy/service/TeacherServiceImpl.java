package com.mengyunzhi.springbootstudy.service;

import com.mengyunzhi.springbootstudy.entity.Teacher;
import com.mengyunzhi.springbootstudy.filter.TokenFilter;
import com.mengyunzhi.springbootstudy.repository.TeacherRepository;
import jdk.nashorn.internal.runtime.options.Option;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.lang.annotation.Target;
import java.util.HashMap;
import java.util.Optional;

@Service
public class TeacherServiceImpl implements TeacherService {
    private final static Logger logger = LoggerFactory.getLogger(TeacherServiceImpl.class);
    private final HttpServletRequest request;
    private TeacherRepository teacherRepository;

    /**
     * auth-token与teacherId的映射
     */
    private HashMap<String, Long> authTokenTeacherIdHashMap = new HashMap<>();

    @Autowired
    public TeacherServiceImpl(TeacherRepository teacherRepository, HttpServletRequest request) {
        this.teacherRepository = teacherRepository;
        this.request = request;
    }

    @Override
    public boolean login(String username, String password) {
        Teacher teacher = this.teacherRepository.findByUsername(username);
        if (!this.validatePassword(teacher, password)) {
            // 认证不成功直接返回
            return false;
        }

        // 认证成功，进行auth-token与teacherId的绑定绑定
        logger.info("获取到的auth-token为" + this.request.getHeader(TokenFilter.TOKEN_KEY));
        this.authTokenTeacherIdHashMap.put(this.request.getHeader(TokenFilter.TOKEN_KEY), teacher.getId());
        return true;
    }

    @Override
    public void logout() {
        // 获取auth-token
        String authToken = this.request.getHeader(TokenFilter.TOKEN_KEY);
        logger.info("获取到的auth-token为" + this.request.getHeader(TokenFilter.TOKEN_KEY));

        // 删除hashMap中对应auth-token的映射
        this.authTokenTeacherIdHashMap.remove(authToken);
    }

    @Override
    public boolean isLogin(String authToken) {
        // 获取authToken映射的teacherId
        Long teacherId = this.authTokenTeacherIdHashMap.get(authToken);
        return teacherId != null;
    }

    @Override
    public Teacher me() {
        // 获取authToken
        String authToken = this.request.getHeader(TokenFilter.TOKEN_KEY);

        // 获取authToken映射的teacherId
        Long teacherId = this.authTokenTeacherIdHashMap.get(authToken);
        if (teacherId == null) {
            // 未获取到teacherId，说明该auth-token未与用户进行绑定，返回null
            return null;
        }

        // 如获取到teacherId，则由数据库中获取teacher并返回
        Optional<Teacher> teacherOptional = this.teacherRepository.findById(teacherId);
        return teacherOptional.get();
    }

    @Override
    public boolean validatePassword(Teacher teacher, String password) {
        if (teacher == null || teacher.getPassword() == null || password == null) {
            return false;
        }

        return teacher.getPassword().equals(password);
    }
}
