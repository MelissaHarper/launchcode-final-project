package com.harper.launchcode_backend_final_project.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ToWatch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private int id;

    private String userId;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "to_watch_movies",
            joinColumns = @JoinColumn(name = "to_watch_id"),
            inverseJoinColumns = @JoinColumn(name = "movie_id"))
    private Set<Movie> movies = new HashSet<>();

    @NonNull
    @CreationTimestamp
    @Column(updatable = false)
    private Instant createdAt;

    @NonNull
    @UpdateTimestamp
    private Instant updatedAt;
}
