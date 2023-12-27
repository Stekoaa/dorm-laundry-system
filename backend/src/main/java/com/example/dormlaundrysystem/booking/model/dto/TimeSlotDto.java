package com.example.dormlaundrysystem.booking.model.dto;

public record TimeSlotDto(
        long id,
        String startTime,
        String endTime
) {}
