package io.magelssen.controllers;

import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.*;
import io.magelssen.services.TaskService;
import io.magelssen.entities.Task;
import java.util.Optional;
import javax.inject.Inject;

@Controller("/task")
public class TaskController {
    @Inject
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @Get("/")
    public Iterable<Task> findAll() {
        return taskService.findAll();
    }

    @Get("/{id}")
    public Optional<Task> findById(Long id) {
        return taskService.findById(id);
    }

    @Post("/")
    public Task save(@Body Task task) {
        return taskService.save(task);
    }

    @Put("/{id}/complete")
    public HttpStatus markTaskAsCompleted(Long id) {
        taskService.markTaskAsCompleted(id);
        return HttpStatus.OK;
    }

    @Delete("/{id}")
    public HttpStatus deleteById(Long id) {
        taskService.deleteById(id);
        return HttpStatus.OK;
    }
}
