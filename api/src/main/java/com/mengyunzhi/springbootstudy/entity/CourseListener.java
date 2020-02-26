package com.mengyunzhi.springbootstudy.entity;

import org.springframework.dao.DataIntegrityViolationException;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

/**
 * 实体监听器。当课程实体发生新建、更新操作时执行
 */
public class CourseListener {

    @PrePersist
    @PreUpdate
    public void prePersistAndUpdate(Course course) {
        if (course.getName() == null || course.getName().length() < 2) {
            throw new DataIntegrityViolationException("课程名称长度最小为2位");
        }
    }
}
