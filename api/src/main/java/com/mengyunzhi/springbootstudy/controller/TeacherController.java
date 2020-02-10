package com.mengyunzhi.springbootstudy.controller;

import com.mengyunzhi.springbootstudy.entity.Teacher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("Teacher")
public class TeacherController {
    private final static Logger logger = LoggerFactory.getLogger(TeacherController.class.getName());

    @Autowired
    JdbcTemplate jdbcTemplate;

    @DeleteMapping("{id}")
    @CrossOrigin("*")
    public void delete(@PathVariable Long id) {
        String sql = String.format( "delete from `teacher` where id = %s", id);
        this.jdbcTemplate.update(sql);
    }

    @GetMapping
    @CrossOrigin("*")
    public List<Teacher> getAll() {
        logger.info("调用TeacherController的getAll方法");

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

    /**
     * 根据ID获取数据表中的教师数据并返回，用于查询某个教师的数据
     * 虽然在学习的过程中，我们将方法中的每条语句都加入注释会有利于我们的理解。
     * 但在生产的环境中，我们并不推荐在方法体中加入注释。
     * 我们认为：
     * 1 每个方法都应该是足够短小的。
     * 2 每个方法的注释都是可以在方法头部说明的。
     * 3 在代码输写时，我们更注重的是业务逻辑层面的交流而非coding方法的交流。
     * 如果我们认为方法中的代码的确是需要注释的（比如一些新的方法、新的思想的引入，我们想其它的成员能够快速的学习到该技巧）
     * 那么应该该代码段抽离出来，变成一个新的方法，然后在该方法上加入注释。
     *
     * @param id 教师ID
     * @return
     */
    @GetMapping("{id}")
    @CrossOrigin("*")
    public Teacher getById(@PathVariable Long id) {
        Teacher teacher = new Teacher();

        RowCallbackHandler rowCallbackHandler = new RowCallbackHandler() {
            @Override
            public void processRow(ResultSet resultSet) throws SQLException {
                teacher.setId(resultSet.getLong("id"));
                teacher.setName(resultSet.getString("name"));
                teacher.setSex(resultSet.getBoolean("sex"));
                teacher.setUsername(resultSet.getString("username"));
                teacher.setEmail(resultSet.getString("email"));
                teacher.setCreateTime(resultSet.getLong("create_time"));
                teacher.setUpdateTime(resultSet.getLong("update_time"));
            }
        };

        String query = String.format("select id, name, sex, username, email, create_time, update_time from teacher where id = %d", id);

        jdbcTemplate.query(query, rowCallbackHandler);

        return teacher;
    }


    /**
     * 新增教师
     * 1. 获取前台传入的教师对象
     * 2. 拼接插入sql语句
     * 3. 执行sql语句。
     *
     * @param teacher 教师
     */
    @PostMapping
    @CrossOrigin("*")
    public void save(@RequestBody Teacher teacher) {
        String sql = String.format(
                "insert into `teacher` (`name`, `username`, `email`, `sex`) values ('%s', '%s', '%s', %s)",
                teacher.getName(), teacher.getUsername(), teacher.getEmail(), teacher.getSex().toString()
        );
        logger.info(sql);
        jdbcTemplate.execute(sql);
    }

    /**
     * 使用传入的数据更新某个教师的数据
     *
     * @param id 教师ID
     * @param newTeacher 更新教师
     */
    @PutMapping("{id}")
    @CrossOrigin("*")
    public void update(@PathVariable Long id, @RequestBody Teacher newTeacher) {
        String sql = String.format(
                "update `teacher` set `name` = '%s'  , `username` = '%s' , `email` = '%s' , `sex` = %s where `id` = %s",
                newTeacher.getName(), newTeacher.getUsername(), newTeacher.getEmail(), newTeacher.getSex().toString(), id
        );
        this.jdbcTemplate.update(sql);
    }
}