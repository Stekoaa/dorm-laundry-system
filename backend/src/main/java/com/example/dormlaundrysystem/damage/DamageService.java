package com.example.dormlaundrysystem.damage;

import com.example.dormlaundrysystem.user.UserRepository;
import com.example.dormlaundrysystem.user.exception.UserNotFoundException;
import com.example.dormlaundrysystem.user.model.User;
import com.example.dormlaundrysystem.damage.model.Damage;
import com.example.dormlaundrysystem.damage.model.dto.DamageDto;
import com.example.dormlaundrysystem.damage.model.dto.DamageReportDto;
import com.example.dormlaundrysystem.damage.model.mapper.DamageMapper;
import com.example.dormlaundrysystem.email.EmailService;
import com.example.dormlaundrysystem.washer.WasherRepository;
import com.example.dormlaundrysystem.washer.exception.WasherNotFoundException;
import com.example.dormlaundrysystem.washer.model.Washer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DamageService {
    private final EmailService emailService;
    private final DamageRepository damageRepository;
    private final WasherRepository washerRepository;
    private final UserRepository userRepository;

    @Value("${spring.mail.username}")
    private String adminEmail;

    public DamageService(EmailService emailService, DamageRepository damageRepository, WasherRepository washerRepository,
                         UserRepository userRepository) {
        this.emailService = emailService;
        this.damageRepository = damageRepository;
        this.washerRepository = washerRepository;
        this.userRepository = userRepository;
    }

    public List<DamageDto> getAllDamages() {
        return damageRepository.findAllByOrderByReportTimeDesc().stream().map(DamageMapper::toDto).toList();
    }

    public void updateDamage(Long id, DamageDto updatedDamage) {
        Damage damage = damageRepository.findById(id)
                .orElseThrow(WasherNotFoundException::new);
        damage.setFixed(updatedDamage.fixed());
        damageRepository.save(damage);
    }

    public void createDamage(DamageReportDto damageReport) {
        Washer washer = washerRepository.findById(damageReport.washerId())
                .orElseThrow(WasherNotFoundException::new);

        User user = userRepository.findByUsername(damageReport.username())
                .orElseThrow(UserNotFoundException::new);

        Damage damage = DamageMapper.fromReport(damageReport);
        damage.setUser(user);
        damage.setWasher(washer);
        damageRepository.save(damage);

        emailService.sendMail(adminEmail, "Damage reported", createMessage(damageReport, washer.getName()));
    }

    private String createMessage(DamageReportDto damageReportDto, String washerName) {
        return String.format("User %s reported damage to %s with description\n %s",
                damageReportDto.username(), washerName, damageReportDto.description());
    }
}
