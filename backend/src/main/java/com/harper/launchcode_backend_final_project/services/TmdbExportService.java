package com.harper.launchcode_backend_final_project.services;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.harper.launchcode_backend_final_project.models.Movie;
import com.harper.launchcode_backend_final_project.models.ToWatch;
import com.harper.launchcode_backend_final_project.repositories.MovieRepository;
import com.harper.launchcode_backend_final_project.repositories.ToWatchRepository;
import lombok.Data;
import org.apache.commons.compress.compressors.gzip.GzipCompressorInputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
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

/**
 * Service to download and process the daily TMDB movie export.
 * Fetches the latest movie IDs from TMDB, processes them,
 * and saves them to the database.
 */

@Service
@Data
public class TmdbExportService {

    private static final String TMDB_EXPORT_BASE_URL = "http://files.tmdb.org/p/exports/";

    @Autowired
    MovieRepository movieRepository;

    private final ObjectMapper objectMapper;

        // Schedule to run every day at 3 AM except when the application is running in dev profile
        @Scheduled(cron = "0 0 3 * * ?")
        @ConditionalOnProperty(name = "tmdb.scheduled-export.enabled", havingValue = "true", matchIfMissing = true)
        public void downloadAndProcessDailyExport() {
            LocalDate today = LocalDate.now();
            String formattedDate = today.format(DateTimeFormatter.ofPattern("MM_dd_yyyy"));
            String exportFileName = "movie_ids_" + formattedDate + ".json.gz";
            String exportUrl = TMDB_EXPORT_BASE_URL + exportFileName;

            try {
                URL url = new URL(exportUrl);
                try (InputStream inputStream = new BufferedInputStream(url.openStream());
                     GzipCompressorInputStream gzipInputStream = new GzipCompressorInputStream(inputStream);
                ) {
                    List<Movie> movies = new ArrayList<>();

                    // Create a JsonFactory and JsonParser for streaming
                    JsonFactory jsonFactory = objectMapper.getFactory();
                    try (JsonParser jsonParser = jsonFactory.createParser(gzipInputStream);
                         MappingIterator<JsonNode> mappingIterator = objectMapper.readValues(jsonParser, JsonNode.class)) {

                        while (mappingIterator.hasNext()) {
                            JsonNode node = mappingIterator.next();
                            int id = node.path("id").asInt(); // Use path() to handle missing fields gracefully
                            String originalTitle = node.path("original_title").asText(null);
                            String posterPath = node.path("poster_path").asText(null);
                            String title = node.path("title").asText(null);
                            String originalName = node.path("original_name").asText(null); // Return null if not found
                            Set<ToWatch> toWatchLists = new HashSet<>();
                            movies.add(new Movie(id, originalTitle, posterPath, title, originalName, toWatchLists));
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