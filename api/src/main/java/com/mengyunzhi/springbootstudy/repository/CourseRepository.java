package com.mengyunzhi.springbootstudy.repository;

import com.mengyunzhi.springbootstudy.entity.Course;
import org.springframework.data.repository.CrudRepository;

public interface CourseRepository extends CrudRepository<Course, Long> {
    /**
     * 课程名称是否存在
     * @param name 课程名称
     * @return true 存在
     */
    boolean existsByName(String name);
}
