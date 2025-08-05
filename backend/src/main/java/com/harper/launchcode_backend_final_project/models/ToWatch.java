package com.harper.launchcode_backend_final_project.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class ToWatch {
    @Id
    @Column(name = "user_id")
    private String id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    @JsonBackReference("user-towatch")
    private User user;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JsonManagedReference("towatch-movies")
    private List<Movie> movies;

    @NonNull
    @CreationTimestamp
    @Column(updatable = false)
    private Instant createdAt;

    @NonNull
    @UpdateTimestamp
    private Instant updatedAt;

}
