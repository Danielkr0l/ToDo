package com.api.todo.controllers;

import com.api.todo.models.Project;
import com.api.todo.persistences.ProjectEntity;
import com.api.todo.services.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/projects")
    public List<ProjectEntity> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/project")
    public ProjectEntity getProject(@RequestParam Integer id) {
        return projectService.getProjectById(id);
    }

    @PostMapping("/add-project")
    public ResponseEntity<Integer> addProject(@RequestBody Project project){
        HttpStatus status = HttpStatus.CONFLICT;
        Optional<ProjectEntity> addedProject = projectService.addProject(project);
        Integer newId = null;
        if(addedProject.isPresent()){
            status = HttpStatus.OK;
            newId = addedProject.get().getId();
        }
        return new ResponseEntity<>(newId, status);
    }

    @PutMapping("/update-project")
    public ResponseEntity<Integer> updateProject(@RequestParam Integer id, @RequestBody Project request){
        Optional<ProjectEntity> updatedProject = projectService.updateProject(id, request);
        HttpStatus status = HttpStatus.CONFLICT;
        Integer projectId = null;

        if(updatedProject.isPresent())
        {
            status = HttpStatus.OK;
            projectId = updatedProject.get().getId();
        }
        return new ResponseEntity<>(projectId, status);
    }

    @DeleteMapping("/delete-project")
    public ResponseEntity<Integer> deleteProject(@RequestParam Integer id){
        HttpStatus status = HttpStatus.CONFLICT;
        Optional<ProjectEntity> deletedProject = projectService.deleteProject(id);
        Integer deletedId = null;
        if(deletedProject.isPresent())
        {
            status = HttpStatus.OK;
            deletedId = deletedProject.get().getId();
        }
        return new ResponseEntity<>(deletedId, status);
    }
}
