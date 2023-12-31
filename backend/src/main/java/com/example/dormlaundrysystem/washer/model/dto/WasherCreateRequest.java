package com.example.dormlaundrysystem.washer.model.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record WasherCreateRequest(
        @NotBlank String name,
        @Min(value = 1) @Max(value = 4) int level,
        boolean isAvailable
) {}
