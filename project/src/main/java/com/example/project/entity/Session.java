package com.example.project.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "training_sessions")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "session_id")
    private Integer sessionId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User users;

    @ManyToOne
    @JoinColumn(name = "plan_id", referencedColumnName = "plan_id", nullable = false)
    private WorkoutPlan workoutPlan;

    @Column(name = "session_date", nullable = false)
    private LocalDate sessionDate;

    public Session() {

    }

    public Session(Integer sessionId, User users, WorkoutPlan workoutPlan, LocalDate sessionDate) {
        this.sessionId = sessionId;
        this.users = users;
        this.workoutPlan = workoutPlan;
        this.sessionDate = sessionDate;
    }

    public Integer getSessionId() {
        return sessionId;
    }

    public void setSessionId(Integer sessionId) {
        this.sessionId = sessionId;
    }

    public User getUsers() {
        return users;
    }

    public void setUsers(User users) {
        this.users = users;
    }

    public WorkoutPlan getWorkoutPlan() {
        return workoutPlan;
    }

    public void setWorkoutPlan(WorkoutPlan workoutPlan) {
        this.workoutPlan = workoutPlan;
    }

    public LocalDate getSessionDate() {
        return sessionDate;
    }

    public void setSessionDate(LocalDate sessionDate) {
        this.sessionDate = sessionDate;
    }

    @Override
    public String toString() {
        return "Session{" +
                "sessionId=" + sessionId +
                ", users=" + users +
                ", workoutPlan=" + workoutPlan +
                ", sessionDate=" + sessionDate +
                '}';
    }
}
