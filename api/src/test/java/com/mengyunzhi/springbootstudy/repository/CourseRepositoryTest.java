package com.mengyunzhi.springbootstudy.repository;

import com.mengyunzhi.springbootstudy.entity.Course;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@SpringBootTest
@RunWith(SpringRunner.class)
public class CourseRepositoryTest {

    @Autowired
    CourseRepository courseRepository;

    @Test
    public void existsByName() {
        // 生成随机字符串的课程名
        String name = RandomString.make(10);

        // 调用existsByName方法，断言返回false
        Assert.assertFalse(this.courseRepository.existsByName(name));

        // 新建课程，课程名用上面生成的随机字符串，保存课程
        Course course = new Course();
        course.setName(name);
        this.courseRepository.save(course);

        // 再次调用existsByName方法，断言返回true
        Assert.assertTrue(this.courseRepository.existsByName(name));
    }
}