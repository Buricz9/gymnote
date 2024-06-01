package com.example.project.dao;

import com.example.project.entity.PlanDetail;
import com.example.project.entity.WorkoutPlan;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanDetailRepository extends JpaRepository<PlanDetail, Integer> {
    List<PlanDetail> findByWorkoutPlan(WorkoutPlan workoutPlan);
}
