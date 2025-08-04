package com.harper.launchcode_backend_final_project.controllers;

import com.harper.launchcode_backend_final_project.repositories.MovieRepository;
import com.harper.launchcode_backend_final_project.models.Movie;
import com.harper.launchcode_backend_final_project.repositories.ToWatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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



    @GetMapping
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable int id) {
        return movieRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
