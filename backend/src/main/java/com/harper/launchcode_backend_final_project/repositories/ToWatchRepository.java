package com.harper.launchcode_backend_final_project.repositories;

import com.harper.launchcode_backend_final_project.models.ToWatch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ToWatchRepository extends JpaRepository<ToWatch, Integer> {
    Optional<ToWatch> findById(String id);

}
