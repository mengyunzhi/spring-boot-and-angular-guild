package com.mengyunzhi.springbootstudy.service;

import com.mengyunzhi.springbootstudy.entity.Course;
import com.mengyunzhi.springbootstudy.repository.CourseRepository;
import org.junit.Assert;
import org.junit.Test;
import org.mockito.Mockito;

import static org.junit.Assert.*;

public class CourseServiceImplTest {
    private CourseRepository courseRepository;
    private CourseService courseService;

    public CourseServiceImplTest() {
        this.courseRepository = Mockito.mock(CourseRepository.class);
        this.courseService = new CourseServiceImpl(this.courseRepository);
    }

    @Test
    public void save() {
        Course course = new Course();
        Course returnCourse = new Course();
        Mockito.when(this.courseRepository.save(course)).thenReturn(returnCourse);

        Course resultCourse = this.courseService.save(course);
        Assert.assertEquals(returnCourse, resultCourse);
    }
}