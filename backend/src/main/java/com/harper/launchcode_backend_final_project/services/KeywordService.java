package com.harper.launchcode_backend_final_project.services;


import com.harper.launchcode_backend_final_project.models.Keyword;
import com.harper.launchcode_backend_final_project.repositories.KeywordRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class KeywordService {
    @Autowired private KeywordRepository repository;

    public List<Keyword> getAllKeywords() {
        return repository.findAll();
    }
}
