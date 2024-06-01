package com.example.project.dao;

import com.example.project.entity.WorkoutPlan;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutPlanRepository extends JpaRepository<WorkoutPlan, Integer> {
    List<WorkoutPlan> findByUserUserId(Integer userId);
}
