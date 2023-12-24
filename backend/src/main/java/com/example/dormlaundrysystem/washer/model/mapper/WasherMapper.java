package com.example.dormlaundrysystem.washer.model.mapper;

import com.example.dormlaundrysystem.washer.model.Washer;
import com.example.dormlaundrysystem.washer.model.dto.WasherDto;
import org.springframework.stereotype.Component;

@Component
public class WasherMapper {
    public static WasherDto toDto(Washer washer){
        return new WasherDto(
                washer.getId(),
                washer.getName(),
                washer.isBooked(),
                washer.isAvailable(),
                washer.isDamaged()
        );
    }
}
