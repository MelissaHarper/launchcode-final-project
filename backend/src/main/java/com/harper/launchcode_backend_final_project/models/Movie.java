package com.harper.launchcode_backend_final_project.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import lombok.RequiredArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movie {

    @Id
    private int id;
    private String originalTitle;

    @ManyToMany(mappedBy = "movies")
    Set<ToWatch> toWatchLists = new HashSet<>();

}
