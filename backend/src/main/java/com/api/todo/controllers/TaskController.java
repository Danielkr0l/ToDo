package com.api.todo.controllers;

import com.api.todo.models.Task;
import com.api.todo.persistences.ProjectEntity;
import com.api.todo.persistences.TaskEntity;
import com.api.todo.services.ProjectService;
import com.api.todo.services.TaskService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
public class TaskController {
    private final TaskService taskService;
    private final ProjectService projectService;

    public TaskController(TaskService taskService, ProjectService projectService) {
        this.taskService = taskService;
        this.projectService = projectService;
    }

    @GetMapping("/tasks")
    public List<TaskEntity> getAllTasks(){
        return taskService.getAllTasks();
    }

    @GetMapping("/task")
    public TaskEntity getTask(@RequestParam Integer id){
        return taskService.getTaskById(id);
    }

    @PostMapping("/add-task")
    public ResponseEntity<Integer> addTask(@RequestBody Task task){
        HttpStatus status = HttpStatus.CONFLICT;
        Integer newId = null;
        Optional<TaskEntity> addedTask = taskService.addTask(task);

        if(addedTask.isPresent())
        {
            status = HttpStatus.OK;
            newId = addedTask.get().getId();
        }

        return new ResponseEntity<>(newId, status);
    }

    @PutMapping("/change-status")
    public ResponseEntity<Integer> changeStatus(@RequestParam Integer id)
    {
        HttpStatus status = HttpStatus.CONFLICT;
        Integer changedTaskId = null;
        Optional<TaskEntity> changedStatus = taskService.changeStatus(id);
        if(changedStatus.isPresent())
        {
            status = HttpStatus.OK;
            changedTaskId = changedStatus.get().getId();
        }

        return new ResponseEntity<>(changedTaskId, status);
    }

    @PutMapping("/update-task")
    public ResponseEntity<Integer> updateTask(@RequestParam Integer id, @RequestBody Task task){
        HttpStatus status = HttpStatus.CONFLICT;
        Integer updatedTaskId = null;
        Optional<TaskEntity> updatedStatus = taskService.updateTask(id, task);

        if(updatedStatus.isPresent()){
            status = HttpStatus.OK;
            updatedTaskId = updatedStatus.get().getId();
        }
        return new ResponseEntity<>(updatedTaskId, status);
    }

    @GetMapping("/for-project")
    public ResponseEntity<List<TaskEntity>> getTasksForProject(@RequestParam Integer id) {
        List<TaskEntity> tasks = null;
        if(id != 0)
        {
            Optional<ProjectEntity> project = Optional.ofNullable(projectService.getProjectById(id));

            if (project.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            tasks = taskService.getAllTasksForProject(project.get());
        }
        else {
            tasks = taskService.getTasksForProjectZero();
        }


        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/by-date")
    public List<TaskEntity> getTaskByDate(@RequestParam LocalDate date) {
        List<TaskEntity> tasks = taskService.getTasksByDueDate(date);

        return tasks;
    }

    @GetMapping("/task-num")
    public ResponseEntity<Integer> getNumOfTaskToDo(@RequestParam Integer id){
        Optional<ProjectEntity> project = Optional.ofNullable(projectService.getProjectById(id));

        if (project.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Integer tasks = taskService.getNumOfTasksToDo(project.get());

        return ResponseEntity.ok(tasks);
    }

    @DeleteMapping("delete-task")
    public ResponseEntity<Integer> deleteTask(@RequestParam Integer id){
        HttpStatus status = HttpStatus.CONFLICT;
        Integer deletedId = null;
        Optional<TaskEntity> deletedTask = taskService.deleteTask(id);

        if(deletedTask.isPresent())
        {
            deletedId = deletedTask.get().getId();
            status = HttpStatus.OK;
        }

        return new ResponseEntity<>(deletedId, status);
    }




}
