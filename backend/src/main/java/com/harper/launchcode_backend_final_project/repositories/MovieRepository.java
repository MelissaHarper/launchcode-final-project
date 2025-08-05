package com.harper.launchcode_backend_final_project.repositories;

import com.harper.launchcode_backend_final_project.models.Movie;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MovieRepository extends JpaRepository<Movie, Integer> {
}
