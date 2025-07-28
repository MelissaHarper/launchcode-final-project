package com.harper.launchcode_backend_final_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling //enable scheduling for daily download from TMDB
@SpringBootApplication
public class LaunchcodeBackendFinalProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(LaunchcodeBackendFinalProjectApplication.class, args);
	}

}
