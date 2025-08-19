package com.harper.launchcode_backend_final_project.models.dto;

import com.harper.launchcode_backend_final_project.models.User;
import lombok.Data;
import lombok.NonNull;

@Data
public class FeedbackDTO {
    private String userId;
    @NonNull
    private String name;
    @NonNull
    private String email;
    @NonNull
    private String message;

}
