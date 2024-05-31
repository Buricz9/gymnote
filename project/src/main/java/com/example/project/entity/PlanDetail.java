package com.example.project.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "plan_details")
public class PlanDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "detail_id")
    private Integer detailId;

    @ManyToOne
    @JoinColumn(name = "plan_id", referencedColumnName = "plan_id", nullable = false)
    private WorkoutPlan workoutPlan;

    // @ManyToOne
    @Column(name = "exercise_name", nullable = false)
    private String exerciseName;

    @Column(name = "sets", nullable = false)
    private int sets;

    @Column(name = "repetitions", nullable = false)
    private int repetitions;

    @Column(name = "tempo")
    private String tempo;

    @Column(name = "rest_time")
    private String restTime;

    public PlanDetail() {

    }

    public PlanDetail(Integer detailId, WorkoutPlan workoutPlan, String exerciseName, int sets, int repetitions,
            String tempo, String restTime) {
        this.detailId = detailId;
        this.workoutPlan = workoutPlan;
        this.exerciseName = exerciseName;
        this.sets = sets;
        this.repetitions = repetitions;
        this.tempo = tempo;
        this.restTime = restTime;
    }

    public Integer getDetailId() {
        return detailId;
    }

    public void setDetailId(Integer detailId) {
        this.detailId = detailId;
    }

    public WorkoutPlan getWorkoutPlan() {
        return workoutPlan;
    }

    public void setWorkoutPlan(WorkoutPlan workoutPlan) {
        this.workoutPlan = workoutPlan;
    }

    public String getExerciseName() {
        return exerciseName;
    }

    public void setExerciseName(String exercise) {
        this.exerciseName = exercise;
    }

    public int getSets() {
        return sets;
    }

    public void setSets(int sets) {
        this.sets = sets;
    }

    public int getRepetitions() {
        return repetitions;
    }

    public void setRepetitions(int repetitions) {
        this.repetitions = repetitions;
    }

    public String getTempo() {
        return tempo;
    }

    public void setTempo(String tempo) {
        this.tempo = tempo;
    }

    public String getRestTime() {
        return restTime;
    }

    public void setRestTime(String restTime) {
        this.restTime = restTime;
    }

    @Override
    public String toString() {
        return "PlanDetail{" +
                "detailId=" + detailId +
                ", workoutPlan=" + workoutPlan +
                ", exercise=" + exerciseName +
                ", sets=" + sets +
                ", repetitions=" + repetitions +
                ", tempo='" + tempo + '\'' +
                ", restTime='" + restTime + '\'' +
                '}';
    }
}
