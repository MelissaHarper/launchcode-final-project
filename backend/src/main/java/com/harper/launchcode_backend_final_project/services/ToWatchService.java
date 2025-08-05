package com.harper.launchcode_backend_final_project.services;

import com.harper.launchcode_backend_final_project.models.Movie;
import com.harper.launchcode_backend_final_project.models.ToWatch;
import com.harper.launchcode_backend_final_project.models.dto.MovieDTO;
import com.harper.launchcode_backend_final_project.repositories.MovieRepository;
import com.harper.launchcode_backend_final_project.repositories.ToWatchRepository;
import com.harper.launchcode_backend_final_project.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

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

    public ToWatch getOrCreateToWatchList(String userId) {
        return toWatchRepository.findById(userId)
                .orElseGet(() -> {
                    ToWatch newList = new ToWatch( Instant.now(), Instant.now());
                    newList.setId(userId);
                    logger.info("No existing ToWatch list found for userId: {}. Creating a new one.", userId);
                    return toWatchRepository.save(newList);
                });
    }

    @Transactional
    public ToWatch addMovieToWatchList(String userId, MovieDTO movieDTO) {
        logger.info("Attempting to add movie for userId: {} with movieDTO: {}", userId, movieDTO);

       ToWatch watchList = toWatchRepository.findById(userId).orElseGet(() -> {
                  ToWatch newList = new ToWatch(Instant.now(), Instant.now());
                    newList.setId(userId);
                    Set<Movie> movies = new HashSet<>();
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

        // Check if movie is already in the ToWatch list
        if (watchList.getMovies().contains(movie)) {
            logger.warn("Movie with ID {} is already in the ToWatch list for userId: {}", movie.getId(), userId);
            return watchList; // Return early if movie is already present
        } else {
            watchList.getMovies().add(movie);
            movie.getToWatchLists().add(watchList);
            logger.info("Adding movie with ID {} to ToWatch list for userId: {}", movie.getId(), userId);
        }

        return toWatchRepository.save(watchList);
    }





    public void removeMovieFromWatchList(String userId, int movieId) {
        ToWatch toWatch = toWatchRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("ToWatch list not found for userId: " + userId));
        if (toWatch != null) {
            Movie movie = movieRepository.findById(movieId)
                    .orElseThrow(() -> new RuntimeException("Movie not found with ID: " + movieId));
            toWatch.getMovies().remove(movie);
            logger.info("Movie with ID {} removed from ToWatch list for userId: {}", movie, userId);
        }
    }
}

