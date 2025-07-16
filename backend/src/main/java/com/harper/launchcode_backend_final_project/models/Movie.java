package com.harper.launchcode_backend_final_project.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private String backdropPath;
    @ManyToMany
    @JsonManagedReference
    private List<Genre> genres;
    @Id
    private int id;
    private String originalLanguage;
    private String originalTitle;
    private String overview;
    private String popularity;
    private String posterPath;
    private String releaseDate;
    private String title;
    private String video;
    private String voteAverage;
    private String voteCount;




}
