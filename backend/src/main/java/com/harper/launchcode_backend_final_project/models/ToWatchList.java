package com.harper.launchcode_backend_final_project.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ToWatchList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private int id;

    @OneToOne(mappedBy = "toWatchList")
    private User user;

    @OneToOne(mappedBy = "toWatchList")
    private String clerkId;

    private List<Integer> movies;
    private String thumbnailUrl;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

}
