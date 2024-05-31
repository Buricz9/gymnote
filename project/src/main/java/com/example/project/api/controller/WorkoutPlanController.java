package com.example.project.api.controller;

import com.example.project.api.service.WorkoutPlanService;
import com.example.project.entity.PlanDetail;
import com.example.project.entity.WorkoutPlan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workout-plans")
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanService workoutPlanService;

    @PostMapping
    public WorkoutPlan createWorkoutPlan(@RequestBody WorkoutPlan workoutPlan) {
        return workoutPlanService.createWorkoutPlan(workoutPlan);
    }

    @GetMapping("/details")
    public List<PlanDetail> getAllPlanDetails() {
        return workoutPlanService.getAllPlanDetails();
    }
}
