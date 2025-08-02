package com.harper.launchcode_backend_final_project.repositories;

import com.harper.launchcode_backend_final_project.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findById(String id);

    Boolean existsById(String id);
}
