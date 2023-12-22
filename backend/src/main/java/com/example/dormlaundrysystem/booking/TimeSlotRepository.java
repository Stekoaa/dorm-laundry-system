package com.example.dormlaundrysystem.booking;

import com.example.dormlaundrysystem.booking.model.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {
    // Add custom query methods if needed
}
