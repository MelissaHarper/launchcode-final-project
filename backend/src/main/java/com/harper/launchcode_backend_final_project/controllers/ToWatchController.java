package com.harper.launchcode_backend_final_project.controllers;

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
    public ResponseEntity<?> getToWatchList(@PathVariable String userId) {
         return toWatchService.getToWatchList(userId);

    }

    @PutMapping("/{userId}/add")
    public ResponseEntity<?> addMovieToWatchList(@PathVariable String userId, @RequestBody MovieDTO movie) {
        return toWatchService.addMovieToWatchList(userId, movie);
    }

    @DeleteMapping("/{userId}/remove/{movieId}")
    public ResponseEntity<?> removeMovieFromWatchList(@PathVariable String userId, @PathVariable int movieId) {
        return toWatchService.removeMovieFromWatchList(userId, movieId);
    }

}
