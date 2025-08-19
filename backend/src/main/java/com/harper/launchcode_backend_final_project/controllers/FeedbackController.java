package com.harper.launchcode_backend_final_project.controllers;

import com.harper.launchcode_backend_final_project.models.Feedback;
import com.harper.launchcode_backend_final_project.models.dto.FeedbackDTO;
import com.harper.launchcode_backend_final_project.services.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {

    @Autowired
    FeedbackService feedbackService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        return feedbackService.submitFeedback(feedbackDTO);
    }

}
