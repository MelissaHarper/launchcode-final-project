package com.harper.launchcode_backend_final_project.models.dto;

import lombok.Data;
import java.time.Instant;

@Data
public class UserDTO {
    private String id;
    private String email;
    private String username;
    private String photoUrl;
    private Instant createdAt;
    private Instant updated;
}
