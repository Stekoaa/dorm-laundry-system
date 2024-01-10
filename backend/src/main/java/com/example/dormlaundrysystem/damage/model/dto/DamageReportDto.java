package com.example.dormlaundrysystem.damage.model.dto;

import jakarta.validation.constraints.Size;

public record DamageReportDto(
        long washerId,
        String username,
        @Size(min = 5, max = 100, message = "Description size must be between 5 and 100") String description
) {}
