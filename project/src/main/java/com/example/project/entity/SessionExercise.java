package com.example.project.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "session_exercises")
public class SessionExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "session_exercise_id")
    private Long sessionExerciseId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "session_id", referencedColumnName = "session_id", nullable = false)
    private Session session;

    @ManyToOne
    @JoinColumn(name = "detail_id", referencedColumnName = "detail_id", nullable = false)
    private PlanDetail planDetail;

    @Column(name = "series", nullable = false)
    private int series;

    @Column(name = "weight", nullable = false)
    private double weight;

    @Column(name = "repetitions_completed", nullable = false)
    private int repetitionsCompleted;

    @Column(name = "tempo_used")
    private String tempoUsed;

    @Column(name = "rest_time_used")
    private String restTimeUsed;

    @Column(name = "exercise_notes")
    private String exerciseNotes;

    // Getters and setters
}
