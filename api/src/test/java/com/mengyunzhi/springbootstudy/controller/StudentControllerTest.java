package com.mengyunzhi.springbootstudy.controller;

import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import com.mengyunzhi.springbootstudy.entity.Klass;
import com.mengyunzhi.springbootstudy.entity.Student;
import com.mengyunzhi.springbootstudy.service.StudentService;
import org.assertj.core.api.Assertions;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import net.minidev.json.JSONArray;
import org.json.JSONObject;
import org.junit.Assert;
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
import org.springframework.http.HttpStatus;
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

        Mockito.when(this.studentService
                .findAll(Mockito.anyString(),
                        Mockito.anyString(),
                        Mockito.anyLong(),
                        Mockito.any(Pageable.class)))
                .thenReturn(mockOutStudentPage);

        logger.info("以'每页2条，请求第1页'为参数发起请求，断言返回状态码为200，并接收响应数据");
        String url = "/Student";
        MvcResult mvcResult = this.mockMvc.perform(
                MockMvcRequestBuilders.get(url)
                        .param("name", "testName")
                        .param("sno", "testSno")
                        .param("klassId", "1")
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

    /**
     * 请求参数测试
     *
     * @throws Exception
     */
    @Test
    public void findAllRequestParam() throws Exception {
        String url = "/Student";
        logger.info("只传入page size，不报错");
        this.mockMvc.perform(
                MockMvcRequestBuilders.get(url)
                        .param("page", "1")
                        .param("size", "2"))
                .andExpect(MockMvcResultMatchers.status().isOk());

        logger.info("不传page报错");
        this.mockMvc.perform(
                MockMvcRequestBuilders.get(url)
                        .param("size", "2"))
                .andExpect(MockMvcResultMatchers.status().is(HttpStatus.BAD_REQUEST.value()));

        logger.info("不传size报错");
        this.mockMvc.perform(
                MockMvcRequestBuilders.get(url)
                        .param("page", "1"))
                .andExpect(MockMvcResultMatchers.status().is(400));
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

    @Test
    public void getById() throws Exception {
        // 准备传入的参数数据
        Long id = new Random().nextLong();

        // 准备服务层替身被调用后的返回数据
        Student student = new Student();
        student.setId(id);
        student.setSno(new RandomString(6).nextString());
        student.setName(new RandomString(8).nextString());
        student.setKlass(new Klass());
        student.getKlass().setId(new Random().nextLong());
        Mockito.when(this.studentService.findById(Mockito.anyLong())).thenReturn(student);

        // 按接口规范，向url以规定的参数发起get请求。
        // 断言请求返回了正常的状态码
        String url = "/Student/" + id.toString();
        MvcResult mvcResult = this.mockMvc.perform(MockMvcRequestBuilders.get(url))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("id").value(id))
                .andExpect(MockMvcResultMatchers.jsonPath("sno").value(student.getSno()))
                .andExpect(MockMvcResultMatchers.jsonPath("name").value(student.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("klass.id").value(student.getKlass().getId()))
                .andExpect(MockMvcResultMatchers.jsonPath("klass.name").value(student.getKlass().getName()))
                .andReturn();

        // 断言C层进行了数据转发（替身接收的参数值符合预期）
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.studentService).findById(longArgumentCaptor.capture());
        Assertions.assertThat(longArgumentCaptor.getValue()).isEqualTo(id);
    }

    @Test
    public void update() throws Exception {
        // 准备传入参数的数据
        Long id = new Random().nextLong();

        // 准备服务层替身被调用后的返回数据
        Student mockResult = new Student();
        mockResult.setId(id);
        mockResult.setName(RandomString.make(6));
        mockResult.setSno(RandomString.make(4));
        mockResult.setKlass(new Klass());
        mockResult.getKlass().setId(new Random().nextLong());
        mockResult.getKlass().setName(RandomString.make(10));
        Mockito.when(this.studentService.update(Mockito.anyLong(), Mockito.any(Student.class))).thenReturn(mockResult);

        JSONObject studentJsonObject = new JSONObject();
        JSONObject klassJsonObject = new JSONObject();

        studentJsonObject.put("sno", RandomString.make(4));
        studentJsonObject.put("name", RandomString.make(6));
        klassJsonObject.put("id", new Random().nextLong());
        klassJsonObject.put("name", RandomString.make(6));
        studentJsonObject.put("klass", klassJsonObject);


        // 按接口规范发起请求，断言状态码正常，接收的数据符合预期
        String url = "/Student/" + id.toString();
        this.mockMvc
                .perform(MockMvcRequestBuilders.put(url)
                        .content(studentJsonObject.toString())
                        .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("id").value(id))
                .andExpect(MockMvcResultMatchers.jsonPath("sno").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("name").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("klass.id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("klass.name").exists())
        ;

        // 断言C层进行了数据转发（替身接收的参数值符合预期)
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        ArgumentCaptor<Student> studentArgumentCaptor = ArgumentCaptor.forClass(Student.class);

        Mockito.verify(this.studentService).update(longArgumentCaptor.capture(), studentArgumentCaptor.capture());
        Assertions.assertThat(longArgumentCaptor.getValue()).isEqualTo(id);
        Student resultStudent = studentArgumentCaptor.getValue();
        Assertions.assertThat(resultStudent.getSno()).isEqualTo(studentJsonObject.get("sno"));
        Assertions.assertThat(resultStudent.getName()).isEqualTo(studentJsonObject.get("name"));
        Assertions.assertThat(resultStudent.getKlass().getId()).isEqualTo(klassJsonObject.get("id"));
        Assertions.assertThat(resultStudent.getKlass().getName()).isEqualTo(klassJsonObject.get("name"));
    }

    @Test
    public void deleteById() throws Exception {
        // 准备替身、传入数据及返回数据
        Long id = new Random().nextLong();

        // deleteById方法返回类型为void，故无需对替身进行设置

        // 向指定的地址发起请求，并断言返回状态码204
        String url = "/Student/" + id.toString();
        this.mockMvc.perform(MockMvcRequestBuilders.delete(url))
                .andExpect(MockMvcResultMatchers.status().is(204))
        ;

        // 断言调用方法符合预期
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.studentService).deleteById(longArgumentCaptor.capture());
        Assert.assertEquals(longArgumentCaptor.getValue(), id);
    }
}