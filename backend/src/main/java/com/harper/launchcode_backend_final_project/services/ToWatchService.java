package com.harper.launchcode_backend_final_project.services;

import com.harper.launchcode_backend_final_project.models.ToWatch;
import com.harper.launchcode_backend_final_project.repositories.ToWatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToWatchService {

    @Autowired
    ToWatchRepository toWatchRepository;

    public ToWatch saveToWatch(ToWatch toWatch) {
        return toWatchRepository.save(toWatch);
    }

    public List<ToWatch> fetchToWatch(String userId) {
        return toWatchRepository.findByUserId(userId);
    }

//    public void removeItem(int id, String userId) {
//       ToWatch existingMovie = toWatchRepository.findByMovieIdAndUserId(movieId, userId)
//               .orElseThrow(() -> new RuntimeException("Movie not found in list"));
//        toWatchRepository.delete(existingMovie);
//    }
}
