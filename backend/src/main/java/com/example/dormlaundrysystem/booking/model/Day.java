package com.example.dormlaundrysystem.booking.model;

import jakarta.persistence.*;
import org.hibernate.annotations.Fetch;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "days")
public class Day {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;

    @OneToMany(mappedBy = "day", fetch = FetchType.LAZY)
    private List<TimeSlot> slots;

    public Day() {

    }

    public Day(LocalDate date) {
        this.date = date;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
