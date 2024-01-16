package com.api.todo.services;

import com.api.todo.persistences.TaskEntity;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;


public class PointsService {
    @Getter
    private static int points = 0;
    @Getter
    private static List<Integer> afterDate = new ArrayList<>();

    public static void addPoints(int addedPoints){
        points += addedPoints;
    }

    public static void substractPoits(int substractedPoints){
        points -= substractedPoints;
    }

    public static void addAfterDateTask(Integer task) {
        afterDate.add(task);
    }

}
