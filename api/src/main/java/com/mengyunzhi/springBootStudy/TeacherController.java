package com.mengyunzhi.springBootStudy;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("Teacher")
public class TeacherController {

    @GetMapping
    public String getAll() {
        return "get all";
    }
}