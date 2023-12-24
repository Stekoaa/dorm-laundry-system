package com.example.dormlaundrysystem.washer.model.dto;

public record WasherDto(
        Long id,
        String name,
        boolean isBooked,
        boolean isAvailable,
        boolean isDamaged
) {}
