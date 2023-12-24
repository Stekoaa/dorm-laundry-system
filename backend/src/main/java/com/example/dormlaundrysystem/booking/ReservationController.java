package com.example.dormlaundrysystem.booking;

import com.example.dormlaundrysystem.booking.model.dto.ReservationDto;
import com.example.dormlaundrysystem.booking.model.dto.TimeSlotDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/bookings")
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookWasher() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (String) authentication.getPrincipal();




    }

    @GetMapping("/availableTimeSlots/{washerId}")
    public List<TimeSlotDto> getAvailableTimeSlots(@PathVariable Long washerId) {
        return reservationService.getAvailableTimeSlotsForWasher(washerId);
    }

    @GetMapping("/all")
    public List<ReservationDto> getAllReservations(
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "lastName", required = false) String lastName
    ) {
        return reservationService.searchReservations(firstName, lastName);
    }
}