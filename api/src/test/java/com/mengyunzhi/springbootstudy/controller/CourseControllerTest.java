package com.mengyunzhi.springbootstudy.controller;

import com.mengyunzhi.springbootstudy.entity.Course;
import com.mengyunzhi.springbootstudy.entity.Teacher;
import com.mengyunzhi.springbootstudy.service.CourseService;
import com.mengyunzhi.springbootstudy.service.TeacherService;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.json.JSONObject;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.beans.Expression;
import java.util.Random;

import static org.junit.Assert.*;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class CourseControllerTest {
    @MockBean
    private CourseService courseService;

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private TeacherService teacherService;

    @Before
    public void before() {
        Mockito.when(this.teacherService.isLogin(Mockito.any())).thenReturn(true);
    }

    @Test
    public void save() throws Exception {
        JSONObject jsonObject = new JSONObject();
        String name = RandomString.make(4);
        jsonObject.put("name", name);
        String url = "/Course";

        Course returnCourse = new Course();
        returnCourse.setId(new Random().nextLong());
        returnCourse.setName(RandomString.make(4));
        returnCourse.setTeacher(new Teacher());
        returnCourse.getTeacher().setId(new Random().nextLong());
        returnCourse.getTeacher().setName(RandomString.make(4));

        Mockito.when(this.courseService.save(Mockito.any(Course.class))).thenReturn(returnCourse);

        this.mockMvc.perform(MockMvcRequestBuilders.post(url)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(jsonObject.toString())
        ).andExpect(MockMvcResultMatchers.status().is(201))
                .andExpect(MockMvcResultMatchers.jsonPath("id").value(returnCourse.getId()))
                .andExpect(MockMvcResultMatchers.jsonPath("name").value(returnCourse.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("teacher.id").value(returnCourse.getTeacher().getId()))
                .andExpect(MockMvcResultMatchers.jsonPath("teacher.name").value(returnCourse.getTeacher().getName()))
        ;

        ArgumentCaptor<Course> courseArgumentCaptor = ArgumentCaptor.forClass(Course.class);
        Mockito.verify(this.courseService).save(courseArgumentCaptor.capture());
        Assert.assertEquals(courseArgumentCaptor.getValue().getName(), name);
    }

    @Test
    public void existsByName() throws Exception {
        String name = RandomString.make(4);
        String url = "/Course/existsByName";
        Mockito.when(this.courseService.existsByName(Mockito.eq(name))).thenReturn(false);

        this.mockMvc.perform(MockMvcRequestBuilders.get(url)
                .param("name", name))
                .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.content().string("false"))
        ;
    }
}