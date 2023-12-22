package com.example.dormlaundrysystem.booking.model;

import jakarta.persistence.*;

@Entity
@Table(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "washer_id")
    private Washer washer;

    @ManyToOne
    @JoinColumn(name = "time_slot_id")
    private TimeSlot timeSlot;

    public Reservation() {};

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Washer getWasher() {
        return washer;
    }

    public void setWasher(Washer washer) {
        this.washer = washer;
    }

    public TimeSlot getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(TimeSlot timeSlot) {
        this.timeSlot = timeSlot;
    }
}
