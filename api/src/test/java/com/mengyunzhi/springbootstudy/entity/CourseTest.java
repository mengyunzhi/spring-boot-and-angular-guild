package com.mengyunzhi.springbootstudy.entity;

import com.mengyunzhi.springbootstudy.repository.CourseRepository;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class CourseTest {
    @Autowired
    CourseRepository courseRepository;

    private Course course;

    @Before
    public void before() {
        this.course = new Course();
        this.course.setName(RandomString.make(4));
    }

    @Test
    public void save() {
        this.courseRepository.save(this.course);
    }

    @Test
    public void update() {
        this.courseRepository.save(this.course);
        this.course.setName(RandomString.make(4));
        this.courseRepository.save(this.course);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void nameUniqueTest() {
        this.courseRepository.save(this.course);
        Course course = new Course();
        course.setName(this.course.getName());
        this.courseRepository.save(course);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void nameNullable() {
        this.course.setName(null);
        this.courseRepository.save(course);
    }

    @Test
    public void nameLength() {
        Boolean catchException = false;
        this.course.setName(null);
        try {
            this.courseRepository.save(this.course);
        } catch (DataIntegrityViolationException e) {
            Assert.assertEquals(e.getMessage(), "课程名称长度最小为2位");
            catchException = true;
        }

        Assert.assertTrue(catchException);

        catchException = false;
        this.course.setName(RandomString.make(1));
        try {
            this.courseRepository.save(this.course);
        } catch (DataIntegrityViolationException e) {
            Assert.assertEquals(e.getMessage(), "课程名称长度最小为2位");
            catchException = true;
        }
        Assert.assertTrue(catchException);

        for (int i = 2; i < 4; i++) {
            this.course.setName(RandomString.make(i));
            this.courseRepository.save(this.course);
        }
    }
}