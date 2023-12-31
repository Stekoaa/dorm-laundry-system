package com.example.dormlaundrysystem.washer;

import com.example.dormlaundrysystem.washer.exception.WasherNotFoundException;
import com.example.dormlaundrysystem.washer.model.Washer;
import com.example.dormlaundrysystem.washer.model.dto.WasherCreateRequest;
import com.example.dormlaundrysystem.washer.model.mapper.WasherMapper;
import com.example.dormlaundrysystem.washer.model.dto.WasherDto;
import com.mysql.cj.log.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WasherService {
    private final WasherRepository washerRepository;
    private static final Logger log  = LoggerFactory.getLogger(WasherService.class);

    public WasherService(WasherRepository washerRepository) {
        this.washerRepository = washerRepository;
    }

    public List<WasherDto> getAllWashers() {
        List<Washer> washers = washerRepository.findAll();
        return washers.stream().map(WasherMapper::toDto).collect(Collectors.toList());
    }

    public WasherDto getWasher(Long id) {
        Washer washer = washerRepository.findById(id).orElseThrow(WasherNotFoundException::new);
        return WasherMapper.toDto(washer);
    }

    public void updateWasher(Long id, WasherDto updatedWasher) {
        washerRepository.findById(id)
               .map(washer -> {
                   washer.setAvailable(updatedWasher.isAvailable());
                   washer.setName(updatedWasher.name());
                   washer.setLevel(updatedWasher.level());
                   return washerRepository.save(washer);
               })
               .orElseThrow(WasherNotFoundException::new);
    }

    public void createWasher(WasherCreateRequest washer) {
        Washer newWasher = WasherMapper.fromDto(washer);
        washerRepository.save(newWasher);
    }
}
