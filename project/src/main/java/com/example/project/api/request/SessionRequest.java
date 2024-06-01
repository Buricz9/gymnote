package com.example.project.api.request;

import java.time.LocalDate;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SessionRequest {
    private Integer userId;
    private Integer planId;
    private LocalDate sessionDate;
    private LocalTime sessionTime;
}
