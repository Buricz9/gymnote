package com.example.project.api.controller;

import com.example.project.entity.User;
import com.example.project.entity.WorkoutPlan;
import com.example.project.entity.PlanDetail;
import com.example.project.dao.UserRepository;
import com.example.project.dao.WorkoutPlanRepository;
import com.example.project.dao.PlanDetailRepository;
import com.example.project.api.request.WorkoutPlanRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workout-plans")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlanDetailRepository planDetailRepository;

    @PostMapping
    public WorkoutPlan createWorkoutPlan(@RequestBody WorkoutPlanRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        WorkoutPlan workoutPlan = new WorkoutPlan();
        workoutPlan.setUser(user);
        workoutPlan.setPlanName(request.getPlanName());

        return workoutPlanRepository.save(workoutPlan);
    }

    @PostMapping("/{planId}/details")
    public PlanDetail addPlanDetail(@PathVariable Integer planId, @RequestBody PlanDetail planDetail) {
        WorkoutPlan workoutPlan = workoutPlanRepository.findById(planId)
                .orElseThrow(() -> new IllegalArgumentException("Workout Plan not found"));

        planDetail.setWorkoutPlan(workoutPlan);

        return planDetailRepository.save(planDetail);
    }
}
