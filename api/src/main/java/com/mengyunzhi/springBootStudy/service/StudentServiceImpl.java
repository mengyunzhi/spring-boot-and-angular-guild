package com.mengyunzhi.springBootStudy.service;

import com.mengyunzhi.springBootStudy.entity.Student;
import com.mengyunzhi.springBootStudy.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    StudentRepository studentRepository;
    @Override
    public Student save(Student student) {
        return this.studentRepository.save(student);
    }
}
