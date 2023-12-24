package com.example.dormlaundrysystem.booking.model.dto;

import com.example.dormlaundrysystem.auth.model.dto.UserDto;
import com.example.dormlaundrysystem.washer.model.dto.WasherDto;

public record ReservationDto(
   UserDto userDto,
   WasherDto washerDto,
   TimeSlotDto timeSlotDto
) {}
