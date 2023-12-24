package com.example.dormlaundrysystem.auth.model.dto;

public record UserDto(
        Long id,
        String username,
        String firstName,
        String surname
) {}
