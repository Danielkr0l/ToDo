package com.api.todo.persistences;
import java.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Integer> {
    TaskEntity getTaskById(Integer id);
    List<TaskEntity> findByProject(ProjectEntity project);
    List<TaskEntity> findByDueDate(LocalDate dueDate);
    List<TaskEntity> findByProjectId(Integer id);
}
