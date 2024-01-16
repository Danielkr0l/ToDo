package com.api.todo.persistences;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, Integer> {
    ProjectEntity getProjectEntityById(Integer id);
}
