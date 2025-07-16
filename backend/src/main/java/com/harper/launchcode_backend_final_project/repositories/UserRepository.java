package com.harper.launchcode_backend_final_project.repositories;

import com.harper.launchcode_backend_final_project.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
