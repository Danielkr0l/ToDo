package com.api.todo.models;

import java.time.LocalDate;

public record Task(String name, String description, Integer points, LocalDate dueDate, Integer project) {
}
