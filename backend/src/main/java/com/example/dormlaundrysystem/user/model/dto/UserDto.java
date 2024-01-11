package com.example.dormlaundrysystem.user.model.dto;

public record UserDto(
        long id,
        String username,
        String firstName,
        String surname,
        String email,
        boolean banned
) {}
