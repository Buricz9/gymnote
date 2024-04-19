package com.example.project.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "exercises_list")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exercise_id")
    private Long exerciseId;

    @Column(name = "exercise_name", nullable = false)
    private String exerciseName;

    @Column(name = "description")
    private String description;

    @Column(name = "body_part", nullable = false)
    private String bodyPart;

    public Exercise(){

    }

    public Exercise(Long exerciseId, String exerciseName, String description, String bodyPart) {
        this.exerciseId = exerciseId;
        this.exerciseName = exerciseName;
        this.description = description;
        this.bodyPart = bodyPart;
    }
}
