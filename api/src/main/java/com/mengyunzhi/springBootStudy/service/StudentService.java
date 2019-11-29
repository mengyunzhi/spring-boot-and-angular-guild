package com.mengyunzhi.springBootStudy.service;

import com.mengyunzhi.springBootStudy.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * 学生
 */
public interface StudentService {
    /**
     * 保存
     *
     * @param student 保存前的学生
     * @return 保存后的学生
     */
    Student save(Student student);

    /**
     * 查询分页信息
     *
     * @param pageable 分页条件
     * @return 分页数据
     */
    Page<Student> findAll(Pageable pageable);

    /**
     * 综合查询
     * @param name containing 姓名
     * @param sno beginWith 学号
     * @param klassId equal 班级ID
     * @param pageable
     * @return
     */
    Page<Student> findAll(String name, String sno, Long klassId, Pageable pageable);
}
