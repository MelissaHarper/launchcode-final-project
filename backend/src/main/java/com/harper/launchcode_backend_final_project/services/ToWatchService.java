package com.harper.launchcode_backend_final_project.services;

import com.harper.launchcode_backend_final_project.models.ToWatch;
import com.harper.launchcode_backend_final_project.repositories.ToWatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ToWatchService {

    @Autowired
    private ToWatchRepository toWatchRepository;

    public ToWatch saveList(ToWatch toWatch) {
        return toWatchRepository.save(toWatch);
    }

    public List<ToWatch> fetchToWatchList(String clerkID) {
        return toWatchRepository.findByClerkID(clerkID);
    }

    public void removeMovieFromList(int id, String clerkID) {
       ToWatch existingMovie = toWatchRepository.findByIdAndClerkID(id, clerkID)
               .orElseThrow(() -> new RuntimeException("Movie not found in list"));
        toWatchRepository.delete(existingMovie);
    }
}
