package com.harper.launchcode_backend_final_project.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @Column(name= "id")
    private String id;

    private String email;
    private String username;
    private String photoUrl;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "to_watch_id")
    @JsonManagedReference("user-towatch")
    private ToWatch toWatch;

    @NonNull
    @CreationTimestamp
    @Column(updatable = false)
    private Instant createdAt;

    @NonNull
    @UpdateTimestamp
    private Instant updated;

}

