package com.harper.launchcode_backend_final_project.controllers;

import com.harper.launchcode_backend_final_project.models.ToWatchList;
import com.harper.launchcode_backend_final_project.services.ToWatchListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/to-watch-lists")
public class ToWatchListController {
    private final ToWatchListService toWatchListService;

    @PostMapping
    public ResponseEntity<ToWatchList> saveList(ToWatchList toWatchList) {
        ToWatchList savedList = toWatchListService.saveList(toWatchList);
        return ResponseEntity.ok(savedList);
    }
}
