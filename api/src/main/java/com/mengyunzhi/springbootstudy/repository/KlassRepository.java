package com.mengyunzhi.springbootstudy.repository;

import com.mengyunzhi.springbootstudy.entity.Klass;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * 班级仓库
 */
public interface KlassRepository extends CrudRepository<Klass, Long>{
    List<Klass> findAllByNameContains(String name);
}
