package com.api.todo.controllers;

import com.api.todo.services.PointsService;
import com.api.todo.services.TaskService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
public class PointsController {
    private final TaskService taskService;
    LocalDate lastStatus;
    public PointsController(TaskService taskService) {
        this.taskService = taskService;
        lastStatus = LocalDate.of(2020,1,1);
    }

    @GetMapping("/points")
    public int getPoints(){

        LocalDate now = LocalDate.now();
        if(!now.isEqual(lastStatus))
        {
            lastStatus = now;
            taskService.checkDates();
        }
        return PointsService.getPoints();
    }

}
