package com.harper.launchcode_backend_final_project.controllers;

import com.harper.launchcode_backend_final_project.models.ToWatch;
import com.harper.launchcode_backend_final_project.services.ToWatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/to-watch-lists")
public class ToWatchController {

    @Autowired
    private ToWatchService toWatchService;

    @PostMapping
    public ResponseEntity<ToWatch> saveList(ToWatch toWatch) {
        ToWatch savedList = toWatchService.saveList(toWatch);
        return ResponseEntity.ok(savedList);
    }


}
