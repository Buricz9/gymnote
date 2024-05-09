package com.example.project.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "training_plans")

public class WorkoutPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plan_id")
    private Long planId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User user;

    @Column(name = "plan_name", nullable = false)
    private String planName;

    public WorkoutPlan(){

    }
    public WorkoutPlan(Long planId, User user, String planName) {
        this.planId = planId;
        this.user = user;
        this.planName = planName;
    }

    public Long getPlanId() {
        return planId;
    }

    public void setPlanId(Long planId) {
        this.planId = planId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    @Override
    public String toString() {
        return "WorkoutPlan{" +
                "planId=" + planId +
                ", user=" + user +
                ", planName='" + planName + '\'' +
                '}';
    }
}
