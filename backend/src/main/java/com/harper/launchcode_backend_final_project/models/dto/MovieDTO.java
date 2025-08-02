package com.harper.launchcode_backend_final_project.models.dto;

import lombok.Data;

import java.util.List;

@Data
public class MovieDTO {
    private int id;
    private String originalTitle;
    private List<ToWatchDTO> toWatchLists;
}
