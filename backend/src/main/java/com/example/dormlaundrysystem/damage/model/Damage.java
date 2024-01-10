package com.example.dormlaundrysystem.damage.model;

import com.example.dormlaundrysystem.user.model.User;
import com.example.dormlaundrysystem.washer.model.Washer;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "damages")
public class Damage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "washer_id")
    private Washer washer;

    private LocalDateTime reportTime;
    private boolean fixed;

    @Size(min = 5, max = 100, message = "Invalid description size")
    private String description;

    public Damage() {}

    public Damage(LocalDateTime reportTime, boolean fixed, String description) {
        this.reportTime = reportTime;
        this.fixed = fixed;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Washer getWasher() {
        return washer;
    }

    public void setWasher(Washer washer) {
        this.washer = washer;
    }

    public LocalDateTime getReportTime() {
        return reportTime;
    }

    public void setReportTime(LocalDateTime reportTime) {
        this.reportTime = reportTime;
    }

    public boolean isFixed() {
        return fixed;
    }

    public void setFixed(boolean fixed) {
        this.fixed = fixed;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
