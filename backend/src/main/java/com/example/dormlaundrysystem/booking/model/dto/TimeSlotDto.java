package com.example.dormlaundrysystem.booking.model.dto;

import java.time.LocalDateTime;

public record TimeSlotDto(LocalDateTime startTime, LocalDateTime endTime) {}
