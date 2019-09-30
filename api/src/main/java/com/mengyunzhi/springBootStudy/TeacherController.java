package com.mengyunzhi.springBootStudy;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("Teacher")
public class TeacherController {

    @GetMapping
    public Test getAll() {
        return new Test(1, "test");
    }

    class Test{
        private int id;
        private String name;

        public Test(int id, String name) {
            this.id = id;
            this.name = name;
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}