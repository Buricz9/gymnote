package com.example.project;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectApplication.class, args);
	}

	 @Bean
	 public CommandLineRunner commandLineRunner(String[] args){
	 	return runner -> {
	 		System.out.println("Hello World");
	 	};
	 }

}
