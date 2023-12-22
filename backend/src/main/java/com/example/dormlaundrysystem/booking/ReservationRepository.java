package com.example.dormlaundrysystem.booking;

import com.example.dormlaundrysystem.booking.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    // Add custom query methods if needed
}
