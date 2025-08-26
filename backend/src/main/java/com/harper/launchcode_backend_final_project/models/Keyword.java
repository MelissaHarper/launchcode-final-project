package com.harper.launchcode_backend_final_project.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Keyword {
    @Id
    private int id;
    private String name;
}