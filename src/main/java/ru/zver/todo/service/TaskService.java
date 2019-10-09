package ru.zver.todo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.zver.todo.domain.Task;
import ru.zver.todo.repo.TaskRepo;

import java.util.List;

@Service
public class TaskService {

    private TaskRepo taskRepo;

    @Autowired
    public TaskService(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }

    public Task create(Task task) {
        return taskRepo.save(task);
    }

    public Task update(Task oldTask, Task newTask) {
        oldTask.update(newTask);
        return taskRepo.save(oldTask);
    }

    public void delete(Task task) {
        taskRepo.delete(task);
    }

    public List<Task> findAll() {
        return taskRepo.findAll();
    }

}
