package com.mengyunzhi.springbootstudy.service;

import com.mengyunzhi.springbootstudy.entity.Klass;
import com.mengyunzhi.springbootstudy.entity.Student;
import com.mengyunzhi.springbootstudy.repository.StudentRepository;
import org.assertj.core.api.Assertions;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.Assert;
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
import java.util.Optional;
import java.util.Random;


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

    /**
     * 参数为null测试
     */
    @Test(expected = IllegalArgumentException.class)
    public void findByIdNullArgument() {
        this.studentService.findById(null);
    }

    /**
     * 调用测试
     */
    @Test
    public void findById() {
        // 准备调用时的参数及返回值
        Long id = new Random().nextLong();
        Student mockReturnStudent = new Student();
        Mockito.when(this.studentRepository.findById(id)).thenReturn(Optional.of(mockReturnStudent));

        // 发起调用
        Student student = this.studentService.findById(id);

        // 断言返回值与预期相同
        Assertions.assertThat(student).isEqualTo(mockReturnStudent);

        // 断言接收到的参数与预期相同
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.studentRepository).findById(longArgumentCaptor.capture());
        Assertions.assertThat(longArgumentCaptor.getValue()).isEqualTo(id);
    }

    @Test
    public void update() {
        // 准备替身及调用替身后的模拟返回值
        // 第一个替身（间谍）
        Long id = new Random().nextLong();
        Student mockResultStudent = new Student();
        Mockito.when(this.studentRepository.findById(id)).thenReturn(Optional.of(mockResultStudent));

        // 第二个替身. 1. 由this.studentService clone出一个替身，该替身具有原studentService中的所有功能及属性
        StudentService studentServiceSpy = Mockito.spy(this.studentService);

        // 由于updateFields方法并不存在于StudentService接口上，所以预对updateFields设置替身
        // 则需要对类型进行转制转换
        // （虽然注入时声明的为StudentService，但实际注入的为StudentServiceImpl，这是强制转换的基础）
        StudentServiceImpl studentServiceImplSpy = (StudentServiceImpl) studentServiceSpy;
        Student mockResultStudent1 = new Student();
        Mockito.doReturn(mockResultStudent1).when(studentServiceImplSpy).updateFields(Mockito.any(Student.class), Mockito.any(Student.class));

        // 调用update方法测试
        Student student = new Student();
        Student resultStudent = studentServiceImplSpy.update(id, student);

        // 断言传入第一个替身参数符合预期
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.studentRepository).findById(longArgumentCaptor.capture());
        Assertions.assertThat(longArgumentCaptor.getValue()).isEqualTo(id);

        // 断言第二个替身参数符合预期：参数1为传入update方法的学生，参数2为替身1的返回值
        ArgumentCaptor<Student> studentArgumentCaptor = ArgumentCaptor.forClass(Student.class);
        ArgumentCaptor<Student> studentArgumentCaptor1 = ArgumentCaptor.forClass(Student.class);
        Mockito.verify(studentServiceImplSpy).updateFields(studentArgumentCaptor.capture(), studentArgumentCaptor1.capture());
        Assertions.assertThat(studentArgumentCaptor.getValue()).isEqualTo(student);
        Assertions.assertThat(studentArgumentCaptor1.getValue()).isEqualTo(mockResultStudent);

        // 断言返回值就是第二个替身的返回值
        Assertions.assertThat(resultStudent).isEqualTo(mockResultStudent1);
    }

    @Test
    public void updateFields() {
        // 准备替身
        Student mockResultStudent = new Student();
        Mockito.when(this.studentRepository.save(Mockito.any(Student.class))).thenReturn(mockResultStudent);

        // 调用updateFields方法
        StudentServiceImpl studentServiceImpl = (StudentServiceImpl) this.studentService;
        Student newStudent = new Student();
        newStudent.setKlass(new Klass());
        newStudent.setName(RandomString.make(8));
        newStudent.setSno(RandomString.make(4));
        Student oldStudent = new Student();
        oldStudent.setId(new Random().nextLong());

        Student resultStudent = studentServiceImpl.updateFields(newStudent, oldStudent);

        // 断言传入替身的参数符合预期（更新了学生信息）
        ArgumentCaptor<Student> studentArgumentCaptor = ArgumentCaptor.forClass(Student.class);
        Mockito.verify(this.studentRepository).save(studentArgumentCaptor.capture());
        Student editedStudent = studentArgumentCaptor.getValue();
        Assertions.assertThat(editedStudent.getId()).isEqualTo(oldStudent.getId());
        Assertions.assertThat(editedStudent.getName()).isEqualTo(newStudent.getName());
        Assertions.assertThat(editedStudent.getSno()).isEqualTo(newStudent.getSno());
        Assertions.assertThat(editedStudent.getKlass()).isEqualTo(newStudent.getKlass());

        // 断言返回值符合预期
        Assertions.assertThat(resultStudent).isEqualTo(mockResultStudent);
    }

    /**
     * 参数验证
     */
    @Test(expected = IllegalArgumentException.class)
    public void deleteByIdValidate() {
        this.studentService.deleteById(null);
    }

    /**
     * 功能测试
     */
    @Test
    public void deleteById() {
        // 替身及模拟返回值准备
        Long id = new Random().nextLong();

        // studentRepository.deleteById方法的返回值类型为void。
        // Mockito已默认为返回值为void默认生了返回值，无需对此替身单元做设置

        // 调用方法
        this.studentService.deleteById(id);

        // 预测以期望的参数值调用了期望的方法
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.studentRepository).deleteById(longArgumentCaptor.capture());
        Assert.assertEquals(longArgumentCaptor.getValue(), id);
    }
}