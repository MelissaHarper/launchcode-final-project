package com.harper.launchcode_backend_final_project.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.harper.launchcode_backend_final_project.models.Genre;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movie {
    private Boolean adult;
    private String backdrop_path;
    @ManyToMany
    @JsonManagedReference
    private List<Genre> genres;
    @Id
    private int id;
    private String original_language;
    private String original_title;
    private String overview;
    private String popularity;
    private String poster_path;
    private String release_date;
    private String title;
    private String video;
    private String vote_average;
    private String vote_count;




}
