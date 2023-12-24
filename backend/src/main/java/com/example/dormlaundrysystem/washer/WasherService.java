package com.example.dormlaundrysystem.washer;

import com.example.dormlaundrysystem.washer.model.Washer;
import com.example.dormlaundrysystem.washer.model.mapper.WasherMapper;
import com.example.dormlaundrysystem.washer.model.dto.WasherDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WasherService {
    private final WasherRepository washerRepository;

    public WasherService(WasherRepository washerRepository) {
        this.washerRepository = washerRepository;
    }

    public List<WasherDto> getAllWashers() {
        List<Washer> washers = washerRepository.findAll();
        return washers.stream().map(WasherMapper::toDto).collect(Collectors.toList());
    }
}
