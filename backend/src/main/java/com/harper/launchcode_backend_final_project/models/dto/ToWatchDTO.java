package com.harper.launchcode_backend_final_project.models.dto;

import lombok.Data;
import org.w3c.dom.stylesheets.LinkStyle;

import java.time.Instant;
import java.util.List;

@Data
public class ToWatchDTO {
    private int id;
    private String userId;
    private List<MovieDTO> movies;
    private Instant createdAt;
    private Instant updatedAt;
}
