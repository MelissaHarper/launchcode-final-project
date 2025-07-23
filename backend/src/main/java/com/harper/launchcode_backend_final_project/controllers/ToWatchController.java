package com.harper.launchcode_backend_final_project.controllers;

import com.harper.launchcode_backend_final_project.models.ToWatch;
import com.harper.launchcode_backend_final_project.services.ToWatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.apache.tomcat.util.net.openssl.OpenSSLStatus.getName;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/to-watch-list")
public class ToWatchController {

    @Autowired
    private ToWatchService toWatchService;

    @PostMapping
    public ResponseEntity<ToWatch> saveToWatch(@RequestBody ToWatch toWatch) {
        return ResponseEntity.ok(toWatchService.saveToWatch(toWatch));
    }

    @GetMapping("")
    public ResponseEntity<List<ToWatch>> fetchToWatch(Authentication authentication) {
        return ResponseEntity.ok(toWatchService.fetchToWatch(authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeItem(@PathVariable int id, Authentication authentication){
        if(authentication.getName()!=null){
            toWatchService.removeItem(id, authentication.getName());
            return ResponseEntity.noContent().build();
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User does not have permission to access this resource");
    }



    }

