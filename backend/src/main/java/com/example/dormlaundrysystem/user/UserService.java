package com.example.dormlaundrysystem.user;

import com.example.dormlaundrysystem.booking.ReservationRepository;
import com.example.dormlaundrysystem.booking.ReservationService;
import com.example.dormlaundrysystem.booking.model.Reservation;
import com.example.dormlaundrysystem.damage.DamageRepository;
import com.example.dormlaundrysystem.damage.DamageService;
import com.example.dormlaundrysystem.damage.model.Damage;
import com.example.dormlaundrysystem.user.exception.UserNotFoundException;
import com.example.dormlaundrysystem.user.model.User;
import com.example.dormlaundrysystem.user.model.dto.UserDto;
import com.example.dormlaundrysystem.user.model.mapper.UserMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final DamageService damageService;
    private final DamageRepository damageRepository;
    private final ReservationRepository reservationRepository;
    private final ReservationService reservationService;

    public UserService(UserRepository userRepository, DamageService damageService, ReservationRepository reservationRepository, DamageRepository damageRepository, ReservationService reservationService) {
        this.userRepository = userRepository;
        this.damageService = damageService;
        this.reservationRepository = reservationRepository;
        this.damageRepository = damageRepository;
        this.reservationService = reservationService;
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAllByOrderByUsername().stream().map(UserMapper::toDto).toList();
    }

    public void banUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        user.setBanned(true);
        userRepository.save(user);
    }

    public void unbanUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        user.setBanned(false);
        userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        List<Reservation> userReservations = reservationRepository.findAllByUserId(userId);
        userReservations.forEach(reservation -> {
            reservationService.deleteReservation(reservation.getId());
        });

        List<Damage> userDamages = damageRepository.findAllByUserId(userId);
        userDamages.forEach(damage -> {
            damageService.deleteDamage(damage.getId());
        });

        userRepository.delete(user);
    }
}
