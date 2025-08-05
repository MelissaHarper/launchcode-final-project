package com.harper.launchcode_backend_final_project.models.dto;

import lombok.Data;

@Data
public class MovieDTO {
    private int id;
    private String originalTitle;
    private String posterPath;
    private String title;
    private String originalName;
}
