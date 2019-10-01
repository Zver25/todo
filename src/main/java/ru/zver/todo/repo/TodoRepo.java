package ru.zver.todo.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import ru.zver.todo.domain.Todo;

public interface TodoRepo extends JpaRepository<Todo, Long> {
}
