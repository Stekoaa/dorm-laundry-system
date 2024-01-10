package com.example.dormlaundrysystem.booking.model.dto;

import com.example.dormlaundrysystem.user.model.dto.UserDto;
import com.example.dormlaundrysystem.washer.model.dto.WasherDto;

public record ReservationDto(
        long id,
        UserDto userDto,
        WasherDto washerDto,
        TimeSlotDto timeSlotDto
) {}
