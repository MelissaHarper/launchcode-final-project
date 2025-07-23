package com.harper.launchcode_backend_final_project.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private int userId;

    private String clerkId;
    private String username;
    private String email;
    private String photoUrl;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "to_watch_list_id", referencedColumnName = "id")
    private ToWatchList toWatchList;

    private boolean isLoggedIn;

    @CreatedDate
    private Instant createdAt;



}
