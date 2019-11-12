package com.mengyunzhi.springBootStudy.controller;

import com.mengyunzhi.springBootStudy.entity.Klass;
import com.mengyunzhi.springBootStudy.service.KlassService;
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
    KlassService klassService;

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        klassService.deleteById(id);
    }

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public Klass get(@PathVariable Long id) {
        return this.klassService.getById(id);
    }

    @GetMapping
    public List<Klass> getAll(@RequestParam String name) {
        return this.klassService.getAll(name);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Klass klass) {
        this.klassService.save(klass);
    }

    /**
     * 更新班级
     *
     * @param id    要更新的班级ID
     * @param klass 新班级数据
     */
    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable Long id, @RequestBody Klass klass) {
        this.klassService.update(id, klass);
    }
}
