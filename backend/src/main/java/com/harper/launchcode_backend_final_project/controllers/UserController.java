
package com.harper.launchcode_backend_final_project.controllers;


import com.harper.launchcode_backend_final_project.models.User;
import com.harper.launchcode_backend_final_project.models.dto.UserDTO;
import com.harper.launchcode_backend_final_project.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    UserService userService;

    // Post or Update a User
    // Endpoint: http://localhost:8080/api/users/add
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value="/add", consumes= MediaType.APPLICATION_JSON_VALUE)
    public User addOrUpdateUser(@RequestBody UserDTO user, Authentication authentication){
        try{
            if(!authentication.getName().equals(user.getId())){
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User does not have permission to access this resource");
            }

            System.out.println("User received: " + user);
            return userService.addOrUpdateUser(user);
        } catch (Exception e){
            throw new RuntimeException(e);

        }

    }
}
