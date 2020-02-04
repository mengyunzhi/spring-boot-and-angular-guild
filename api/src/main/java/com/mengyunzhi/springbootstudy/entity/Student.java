package com.mengyunzhi.springbootstudy.entity;

import org.springframework.dao.DataIntegrityViolationException;

import javax.persistence.*;

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String sno;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Klass klass;

    public Student() {
    }

    /**
     * 在实体保存到数据库以前，执行1次
     * 1. 校验name 字段长度为2-20
     * 2. 校验sno 字段长为为6
     */
    @PrePersist
    public void perPersis() {
        if (this.name != null ) {
            if (this.name.length() < 2) {
                throw new DataIntegrityViolationException("name length less than 2");
            }

            if (this.name.length() > 20) {
                throw new DataIntegrityViolationException("name length more than 20");
            }
        }

        if (this.sno != null) {
            if (this.sno.length() != 6) {
                throw new DataIntegrityViolationException("sno length must be 6");
            }
        }
    }

    @PreUpdate
    public void perUpdate() {
        this.perPersis();
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

    public String getSno() {
        return sno;
    }

    public void setSno(String sno) {
        this.sno = sno;
    }

    public Klass getKlass() {
        return klass;
    }

    public void setKlass(Klass klass) {
        this.klass = klass;
    }
}
