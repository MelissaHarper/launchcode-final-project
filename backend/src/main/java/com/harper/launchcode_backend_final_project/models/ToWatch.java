package com.harper.launchcode_backend_final_project.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class ToWatch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private int id;

    @ManyToOne
    @JsonManagedReference
    private User user;

    @NonNull
    private String clerkId;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "to_watch_movies",
            joinColumns = @JoinColumn(name = "to_watch_id"),
            inverseJoinColumns = @JoinColumn(name = "movie_id"))
    private Set<Movie> movies = new HashSet<>();
}
