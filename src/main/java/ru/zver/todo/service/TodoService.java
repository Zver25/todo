package ru.zver.todo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.zver.todo.domain.Todo;
import ru.zver.todo.repo.TodoRepo;

import java.util.List;

@Service
public class TodoService {

    private TodoRepo todoRepo;

    @Autowired
    public TodoService(TodoRepo todoRepo) {
        this.todoRepo = todoRepo;
    }

    public Todo create(Todo todo) {
        Todo todoUpdated = todoRepo.save(todo);
        return todoUpdated;
    }

    public Todo update(Todo oldTodo, Todo newTodo) {
        oldTodo.update(newTodo);
        return todoRepo.save(oldTodo);
    }

    public void delete(Todo todo) {
        todoRepo.delete(todo);
    }

    public List<Todo> findAll() {
        return todoRepo.findAll();
    }

}
