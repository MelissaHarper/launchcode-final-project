package com.harper.launchcode_backend_final_project.controllers;

import com.harper.launchcode_backend_final_project.models.Keyword;

import com.harper.launchcode_backend_final_project.repositories.KeywordRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tvseries")
public class KeywordController {

    private final KeywordRepository repository;

    public KeywordController(KeywordRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Keyword> getAll() {
        return repository.findAll();
    }
}
