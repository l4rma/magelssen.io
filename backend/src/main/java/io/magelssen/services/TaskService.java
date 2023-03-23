package io.magelssen.services;

import io.magelssen.entities.Task;
import io.magelssen.repositories.TaskRepository;
import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.Optional;

@Singleton
public class TaskService {
    @Inject
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task save(Task task) {
        return taskRepository.save(task);
    }

    public Optional<Task> findById(Long id) {
        return taskRepository.findById(id);
    }

    public Iterable<Task> findAll() {
        return taskRepository.findAll();
    }

    public void deleteById(Long id) {
        taskRepository.deleteById(id);
    }

    public void markTaskAsCompleted(Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setCompleted(true);
            taskRepository.save(task);
        } else {
            throw new RuntimeException("Task not found with ID: " + id);
        }
    }
}
