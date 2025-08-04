package com.harper.launchcode_backend_final_project.services;

import com.harper.launchcode_backend_final_project.models.User;
import com.harper.launchcode_backend_final_project.models.ToWatch;
import com.harper.launchcode_backend_final_project.models.dto.UserDTO;
import com.harper.launchcode_backend_final_project.repositories.UserRepository;
import com.harper.launchcode_backend_final_project.repositories.ToWatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ToWatchRepository toWatchRepository;


public User addOrUpdateUser(UserDTO userData){
        // Create a new User object from the UserDTO
        User newUser = new User(
                userData.getId(),
                userData.getEmail(),
                userData.getUsername(),
                userData.getPhotoUrl(),
                userData.getToWatch() ,
                userData.getCreatedAt() != null ? userData.getCreatedAt() : Instant.now(),
                userData.getUpdated() != null ? userData.getUpdated() : Instant.now()
        );
        // Check if user already exists
        Boolean userExists = userRepository.existsById(newUser.getId());
        if (userExists) {
            // If user exists, update the existing user in case of an update through Clerk
            User existingUser = userRepository.findById(newUser.getId());
            existingUser.setEmail(newUser.getEmail());
            existingUser.setUsername(newUser.getUsername());
            existingUser.setPhotoUrl(newUser.getPhotoUrl());
            existingUser.setToWatch(newUser.getToWatch());
            existingUser.setUpdated(Instant.now());
            return userRepository.save(existingUser);
        }
        return userRepository.save(newUser);
    }

    public void deleteAccount(String id){
        Boolean userExists = userRepository.existsById(id);
        if (userExists) {
        User existingUser = userRepository.findById(id);
        userRepository.delete(existingUser);
    } else {
            throw new RuntimeException("User not found");
        }
    }

    public User getUserById(String id){
            Boolean userExists = userRepository.existsById(id);
        return userRepository.findById(id);

    }
}
