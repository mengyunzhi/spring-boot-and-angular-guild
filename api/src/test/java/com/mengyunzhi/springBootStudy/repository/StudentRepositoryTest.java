package com.mengyunzhi.springBootStudy.repository;

import com.mengyunzhi.springBootStudy.entity.Klass;
import com.mengyunzhi.springBootStudy.entity.Student;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;


@SpringBootTest
@RunWith(SpringRunner.class)
public class StudentRepositoryTest {
    @Autowired
    StudentRepository studentRepository;

    @Autowired
    KlassRepository klassRepository;

    @Test
    public void page() {
        Klass klass = new Klass();
        klass.setName("testKlass");
        this.klassRepository.save(klass);

        for (int i = 0; i < 100; i++) {
            Student student = new Student();
            student.setName(RandomString.make(4));
            student.setSno(RandomString.make(6));
            student.setKlass(klass);
            this.studentRepository.save(student);
        }

        Pageable pageable = PageRequest.of(2, 15);
        Page<Student> studentPage = studentRepository.findAll(pageable);
        return;
    }
}