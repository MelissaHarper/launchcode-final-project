package com.harper.launchcode_backend_final_project.services;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.harper.launchcode_backend_final_project.models.*;
import com.harper.launchcode_backend_final_project.repositories.*;

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
import java.util.*;

@Service
public class TmdbExportService {

    private static final String TMDB_EXPORT_BASE_URL = "http://files.tmdb.org/p/exports/";

    @Autowired private MovieRepository movieRepository;
    @Autowired private KeywordRepository keywordRepository;

    /* For future development

    @Autowired private TvSeriesRepository tvSeriesRepository;
    @Autowired private PersonRepository personRepository;
    @Autowired private CollectionRepository collectionRepository;
    @Autowired private TvNetworkRepository tvNetworkRepository;
    @Autowired private ProductionCompanyRepository productionCompanyRepository;

     */

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Scheduled(cron = "0 0 3 * * ?")
    @ConditionalOnProperty(name = "tmdb.scheduled-export.enabled", havingValue = "true", matchIfMissing = true)
    public void downloadAndProcessDailyExports() {
        LocalDate today = LocalDate.now();
        String formattedDate = today.format(DateTimeFormatter.ofPattern("MM_dd_yyyy"));

        downloadAndSave(formattedDate, "movie_ids_", Movie.class, movieRepository);
        downloadAndSave(formattedDate, "keyword_ids_", Keyword.class, keywordRepository);

        /* For future development

        downloadAndSave(formattedDate, "tv_series_ids_", TvSeries.class, tvSeriesRepository);
        downloadAndSave(formattedDate, "person_ids_", Person.class, personRepository);
        downloadAndSave(formattedDate, "collection_ids_", Collection.class, collectionRepository);
        downloadAndSave(formattedDate, "tv_network_ids_", TvNetwork.class, tvNetworkRepository);
        downloadAndSave(formattedDate, "production_company_ids_", ProductionCompany.class, productionCompanyRepository);

        */
    }

    private <T> void downloadAndSave(String formattedDate, String prefix, Class<T> type, org.springframework.data.jpa.repository.JpaRepository<T, Integer> repository) {
        String exportFileName = prefix + formattedDate + ".json.gz";
        String exportUrl = TMDB_EXPORT_BASE_URL + exportFileName;

        try {
            URL url = new URL(exportUrl);
            try (InputStream inputStream = new BufferedInputStream(url.openStream());
                 GzipCompressorInputStream gzipInputStream = new GzipCompressorInputStream(inputStream)) {

                List<T> entities = new ArrayList<>();
                JsonFactory jsonFactory = objectMapper.getFactory();

                try (JsonParser jsonParser = jsonFactory.createParser(gzipInputStream);
                     MappingIterator<JsonNode> mappingIterator = objectMapper.readValues(jsonParser, JsonNode.class)) {

                    while (mappingIterator.hasNext()) {
                        JsonNode node = mappingIterator.next();
                        int id = node.path("id").asInt();
                        String originalTitle = node.has("original_title") ? node.get("original_title").asText() : null;
                        String name = node.has("name") ? node.get("name").asText() : null;

                        if (type == Movie.class) entities.add(type.cast(new Movie(id, originalTitle)));
                        else if (type == Keyword.class) entities.add(type.cast(new Keyword(id, name)));

                        /* For future development

                        else if (type == TvSeries.class) entities.add(type.cast(new TvSeries(id, originalTitle)));
                        else if (type == Person.class) entities.add(type.cast(new Person(id, originalTitle)));
                        else if (type == Collection.class) entities.add(type.cast(new Collection(id, originalTitle)));
                        else if (type == TvNetwork.class) entities.add(type.cast(new TvNetwork(id, originalTitle)));
                        else if (type == ProductionCompany.class) entities.add(type.cast(new ProductionCompany(id, originalTitle)));

                         */
                    }
                }

                repository.deleteAll();
                repository.saveAll(entities);

                System.out.println("✅ Successfully processed: " + exportFileName);
            }
        } catch (Exception e) {
            System.err.println("❌ Error downloading or processing " + exportFileName + ": " + e.getMessage());
        }
    }
}
