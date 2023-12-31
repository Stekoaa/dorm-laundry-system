package com.example.dormlaundrysystem.washer.model.mapper;

import com.example.dormlaundrysystem.washer.model.Washer;
import com.example.dormlaundrysystem.washer.model.dto.WasherCreateRequest;
import com.example.dormlaundrysystem.washer.model.dto.WasherDto;
import org.springframework.stereotype.Component;

@Component
public class WasherMapper {
    public static WasherDto toDto(Washer washer){
        return new WasherDto(
                washer.getId(),
                washer.getName(),
                washer.getLevel(),
                washer.isAvailable()
        );
    }

    public static Washer fromDto(WasherCreateRequest washer) {
        return new Washer(
                washer.name(),
                washer.level(),
                washer.isAvailable()
        );
    }
}
