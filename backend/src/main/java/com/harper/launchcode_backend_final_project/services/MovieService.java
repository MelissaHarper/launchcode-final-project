package com.harper.launchcode_backend_final_project.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.harper.launchcode_backend_final_project.models.Movie;
import com.harper.launchcode_backend_final_project.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }
}
