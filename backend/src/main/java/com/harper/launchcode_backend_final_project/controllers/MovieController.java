package com.harper.launchcode_backend_final_project.controllers;

import com.harper.launchcode_backend_final_project.repositories.MovieRepository;
import com.harper.launchcode_backend_final_project.models.Movie;
import com.harper.launchcode_backend_final_project.repositories.ToWatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/movies") // Matches your frontend's baseURL
@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    ToWatchRepository toWatchRepository;


    @GetMapping("/ids")
    public List<Integer> getMovieIds() {
        return movieRepository.findAll().stream()
                .map(Movie::getId)
                .collect(Collectors.toList());
    }
}
