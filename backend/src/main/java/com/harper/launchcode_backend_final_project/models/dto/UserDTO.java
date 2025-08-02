package com.harper.launchcode_backend_final_project.models.dto;

import com.harper.launchcode_backend_final_project.models.ToWatch;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.Instant;

@Data
public class UserDTO {
    private String id;
    private String email;
    private String username;
    private String photoUrl;
    private ToWatch toWatch;
    private Instant createdAt;
    private Instant updated;
}
