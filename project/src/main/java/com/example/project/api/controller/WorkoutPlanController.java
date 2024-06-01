package com.example.project.api.controller;

import com.example.project.entity.User;
import com.example.project.entity.WorkoutPlan;
import com.example.project.entity.PlanDetail;
import com.example.project.entity.Session;
import com.example.project.entity.SessionExercise;
import com.example.project.dao.UserRepository;
import com.example.project.dao.WorkoutPlanRepository;
import com.example.project.dao.PlanDetailRepository;
import com.example.project.dao.SessionExerciseRepositiory;
import com.example.project.dao.SessionRepository;
import com.example.project.api.request.SessionExerciseRequest;
import com.example.project.api.request.SessionRequest;
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

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private SessionExerciseRepositiory sessionExerciseRepository;

    @GetMapping("/user/{userId}")
    public List<WorkoutPlan> getPlansByUserId(@PathVariable Integer userId) {
        return workoutPlanRepository.findByUserUserId(userId);
    }

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

    @GetMapping("/{planId}/exercises")
    public List<PlanDetail> getExercisesForPlan(@PathVariable Integer planId) {
        WorkoutPlan workoutPlan = workoutPlanRepository.findById(planId)
                .orElseThrow(() -> new IllegalArgumentException("Workout Plan not found"));

        return planDetailRepository.findByWorkoutPlan(workoutPlan);
    }

    @PostMapping("/sessions")
    public Session createTrainingSession(@RequestBody SessionRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        WorkoutPlan workoutPlan = workoutPlanRepository.findById(request.getPlanId())
                .orElseThrow(() -> new IllegalArgumentException("Workout Plan not found"));

        Session session = new Session();
        session.setUsers(user);
        session.setWorkoutPlan(workoutPlan);
        session.setSessionDate(request.getSessionDate());

        return sessionRepository.save(session);
    }

    @PostMapping("/session-exercises")
    public SessionExercise createSessionExercise(@RequestBody SessionExerciseRequest request) {
        Session session = sessionRepository.findById(request.getSessionId())
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));
        PlanDetail planDetail = planDetailRepository.findById(request.getDetailId())
                .orElseThrow(() -> new IllegalArgumentException("Plan Detail not found"));

        SessionExercise sessionExercise = new SessionExercise();
        sessionExercise.setSession(session);
        sessionExercise.setPlanDetail(planDetail);
        sessionExercise.setSeries(request.getSeries());
        sessionExercise.setWeight(request.getWeight());
        sessionExercise.setRepetitionsCompleted(request.getRepetitionsCompleted());
        sessionExercise.setTempoUsed(request.getTempoUsed());
        sessionExercise.setRestTimeUsed(request.getRestTimeUsed());
        sessionExercise.setExerciseNotes(request.getExerciseNotes());

        return sessionExerciseRepository.save(sessionExercise);
    }

}
