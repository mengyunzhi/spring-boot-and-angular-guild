package com.mengyunzhi.springbootstudy.service;

import com.mengyunzhi.springbootstudy.entity.Klass;
import com.mengyunzhi.springbootstudy.entity.Student;
import com.mengyunzhi.springbootstudy.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.validation.constraints.NotNull;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    StudentRepository studentRepository;

    @Override
    public Student save(Student student) {
        return this.studentRepository.save(student);
    }

    @Override
    public Page<Student> findAll(Pageable pageable) {
        return this.studentRepository.findAll(pageable);
    }

    @Override
    public Page<Student> findAll(String name, String sno, Long klassId, @NotNull Pageable pageable) {
        Assert.notNull(pageable, "Pageable不能为null");
        Klass klass = new Klass();
        klass.setId(klassId);
        return this.studentRepository.findAll(name, sno, klass, pageable);
    }

    @Override
    public Student findById(@NotNull Long id) {
        Assert.notNull(id, "id不能为null");
        return this.studentRepository.findById(id).get();
    }

    @Override
    public Student update(Long id, Student student) {
        Student oldStudent = this.studentRepository.findById(id).get();
        return this.updateFields(student,oldStudent);
    }

    @Override
    public void deleteById(@NotNull Long id) {
        Assert.notNull(id, "传入的ID不能为NULL");
        this.studentRepository.deleteById(id);
    }

    /**
     * 更新学生
     * @param newStudent 新学生信息
     * @param oldStudent 老学生信息
     * @return 更新后的学生信息
     */
    public Student updateFields(Student newStudent, Student oldStudent) {
        oldStudent.setSno(newStudent.getSno());
        oldStudent.setName(newStudent.getName());
        oldStudent.setKlass(newStudent.getKlass());
        return this.studentRepository.save(oldStudent);
    }
}
