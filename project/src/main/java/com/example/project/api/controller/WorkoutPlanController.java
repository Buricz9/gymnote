package com.example.project.api.controller;

import com.example.project.entity.User;
import com.example.project.entity.WorkoutPlan;
import com.example.project.dao.UserRepository;
import com.example.project.dao.WorkoutPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.project.api.request.WorkoutPlanRequest;

@RestController
@RequestMapping("/api/workout-plans")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public WorkoutPlan createWorkoutPlan(@RequestBody WorkoutPlanRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        WorkoutPlan workoutPlan = new WorkoutPlan();
        workoutPlan.setUser(user);
        workoutPlan.setPlanName(request.getPlanName());

        return workoutPlanRepository.save(workoutPlan);
    }
}
