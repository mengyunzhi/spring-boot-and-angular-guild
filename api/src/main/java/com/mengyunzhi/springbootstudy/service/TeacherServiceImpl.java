package com.mengyunzhi.springbootstudy.service;

import com.mengyunzhi.springbootstudy.entity.Teacher;
import com.mengyunzhi.springbootstudy.repository.TeacherRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@Service
public class TeacherServiceImpl implements TeacherService {
    private final static Logger logger = LoggerFactory.getLogger(TeacherServiceImpl.class);
    private final HttpServletRequest request;
    private TeacherRepository teacherRepository;

    /** auth-token与teacherId的映射 */
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
        logger.info("获取到的auth-token为" + this.request.getHeader("auth-token"));
        this.authTokenTeacherIdHashMap.put(this.request.getHeader("auth-token"), teacher.getId());
        return true;
    }

    @Override
    public boolean validatePassword(Teacher teacher, String password) {
        if (teacher == null || teacher.getPassword() == null || password == null) {
            return false;
        }

        return teacher.getPassword().equals(password);
    }
}
