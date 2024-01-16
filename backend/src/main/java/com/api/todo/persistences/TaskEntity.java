package com.api.todo.persistences;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter
@NoArgsConstructor
@Entity
@Table(name = "tasks", schema = "todo")
public class TaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    private int points;
    @Column(columnDefinition = "DATE")
    private LocalDate dueDate;
    private int done;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private ProjectEntity project;

    public TaskEntity(String name, String description, int points, LocalDate dueDate) {
        this.name = name;
        this.description = description;
        this.points = points;
        this.dueDate = dueDate;
        project = null;
        done = 0;
    }

    public TaskEntity(String name, String description, int points, LocalDate dueDate, ProjectEntity project) {
        this.name = name;
        this.description = description;
        this.points = points;
        this.dueDate = dueDate;
        this.project = project;
        done =0;
    }
}
