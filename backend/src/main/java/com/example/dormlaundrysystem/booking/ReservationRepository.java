package com.example.dormlaundrysystem.booking;

import com.example.dormlaundrysystem.booking.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserFirstNameAndUserSurnameOrderByIdDesc(String firstName, String surname);
    List<Reservation> findByUserUsernameOrderByIdDesc(String username);
    List<Reservation> findByTimeSlotDayDateAndTimeSlotStartTime(LocalDate date, String startTime);
    List<Reservation> findAllByOrderByTimeSlotDayDateDescTimeSlotEndTimeAsc();
    List<Reservation> findAllByUserId(Long userId);
}
