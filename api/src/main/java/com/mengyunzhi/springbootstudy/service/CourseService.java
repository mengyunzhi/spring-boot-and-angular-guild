package com.mengyunzhi.springbootstudy.service;

import com.mengyunzhi.springbootstudy.entity.Course;

/**
 * 课程
 * @author panjie
 */
public interface CourseService {
    /**
     * 新增课程
     * @param course 课程
     * @return 课程
     */
    Course save(Course course);
}
