package com.mengyunzhi.springBootStudy.repository;

import com.mengyunzhi.springBootStudy.entity.Klass;
import com.mengyunzhi.springBootStudy.entity.Student;
import com.mengyunzhi.springBootStudy.repository.specs.StudentSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import javax.validation.constraints.NotNull;

/**
 * 学生
 */
public interface StudentRepository extends PagingAndSortingRepository<Student, Long>, JpaSpecificationExecutor {
    /**
     * 综合查询
     * @param name containing 姓名
     * @param sno startWith 学号
     * @param klass equal 班级
     * @param  pageable
     * @return
     */
    default Page findAll(String name, String sno, Klass klass, @NotNull Pageable pageable) {
        Assert.notNull(pageable, "传入的Pageable不能为null");
        Specification<Student> specification = StudentSpecs.containingName(name)
                .and(StudentSpecs.startWithSno(sno))
                .and(StudentSpecs.belongToKlass(klass));
        return this.findAll(specification, pageable);
    }
}
