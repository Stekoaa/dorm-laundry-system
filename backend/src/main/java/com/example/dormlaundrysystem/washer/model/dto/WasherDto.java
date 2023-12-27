package com.example.dormlaundrysystem.washer.model.dto;

public record WasherDto(
        Long id,
        String name,
        int level,
        boolean isAvailable
) {}
