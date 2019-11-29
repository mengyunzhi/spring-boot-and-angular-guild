package com.mengyunzhi.springBootStudy.service;

import com.mengyunzhi.springBootStudy.entity.Klass;
import com.mengyunzhi.springBootStudy.entity.Student;
import com.mengyunzhi.springBootStudy.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    StudentRepository studentRepository;

    @Override
    public Student save(Student student) {
        return this.studentRepository.save(student);
    }

    @Override
    public Page<Student> findAll(Pageable pageable) {
        return this.studentRepository.findAll(pageable);
    }

    @Override
    public Page<Student> findAll(String name, String sno, Long klassId, Pageable pageable) {
        Klass klass = new Klass();
        klass.setId(klassId);
        return this.studentRepository.findAll(name, sno, klass, pageable);
    }
}
