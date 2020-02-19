package com.mengyunzhi.springBootStudy.service;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.mengyunzhi.springBootStudy.entity.Student;
import com.mengyunzhi.springBootStudy.repository.StudentRepository;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    /**
     * 保存
     * 1. 模拟输入、输出
     * 2. 调用测试方法
     * 3. 断言数据转发与输出
     */
    @Test
    public void save() {
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
}