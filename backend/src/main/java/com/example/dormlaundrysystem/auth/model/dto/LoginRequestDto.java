package com.example.dormlaundrysystem.auth.model.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequestDto(
        @NotBlank String username,
        @NotBlank String password
) {}
