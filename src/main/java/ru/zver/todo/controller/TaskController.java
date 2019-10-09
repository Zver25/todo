package ru.zver.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.zver.todo.domain.Task;
import ru.zver.todo.service.TaskService;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> list() {
        return taskService.findAll();
    }

    @GetMapping("{id}")
    public Task getOne(@PathVariable("id") Task task) {
        return task;
    }

    @PostMapping
    public Task create(@RequestBody Task task) {
        return taskService.create(task);
    }

    @PutMapping("{id}")
    public Task update(@PathVariable("id") Task oldTask, @RequestBody Task newTask) {
        return taskService.update(oldTask, newTask);
    }

    @DeleteMapping
    public void delete(@PathVariable("id") Task task) {
        taskService.delete(task);
    }

}
