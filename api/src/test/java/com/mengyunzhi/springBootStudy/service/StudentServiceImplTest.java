package com.mengyunzhi.springBootStudy.service;

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
import org.springframework.test.context.junit4.SpringRunner;


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
}