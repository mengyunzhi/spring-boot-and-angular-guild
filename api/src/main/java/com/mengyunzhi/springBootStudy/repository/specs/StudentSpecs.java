package com.mengyunzhi.springBootStudy.repository.specs;

import com.mengyunzhi.springBootStudy.entity.Klass;
import com.mengyunzhi.springBootStudy.entity.Student;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

/**
 * 学生综合查询
 */
public class StudentSpecs {
    /**
     * 属于某个班级
     *
     * @param klass 班级
     * @return
     */
    public static Specification<Student> belongToKlass(Klass klass) {
        if (null == klass || null == klass.getId()) {
            return Specification.where(null);
        }
        return (Specification<Student>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("klass").as(Klass.class), klass);
    }

    public static Specification<Student> containingName(String name) {
        if (name != null) {
            return (Specification<Student>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", name));
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<Student> startWithSno(String sno) {
        if (sno == null) {
            return Specification.where(null);
        }
        return (Specification<Student>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("sno").as(String.class), String.format("%s%%", sno));
    }
}
