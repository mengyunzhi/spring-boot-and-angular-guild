package com.mengyunzhi.springBootStudy.controller;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import com.mengyunzhi.springBootStudy.entity.Klass;
import com.mengyunzhi.springBootStudy.entity.Student;
import com.mengyunzhi.springBootStudy.service.StudentService;
import org.assertj.core.api.Assertions;
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
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.HashMap;
import java.util.LinkedHashMap;

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

        logger.info("获取返回的值");
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