package com.example.dormlaundrysystem.booking;

import com.example.dormlaundrysystem.booking.model.TimeSlot;
import com.example.dormlaundrysystem.washer.model.Washer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {
    List<TimeSlot> findByDayDateBetweenAndWasher(LocalDate startDate, LocalDate endDate, Washer washer);
    Optional<TimeSlot> findByIdAndWasher(Long slotId, Washer washer);
}
