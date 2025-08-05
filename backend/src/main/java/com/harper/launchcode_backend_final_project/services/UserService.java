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


@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ToWatchRepository toWatchRepository;

    public User addOrUpdateUser(UserDTO userData){
            // Create a new User object from the UserDTO
        User newUser = new User();
        newUser.setId(userData.getId());
        newUser.setEmail(userData.getEmail());
        newUser.setUsername(userData.getUsername());
        newUser.setPhotoUrl(userData.getPhotoUrl());
        newUser.setCreatedAt(userData.getCreatedAt());
        newUser.setUpdated(Instant.now());

        // Check if user already exists
        Boolean userExists = userRepository.existsById(newUser.getId());
        if (userExists) {
            // If user exists, update the existing user in case of an update through Clerk
            User existingUser = userRepository.findById(userData.getId());
            existingUser.setEmail(userData.getEmail());
            existingUser.setUsername(userData.getUsername());
            existingUser.setPhotoUrl(userData.getPhotoUrl());
            existingUser.setUpdated(Instant.now());
            return userRepository.save(existingUser);
        }

        // Create a new ToWatch list for the user
        ToWatch newToWatch = new ToWatch(Instant.now(), Instant.now());

        // Set relationship between ToWatch and User
        newToWatch.setUser(newUser);
        newUser.setToWatch(newToWatch);

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
