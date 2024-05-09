package com.example.project.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "exercises_library")
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

    public Long getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(Long exerciseId) {
        this.exerciseId = exerciseId;
    }

    public String getExerciseName() {
        return exerciseName;
    }

    public void setExerciseName(String exerciseName) {
        this.exerciseName = exerciseName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBodyPart() {
        return bodyPart;
    }

    public void setBodyPart(String bodyPart) {
        this.bodyPart = bodyPart;
    }

    @Override
    public String toString() {
        return "Exercise{" +
                "exerciseId=" + exerciseId +
                ", exerciseName='" + exerciseName + '\'' +
                ", description='" + description + '\'' +
                ", bodyPart='" + bodyPart + '\'' +
                '}';
    }
}
