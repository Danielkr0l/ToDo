package com.api.todo.services;

import com.api.todo.models.Project;
import com.api.todo.persistences.ProjectEntity;
import com.api.todo.persistences.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }


    public List<ProjectEntity> getAllProjects() {return projectRepository.findAll();}
    public ProjectEntity getProjectById(Integer id) {return projectRepository.getProjectEntityById(id);}

    public Optional<ProjectEntity> addProject(Project project)
    {
        Optional<ProjectEntity> returnProject = Optional.empty();
        if(!project.name().isEmpty() && project.name().length() <= 255) {
            ProjectEntity newProject = new ProjectEntity(project.name());
            returnProject = Optional.of(newProject);
            projectRepository.save(newProject);
        }

        return returnProject;
    }

    public Optional<ProjectEntity> updateProject(Integer id, Project request){
        Optional<ProjectEntity> updatedProject = Optional.empty();
        Optional<ProjectEntity> oldProject = Optional.empty();
        oldProject = projectRepository.findById(id);
        if(oldProject.isEmpty()){
            return updatedProject;
        }

        Optional<Project> toUpdate = Optional.ofNullable(request);
        if(toUpdate.isEmpty())
        {
            return updatedProject;
        }

        Project updates = toUpdate.get();
        ProjectEntity projectToUpdate = oldProject.get();
        if(!updates.name().isEmpty() && updates.name().length() <= 255){
            projectToUpdate.setName(updates.name());
            projectRepository.save(projectToUpdate);
            updatedProject =Optional.of(projectToUpdate);
        }

        return updatedProject;
    }

    public Optional<ProjectEntity> deleteProject(Integer id){
        Optional<ProjectEntity> deleteProject = projectRepository.findById(id);

        if(deleteProject.isPresent()){
            projectRepository.deleteById(id);
        }
        return deleteProject;
    }
}
