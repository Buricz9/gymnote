package com.example.project.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SessionExerciseRequest {
    private Integer sessionId;
    private Integer detailId;
    private Integer series;
    private double weight;
    private int repetitionsCompleted;
    private String tempoUsed;
    private String restTimeUsed;
    private String exerciseNotes;

}