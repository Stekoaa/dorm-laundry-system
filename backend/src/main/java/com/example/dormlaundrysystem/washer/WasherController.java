package com.example.dormlaundrysystem.washer;

import com.example.dormlaundrysystem.washer.model.Washer;
import com.example.dormlaundrysystem.washer.model.dto.WasherDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> updateWasherInfo(
            @PathVariable Long washerId,
            @RequestBody WasherDto washer
    ) {
        washerService.updateWasher(washerId, washer);
        return ResponseEntity.ok().build();
    }

    // TODO: Update status, adding new machine, permissions handling
}
