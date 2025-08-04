package com.harper.launchcode_backend_final_project.repositories;

import com.harper.launchcode_backend_final_project.models.ToWatch;
import com.harper.launchcode_backend_final_project.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ToWatchRepository extends JpaRepository<ToWatch, Integer> {
    Optional<ToWatch> findByUser(User id);

//    Optional<ToWatch> findByMovieIdAndUserId( String userId, int movieId);
}
