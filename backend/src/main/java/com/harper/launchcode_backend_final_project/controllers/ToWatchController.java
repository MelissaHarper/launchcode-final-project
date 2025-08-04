package com.harper.launchcode_backend_final_project.controllers;

import com.harper.launchcode_backend_final_project.models.Movie;
import com.harper.launchcode_backend_final_project.models.ToWatch;
import com.harper.launchcode_backend_final_project.models.dto.MovieDTO;
import com.harper.launchcode_backend_final_project.services.ToWatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/towatch")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ToWatchController {

    @Autowired
    private ToWatchService toWatchService;

    @GetMapping("/{userId}")
//    @PreAuthorize("isAuthenticated()")
    public ToWatch getWatchList(@PathVariable String userId) {
        return toWatchService.getOrCreateToWatch(userId);
    }

    @PostMapping("/{userId}/add")
//    @PreAuthorize("isAuthenticated()")
    public ToWatch addMovieToWatchList(@PathVariable String userId, @RequestBody MovieDTO movie) {
        System.out.println("Adding movie to watch list: " + movie.getPosterPath());
        return toWatchService.addMovieToWatchList(userId, movie);
    }

    @DeleteMapping("/{userId}/remove/{movieId}")
//    @PreAuthorize("isAuthenticated()")
    public ToWatch removeMovieFromWatchList(@PathVariable String userId, @PathVariable int movieId) {
        return toWatchService.removeMovieFromWatchList(userId, movieId);
    }

}
