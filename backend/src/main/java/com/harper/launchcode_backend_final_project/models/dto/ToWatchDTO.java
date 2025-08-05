package com.harper.launchcode_backend_final_project.models.dto;

import lombok.Data;

import java.time.Instant;

@Data
public class ToWatchDTO {
    private int id;
    private String userId;
    private Instant createdAt;
    private Instant updatedAt;
}
