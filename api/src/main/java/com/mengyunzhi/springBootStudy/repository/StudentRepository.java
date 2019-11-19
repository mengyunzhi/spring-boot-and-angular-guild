package com.mengyunzhi.springBootStudy.repository;

import com.mengyunzhi.springBootStudy.entity.Student;
import org.springframework.data.repository.CrudRepository;

/**
 * 学生
 */
public interface StudentRepository extends CrudRepository<Student, Long> {
}
