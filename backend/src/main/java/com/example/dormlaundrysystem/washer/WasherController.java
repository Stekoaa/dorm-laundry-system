package com.example.dormlaundrysystem.washer;

import com.example.dormlaundrysystem.washer.model.Washer;
import com.example.dormlaundrysystem.washer.model.dto.WasherDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/washers")
public class WasherController {
    private final WasherService washerService;

    public WasherController(WasherService washerService) {
        this.washerService = washerService;
    }

    @GetMapping("/all")
    public List<WasherDto> getAllWashers() {
        return washerService.getAllWashers();
    }

}
