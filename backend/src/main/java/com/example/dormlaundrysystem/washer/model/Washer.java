package com.example.dormlaundrysystem.washer.model;

import com.example.dormlaundrysystem.booking.model.Reservation;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

@Entity
@Table(name = "washers",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name"),
        })
public class Washer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;
    private boolean isBooked;
    private boolean isAvailable;
    private boolean isDamaged;

    @Version
    private Long version;

    @OneToMany(mappedBy = "washer")
    private List<Reservation> reservations;

    public Washer() {}

    public Washer(String name, boolean isBooked, boolean isAvailable, boolean isDamaged) {
        this.name = name;
        this.isBooked = isBooked;
        this.isAvailable = isAvailable;
        this.isDamaged = isDamaged;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isBooked() {
        return isBooked;
    }

    public void setBooked(boolean booked) {
        isBooked = booked;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public boolean isDamaged() {
        return isDamaged;
    }

    public void setDamaged(boolean damaged) {
        isDamaged = damaged;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}
