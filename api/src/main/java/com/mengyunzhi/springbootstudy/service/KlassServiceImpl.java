package com.mengyunzhi.springbootstudy.service;

import com.mengyunzhi.springbootstudy.entity.Klass;
import com.mengyunzhi.springbootstudy.repository.KlassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 班级服务实现
 */
@Service
public class KlassServiceImpl implements KlassService {
    /*班级仓库*/
    @Autowired
    KlassRepository klassRepository;

    @Override
    public void deleteById(Long id) {
        this.klassRepository.deleteById(id);
    }

    @Override
    public List<Klass> getAll(String name) {
        return this.klassRepository.findAllByNameContains(name);
    }


    /**
     * 获取某个班级
     *
     * @param id 班级ID
     * @return 班级
     */
    @Override
    public Klass getById(Long id) {
        return this.klassRepository.findById(id).get();
    }

    @Override
    public void save(Klass klass) {
        this.klassRepository.save(klass);
    }

    /**
     * 更新班级
     * 获取数据库中的老数据
     * 使用传入的新数据对老数据的更新字段赋值
     * 将更新后的老数据重新保存在数据表中
     *
     * @param id    要更新的班级ID
     * @param klass 新班级数据
     */
    @Override
    public void update(Long id, Klass klass) {
        Klass oldKlass = klassRepository.findById(id).get();
        oldKlass.setName(klass.getName());
        oldKlass.setTeacher(klass.getTeacher());
        klassRepository.save(oldKlass);
    }
}
