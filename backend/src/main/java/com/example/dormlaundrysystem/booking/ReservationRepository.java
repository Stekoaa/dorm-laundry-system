package com.example.dormlaundrysystem.booking;

import com.example.dormlaundrysystem.booking.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByWasherId(Long washerId);
    List<Reservation> findByUserFirstNameAndUserSurname(String firstName, String surname);
}
