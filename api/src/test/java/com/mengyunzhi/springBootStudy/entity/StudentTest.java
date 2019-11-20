package com.mengyunzhi.springBootStudy.entity;

import com.mengyunzhi.springBootStudy.repository.KlassRepository;
import com.mengyunzhi.springBootStudy.repository.StudentRepository;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.junit4.SpringRunner;


@SpringBootTest
@RunWith(SpringRunner.class)
public class StudentTest {
    private Klass klass;
    private Student student;
    /*学生*/
    @Autowired
    StudentRepository studentRepository;

    /*班级*/
    @Autowired
    KlassRepository klassRepository;

    /**
     * 在每个测试用例前执行1次
     */
    @Before
    public void before() {
        this.student = new Student();
        if (this.klass == null) {
            this.klass = new  Klass();
            this.klassRepository.save(this.klass);
        }

        this.student.setName("测试名称");
        this.student.setSno("032282");
        this.student.setKlass(this.klass);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void klassNullTest() {
        this.student.setKlass(null);
        this.studentRepository.save(student);
    }

    @Test
    public void save() {
        this.studentRepository.save(this.student);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void snoNullTest() {
        this.student.setSno(null);
        this.studentRepository.save(student);
    }

}