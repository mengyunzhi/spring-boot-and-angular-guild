package com.mengyunzhi.springBootStudy.controller;

import com.mengyunzhi.springBootStudy.entity.Student;
import com.mengyunzhi.springBootStudy.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 * 学生控制器
 */
@RestController
@RequestMapping("Student")
public class StudentController {

    @Autowired
    StudentService studentService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Student save(@RequestBody Student student) {
        return studentService.save(student);
    }
}
