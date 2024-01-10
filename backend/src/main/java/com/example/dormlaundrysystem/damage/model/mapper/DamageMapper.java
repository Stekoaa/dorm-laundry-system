package com.example.dormlaundrysystem.damage.model.mapper;

import com.example.dormlaundrysystem.damage.model.Damage;
import com.example.dormlaundrysystem.damage.model.dto.DamageDto;
import com.example.dormlaundrysystem.damage.model.dto.DamageReportDto;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DamageMapper {
    public static DamageDto toDto(Damage damage) {
        return new DamageDto(
                damage.getId(),
                damage.getUser().getFirstName(),
                damage.getUser().getSurname(),
                damage.getWasher().getName(),
                damage.getReportTime(),
                damage.isFixed(),
                damage.getDescription()
        );
    }

    public static Damage fromReport(DamageReportDto damageReport) {
        return new Damage(
                LocalDateTime.now(),
                false,
                damageReport.description()
        );
    }
}
