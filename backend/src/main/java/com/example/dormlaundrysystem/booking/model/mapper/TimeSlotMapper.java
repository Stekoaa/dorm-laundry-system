package com.example.dormlaundrysystem.booking.model.mapper;

import com.example.dormlaundrysystem.booking.model.TimeSlot;
import com.example.dormlaundrysystem.booking.model.dto.TimeSlotDto;
import org.springframework.stereotype.Component;

@Component
public class TimeSlotMapper {
    public static TimeSlotDto toDto(TimeSlot timeSlot){
        return new TimeSlotDto(
                timeSlot.getStartTime(),
                timeSlot.getEndTime(),
                timeSlot.isAvailable());
    }
}
