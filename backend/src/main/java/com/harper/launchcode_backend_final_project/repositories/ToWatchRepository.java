package com.harper.launchcode_backend_final_project.repositories;

import com.harper.launchcode_backend_final_project.models.ToWatch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ToWatchRepository extends JpaRepository<ToWatch, Integer> {
    List<ToWatch> findByClerkID(String clerkID);

    Optional<ToWatch> findByIdAndClerkID(int id, String clerkID);
}
