package com.example.dormlaundrysystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DormLaundrySystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(DormLaundrySystemApplication.class, args);
	}
}
