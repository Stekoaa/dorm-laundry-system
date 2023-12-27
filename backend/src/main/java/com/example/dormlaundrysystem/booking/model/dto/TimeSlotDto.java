package com.example.dormlaundrysystem.booking.model.dto;

public record TimeSlotDto(
        String startTime,
        String endTime,
        boolean available
) {}
