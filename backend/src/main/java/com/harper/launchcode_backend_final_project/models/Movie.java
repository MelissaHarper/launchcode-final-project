package com.harper.launchcode_backend_final_project.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class Movie {

    @Id
    @NonNull
    private int id;
    private String originalTitle;
    private String posterPath;
    private String title;
    private String originalName;

    @ManyToMany(mappedBy = "movies")
    Set<ToWatch> toWatchLists = new HashSet<>();

}
