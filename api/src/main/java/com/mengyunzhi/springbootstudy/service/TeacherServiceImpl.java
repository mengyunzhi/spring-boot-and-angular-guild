package com.mengyunzhi.springbootstudy.service;

import com.mengyunzhi.springbootstudy.entity.Teacher;
import com.mengyunzhi.springbootstudy.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherServiceImpl implements TeacherService {

    private TeacherRepository teacherRepository;

    @Autowired
    public TeacherServiceImpl(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @Override
    public boolean login(String username, String password) {
        Teacher teacher = this.teacherRepository.findByUsername(username);
        return this.validatePassword(teacher, password);
    }

    @Override
    public boolean validatePassword(Teacher teacher, String password) {
        if (teacher == null || teacher.getPassword() == null || password == null) {
            return false;
        }

        return teacher.getPassword().equals(password);
    }
}
