package com.example.project.api.controller;

import com.example.project.api.service.UserService;
import com.example.project.dao.UserRepository;
import com.example.project.dao.WorkoutPlanRepository;
import com.example.project.entity.User;
import com.example.project.entity.WorkoutPlan;

import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    // private WorkoutPlanRepository workoutPlanRepository;

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        // Optional<User> user = ;
        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.ok(userRepository.findByEmail(email).get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // @GetMapping("/{userId}/plans")
    // public List<WorkoutPlan> getPlansByUserId(@PathVariable Integer userId) {
    // return workoutPlanRepository.findByUserUserId(userId);
    // }
}
