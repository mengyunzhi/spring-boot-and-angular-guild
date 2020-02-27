package com.mengyunzhi.springbootstudy.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 课程
 * @author panjie
 */
@Entity
@EntityListeners(CourseListener.class)
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name = "";

    @ManyToOne
    private Teacher teacher;

    @ManyToMany
    private List<Klass> klasses = new ArrayList<>();

    public Course() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public List<Klass> getKlasses() {
        return klasses;
    }

    public void setKlasses(List<Klass> klasses) {
        this.klasses = klasses;
    }
}
