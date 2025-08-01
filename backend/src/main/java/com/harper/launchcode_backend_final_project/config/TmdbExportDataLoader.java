package com.harper.launchcode_backend_final_project.config;

import com.harper.launchcode_backend_final_project.services.TmdbExportService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev") // This runner will only be active in the "dev" profile
public class TmdbExportDataLoader implements CommandLineRunner {

    private final TmdbExportService tmdbExportService;

    public TmdbExportDataLoader(TmdbExportService tmdbExportService) {
        this.tmdbExportService = tmdbExportService;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Running TMDB export data loading on startup (dev profile)...");
        tmdbExportService.downloadAndProcessDailyExport();
    }
}
