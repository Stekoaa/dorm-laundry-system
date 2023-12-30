package com.example.dormlaundrysystem.booking;

import com.example.dormlaundrysystem.auth.UserRepository;
import com.example.dormlaundrysystem.auth.exception.UserNotFoundException;
import com.example.dormlaundrysystem.auth.model.User;
import com.example.dormlaundrysystem.booking.exception.ReservationNotFoundException;
import com.example.dormlaundrysystem.booking.exception.TimeSlotNotFoundException;
import com.example.dormlaundrysystem.booking.model.Reservation;
import com.example.dormlaundrysystem.booking.model.TimeSlot;
import com.example.dormlaundrysystem.booking.model.dto.ReservationDto;
import com.example.dormlaundrysystem.booking.model.dto.TimeSlotDto;
import com.example.dormlaundrysystem.booking.model.mapper.ReservationMapper;
import com.example.dormlaundrysystem.booking.model.mapper.TimeSlotMapper;
import com.example.dormlaundrysystem.washer.WasherRepository;
import com.example.dormlaundrysystem.washer.exception.WasherNotFoundException;
import com.example.dormlaundrysystem.washer.model.Washer;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
                .orElseThrow(UserNotFoundException::new);

        Washer washer = washerRepository.findById(washerId)
                .orElseThrow(WasherNotFoundException::new);

        TimeSlot slot = timeSlotRepository.findByIdAndWasher(slotId, washer)
                .orElseThrow(TimeSlotNotFoundException::new);

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setWasher(washer);
        reservation.setTimeSlot(slot);
        reservationRepository.save(reservation);

        slot.setAvailable(false);
        timeSlotRepository.save(slot);
    }

    public void deleteReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(ReservationNotFoundException::new);

        TimeSlot timeSlot = reservation.getTimeSlot();
        timeSlot.setAvailable(true);
        timeSlotRepository.save(timeSlot);
        reservationRepository.deleteById(id);
    }

    public Map<LocalDate, List<TimeSlotDto>> getAvailableTimeSlotsForWasher(Long washerId, LocalDate startDate, LocalDate endDate) {
        Washer washer = washerRepository.findById(washerId).orElseThrow(WasherNotFoundException::new);
        LocalDateTime currentDateTime = LocalDateTime.now();
        return timeSlotRepository
                .findByDayDateBetweenAndWasher(startDate, endDate, washer)
                .stream()
                .filter(timeSlot ->
                        LocalDateTime.of(timeSlot.getDay().getDate(), LocalTime.parse(timeSlot.getEndTime())).isAfter(currentDateTime)
                )
                .collect(Collectors.groupingBy(
                        timeSlot -> timeSlot.getDay().getDate(),
                        Collectors.toList()
                ))
                .entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> entry.getValue().stream()
                                .map(TimeSlotMapper::toDto)
                                .collect(Collectors.toList())
                ));
    }

    public List<ReservationDto> searchReservationsByUsername(String username) {
        return reservationRepository.findByUserUsernameOrderByIdDesc(username)
                .stream()
                .map(ReservationMapper::toDto)
                .toList();
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
        return reservationRepository.findByUserFirstNameAndUserSurnameOrderByIdDesc(firstname, surname);
    }
}