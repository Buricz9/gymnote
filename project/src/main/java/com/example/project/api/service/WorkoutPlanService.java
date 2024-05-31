package com.example.project.api.service;

import com.example.project.dao.PlanDetailRepository;
import com.example.project.dao.WorkoutPlanRepository;
import com.example.project.entity.PlanDetail;
import com.example.project.entity.WorkoutPlan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutPlanService {

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    @Autowired
    private PlanDetailRepository planDetailRepository;

    public WorkoutPlan createWorkoutPlan(WorkoutPlan workoutPlan) {
        return workoutPlanRepository.save(workoutPlan);
    }

    public List<PlanDetail> getAllPlanDetails() {
        return planDetailRepository.findAll();
    }
}
