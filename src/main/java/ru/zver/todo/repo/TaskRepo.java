package ru.zver.todo.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import ru.zver.todo.domain.Task;

public interface TaskRepo extends JpaRepository<Task, Long> {
}
