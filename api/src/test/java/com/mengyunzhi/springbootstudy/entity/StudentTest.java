package com.mengyunzhi.springbootstudy.entity;

import com.mengyunzhi.springbootstudy.repository.KlassRepository;
import com.mengyunzhi.springbootstudy.repository.StudentRepository;
import org.assertj.core.api.Assertions;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
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
            this.klass = new Klass();
            this.klassRepository.save(this.klass);
        }

        this.student.setName("测试名称");
        this.student.setSno(RandomString.make(6));
        this.student.setKlass(this.klass);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void klassNullTest() {
        this.student.setKlass(null);
        this.studentRepository.save(student);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void nameNullTest() {
        this.student.setName(null);
        this.studentRepository.save(student);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void nameLengthToLongTest() {
        this.student.setName("123456789012345678901");
        this.studentRepository.save(student);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void nameLengthToShortTest() {
        this.student.setName("1");
        this.studentRepository.save(student);
    }

    @Test
    public void save() {
        this.studentRepository.save(this.student);
    }


    @Test
    public void snoLengthTest() {
        for (int i = 1; i <= 255; i++) {
            this.student.setSno(RandomString.make(i));
            boolean called = false;
            try {
                this.studentRepository.save(student);
            } catch (DataIntegrityViolationException e) {
                called = true;
            }
            if (i != 6) {
                Assertions.assertThat(called).isTrue();
            } else {
                Assertions.assertThat(called).isFalse();
            }

            this.before();
        }
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void snoNullTest() {
        this.student.setSno(null);
        this.studentRepository.save(student);
    }

    @Test
    public void snoUniqueTest() {
        String sno = RandomString.make(6);
        this.student.setSno(sno);
        this.studentRepository.save(this.student);

        this.before();
        this.student.setSno(sno);
        boolean called = false;
        try {
            this.studentRepository.save(this.student);

        } catch (DataIntegrityViolationException e) {
            called = true;
        }
        Assertions.assertThat(called).isTrue();
    }

}