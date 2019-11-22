package com.mengyunzhi.springBootStudy.repository;

import com.mengyunzhi.springBootStudy.entity.Student;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * 学生
 */
public interface StudentRepository extends PagingAndSortingRepository<Student, Long> {
}
