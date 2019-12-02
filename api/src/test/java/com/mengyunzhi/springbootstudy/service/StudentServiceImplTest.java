package com.mengyunzhi.springbootstudy.service;

import com.mengyunzhi.springbootstudy.entity.Klass;
import com.mengyunzhi.springbootstudy.entity.Student;
import com.mengyunzhi.springbootstudy.repository.StudentRepository;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.domain.*;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;


@SpringBootTest
@RunWith(SpringRunner.class)
public class StudentServiceImplTest {
    private static Logger logger = LoggerFactory.getLogger(StudentServiceImplTest.class);

    @MockBean
    StudentRepository studentRepository;

    @Autowired
    StudentService studentService;

    @Autowired
    ApplicationContext applicationContext;

    /**
     * 保存
     * 1. 模拟输入、输出
     * 2. 调用测试方法
     * 3. 断言数据转发与输出
     */
    @Test
    public void save() {
        StudentRepository studentRepository = Mockito.mock(StudentRepository.class);
        ConfigurableApplicationContext configurableApplicationContext = (ConfigurableApplicationContext) applicationContext;
        configurableApplicationContext.getBeanFactory().registerSingleton("StudentRepository", studentRepository);

        Student passStudent = new Student();
        Student mockReturnStudent = new Student();
        Mockito.when(studentRepository.save(Mockito.any(Student.class)))
                .thenReturn(mockReturnStudent);

        Student returnStudent = this.studentService.save(passStudent);
        ArgumentCaptor<Student> studentArgumentCaptor = ArgumentCaptor.forClass(Student.class);
        Mockito.verify(studentRepository).save(studentArgumentCaptor.capture());

        Assertions.assertThat(studentArgumentCaptor.getValue()).isEqualTo(passStudent);
        Assertions.assertThat(returnStudent).isEqualTo(mockReturnStudent);
    }

    /**
     * 分页查询
     * 1. 模拟输入、输出、调用studentRepository
     * 2. 调用测试方法
     * 3. 断言输入与输出与模拟值相符
     */
    @Test
    public void findAll() {
        Pageable mockInPageable = PageRequest.of(1, 20);
        List<Student> mockStudents = Arrays.asList(new Student());
        Page<Student> mockOutStudentPage = new PageImpl<Student>(
                mockStudents,
                PageRequest.of(1, 20),
                21);
        Mockito.when(this.studentRepository.findAll(Mockito.any(Pageable.class)))
                .thenReturn(mockOutStudentPage);

        Page<Student> studentPage = this.studentService.findAll(mockInPageable);

        Assertions.assertThat(studentPage).isEqualTo(mockOutStudentPage);
        ArgumentCaptor<Pageable> pageableArgumentCaptor = ArgumentCaptor.forClass(Pageable.class);
        Mockito.verify(this.studentRepository).findAll(pageableArgumentCaptor.capture());
        Assertions.assertThat(pageableArgumentCaptor.getValue()).isEqualTo(mockInPageable);
    }

    @Test
    public void findAllSpecs() {
        /* 参数初始化 */
        String name = "hello";
        String sno = "032282";
        Long klassId = 1L;
        Pageable pageable = PageRequest.of(0, 2);
        List<Student> students = Arrays.asList();
        Page<Student> mockStudentPage = new PageImpl<>(students, pageable, 100L);

        /* 设置模拟返回值 */
        Mockito.when(this.studentRepository
                .findAll(Mockito.eq(name),
                        Mockito.eq(sno),
                        Mockito.any(Klass.class),
                        Mockito.eq(pageable)))
                .thenReturn(mockStudentPage);

        /* 调用测试方法，获取返回值并断言与预期相同 */
        Page<Student> returnStudentPage = this.studentService.findAll(name, sno, klassId, pageable);
        Assertions.assertThat(returnStudentPage).isEqualTo(mockStudentPage);

        /* 获取M层调用studentRepository的findAll方法时klass的参数值，并进行断言 */
        ArgumentCaptor<Klass> klassArgumentCaptor = ArgumentCaptor.forClass(Klass.class);
        Mockito.verify(this.studentRepository).findAll(Mockito.eq(name), Mockito.eq(sno), klassArgumentCaptor.capture(), Mockito.eq(pageable));
        Assertions.assertThat(klassArgumentCaptor.getValue().getId()).isEqualTo(klassId);

        Mockito.verify(this.studentRepository).findAll(Mockito.any(String.class), Mockito.any(String.class), klassArgumentCaptor.capture(), Mockito.any(Pageable.class));
        Assertions.assertThat(klassArgumentCaptor.getValue().getId()).isEqualTo(klassId);
    }

    @Test(expected = IllegalArgumentException.class)
    public void findAllSpecsNullValidate() {
        try {
            this.studentService.findAll(null, null, null, null);
        } catch (Exception e) {
            Assertions.assertThat(e.getMessage()).isEqualTo("Pageable不能为null");
            throw e;
        }
    }
}