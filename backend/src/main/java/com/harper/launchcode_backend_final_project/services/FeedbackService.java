package com.harper.launchcode_backend_final_project.services;

import com.harper.launchcode_backend_final_project.models.Feedback;
import com.harper.launchcode_backend_final_project.models.User;
import com.harper.launchcode_backend_final_project.models.dto.FeedbackDTO;
import com.harper.launchcode_backend_final_project.repositories.FeedbackRepository;
import com.harper.launchcode_backend_final_project.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

@Service
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> submitFeedback(FeedbackDTO feedbackDTO) {
        Feedback newFeedback = new Feedback();
        if (feedbackDTO.getUserId() != null) {
            newFeedback.setUser(userRepository.findById(feedbackDTO.getUserId()));
        }
        newFeedback.setName(feedbackDTO.getName());
        newFeedback.setEmail(feedbackDTO.getEmail());
        newFeedback.setMessage(feedbackDTO.getMessage());
        newFeedback.setCreatedAt(java.time.Instant.now());

        feedbackRepository.save(newFeedback);

        return ResponseEntity.ok().build();
    }
}
