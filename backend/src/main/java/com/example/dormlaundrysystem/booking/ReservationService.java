package com.example.dormlaundrysystem.booking;

import com.example.dormlaundrysystem.booking.model.Reservation;
import com.example.dormlaundrysystem.booking.model.TimeSlot;
import com.example.dormlaundrysystem.booking.model.dto.ReservationDto;
import com.example.dormlaundrysystem.booking.model.dto.TimeSlotDto;
import com.example.dormlaundrysystem.booking.model.mapper.ReservationMapper;
import com.example.dormlaundrysystem.booking.model.mapper.TimeSlotMapper;
import com.example.dormlaundrysystem.washer.WasherRepository;
import com.example.dormlaundrysystem.washer.model.Washer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final TimeSlotRepository timeSlotRepository;
    private final WasherRepository washerRepository;

    public ReservationService(ReservationRepository reservationRepository, TimeSlotRepository timeSlotRepository, WasherRepository washerRepository) {
        this.reservationRepository = reservationRepository;
        this.timeSlotRepository = timeSlotRepository;
        this.washerRepository = washerRepository;
    }

    public void createReservation() {

    }

    public List<TimeSlotDto> getAvailableTimeSlotsForWasher(Long washerId) {
        Washer washer = washerRepository.findById(washerId).orElseThrow();
        List<TimeSlot> timeSlots = timeSlotRepository.findAll();
        List<Reservation> reservations = reservationRepository.findByWasherId(washerId);

        List<Long> bookedTimeIds = reservations.stream()
                .map(reservation -> reservation.getTimeSlot().getId())
                .toList();
        List<TimeSlot> availableTimeSlots = timeSlots.stream()
                .filter(timeSlot -> !bookedTimeIds.contains(timeSlot.getId()))
                .toList();

        return availableTimeSlots.stream().map(TimeSlotMapper::toDto).toList();
    }

    public List<ReservationDto> searchReservations(String firstName, String surname) {
        List<Reservation> reservations = (firstName != null && surname != null)
                ? getReservationsByFullName(firstName, surname) : getAllReservations();
        return reservations.stream().map(ReservationMapper::toDto).toList();
    }

    private List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    private List<Reservation> getReservationsByFullName(String firstname, String surname) {
        return reservationRepository.findByUserFirstNameAndUserSurname(firstname, surname);
    }
}