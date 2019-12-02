package com.mengyunzhi.springbootstudy.repository;

import com.mengyunzhi.springbootstudy.entity.Klass;
import com.mengyunzhi.springbootstudy.entity.Student;
import org.assertj.core.api.Assertions;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class StudentRepositoryTest {
    private static final Logger logger = LoggerFactory.getLogger(StudentRepositoryTest.class);

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

    @Test
    public void findAll() {
        /* 初始化2个班级并持久化*/
        Klass klass = new Klass();
        klass.setName("testKlass");
        this.klassRepository.save(klass);

        Klass klass1 = new Klass();
        klass1.setName("testKlass1");
        this.klassRepository.save(klass1);

        Student student = new Student();
        student.setName("testStudentName");
        student.setSno("032282");
        student.setKlass(klass);
        this.studentRepository.save(student);

        /* 初始化2个不同班级的学生并持久化 */
        Student student1 = new Student();
        student1.setName("testStudentName1");
        student1.setSno("032291");
        student1.setKlass(klass1);
        this.studentRepository.save(student1);

        Page studentPage = this.studentRepository.findAll("testStudentName", "032282", klass, PageRequest.of(0, 2));
        Assertions.assertThat(studentPage.getTotalElements()).isEqualTo(1);

        studentPage = this.studentRepository.findAll("testStudentName12", "032282", klass, PageRequest.of(0, 2));
        Assertions.assertThat(studentPage.getTotalElements()).isEqualTo(0);

        studentPage = this.studentRepository.findAll("testStudentName", "0322821", klass, PageRequest.of(0, 2));
        Assertions.assertThat(studentPage.getTotalElements()).isEqualTo(0);

        studentPage = this.studentRepository.findAll("testStudentName", "032282", klass1, PageRequest.of(0, 2));
        Assertions.assertThat(studentPage.getTotalElements()).isEqualTo(0);

        studentPage = this.studentRepository.findAll(null, "032282", klass, PageRequest.of(0, 2));
        Assertions.assertThat(studentPage.getTotalElements()).isEqualTo(1);

        studentPage = this.studentRepository.findAll(null, null, null, PageRequest.of(0, 2));
        Assertions.assertThat(studentPage.getTotalElements()).isEqualTo(2);

        studentPage = this.studentRepository.findAll(null, null, new Klass(), PageRequest.of(0, 2));
        Assertions.assertThat(studentPage.getTotalElements()).isEqualTo(2);
    }

    @Test(expected = InvalidDataAccessApiUsageException.class)
    public void findAllWithPageableIsNull() {
       this.studentRepository.findAll("name", "sno", new Klass(), null);
    }
}
