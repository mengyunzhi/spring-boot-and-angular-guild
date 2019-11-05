package com.mengyunzhi.springBootStudy.repository;

import com.mengyunzhi.springBootStudy.entity.Teacher;
import org.springframework.data.repository.CrudRepository;

/**
 * 教师仓库
 */
public interface TeacherRepository extends CrudRepository<Teacher, Long> {
}
