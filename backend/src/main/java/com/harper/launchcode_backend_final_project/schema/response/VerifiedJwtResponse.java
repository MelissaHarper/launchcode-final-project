package com.harper.launchcode_backend_final_project.schema.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;


public class VerifiedJwtResponse {

    private String userId;

    public VerifiedJwtResponse() {
    }

    public VerifiedJwtResponse(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
