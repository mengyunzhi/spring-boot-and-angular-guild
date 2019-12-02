package com.mengyunzhi.springbootstudy.service;

import com.mengyunzhi.springbootstudy.entity.Klass;
import com.mengyunzhi.springbootstudy.repository.KlassRepository;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

@SpringBootTest
@RunWith(SpringRunner.class)
public class KlassServiceImplTest {
    @Autowired KlassService klassService;
    @Autowired
    KlassRepository klassRepository;

    /**
     * 1. 新建一个班级
     * 2. 删除这个班级
     * 3. 再次查询该班级
     * 4. 断言该班级不存在
     */
    @Test
    public void deleteById() {
        Klass klass = new Klass();
        klass.setName("测试班级");
        klassRepository.save(klass);

        klassService.deleteById(klass.getId());

        Optional<Klass> klassOptional = klassRepository.findById(klass.getId());
        Assertions.assertThat(klassOptional.isPresent()).isFalse();
    }
}