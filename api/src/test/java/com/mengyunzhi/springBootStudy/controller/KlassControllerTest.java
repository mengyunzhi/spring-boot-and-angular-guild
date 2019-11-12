package com.mengyunzhi.springBootStudy.controller;

import com.mengyunzhi.springBootStudy.entity.Klass;
import com.mengyunzhi.springBootStudy.entity.Teacher;
import com.mengyunzhi.springBootStudy.repository.KlassRepository;
import com.mengyunzhi.springBootStudy.repository.TeacherRepository;
import com.mengyunzhi.springBootStudy.service.KlassService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class KlassControllerTest {

    @Autowired
    MockMvc mockMvc;

    /*教师仓库*/
    @Autowired
    TeacherRepository teacherRepository;
    /*班级*/
    @Autowired
    KlassRepository klassRepository;

    /**
     * 模拟向程序中注入一个实现了KlassService的对象
     * 该对象的作用域为整个测试
     * 所以当在测试中向KlassController注入KlassService时也将是此对象
     */
    @MockBean
    KlassService klassService;

    /**
     * 删除班级测试，测试点：
     * 1. 特定URL的DELETE请求是否正常（输入）
     * 2. 是否返回了204状态码（输出）
     * 3. 是否成功的进行了数据转发（数据转发）
     * @throws Exception
     */
    @Test
    public void delete() throws Exception {
        String url = "/Klass/1";
        MockHttpServletRequestBuilder delete = MockMvcRequestBuilders.delete(url);
        this.mockMvc.perform(delete)
                .andExpect(MockMvcResultMatchers.status().is(204));
        Mockito.verify(klassService).deleteById(1L);
    }

    /**
     * 班级保存测试
     * 1. 建立一个供测试的教师
     * 2. 拼接请求的JSON串
     * 3. 模拟请求并断言返回了201
     * 4. 断言新增数据成功
     *
     * @throws Exception
     */
    @Test
    public void save() throws Exception {
        Teacher teacher = new Teacher();
        teacher.setName("潘杰");
        teacher.setEmail("panjie@yunzhiclub.com");
        teacher.setUsername("panjie");
        teacherRepository.save(teacher);

        String content = String.format("{\"name\":\"测试单元测试班级\", \"teacher\": {\"id\":%s}}", teacher.getId());
        String url = "/Klass";
        MockHttpServletRequestBuilder postRequest = MockMvcRequestBuilders.post(url)
                .contentType("application/json;charset=UTF-8")
                .content(content);


        this.mockMvc.perform(postRequest)
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().is(201));

        List<Klass> klasses = (List<Klass>) this.klassRepository.findAll();
        Assert.assertEquals(klasses.size(), 1);
        Klass klass = klasses.get(0);
        Assert.assertEquals(klass.getName(), "测试单元测试班级");
        Assert.assertEquals(klass.getTeacher().getName(), "潘杰");
    }
}