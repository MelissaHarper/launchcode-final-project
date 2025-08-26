package com.harper.launchcode_backend_final_project.repositories;

import com.harper.launchcode_backend_final_project.models.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeywordRepository extends JpaRepository<Keyword, Integer> {}
