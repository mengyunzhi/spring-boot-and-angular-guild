package com.mengyunzhi.springbootstudy.service;

import com.mengyunzhi.springbootstudy.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.validation.constraints.NotNull;

/**
 * 学生
 * @Author panjie@yunzhiclub.com
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
    Page<Student> findAll(String name, String sno, Long klassId, @NotNull Pageable pageable);

    /**
     * 查找学生
     * @param id 学生ID
     * @return 学生
     */
    Student findById(@NotNull Long id);

    /**
     * 更新学生
     * @param id ID
     * @param student 更新的学生信息
     * @return 学生
     */
    Student update(Long id, Student student);

    /**
     * 删除学生
     * @param id 学生id
     */
    void deleteById(Long id);
}
