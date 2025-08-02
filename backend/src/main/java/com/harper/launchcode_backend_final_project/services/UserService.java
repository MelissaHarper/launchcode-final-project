package com.harper.launchcode_backend_final_project.services;


import com.harper.launchcode_backend_final_project.models.ToWatch;
import com.harper.launchcode_backend_final_project.models.User;
import com.harper.launchcode_backend_final_project.models.dto.UserDTO;
import com.harper.launchcode_backend_final_project.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.time.Instant;


@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User addUser(UserDTO userData){
        User newUser = new User(
                userData.getId(),
                userData.getEmail(),
                userData.getUsername(),
                userData.getPhotoUrl(),
                userData.getToWatch() ,
                userData.getCreatedAt() != null ? userData.getCreatedAt() : Instant.now(),
                userData.getUpdated() != null ? userData.getUpdated() : Instant.now()
        );
        return userRepository.save(newUser);
    }

    public void deleteAccount(String id){
        User existingUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(existingUser);
    }

    public User getUserById(String id){
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

    }
}
