package com.mengyunzhi.springBootStudy.controller;

import com.mengyunzhi.springBootStudy.entity.Klass;
import com.mengyunzhi.springBootStudy.repository.KlassRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 班级控制器
 */
@RestController
@RequestMapping("Klass")
public class KlassController {
    private static final Logger logger = LoggerFactory.getLogger(KlassController.class);

    @Autowired
    KlassRepository klassRepository;

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public Klass get(@PathVariable Long id) {
        return this.klassRepository.findById(id).get();
    }

    @GetMapping
    public List<Klass> getAll(@RequestParam String name) {
        return this.klassRepository.findAllByNameContains(name);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Klass klass) {
        klassRepository.save(klass);
    }

    /**
     * 更新班级
     * 获取数据库中的老数据
     * 使用传入的新数据对老数据的更新字段赋值
     * 将更新后的老数据重新保存在数据表中
     * @param id 要更新的班级ID
     * @param klass 新班级数据
     */
    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable Long id, @RequestBody Klass klass) {
        Klass oldKlass = klassRepository.findById(id).get();
        oldKlass.setName(klass.getName());
        oldKlass.setTeacher(klass.getTeacher());
        klassRepository.save(oldKlass);
    }
}
