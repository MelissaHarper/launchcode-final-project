package com.harper.launchcode_backend_final_project.repositories;

import com.harper.launchcode_backend_final_project.models.ToWatchList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToWatchListRepository extends JpaRepository<ToWatchList, Integer> {
}
