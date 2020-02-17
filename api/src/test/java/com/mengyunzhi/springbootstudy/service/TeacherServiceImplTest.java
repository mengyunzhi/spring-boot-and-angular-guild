package com.mengyunzhi.springbootstudy.service;

import com.mengyunzhi.springbootstudy.entity.Teacher;
import com.mengyunzhi.springbootstudy.repository.TeacherRepository;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;

import javax.servlet.http.HttpServletRequest;

import static org.junit.Assert.*;

public class TeacherServiceImplTest {
    private TeacherServiceImpl teacherService;
    private TeacherRepository teacherRepository;
    private HttpServletRequest httpServletRequest;

    @Before
    public void before() {
        this.teacherRepository = Mockito.mock(TeacherRepository.class);
        this.httpServletRequest = Mockito.mock(HttpServletRequest.class);
        TeacherServiceImpl teacherService = new TeacherServiceImpl(this.teacherRepository, this.httpServletRequest);
        this.teacherService = Mockito.spy(teacherService);
    }

    @Test
    public void login() {
        // 请求及模拟返回数据准备
        String username = RandomString.make(6);
        String password = RandomString.make(6);
        Teacher teacher = new Teacher();
        Mockito.when(this.teacherRepository.findByUsername(username)).thenReturn(teacher);
        Mockito.doReturn(true).when(this.teacherService).validatePassword(teacher, password);

        // 调用
        boolean result = this.teacherService.login(username, password);

        // 断言
        Assert.assertTrue(result);
        ArgumentCaptor<String> stringArgumentCaptor = ArgumentCaptor.forClass(String.class);
        Mockito.verify(this.teacherRepository).findByUsername(stringArgumentCaptor.capture());
        Assert.assertEquals(stringArgumentCaptor.getValue(), username);
    }

    @Test
    public void validatePassword() {
        // 教师中有密码，且密码与传入的密码相同，返回true
        Teacher teacher = new Teacher();
        String password = RandomString.make(6);
        teacher.setPassword(password);
        Assert.assertTrue(this.teacherService.validatePassword(teacher, password));

        // 教师为null返回false
        Assert.assertFalse(
                this.teacherService.validatePassword(
                        null,
                        password));

        // 传入的密码为null返回false
        Assert.assertFalse(
                this.teacherService.validatePassword(
                        teacher, null));

        // 未设置教师的密码，返回false
        teacher.setPassword(null);
        Assert.assertFalse(
                this.teacherService.validatePassword(
                        teacher, password));

        // 教师中的密码与传入的密码不相同返回false
        teacher.setPassword(RandomString.make(6));
        Assert.assertFalse(
                this.teacherService.validatePassword(
                        teacher, password));
    }
}