package com.mengyunzhi.springbootstudy.repository.specs;

import com.mengyunzhi.springbootstudy.entity.Klass;
import com.mengyunzhi.springbootstudy.entity.Student;
import com.mengyunzhi.springbootstudy.repository.KlassRepository;
import com.mengyunzhi.springbootstudy.repository.StudentRepository;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@SpringBootTest
@RunWith(SpringRunner.class)
public class StudentSpecsTest {
    private static final Logger logger = LoggerFactory.getLogger(StudentSpecsTest.class);

    @Autowired
    private KlassRepository klassRepository;

    @Autowired
    private StudentRepository studentRepository;

    private Student student;

    @Before
    public void before() {
        logger.info("初始化测试数据");
        Klass klass = new Klass();
        klass.setName("testKlass");
        this.klassRepository.save(klass);

        this.student = new Student();
        this.student.setName("testName");
        this.student.setSno("032282");
        this.student.setKlass(klass);
        this.studentRepository.save(this.student);
    }

    /**
     * sno测试
     * 1. 原文
     * 2. 左
     * 3. 中
     */
    @Test
    public void beginWithSno() {
        List students = this.studentRepository.findAll(StudentSpecs.startWithSno("032282"));
        Assertions.assertThat(students.size()).isEqualTo(1);

        students = this.studentRepository.findAll(StudentSpecs.startWithSno("032"));
        Assertions.assertThat(students.size()).isEqualTo(1);

        students = this.studentRepository.findAll(StudentSpecs.startWithSno("3228"));
        Assertions.assertThat(students.size()).isEqualTo(0);
    }

    @Test
    public void belongToKlass() {
        Klass klass = this.student.getKlass();

        logger.info("以klass进行综合查询，断言条数为1");
        List students = this.studentRepository.findAll(StudentSpecs.belongToKlass(klass));
        Assertions.assertThat(students.size()).isEqualTo(1);

        logger.info("将klass的ID设置为-1，断言查询的条数为0。预测：jpa是根据关联实体的ID值进行查询的");
        klass.setId(-1L);
        students = this.studentRepository.findAll(StudentSpecs.belongToKlass(klass));
        Assertions.assertThat(students.size()).isEqualTo(0);
    }


    /**
     * name测试
     * 1. 原文
     * 2. left
     * 3. middle
     * 4. right
     * 5. 不包含
     */
    @Test
    public void containingName() {
        List students = this.studentRepository.findAll(StudentSpecs.containingName("testName"));
        Assertions.assertThat(students.size()).isEqualTo(1);

        students = this.studentRepository.findAll(StudentSpecs.containingName("tes"));
        Assertions.assertThat(students.size()).isEqualTo(1);

        students = this.studentRepository.findAll(StudentSpecs.containingName("stNa"));
        Assertions.assertThat(students.size()).isEqualTo(1);

        students = this.studentRepository.findAll(StudentSpecs.containingName("tName"));
        Assertions.assertThat(students.size()).isEqualTo(1);

        students = this.studentRepository.findAll(StudentSpecs.containingName("testName12"));
        Assertions.assertThat(students.size()).isEqualTo(0);
    }
}