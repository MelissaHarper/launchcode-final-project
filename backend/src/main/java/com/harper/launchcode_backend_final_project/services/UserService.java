package com.harper.launchcode_backend_final_project.services;


import com.harper.launchcode_backend_final_project.models.User;
import com.harper.launchcode_backend_final_project.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User saveOrUpdateUser(User user) {
        Optional<User> optionalUser = userRepository
                .findByClerkId(user.getClerkId());
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setUsername(user.getUsername());
            existingUser.setEmail(user.getEmail());
            existingUser.setPhotoUrl(user.getPhotoUrl());
            existingUser = userRepository.save(existingUser);
            return existingUser;
        } else {
            return userRepository.save(user);
        }
    }

    public void deleteAccount(int clerkId) {
        User existingUser = userRepository.findById(clerkId)
                .orElseThrow(() -> new RuntimeException("User not found" ));
        userRepository.delete(existingUser);
    }

    public User getAccountByClerkId(String clerkId) {
        return userRepository.findByClerkId(clerkId).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
