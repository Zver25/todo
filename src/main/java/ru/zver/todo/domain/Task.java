package ru.zver.todo.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class Task {

    @Id
    @GeneratedValue()
    private Long id;
    private Boolean completed;
    private String title;
    private String description;

    public Task() {
        this.id = 0L;
        this.completed = false;
        this.title = "";
        this.description = "";
    }

    public Task(String title, String description) {
        this.id = 0L;
        this.completed = false;
        this.title = title;
        this.description = description;
    }

    public void update(Task task) {
        this.setTitle(task.getTitle());
        this.setDescription(task.getDescription());
        this.setCompleted(task.getCompleted());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}
