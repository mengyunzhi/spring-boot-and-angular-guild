package com.mengyunzhi.springBootStudy.repository;

import com.mengyunzhi.springBootStudy.entity.Klass;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * 班级仓库
 */
public interface KlassRepository extends CrudRepository<Klass, Long>{
    List<Klass> findAllByNameContains(String name);
}
