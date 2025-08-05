package com.harper.launchcode_backend_final_project.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movie {

    @Id
    private int id;
    private String originalTitle;
    private String posterPath;
    private String title;
    private String originalName;

    @ManyToMany(mappedBy = "movies")
    @JsonBackReference("towatch-movies")
    private final List<ToWatch> toWatchLists = new ArrayList<>();

}
