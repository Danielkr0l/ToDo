package com.api.todo.services;

import com.api.todo.models.Task;
import com.api.todo.persistences.ProjectEntity;
import com.api.todo.persistences.ProjectRepository;
import com.api.todo.persistences.TaskEntity;
import com.api.todo.persistences.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;


    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    public List<TaskEntity> getAllTasks(){
        return taskRepository.findAll();
    }

    public TaskEntity getTaskById(Integer id){
        return taskRepository.getTaskById(id);
    }

    public Optional<TaskEntity> addTask(Task task){
        Optional<TaskEntity> returnTask = Optional.empty();
        LocalDate today = LocalDate.now();
        Optional<ProjectEntity> project = projectRepository.findById(task.project());
        ProjectEntity projectToSave = null;
        if(!task.name().isEmpty() && !task.description().isEmpty())
        {

            if(task.name().length() <= 255 && task.description().length() <= 255 ){

                if(task.points() > 0 && task.points()<=10)
                {
                    if(task.dueDate().isAfter(today))
                    {
                        if(project.isPresent())
                        {
                            projectToSave = project.get();
                        }
                        TaskEntity addedTask = new TaskEntity(task.name(), task.description(), (int)task.points(),
                                task.dueDate(), projectToSave);
                        taskRepository.save(addedTask);
                        returnTask = Optional.of(addedTask);
                    }
                }
            }
        }
        return returnTask;
    }

    public Optional<TaskEntity> changeStatus(Integer id){
        Optional<TaskEntity> result = Optional.empty();
        Optional<TaskEntity> exist = taskRepository.findById(id);
        if(exist.isPresent()){
            TaskEntity toChangeStatus = exist.get();
            if(toChangeStatus.getDone() == 0){
                toChangeStatus.setDone(1);
                PointsService.addPoints(toChangeStatus.getPoints());
            }
            else{
                toChangeStatus.setDone(0);
                PointsService.substractPoits(toChangeStatus.getPoints());
            }
            taskRepository.save(toChangeStatus);
            result = Optional.of(toChangeStatus);
        }

        return result;
    }

    public List<TaskEntity> getAllTasksForProject(ProjectEntity project) {
        checkDates();
        return taskRepository.findByProject(project);
    }

    public List<TaskEntity> getTasksForProjectZero() {
        return taskRepository.findByProjectId(null);
    }

    public List<TaskEntity> getTasksByDueDate(LocalDate date){
        checkDates();
        return taskRepository.findByDueDate(date);
    }

    public Optional<TaskEntity> updateTask(Integer id, Task task){
        Optional<TaskEntity> request = Optional.empty();
        LocalDate today = LocalDate.now();
        Optional<TaskEntity> oldTask = taskRepository.findById(id);
        Optional<Task> toUpdate = Optional.ofNullable(task);

        if(toUpdate.isEmpty() || oldTask.isEmpty()) {
            return request;
        }


        TaskEntity oldTaskEntity = oldTask.get();

        if(PointsService.getAfterDate().contains(oldTaskEntity.getId()))
        {
            return request;
        }

        if(task.name() != null){
            if(task.name().length() <= 255){
                oldTaskEntity.setName(task.name());
            }
        }
        if(task.description() != null){
            if(task.description().length() <= 255){
                oldTaskEntity.setDescription(task.description());
            }
        }
        if(task.points() != null){
            if(task.points() > 0 && task.points()<=10)
            {
                oldTaskEntity.setPoints((int)task.points());
            }

        }
        if(task.dueDate() != null){
            if(task.dueDate().isAfter(today)){
                oldTaskEntity.setDueDate(task.dueDate());
            }
        }
        if(task.project() != null){
            if(task.project()==0)
            {
                oldTaskEntity.setProject(null);
            }else{
                Optional<ProjectEntity> project = Optional.ofNullable(projectRepository.getProjectEntityById(task.project()));

                if(project.isPresent()){
                    oldTaskEntity.setProject(project.get());
                }
            }

        }

        taskRepository.save(oldTaskEntity);
        request = Optional.of(oldTaskEntity);
        return request;

    }

    public Optional<TaskEntity> deleteTask(Integer id){
        Optional<TaskEntity> taskToDel = taskRepository.findById(id);

        if(taskToDel.isPresent()){
            taskRepository.deleteById(id);
        }

        return taskToDel;
    }

    public void checkDates(){
        LocalDate now = LocalDate.now();
        List<TaskEntity> allTasks = this.getAllTasks();

        for (TaskEntity task : allTasks) {
            if(now.isAfter(task.getDueDate()) && task.getDone() == 0){
                if(!PointsService.getAfterDate().contains(task.getId())){
                    PointsService.addAfterDateTask(task.getId());
                    PointsService.substractPoits((task.getPoints()/2));
                }
            }
        }
    }

    public Integer getNumOfTasksToDo(ProjectEntity project) {
        List<TaskEntity> tasks = getAllTasksForProject(project);
        Integer num = 0;
        for (TaskEntity task: tasks) {
            if(task.getDone() == 0){
                num++;
            }
        }
        return num;
    }

}
