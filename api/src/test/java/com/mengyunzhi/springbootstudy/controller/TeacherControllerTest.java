package com.mengyunzhi.springbootstudy.controller;

import com.mengyunzhi.springbootstudy.service.TeacherService;
import net.minidev.json.JSONObject;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
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


@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class TeacherControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    TeacherService teacherService;

    @Test
    public void login() throws Exception {
        // 准备数据
        String url = "/Teacher/login";
        String username = RandomString.make(6);
        String password = RandomString.make(6);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("username", username);
        jsonObject.put("password", password);

        // 当以参数username, password调用teacherService.login方法时，返回true
        Mockito.when(this.teacherService.login(username, password)).thenReturn(true);

        // 触发C层并断言返回值
        this.mockMvc.perform(MockMvcRequestBuilders.post(url)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(jsonObject.toJSONString()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("true"));

        // 断言获取的参数与传入值相同
        ArgumentCaptor<String> usernameArgumentCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<String> passwordArgumentCaptor = ArgumentCaptor.forClass(String.class);
        Mockito.verify(this.teacherService).login(
                usernameArgumentCaptor.capture(),
                passwordArgumentCaptor.capture());
        Assert.assertEquals(username, usernameArgumentCaptor.getValue());
        Assert.assertEquals(password, passwordArgumentCaptor.getValue());
    }
}