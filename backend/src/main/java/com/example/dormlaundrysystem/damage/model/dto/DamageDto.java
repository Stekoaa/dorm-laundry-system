package com.example.dormlaundrysystem.damage.model.dto;

import java.time.LocalDateTime;

public record DamageDto(
        long id,
        String userFirstName,
        String userSurname,
        String washerName,
        LocalDateTime reportTime,
        boolean fixed,
        String description
) {}
