package com.harper.launchcode_backend_final_project.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ToWatchList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String listName;
    
    @ManyToOne
    @JoinColumn(name = "userId")
    private User userID;

    @ManyToMany
    @JoinTable(
            name = "to_watch_list_movies",
            joinColumns = @JoinColumn(name = "to_watch_list_id"),
            inverseJoinColumns = @JoinColumn(name = "movie_id")
    )
    private Set<Movie> movies = new HashSet<>();
}
