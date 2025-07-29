package com.harper.launchcode_backend_final_project.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@RequiredArgsConstructor(staticName = "of")
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private int Id;

    @NonNull
    private String clerkId;

    @NonNull
    private String email;

    @NonNull
    private String username;

    @NonNull
    private String photoUrl;

    @OneToMany(mappedBy = "user")
    @JsonBackReference
    private List<ToWatch> movies = new ArrayList<>();

    @CreatedDate
    @NonNull
    @Setter(AccessLevel.NONE)
    private Instant createdAt;

}
