package com.harper.launchcode_backend_final_project.repositories;

import com.harper.launchcode_backend_final_project.models.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Integer> {
}
