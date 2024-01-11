package com.example.dormlaundrysystem;

import com.example.dormlaundrysystem.auth.RoleRepository;
import com.example.dormlaundrysystem.user.UserRepository;
import com.example.dormlaundrysystem.auth.model.Role;
import com.example.dormlaundrysystem.auth.model.RoleType;
import com.example.dormlaundrysystem.user.model.User;
import com.example.dormlaundrysystem.booking.DayRepository;
import com.example.dormlaundrysystem.booking.TimeSlotRepository;
import com.example.dormlaundrysystem.booking.model.Day;
import com.example.dormlaundrysystem.booking.model.TimeSlot;
import com.example.dormlaundrysystem.email.EmailService;
import com.example.dormlaundrysystem.washer.WasherRepository;
import com.example.dormlaundrysystem.washer.model.Washer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Component
public class DataCreator implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final WasherRepository washerRepository;
    private final TimeSlotRepository timeSlotRepository;
    private final DayRepository dayRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final int WASHERS_NUM = 8;

    @Autowired
    public DataCreator(UserRepository userRepository, RoleRepository roleRepository, WasherRepository washerRepository,
                       TimeSlotRepository timeSlotRepository, DayRepository dayRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.washerRepository = washerRepository;
        this.timeSlotRepository = timeSlotRepository;
        this.dayRepository = dayRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Override
    public void run(String... args) {
        if (roleRepository.findAll().isEmpty()) {
            createRoles();
        }

        if (!userRepository.existsByUsername("admin")) {
            createAdmin();
        }

        if (washerRepository.findAll().isEmpty()) {
            createWashers();
        }

        List<Day> days = dayRepository.findAll();
        if (days.isEmpty() || days.get(days.size() - 1).getDate().isBefore(LocalDate.now())) {
            LocalDate startDate = LocalDate.now();
            LocalDate endDate = startDate.plusDays(14);

            for (int i = 1; i <= WASHERS_NUM; i++) {
                createSlotsForWasher((long) i, startDate, endDate);
            }
        }
    }

    private void createRoles() {
        List<Role> roles = List.of(new Role(RoleType.ROLE_ADMIN), new Role(RoleType.ROLE_USER), new Role(RoleType.ROLE_MOD));
        roleRepository.saveAll(roles);
    }

    private void createAdmin() {
        Optional<Role> adminRole = roleRepository.findByName(RoleType.ROLE_ADMIN);
        User adminUser = User.builder()
                .username("admin")
                .firstName("Admin")
                .surname("User")
                .email("admin@example.com")
                .password(passwordEncoder.encode("root"))
                .roles(Set.of(adminRole.get()))
                .build();

        userRepository.save(adminUser);
    }

    private void createWashers() {
        washerRepository.save(new Washer("Pralka 1", 1, true));
        washerRepository.save(new Washer("Pralka 2", 1, true));
        washerRepository.save(new Washer("Pralka 3", 2, true));
        washerRepository.save(new Washer("Pralka 4", 2, false));
        washerRepository.save(new Washer("Pralka 5", 3, true));
        washerRepository.save(new Washer("Pralka 6", 3, true));
        washerRepository.save(new Washer("Pralka 7", 4, true));
        washerRepository.save(new Washer("Pralka 8", 4, false));
    }

    private void createSlotsForWasher(Long washerId, LocalDate startDate, LocalDate endDate) {
        Washer washer = washerRepository.findById(washerId)
                .orElseThrow(() -> new IllegalArgumentException("Washer Not Found"));

        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            LocalDate finalDate = date;
            Day day = dayRepository.findByDate(date)
                    .orElseGet(() -> {
                        Day newDay = new Day();
                        newDay.setDate(finalDate);
                        return dayRepository.save(newDay);
                    });

            // Assuming a fixed slot duration of 30 minutes from 8 AM to 5 PM
            LocalTime startTime = LocalTime.of(7, 0);
            LocalTime endTime = LocalTime.of(22, 0);

            while (startTime.isBefore(endTime)) {
                TimeSlot slot = new TimeSlot();
                slot.setDay(day);
                slot.setWasher(washer);
                slot.setStartTime(String.valueOf(startTime));
                slot.setEndTime(String.valueOf(startTime.plusHours(3)));
                slot.setAvailable(true);

                timeSlotRepository.save(slot);

                startTime = startTime.plusHours(3);
            }
        }
    }
}

