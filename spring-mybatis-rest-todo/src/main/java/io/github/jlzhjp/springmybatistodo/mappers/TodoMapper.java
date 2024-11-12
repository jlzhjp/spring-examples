package io.github.jlzhjp.springmybatistodo.mappers;

import io.github.jlzhjp.springmybatistodo.Todo;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TodoMapper {
    @Select("SELECT * FROM todo")
    List<Todo> findAll();

    @Select("SELECT * FROM todo WHERE id = #{id}")
    Todo findById(long id);

    @Insert("INSERT INTO todo (title, completed) VALUES (#{title}, #{completed})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Todo todo);

    @Update("UPDATE todo SET title=#{title}, completed=#{completed} WHERE id=#{id}")
    void update(Todo todo);

    @Delete("DELETE FROM todo WHERE id=#{id}")
    void delete(long id);
}
