package io.magelssen.entities;

import static javax.persistence.GenerationType.SEQUENCE;

import io.micronaut.context.annotation.Primary;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Task {
    @Id
    @Primary
    @GeneratedValue(strategy=SEQUENCE, generator="id")
    private Long id;
    private String title;
    private String description;
    private boolean completed;

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

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}