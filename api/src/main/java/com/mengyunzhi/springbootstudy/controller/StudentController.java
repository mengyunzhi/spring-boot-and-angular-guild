package com.mengyunzhi.springbootstudy.controller;

import com.mengyunzhi.springbootstudy.entity.Student;
import com.mengyunzhi.springbootstudy.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    @GetMapping
    public Page<Student> findAll(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String sno,
            @RequestParam(required = false) Long klassId,
            @RequestParam int page,
            @RequestParam int size) {
        return this.studentService.findAll(
                name,
                sno,
                klassId,
                PageRequest.of(page, size));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Student save(@RequestBody Student student) {
        return studentService.save(student);
    }
}
