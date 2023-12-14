package com.example.dormlaundrysystem.auth.model.dto;

import jakarta.validation.constraints.*;

public record SignupRequestDto(
        @NotNull(message = "Username cannot be empty")
        @Size(min = 3, max = 20, message = "Username between 3 and 20 characters")
        String username,

        @NotNull(message = "First name cannot be empty")
        @Pattern(regexp = "^[\\p{L}'-]+$", message = "Invalid first name")
        String firstName,

        @NotNull(message = "Surname cannot be empty")
        @Pattern(regexp =  "^[\\p{L}'\\- ]+$", message = "Invalid surname")
        String surname,

        @NotNull(message = "Email cannot be empty")
        @Email(message = "Invalid email")
        String email,

        @NotNull(message = "Password cannot be empty")
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,32}$", message = "Invalid password")
        String password
) {}
