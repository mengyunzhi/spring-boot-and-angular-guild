package com.mengyunzhi.springBootStudy.repository;

import com.mengyunzhi.springBootStudy.entity.Klass;
import com.mengyunzhi.springBootStudy.entity.Student;
import org.assertj.core.api.Assertions;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.criteria.*;
import java.util.List;


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
    public void specificationTest() {
        List<Student> oldStudentList = (List<Student>) this.studentRepository.findAll();
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

        /* 断言存入了2个学生 */
        List<Student> studentList = (List<Student>) this.studentRepository.findAll();
        logger.info("当前数据库总计有{}个学生", studentList.size());
        Assertions.assertThat(studentList.size()).isEqualTo(2 + oldStudentList.size());

        /* 初始化第一个班级做为查询条件 */
        Specification<Student> klassSpecification = new Specification<Student>() {
            /**
             * 本条件查询：班级为klassEven的学生
             * @param root 根(Student)实体
             * @param criteriaQuery 条件查询
             * @param criteriaBuilder 条件创建者
             * @return 查询谓语
             */
            @Override
            public Predicate toPredicate(Root<Student> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("klass").as(Klass.class), klass);
            }
        };

        /* 加入班级条件后查询，断言查询的数量为1 */
        studentList = (List<Student>) this.studentRepository.findAll(klassSpecification);
        logger.info("使用班级为条件进行查询，查询到{}个学生", studentList.size());
        Assertions.assertThat(studentList.size()).isEqualTo(1);

        /* 学号0322做为查询条件 */
        Specification<Student> snoSpecification = new Specification<Student>() {
            @Override
            public Predicate toPredicate(Root<Student> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.like(root.get("sno").as(String.class), "0322%");
            }
        };

        /* 断言两个学生都是以此学号打头的 */
        studentList = (List<Student>) this.studentRepository.findAll(snoSpecification);
        logger.info("使用学号0322条件进行查询，查询到{}个学生", studentList.size());
        Assertions.assertThat(studentList.size()).isEqualTo(2);

        /* 学号以322打头 */
        snoSpecification = new Specification<Student>() {
            @Override
            public Predicate toPredicate(Root<Student> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.like(root.get("sno").as(String.class), "322%");
            }
        };

        /* 断言查询到0个学生 */
        studentList = (List<Student>) this.studentRepository.findAll(snoSpecification);
        logger.info("使用学号322为条件进行查询，查询到{}个学生", studentList.size());
        Assertions.assertThat(studentList.size()).isEqualTo(0);

        /* 学号03228打头，断言获取了一个学生 */
        snoSpecification = new Specification<Student>() {
            @Override
            public Predicate toPredicate(Root<Student> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.like(root.get("sno").as(String.class), "03228%");
            }
        };
        studentList = (List<Student>) this.studentRepository.findAll(snoSpecification);
        logger.info("使用学号03228为条件进行查询，查询到{}个学生", studentList.size());
        Assertions.assertThat(studentList.size()).isEqualTo(1);

        /* 姓名包含StudentN，断言获取了两个学生 */
        Specification<Student> nameSpecification = new Specification<Student>() {
            @Override
            public Predicate toPredicate(Root<Student> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.like(root.get("name").as(String.class), "%StudentN%");
            }
        };
        studentList = (List<Student>) this.studentRepository.findAll(nameSpecification);
        logger.info("姓名包含StudentN进行查询，查询到{}个学生", studentList.size());
        Assertions.assertThat(studentList.size()).isEqualTo(2);

        /* 姓名包含Name1，断言获取了1个学生 */
        nameSpecification = new Specification<Student>() {
            @Override
            public Predicate toPredicate(Root<Student> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.like(root.get("name").as(String.class), "%Name1%");
            }
        };
        studentList = (List<Student>) this.studentRepository.findAll(nameSpecification);
        logger.info("姓名包含Name1进行查询，查询到{}个学生", studentList.size());
        Assertions.assertThat(studentList.size()).isEqualTo(1);
    }
}
