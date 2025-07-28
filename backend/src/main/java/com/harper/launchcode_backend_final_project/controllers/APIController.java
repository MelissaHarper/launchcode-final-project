package com.harper.launchcode_backend_final_project.controllers;

import com.harper.launchcode_backend_final_project.schema.response.VerifiedJwtResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class APIController {

    @GetMapping("/clerk_jwt")
    public @ResponseBody VerifiedJwtResponse clerk_jwt(@AuthenticationPrincipal String userId) {
        return new VerifiedJwtResponse(userId);
    }

    @GetMapping("/gated_data")
    public @ResponseBody Map<String, String> get_gated_data() {
        return Map.of("foo", "bar");
    }

}
