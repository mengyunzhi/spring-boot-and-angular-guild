package com.mengyunzhi.springbootstudy.repository;

import com.mengyunzhi.springbootstudy.entity.Teacher;
import jdk.nashorn.internal.runtime.options.Option;
import org.springframework.data.repository.CrudRepository;

/**
 * 教师仓库
 * @author panjie
 */
public interface TeacherRepository extends CrudRepository<Teacher, Long> {
    /**
     * 查找用户
     * @param username 用户名
     * @return
     */
    Teacher findByUsername(String username);
}
