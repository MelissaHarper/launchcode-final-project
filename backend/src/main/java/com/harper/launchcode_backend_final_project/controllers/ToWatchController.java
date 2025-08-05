package com.harper.launchcode_backend_final_project.controllers;

import com.harper.launchcode_backend_final_project.models.ToWatch;
import com.harper.launchcode_backend_final_project.models.dto.MovieDTO;
import com.harper.launchcode_backend_final_project.services.ToWatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/towatch")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ToWatchController {

    @Autowired
    ToWatchService toWatchService;

    @GetMapping("/{userId}")
    public ToWatch getOrCreateToWatchList(@PathVariable String userId) {
        return toWatchService.getOrCreateToWatchList(userId);
    }

    @PutMapping("/{userId}/add")
    public ToWatch addMovieToWatchList(@PathVariable String userId, @RequestBody MovieDTO movie) {
        System.out.println("Adding movie to watch list: " + movie.getTitle());
        return toWatchService.addMovieToWatchList(userId, movie);
    }

    @DeleteMapping("/{userId}/remove/{movieId}")
    public ResponseEntity<Void> removeMovieFromWatchList(@PathVariable String userId, @PathVariable int movieId) {
        toWatchService.removeMovieFromWatchList(userId, movieId);
        return ResponseEntity.noContent().build();
    }

}
