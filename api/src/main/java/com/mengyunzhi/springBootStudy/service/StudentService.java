package com.mengyunzhi.springBootStudy.service;

import com.mengyunzhi.springBootStudy.entity.Student;

/**
 * 学生
 */
public interface StudentService {
    /**
     * 保存
     * @param student 保存前的学生
     * @return 保存后的学生
     */
    Student save(Student student);
}
