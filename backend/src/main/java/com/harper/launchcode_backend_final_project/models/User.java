package com.harper.launchcode_backend_final_project.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    private String username;
    private String password;
    private String email;
    private boolean isLoggedIn;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<ToWatchList> toWatchLists = new HashSet<>();


}
