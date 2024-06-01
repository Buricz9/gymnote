// package com.example.project.api.controller;

// import com.example.project.entity.PlanDetail;
// import com.example.project.dao.PlanDetailRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/plan-details")
// @CrossOrigin(origins = "http://localhost:3000")
// public class PlanDetailController {

// @Autowired
// private PlanDetailRepository planDetailRepository;

// @GetMapping("/plan/{planId}")
// public List<PlanDetail> getPlanDetailsByPlanId(@PathVariable Integer planId)
// {
// return planDetailRepository.findByWorkoutPlanPlanId(planId);
// }
// }
