package com.example.dormlaundrysystem.booking.model.dto;

import java.time.LocalDate;

public record TimeSlotDto(
        long id,
        String startTime,
        String endTime,
        LocalDate date
) {}
