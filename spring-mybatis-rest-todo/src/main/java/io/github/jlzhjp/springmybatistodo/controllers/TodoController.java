package io.github.jlzhjp.springmybatistodo.controllers;

import io.github.jlzhjp.springmybatistodo.Todo;
import io.github.jlzhjp.springmybatistodo.mappers.TodoMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(value = "*")
public class TodoController {
    private final TodoMapper todoMapper;

    public TodoController(TodoMapper todoMapper) {
        this.todoMapper = todoMapper;
    }

    @GetMapping
    public List<Todo> getAllTodos() {
        return todoMapper.findAll();
    }

    @GetMapping("/{id}")
    public Todo getTodoById(@PathVariable long id) {
        return todoMapper.findById(id);
    }

    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        todoMapper.insert(todo);
        return todo;
    }

    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable long id, @RequestBody Todo todo) {
        todo.setId(id);
        todoMapper.update(todo);
        return todo;
    }

    @PatchMapping("/{id}")
    public Todo patchTodo(@PathVariable long id, @RequestBody Todo patch) {
        Todo todo = todoMapper.findById(id);

        if (patch.getTitle() != null) {
            todo.setTitle(patch.getTitle());
        }
        if (patch.getCompleted() != null) {
            todo.setCompleted(patch.getCompleted());
        }

        todoMapper.update(todo);
        return todo;
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable long id) {
        todoMapper.delete(id);
    }
}
