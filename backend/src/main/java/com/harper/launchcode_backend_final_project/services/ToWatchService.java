package com.harper.launchcode_backend_final_project.services;

import com.harper.launchcode_backend_final_project.models.Movie;
import com.harper.launchcode_backend_final_project.models.ToWatch;
import com.harper.launchcode_backend_final_project.models.dto.MovieDTO;
import com.harper.launchcode_backend_final_project.repositories.MovieRepository;
import com.harper.launchcode_backend_final_project.repositories.ToWatchRepository;
import com.harper.launchcode_backend_final_project.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.Instant;
import java.util.*;

@Service
@CrossOrigin(origins = "http://localhost:5173")
public class ToWatchService {

    private static final Logger logger = LoggerFactory.getLogger(ToWatchService.class);

    @Autowired
    private ToWatchRepository toWatchRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> getToWatchList(String userId) {
        ToWatch watchList = toWatchRepository.findById(userId).orElse(null);
        if (watchList != null) {
            return new ResponseEntity<>(watchList, HttpStatus.OK); // 200
        } else {
            String response = "WatchList with ID of " + userId + " not found.";
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        }
    }

    @Transactional
    public ResponseEntity<?> addMovieToWatchList(String userId, MovieDTO movieDTO) {
        logger.info("Attempting to add movie for userId: {} with movieDTO: {}", userId, movieDTO);

        ToWatch watchList = toWatchRepository.findById(userId).orElseGet(() -> {
            ToWatch newList = new ToWatch(Instant.now(), Instant.now());
            newList.setId(userId);
            List<Movie> movies = new ArrayList<>();
            return newList;
        });
        Movie movie = movieRepository.findById(movieDTO.getId())
                .orElseGet(() -> {
                    Movie newMovie = new Movie();
                    newMovie.setId(movieDTO.getId());
                    newMovie.setOriginalTitle(movieDTO.getOriginalTitle());
                    newMovie.setPosterPath(movieDTO.getPosterPath());
                    newMovie.setTitle(movieDTO.getTitle());
                    newMovie.setOriginalName(movieDTO.getOriginalName());
                    return movieRepository.save(newMovie);
                });

        if (!watchList.getMovies().contains(movie)) {
            watchList.getMovies().add(movie);
            movie.getToWatchLists().add(watchList);
        }

        toWatchRepository.save(watchList);

        return new ResponseEntity<>(movie, HttpStatus.CREATED);
    }


    @Transactional
    public ResponseEntity<?> removeMovieFromWatchList(String userId, int movieId) {
        ToWatch toWatch = toWatchRepository.findById(userId)
                .orElse(null);

        Movie movie = movieRepository.findById(movieId)
                .orElse(null);
        if (toWatch == null || movie == null) {
            String response = "ToWatch list or Movie not found for userId: " + userId + " and movieId: " + movieId;
            return new ResponseEntity<>(Collections.singletonMap("response", response), HttpStatus.NOT_FOUND); // 404
        } else {
            toWatch.getMovies().remove(movie);
            movie.getToWatchLists().remove(toWatch);

            toWatchRepository.save(toWatch);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
        }
    }
}

