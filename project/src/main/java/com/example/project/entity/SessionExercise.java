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

    public SessionExercise(){

    }

    public SessionExercise(Long sessionExerciseId, Session session, PlanDetail planDetail, int series, double weight, int repetitionsCompleted, String tempoUsed, String restTimeUsed, String exerciseNotes) {
        this.sessionExerciseId = sessionExerciseId;
        this.session = session;
        this.planDetail = planDetail;
        this.series = series;
        this.weight = weight;
        this.repetitionsCompleted = repetitionsCompleted;
        this.tempoUsed = tempoUsed;
        this.restTimeUsed = restTimeUsed;
        this.exerciseNotes = exerciseNotes;
    }

    public Long getSessionExerciseId() {
        return sessionExerciseId;
    }

    public void setSessionExerciseId(Long sessionExerciseId) {
        this.sessionExerciseId = sessionExerciseId;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public PlanDetail getPlanDetail() {
        return planDetail;
    }

    public void setPlanDetail(PlanDetail planDetail) {
        this.planDetail = planDetail;
    }

    public int getSeries() {
        return series;
    }

    public void setSeries(int series) {
        this.series = series;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public int getRepetitionsCompleted() {
        return repetitionsCompleted;
    }

    public void setRepetitionsCompleted(int repetitionsCompleted) {
        this.repetitionsCompleted = repetitionsCompleted;
    }

    public String getTempoUsed() {
        return tempoUsed;
    }

    public void setTempoUsed(String tempoUsed) {
        this.tempoUsed = tempoUsed;
    }

    public String getRestTimeUsed() {
        return restTimeUsed;
    }

    public void setRestTimeUsed(String restTimeUsed) {
        this.restTimeUsed = restTimeUsed;
    }

    public String getExerciseNotes() {
        return exerciseNotes;
    }

    public void setExerciseNotes(String exerciseNotes) {
        this.exerciseNotes = exerciseNotes;
    }

    @Override
    public String toString() {
        return "SessionExercise{" +
                "sessionExerciseId=" + sessionExerciseId +
                ", session=" + session +
                ", planDetail=" + planDetail +
                ", series=" + series +
                ", weight=" + weight +
                ", repetitionsCompleted=" + repetitionsCompleted +
                ", tempoUsed='" + tempoUsed + '\'' +
                ", restTimeUsed='" + restTimeUsed + '\'' +
                ", exerciseNotes='" + exerciseNotes + '\'' +
                '}';
    }
}
