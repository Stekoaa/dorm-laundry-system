package com.example.dormlaundrysystem.booking;

import com.example.dormlaundrysystem.auth.UserRepository;
import com.example.dormlaundrysystem.auth.exception.UserNotFoundException;
import com.example.dormlaundrysystem.auth.model.User;
import com.example.dormlaundrysystem.booking.exception.ReservationNotFoundException;
import com.example.dormlaundrysystem.booking.exception.TimeSlotNotAvailableException;
import com.example.dormlaundrysystem.booking.exception.TimeSlotNotFoundException;
import com.example.dormlaundrysystem.booking.model.Reservation;
import com.example.dormlaundrysystem.booking.model.TimeSlot;
import com.example.dormlaundrysystem.booking.model.dto.ReservationDto;
import com.example.dormlaundrysystem.booking.model.dto.TimeSlotDto;
import com.example.dormlaundrysystem.booking.model.mapper.ReservationMapper;
import com.example.dormlaundrysystem.booking.model.mapper.TimeSlotMapper;
import com.example.dormlaundrysystem.email.EmailService;
import com.example.dormlaundrysystem.washer.WasherRepository;
import com.example.dormlaundrysystem.washer.exception.WasherNotFoundException;
import com.example.dormlaundrysystem.washer.model.Washer;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final TimeSlotRepository timeSlotRepository;
    private final WasherRepository washerRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public ReservationService(ReservationRepository reservationRepository, TimeSlotRepository timeSlotRepository, WasherRepository washerRepository, UserRepository userRepository, EmailService emailService) {
        this.reservationRepository = reservationRepository;
        this.timeSlotRepository = timeSlotRepository;
        this.washerRepository = washerRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    @Transactional
    public void createReservation(String username, Long washerId, Long slotId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(UserNotFoundException::new);

        Washer washer = washerRepository.findById(washerId)
                .orElseThrow(WasherNotFoundException::new);

        TimeSlot slot = timeSlotRepository.findByIdAndWasher(slotId, washer)
                .orElseThrow(TimeSlotNotFoundException::new);

        if (!slot.isAvailable()) {
            throw new TimeSlotNotAvailableException();
        }

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
                        timeSlot.isAvailable() &&
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

    @Scheduled(cron = "0 0 6,9,12,15,16,18 * * * ")
    public void sendReminders() {
        LocalDateTime nextHourStart = LocalDateTime.now().plusHours(1).withMinute(0).withSecond(0).withNano(0);
        LocalDate date = nextHourStart.toLocalDate();
        String hourAsString = nextHourStart.toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm"));

        List<Reservation> reservations = reservationRepository.findByTimeSlotDayDateAndTimeSlotStartTime(date, hourAsString);
        for (Reservation reservation : reservations) {
            emailService.sendMail(reservation.getUser().getEmail(), "Washer reservation reminder",
                    createMessage(reservation.getUser(), reservation.getWasher().getName(), reservation.getTimeSlot().getStartTime()));
        }
    }

    private String createMessage(User user, String washerName, String startTime) {
        return String.format("Hello %s\n,We'd like to remind you about your reservation for %s at %s.\n\nKind regards,\nWashers Zaczek",
                user.getFirstName(), washerName, startTime);
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
