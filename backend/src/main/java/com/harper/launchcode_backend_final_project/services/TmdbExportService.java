package com.harper.launchcode_backend_final_project.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.harper.launchcode_backend_final_project.models.Movie;
import com.harper.launchcode_backend_final_project.models.ToWatch;
import com.harper.launchcode_backend_final_project.repositories.MovieRepository;
import com.harper.launchcode_backend_final_project.repositories.ToWatchRepository;
import org.apache.commons.compress.compressors.gzip.GzipCompressorInputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class TmdbExportService {

    private static final String TMDB_EXPORT_BASE_URL = "http://files.tmdb.org/p/exports/movie_ids";
    private final MovieRepository movieRepository;
    private final ToWatchRepository toWatchRepository;

    @Autowired
    public TmdbExportService(MovieRepository movieRepository, ToWatchRepository toWatchRepository) {
        this.movieRepository = movieRepository;
        this.toWatchRepository = toWatchRepository;
    }



        // Schedule to run every day at, for example, 3 AM
        @Scheduled(cron = "0 0 3 * * ?")
        public void downloadAndProcessDailyExport() {
            LocalDate today = LocalDate.now();
            String formattedDate = today.format(DateTimeFormatter.ofPattern("MM_dd_yyyy"));
            String exportFileName = "movie_ids_" + formattedDate + ".json.gz";
            String exportUrl = TMDB_EXPORT_BASE_URL + "_" + exportFileName;

            try {
                URL url = new URL(exportUrl);
                try (InputStream inputStream = new BufferedInputStream(url.openStream());
                     GzipCompressorInputStream gzipInputStream = new GzipCompressorInputStream(inputStream);
                ) {
                    ObjectMapper objectMapper = new ObjectMapper();
                    List<Movie> movies = new ArrayList<>();
                    JsonNode rootNode = objectMapper.readTree(gzipInputStream);

                    if (rootNode.isArray()) {
                        for (JsonNode node : rootNode) {
                            int id = node.get("id").asInt();
                            String originalTitle = node.has("original_title") ? node.get("original_title").asText() : null;
                            Set<ToWatch> toWatchLists = new HashSet<>();
                            movies.add(new Movie(id, originalTitle, toWatchLists));
                        }
                    }

                    // Clear existing data and save new data
                    movieRepository.deleteAll();
                    movieRepository.saveAll(movies);
                    System.out.println("Successfully downloaded and processed TMDB daily export for " + formattedDate);
                }
            } catch (Exception e) {
                System.err.println("Error downloading or processing TMDB daily export: " + e.getMessage());
                e.printStackTrace();
            }
        }

}