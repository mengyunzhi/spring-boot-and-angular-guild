package com.mengyunzhi.springBootStudy.entity;

import javax.persistence.*;

@Entity
public class Klass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Teacher teacher;

    private String name;

    public Klass() {
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
}
