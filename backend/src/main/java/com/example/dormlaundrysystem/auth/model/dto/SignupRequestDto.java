package com.example.dormlaundrysystem.auth.model.dto;

import jakarta.validation.constraints.*;

public record SignupRequestDto(
        @NotNull(message = "Username cannot be empty")
        @Pattern(regexp = "^[a-zA-Z0-9_\\-]{3,20}$", message = "Invalid username")
        String username,

        @NotNull(message = "First name cannot be empty")
        @Pattern(regexp = "^[\\p{L}'-]+$", message = "Invalid first name")
        String firstName,

        @NotNull(message = "Surname cannot be empty")
        @Pattern(regexp =  "^[\\p{L}'\\- ]+$", message = "Invalid surname")
        String surname,

        @NotNull(message = "Email cannot be empty")
        @Email(regexp = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$", message = "Invalid email")
        String email,

        @NotNull(message = "Password cannot be empty")
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\\S+$).{8,32}$", message = "Invalid password")
        String password
) {}
