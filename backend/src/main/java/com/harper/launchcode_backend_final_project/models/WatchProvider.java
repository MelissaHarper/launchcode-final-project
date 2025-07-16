package com.harper.launchcode_backend_final_project.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WatchProvider {
    @Id
    private int providerId;
    private String providerName;
    private String logoPath;

    }
