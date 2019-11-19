package com.mengyunzhi.springBootStudy.entity;

import com.mengyunzhi.springBootStudy.repository.KlassRepository;
import com.mengyunzhi.springBootStudy.repository.StudentRepository;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class StudentTest {

    /*学生*/
    @Autowired
    StudentRepository studentRepository;

    /*班级*/
    @Autowired
    KlassRepository klassRepository;

    /**
     * 保存测试
     * 1. 直接保存空学生，断言null异常
     * 2. 持久化一个班级
     * 3. 设置学生的班级，再保存。成功
     */
    @Test
    public void save() {
        Student student = new Student();
        boolean called = false;
        try {
            this.studentRepository.save(student);
        } catch (DataIntegrityViolationException e) {
            System.out.println("发生了异常");
            called = true;
        }
        Assertions.assertThat(called).isTrue();

        System.out.println("程序执行到此，打印控制台");
        Klass klass = new Klass();
        this.klassRepository.save(klass);

        student.setKlass(klass);
        this.studentRepository.save(student);
    }
}