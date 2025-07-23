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
    private int userId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "to_watch_list_clerk_id", referencedColumnName = "clerkId")
    @NonNull
    private String clerkId;

    @NonNull
    private String email;

    private String username;

    @CreatedDate
    @NonNull
    @Setter(AccessLevel.NONE)
    private Instant createdAt;

    private String photoUrl;

    @OneToMany(mappedBy = "user")
    @JsonBackReference
    private List<ToWatch> toWatch = new ArrayList<>();

    private boolean isLoggedIn;

}
