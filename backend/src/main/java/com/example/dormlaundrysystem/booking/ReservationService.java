package com.example.dormlaundrysystem.booking;

import com.example.dormlaundrysystem.auth.UserRepository;
import com.example.dormlaundrysystem.auth.model.User;
import com.example.dormlaundrysystem.booking.model.Reservation;
import com.example.dormlaundrysystem.booking.model.TimeSlot;
import com.example.dormlaundrysystem.booking.model.dto.ReservationDto;
import com.example.dormlaundrysystem.booking.model.mapper.ReservationMapper;
import com.example.dormlaundrysystem.washer.WasherRepository;
import com.example.dormlaundrysystem.washer.model.Washer;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final TimeSlotRepository timeSlotRepository;
    private final WasherRepository washerRepository;
    private final UserRepository userRepository;

    public ReservationService(ReservationRepository reservationRepository, TimeSlotRepository timeSlotRepository, WasherRepository washerRepository, UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.timeSlotRepository = timeSlotRepository;
        this.washerRepository = washerRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void createReservation(String username, Long washerId, Long slotId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Washer washer = washerRepository.findById(washerId)
                .orElseThrow(() -> new IllegalArgumentException("Washer not found"));

        TimeSlot slot = timeSlotRepository.findByIdAndWasher(slotId, washer)
                .orElseThrow(() -> new IllegalArgumentException("Slot not found for washer"));

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setWasher(washer);
        reservation.setTimeSlot(slot);
        reservationRepository.save(reservation);

        slot.setAvailable(false);
        timeSlotRepository.save(slot);
    }

    public Map<LocalDate, List<TimeSlot>> getAvailableTimeSlotsForWasher(Long washerId, LocalDate startDate, LocalDate endDate) {
        Washer washer = washerRepository.findById(washerId).orElseThrow();
        List<TimeSlot> slotsInRange = timeSlotRepository.findByDayDateBetweenAndWasher(startDate, endDate, washer);

        return slotsInRange.stream()
                .filter(TimeSlot::isAvailable)
                .collect(Collectors.groupingBy(
                        timeSlot -> timeSlot.getDay().getDate(),
                        Collectors.toList()
                ));
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