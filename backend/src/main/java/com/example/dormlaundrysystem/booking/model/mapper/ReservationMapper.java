package com.example.dormlaundrysystem.booking.model.mapper;

import com.example.dormlaundrysystem.auth.model.mapper.UserMapper;
import com.example.dormlaundrysystem.booking.model.Reservation;
import com.example.dormlaundrysystem.booking.model.dto.ReservationDto;
import com.example.dormlaundrysystem.washer.model.mapper.WasherMapper;
import org.springframework.stereotype.Component;

@Component
public class ReservationMapper {
    public static ReservationDto toDto(Reservation reservation) {
        return new ReservationDto(
                UserMapper.toDto(reservation.getUser()),
                WasherMapper.toDto(reservation.getWasher()),
                TimeSlotMapper.toDto(reservation.getTimeSlot())
        );
    }
}
