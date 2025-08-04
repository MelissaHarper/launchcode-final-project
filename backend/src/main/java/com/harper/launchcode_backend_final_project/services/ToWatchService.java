package com.harper.launchcode_backend_final_project.services;

import com.harper.launchcode_backend_final_project.models.Movie;
import com.harper.launchcode_backend_final_project.models.ToWatch;
import com.harper.launchcode_backend_final_project.models.User;
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
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ToWatchService {

    private static final Logger logger = LoggerFactory.getLogger(ToWatchService.class);

    @Autowired
    private ToWatchRepository toWatchRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    public ToWatch getOrCreateToWatch(String userId) {
        User user = userRepository.findById(userId);
        return toWatchRepository.findByUser(user)
                .orElseGet(() -> {
                    ToWatch newList = new ToWatch();
                    newList.setUser(user);
                    return toWatchRepository.save(newList);
                });
    }

    @Transactional
    public ToWatch addMovieToWatchList(String userId, MovieDTO movieDTO) {
        logger.info("Attempting to add movie for userId: {} with movieDTO: {}", userId, movieDTO);

        ToWatch toWatchList;
        // 1. Initialize user from userId
        User user = userRepository.findById(userId);
        // 1a. Find or create the ToWatch list
        Optional<ToWatch> existingToWatch = toWatchRepository.findByUser(user);
        if (existingToWatch.isPresent()) {
            toWatchList = existingToWatch.get();
            logger.debug("Existing ToWatch list found for userId: {}", userId);
        } else {
            toWatchList = new ToWatch(user, Instant.now(), Instant.now());
            toWatchList = toWatchRepository.save(toWatchList);
            logger.debug("New ToWatch list created and saved for userId: {}", userId);
        }

        // 2. Prepare the Movie object
        Movie incomingMovie = getMovie(movieDTO);
        logger.debug("Incoming Movie object from DTO: {}", incomingMovie);

        // 3. Find or create/update the Movie in the Movie repository
        Movie movieToAssociate;
        Optional<Movie> movieInDb = movieRepository.findById(incomingMovie.getId());

        if (movieInDb.isPresent()) {
            movieToAssociate = movieInDb.get();
            logger.debug("Movie with ID {} found in database. Updating details if necessary.", movieToAssociate.getId());

            // Update only if existing movie has nulls or if incoming data is newer/better
            if (movieToAssociate.getOriginalTitle() == null && incomingMovie.getOriginalTitle() != null) {
                movieToAssociate.setOriginalTitle(incomingMovie.getOriginalTitle());
            } else if (incomingMovie.getOriginalTitle() != null && !incomingMovie.getOriginalTitle().equals(movieToAssociate.getOriginalTitle())) {
                movieToAssociate.setOriginalTitle(incomingMovie.getOriginalTitle());
            }

            if (movieToAssociate.getPosterPath() == null && incomingMovie.getPosterPath() != null) {
                movieToAssociate.setPosterPath(incomingMovie.getPosterPath());
            } else if (incomingMovie.getPosterPath() != null && !incomingMovie.getPosterPath().equals(movieToAssociate.getPosterPath())) {
                movieToAssociate.setPosterPath(incomingMovie.getPosterPath());
            }

            if (movieToAssociate.getTitle() == null && incomingMovie.getTitle() != null) {
                movieToAssociate.setTitle(incomingMovie.getTitle());
            } else if (incomingMovie.getTitle() != null && !incomingMovie.getTitle().equals(movieToAssociate.getTitle())) {
                movieToAssociate.setTitle(incomingMovie.getTitle());
            }

            if (movieToAssociate.getOriginalName() == null && incomingMovie.getOriginalName() != null) {
                movieToAssociate.setOriginalName(incomingMovie.getOriginalName());
            } else if (incomingMovie.getOriginalName() != null && !incomingMovie.getOriginalName().equals(movieToAssociate.getOriginalName())) {
                movieToAssociate.setOriginalName(incomingMovie.getOriginalName());
            }

            movieRepository.save(movieToAssociate);
            logger.debug("Existing movie updated and saved: {}", movieToAssociate);

        } else {
            // Movie doesn't exist, save the incoming movie as new
            movieToAssociate = movieRepository.save(incomingMovie);
            logger.debug("New movie saved: {}", movieToAssociate);
        }

        // 4. Add the Movie to the ToWatch list's collection
        if (toWatchList.getMovies() == null) {
            toWatchList.setMovies(new HashSet<>());
            logger.warn("ToWatch list's movies set was null, initialized a new HashSet.");
        }

        // Check if the movie is already present in the set to avoid redundant adds
        if (toWatchList.getMovies().add(movieToAssociate)) {
            logger.info("Movie ID {} successfully added to ToWatch list for userId: {}", movieToAssociate.getId(), userId);
//            // 5. Update the inverse side
//            movieToAssociate.getToWatchLists().add(toWatchList);
//            movieRepository.save(movieToAssociate); // Resave the movie to update the inverse side
//            logger.info("ToWatch list in movieRepository updated with movie ID {} for userId: {}", movieToAssociate.getId(), userId);

        } else {
            logger.warn("Movie ID {} was already in ToWatch list for userId: {}", movieToAssociate.getId(), userId);
        }

        // 6. Save the ToWatch object to persist the changes in the relationship
        toWatchRepository.save(toWatchList);
        logger.info("ToWatch list for userId {} saved after movie addition. Current movie count: {}", userId, toWatchList.getMovies().size());

        return toWatchList;
    }

    private static Movie getMovie(MovieDTO movieDTO) {
        Movie incomingMovie = new Movie(movieDTO.getId());
        if (movieDTO.getOriginalTitle() != null) {
            incomingMovie.setOriginalTitle(movieDTO.getOriginalTitle());
        }
        if (movieDTO.getPosterPath() != null) {
            incomingMovie.setPosterPath(movieDTO.getPosterPath());
        }
        if (movieDTO.getTitle() != null) {
            incomingMovie.setTitle(movieDTO.getTitle());
        }
        if (movieDTO.getOriginalName() != null) {
            incomingMovie.setOriginalName(movieDTO.getOriginalName());
        }
        return incomingMovie;
    }

    public ToWatch removeMovieFromWatchList(String userId, int movieId) {
        User user = userRepository.findById(userId);
        if (user == null) {
            logger.error("User with ID {} not found.", userId);
            return null;
        }
        Optional<ToWatch> toWatch = toWatchRepository.findByUser(user);
        if (toWatch.isPresent()) {
            ToWatch incomingToWatch = toWatch.get();
            incomingToWatch.getMovies().removeIf(m -> m.getId() == movieId);
            return toWatchRepository.save(incomingToWatch);
        }
        return null;
    }
}

//    public ToWatch getWatchList(String userId) {
//        Optional<ToWatch> toWatchList = toWatchRepository.findByUserId(userId);
//        ToWatch toWatchListOrNew = toWatchList.orElse(new ToWatch(userId, Instant.now(), Instant.now()));
//        return toWatchListOrNew;
//    }
//}



//package com.harper.launchcode_backend_final_project.services;
//
//import com.harper.launchcode_backend_final_project.models.Movie;
//import com.harper.launchcode_backend_final_project.models.ToWatch;
//import com.harper.launchcode_backend_final_project.models.User;
//import com.harper.launchcode_backend_final_project.models.dto.ToWatchDTO;
//import com.harper.launchcode_backend_final_project.repositories.ToWatchRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.Instant;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Set;
//
//@Service
//public class ToWatchService {
//
//    @Autowired
//    ToWatchRepository toWatchRepository;
//
//    public ToWatch addOrUpdateUser(ToWatchDTO toWatchData){
//        // Create movies list from the ToWatchDTO
//        Set<Movie> movies = new HashSet<>();
//        for (int movieId : toWatchData.getMovies()) {
//            Movie movie = movieRepository.findById(movieId)
//                    .orElse(Movie )
//        }
//        // Create a new ToWatch object from the ToWatchDTO
//        ToWatch newToWatch = new User(
//                toWatchData.getId(),
//                toWatchData.getUserId(),
//                toWatchData.getCreatedAt(),
//                userData.getUpdatedAt(),
//                userData.getToWatch() ,
//                userData.getCreatedAt() != null ? userData.getCreatedAt() : Instant.now(),
//                userData.getUpdated() != null ? userData.getUpdated() : Instant.now()
//        );
//        // Check if user already exists
//        Boolean userExists = userRepository.existsById(newToWatch.getId());
//        if (userExists) {
//            // If user exists, update the existing user in case of an update through Clerk
//            User existingUser = userRepository.findById(newToWatch.getId()).orElseThrow(() -> new RuntimeException("User not found"));
//            existingUser.setEmail(newToWatch.getEmail());
//            existingUser.setUsername(newToWatch.getUsername());
//            existingUser.setPhotoUrl(newToWatch.getPhotoUrl());
//            existingUser.setToWatch(newToWatch.getToWatch());
//            existingUser.setUpdated(Instant.now());
//            return userRepository.save(existingUser);
//        }
//        return userRepository.save(newToWatch);
//    }
//
//    public ToWatch saveToWatch(ToWatch toWatch) {
//        return toWatchRepository.save(toWatch);
//    }
//
//    public List<ToWatch> getToWatch(String userId) {
//        return toWatchRepository.findByUserId(userId);
//    }
//
////    public void removeItem(int id, String userId) {
////       ToWatch existingMovie = toWatchRepository.findByMovieIdAndUserId(movieId, userId)
////               .orElseThrow(() -> new RuntimeException("Movie not found in list"));
////        toWatchRepository.delete(existingMovie);
////    }
//}
