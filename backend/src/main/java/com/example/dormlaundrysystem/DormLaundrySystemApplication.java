package com.example.dormlaundrysystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DormLaundrySystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(DormLaundrySystemApplication.class, args);
	}

//	@Bean
//	CommandLineRunner commandLineRunner(UserRepository users, PasswordEncoder encoder) {
//		return args -> {
//			users.save(new User("user", "k@wp.pl", encoder.encode("password")));
//			users.save(new User("admin" , "a@wp.pl", encoder.encode("password")));
//		};
//	}
}
