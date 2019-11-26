package com.mengyunzhi.springBootStudy.controller;

import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import com.mengyunzhi.springBootStudy.entity.Klass;
import com.mengyunzhi.springBootStudy.entity.Student;
import com.mengyunzhi.springBootStudy.service.StudentService;
import org.assertj.core.api.Assertions;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import net.minidev.json.JSONArray;
import org.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.*;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class StudentControllerTest {
    private static Logger logger = LoggerFactory.getLogger(StudentControllerTest.class);

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudentService studentService;

    @Test
    public void findAll() throws Exception {
        logger.info("初始化模拟返回数据");
        List<Student> students = new ArrayList<>();
        Klass klass = new Klass();
        klass.setId(-2L);
        klass.setName("test klass name");
        for (long i = 0; i < 2; i++) {
            Student student = new Student();
            student.setId(-i - 1);
            student.setSno(RandomString.make(6));
            student.setName(RandomString.make(4));
            student.setKlass(klass);
            students.add(student);
        }

        logger.info("初始化分页信息及设置模拟返回数据");
        Page<Student> mockOutStudentPage = new PageImpl<Student>(
                students,
                PageRequest.of(1, 2),
                4
        );
        Mockito.when(this.studentService.findAll(Mockito.any(Pageable.class)))
                .thenReturn(mockOutStudentPage);

        logger.info("以'每页2条，请求第1页'为参数发起请求，断言返回状态码为200，并接收响应数据");
        String url = "/Student";
        MvcResult mvcResult = this.mockMvc.perform(
                MockMvcRequestBuilders.get(url)
                        .param("page", "1")
                        .param("size", "2"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        logger.info("将返回值由string转为json，并断言接收到了分页信息");
        LinkedHashMap returnJson = JsonPath.parse(mvcResult.getResponse().getContentAsString()).json();
        Assertions.assertThat(returnJson.get("totalPages")).isEqualTo(2);   // 总页数
        Assertions.assertThat(returnJson.get("totalElements")).isEqualTo(4); // 总条数
        Assertions.assertThat(returnJson.get("size")).isEqualTo(2); // 每页大小
        Assertions.assertThat(returnJson.get("number")).isEqualTo(1); // 第几页（0基）
        Assertions.assertThat(returnJson.get("numberOfElements")).isEqualTo(2); // 当前页条数

        logger.info("测试content");
        JSONArray content = (JSONArray) returnJson.get("content");
        Assertions.assertThat(content.size()).isEqualTo(2);   // 返回了2个学生

        logger.info("测试返回的学生");
        for (int i = 0; i < 2; i++) {
            LinkedHashMap studentHashMap = (LinkedHashMap) content.get(i); // 获取第一个学生
            Assertions.assertThat(studentHashMap.get("id")).isEqualTo(-i - 1);
            Assertions.assertThat(studentHashMap.get("name").toString().length()).isEqualTo(4);
            Assertions.assertThat(studentHashMap.get("sno").toString().length()).isEqualTo(6);

            logger.info("测试返回学生所在的班级");
            LinkedHashMap klassHashMap = (LinkedHashMap) studentHashMap.get("klass");
            Assertions.assertThat(klassHashMap.get("id")).isEqualTo(-2);
            Assertions.assertThat(klassHashMap.get("name")).isEqualTo("test klass name");
        }

        return;
    }

    @Test
    public void save() throws Exception {
        logger.info("准备输入数据");
        String url = "/Student";
        JSONObject studentJsonObject = new JSONObject();
        JSONObject klassJsonObject = new JSONObject();

        studentJsonObject.put("sno", "学号测试");
        studentJsonObject.put("name", "姓名测试");
        klassJsonObject.put("id", -1);
        studentJsonObject.put("klass", klassJsonObject);

        logger.info("准备服务层被调用后的返回数据");
        Student returnStudent = new Student();
        returnStudent.setId(1L);
        returnStudent.setSno("测试返回学号");
        returnStudent.setName("测试返回姓名");
        returnStudent.setKlass(new Klass());
        returnStudent.getKlass().setId(1L);

        Mockito.when(
                studentService.save(
                        Mockito.any(Student.class)))
                .thenReturn(returnStudent);

        logger.info("发起请求");
        MvcResult mvcResult = this.mockMvc.perform(
                MockMvcRequestBuilders.post(url)
                        .content(studentJsonObject.toString())
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
        ).andExpect(MockMvcResultMatchers.status().is(201))
                .andDo(MockMvcResultHandlers.print())
                .andReturn();

        logger.info("新建参数捕获器");
        ArgumentCaptor<Student> studentArgumentCaptor = ArgumentCaptor.forClass(Student.class);
        Mockito.verify(studentService).save(studentArgumentCaptor.capture());
        Student passedStudent = studentArgumentCaptor.getValue();

        logger.info("断言捕获的对与我们前面传入的值的相同");
        Assertions.assertThat(passedStudent.getSno()).isEqualTo("学号测试");
        Assertions.assertThat(passedStudent.getName()).isEqualTo("姓名测试");
        Assertions.assertThat(passedStudent.getId()).isNull();
        Assertions.assertThat(passedStudent.getKlass().getId()).isEqualTo(-1L);

        logger.info("获取返回的值并断言此值与我们模拟的返回值相同");
        String stringReturn = mvcResult.getResponse().getContentAsString();
        DocumentContext documentContext = JsonPath.parse(stringReturn);
        LinkedHashMap studentHashMap = documentContext.json();
        Assertions.assertThat(studentHashMap.get("id")).isEqualTo(1);
        Assertions.assertThat(studentHashMap.get("sno")).isEqualTo("测试返回学号");
        Assertions.assertThat(studentHashMap.get("name")).isEqualTo("测试返回姓名");
        LinkedHashMap klassHashMap = (LinkedHashMap) studentHashMap.get("klass");
        Assertions.assertThat(klassHashMap.get("id")).isEqualTo(1);
    }
}