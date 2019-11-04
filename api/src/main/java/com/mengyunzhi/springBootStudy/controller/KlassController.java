package com.mengyunzhi.springBootStudy.controller;

import com.mengyunzhi.springBootStudy.entity.Klass;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 班级控制器
 */
@RestController
@RequestMapping("Klass")
public class KlassController {
    private static final Logger logger = LoggerFactory.getLogger(KlassController.class);

    @GetMapping
    public List<Klass> getAll(@RequestParam String name) {
        logger.info(name);
        return null;
    }
}
