package com.harper.launchcode_backend_final_project.models.dto;

import lombok.Data;
import org.w3c.dom.stylesheets.LinkStyle;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@Data
public class ToWatchDTO {
    private int id;
    private String userId;
    private Set<MovieDTO> movies;
    private Instant createdAt;
    private Instant updatedAt;
}
