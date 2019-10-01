package ru.zver.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.zver.todo.domain.Todo;
import ru.zver.todo.service.TodoService;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoController {

    private TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> list() {
        return todoService.findAll();
    }

    @GetMapping("{id}")
    public Todo getOne(@PathVariable("id") Todo todo) {
        return todo;
    }

    @PostMapping
    public Todo create(@RequestBody Todo todo) {
        return todoService.create(todo);
    }

    @PutMapping("{id}")
    public Todo update(@PathVariable("id") Todo oldTodo, @RequestBody Todo newTodo) {
        return todoService.update(oldTodo, newTodo);
    }

    @DeleteMapping
    public void delete(@PathVariable("id") Todo todo) {
        todoService.delete(todo);
    }

}
