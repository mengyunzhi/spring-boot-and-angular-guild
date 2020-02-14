package com.mengyunzhi.springbootstudy.repository;

import com.mengyunzhi.springbootstudy.entity.Teacher;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class TeacherRepositoryTest {
    @Autowired
    TeacherRepository teacherRepository;

    @Test
    public void findByUsername() {
        // 准备测试数据并持久化
        Teacher teacher = new Teacher();
        teacher.setUsername(RandomString.make(6));
        this.teacherRepository.save(teacher);

        // 调用测试方法并断言
        Teacher teacher1 = this.teacherRepository.findByUsername(teacher.getUsername());
        Assert.assertEquals(teacher.getId(), teacher1.getId());
    }
}