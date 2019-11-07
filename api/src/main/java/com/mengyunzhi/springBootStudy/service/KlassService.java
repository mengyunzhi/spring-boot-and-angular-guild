package com.mengyunzhi.springBootStudy.service;

import com.mengyunzhi.springBootStudy.entity.Klass;

import java.util.List;

/**
 * 班级服务
 */
public interface KlassService {
    /**
     * 获取所有班级列表
     *
     * @param name 班级名称
     * @return
     */
    List<Klass> getAll(String name);

    /**
     * 通过ID获取班级
     *
     * @param id 班级ID
     * @return 班级实体
     */
    Klass getById(Long id);

    /**
     * 新增
     *
     * @param klass 班级
     */
    void save(Klass klass);

    /**
     * 更新班级
     *
     * @param id    预更新的班级ID
     * @param klass 新的班级信息
     */
    void update(Long id, Klass klass);
}
