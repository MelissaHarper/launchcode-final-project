package com.harper.launchcode_backend_final_project.repositories;

import com.harper.launchcode_backend_final_project.models.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, String> {
}
