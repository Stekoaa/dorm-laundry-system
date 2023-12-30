package com.example.dormlaundrysystem.booking;

import com.example.dormlaundrysystem.booking.model.dto.ReservationDto;
import com.example.dormlaundrysystem.booking.model.dto.TimeSlotDto;
import com.example.dormlaundrysystem.security.UserDetailsImpl;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/bookings")
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookWasher(
            @RequestParam long slotId,
            @RequestParam long washerId
    ) {
        reservationService.createReservation(getAuthenticatedUsername(), washerId, slotId);
        return ResponseEntity.created(URI.create("")).body("Reservation successfully created");
    }

    @GetMapping("/availableTimeSlots")
    public ResponseEntity<Map<LocalDate, List<TimeSlotDto>>> getAvailableTimeSlots(
            @RequestParam Long washerId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        Map<LocalDate, List<TimeSlotDto>> timeSlots = reservationService.getAvailableTimeSlotsForWasher(washerId, startDate, endDate);
        return ResponseEntity.ok(timeSlots);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ReservationDto>> getAllReservations(
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "surname", required = false) String surname
    ) {
        List<ReservationDto> reservations = reservationService.searchReservations(firstName, surname);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/myReservations")
    public ResponseEntity<List<ReservationDto>> getUserReservations() {
        List<ReservationDto> reservations = reservationService.searchReservationsByUsername(getAuthenticatedUsername());
        return ResponseEntity.ok(reservations);
    }

    @DeleteMapping("/{reservationId}")
    public ResponseEntity<?> deleteReservation(@PathVariable Long reservationId) {
        reservationService.deleteReservation(reservationId);
        return ResponseEntity.noContent().build();
    }

    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}