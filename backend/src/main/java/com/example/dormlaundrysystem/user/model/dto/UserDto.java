package com.example.dormlaundrysystem.user.model.dto;

public record UserDto(
        String username,
        String firstName,
        String surname,
        String email,
        boolean banned
) {}
