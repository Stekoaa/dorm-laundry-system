package com.example.dormlaundrysystem.washer;

import com.example.dormlaundrysystem.washer.model.dto.WasherCreateRequest;
import com.example.dormlaundrysystem.washer.model.dto.WasherDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/v1/washers")
public class WasherController {
    private final WasherService washerService;

    public WasherController(WasherService washerService) {
        this.washerService = washerService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<WasherDto>> getAllWashers() {
        return ResponseEntity.ok(washerService.getAllWashers());
    }

    @GetMapping("/{washerId}")
    public ResponseEntity<WasherDto> getWasher(@PathVariable Long washerId) {
        return ResponseEntity.ok(washerService.getWasher(washerId));
    }

    @PutMapping("/{washerId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateWasherInfo(
            @PathVariable Long washerId,
            @RequestBody WasherDto washer
    ) {
        washerService.updateWasher(washerId, washer);
        return ResponseEntity.ok().build();
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createWasher(@RequestBody WasherCreateRequest washer) {
        washerService.createWasher(washer);
        return ResponseEntity.created(URI.create("")).build();
    }
}
