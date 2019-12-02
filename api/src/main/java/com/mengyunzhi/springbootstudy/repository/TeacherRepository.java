package com.mengyunzhi.springbootstudy.repository;

import com.mengyunzhi.springbootstudy.entity.Teacher;
import org.springframework.data.repository.CrudRepository;

/**
 * 教师仓库
 */
public interface TeacherRepository extends CrudRepository<Teacher, Long> {
}
