package com.mengyunzhi.springBootStudy;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController("Teacher")
public class TeacherController {
    private final static Logger logger = LoggerFactory.getLogger(TeacherController.class.getName());

    @Autowired
    JdbcTemplate jdbcTemplate;


    @GetMapping
    public List<Teacher> getAll() {
        /*初始化不固定大小的数组*/
        List<Teacher> teachers = new ArrayList<>();

        /* 定义实现了RowCallbackHandler接口的对象*/
        RowCallbackHandler rowCallbackHandler = new RowCallbackHandler() {
            /**
             * 该方法用于执行jdbcTemplate.query后的回调，每行数据回调1次。比如Teacher表中有两行数据，则回调此方法两次。
             *
             * @param resultSet 查询结果，每次一行
             * @throws SQLException 查询出错时，将抛出此异常，暂时不处理。
             */
            @Override
            public void processRow(ResultSet resultSet) throws SQLException {
                Teacher teacher = new Teacher();
                /*获取字段id，并转换为Long类型返回*/
                teacher.setId(resultSet.getLong("id"));
                /*获取字段name，并转换为String类型返回*/
                teacher.setName(resultSet.getString("name"));
                /*获取字段sex，并转换为布尔类型返回*/
                teacher.setSex(resultSet.getBoolean("sex"));
                teacher.setUsername(resultSet.getString("username"));
                teacher.setEmail(resultSet.getString("email"));
                teacher.setCreateTime(resultSet.getLong("create_time"));
                teacher.setUpdateTime(resultSet.getLong("update_time"));

                /*将得到的teacher添加到要返回的数组中*/
                teachers.add(teacher);
            }
        };

        /*定义查询字符串*/
        String query = "select id, name, sex, username, email, create_time, update_time from teacher";

        /*使用query进行查询，并把查询的结果通过调用rowCallbackHandler.processRow()方法传递给rowCallbackHandler对象*/
        jdbcTemplate.query(query, rowCallbackHandler);
        return teachers;
    }
}